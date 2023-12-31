import { google } from "googleapis";
const { OAuth2 } = google.auth;
import { verify } from "../utils/jwt.js";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

export const verifyGoogle = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(400).json({ error: "please provide access_token" });
  const token = authorization.split(" ")[1];
  const clientId = process.env.GOOGLE_CLIENT_ID;

  try {
    const user = await TokenIsFromGoogle(token, clientId);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const TokenIsFromGoogle = async (token, clientId) => {
  const client = new OAuth2(clientId);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });
  const {
    iss: tokenIssuer,
    aud: tokenAudience,
    exp: tokenExpiration,
    sub: userId,
    email,
    name,
    picture,
  } = ticket.getPayload();

  // Check that the token was issued by Google
  if (
    tokenIssuer !== "https://accounts.google.com" &&
    tokenIssuer !== "accounts.google.com"
  ) {
    throw new Error("Invalid token issuer");
  }

  // Check that the token is meant for your application
  if (tokenAudience !== clientId) {
    throw new Error("Invalid token audience");
  }

  // Check that the token is not expired
  const now = Math.floor(Date.now() / 1000);
  if (now >= tokenExpiration) {
    throw new Error("Token has expired");
  }

  // Return the user ID from the token claims
  return { userId, email, name, picture };
};

export const authUserWithGoogle = async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const client = new OAuth2(clientId, clientSecret, "postmessage");
  try {
    const { tokens } = await client.getToken(req.body.code); // exchange code for tokens
    return res.status(200).json(tokens);
  } catch (e) {
    console.error("Failed to get token from Google:", e.message);
    return res.status(500).json({ message: e.message });
  }
};

export const verifyUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "No access_token provided" });

  const token = authorization.split(" ")[1];

  try {
    // Verify the token
    const user = verify(token);

    // Attach user object to the request for further use
    req.user = user;

    // Call the next middleware
    next();
  } catch (err) {
    console.log({ err });
    res.status(403).json({ message: "Authorization denied, invalid token" });
  }
};

export const signupAsGuest = async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const uniqueIdentifier = uuidv4();
  const guestEmail = `${ip}-${uniqueIdentifier}@guest.com`;

  let user = await User.findOne({ email: guestEmail });

  if (!user) {
    user = new User({
      email: guestEmail,
      name: `Guest ${ip}-${uniqueIdentifier}`,
    });

    await user.save();
  }

  req.user = user; // Pass user to the next middleware function
  next();
};
