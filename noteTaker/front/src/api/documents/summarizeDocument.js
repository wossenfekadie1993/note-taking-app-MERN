export const summarizeDocument = async (document_id) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/documents/${document_id}/summary`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Could not fetch document");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
