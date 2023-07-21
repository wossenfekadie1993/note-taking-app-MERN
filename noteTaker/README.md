# noteTaker


📓 noteTaker is a serverless note-taking app with MERN stacks, aiming at efficient idea management, offering features such as search functionality, auto-generation of summaries, and tagging with openAI.

🔗 Website URL: <a href="https://www.noteTaker.space" target="_blank">www.noteTaker.space</a>

> ⚠️ Please be aware that in guest mode, your data will be lost upon logging out.

📖 How to Use: <a href="https://github.com/fockspaces/noteTaker/blob/main/documentations/Tutorial.md" target="_blank">Tutorial</a>

📓 Under the Hood:
<a href="https://github.com/fockspaces/noteTaker/blob/main/documentations/TechSkills.md" target="_blank"> Details</a>

_**Note:** In the '**Under the Hood**' section, we'll take a closer look at the technical aspects of the project and how various technologies and skills were employed to achieve specific goals._

---

## Table of Contents

- [Main Features](#main-features)
- [Architecture](#architecture)
- [MongoDB Database Schema](#mongodb-database-schema)
- [CI / CD](#ci--cd)
- [API Documentation](#api-documentation)
- [Technique](#technique)
- [Cloud Services (AWS)](#cloud-services-aws)
- [Contact](#contact)

---

## Main Features

- Full-Text-Search: Efficient full-text search functionality, allowing users to quickly find related notes they have written.
- Asynchronous Processing: Perform independent summarization tasks with lambda functions
- Scalable Design: Handle high-load scenarios by initiating additional containers as needed.
- Infrastructure Management: Employed Terraform for resources management.

---


## CI / CD

The deployment process for both frontend and backend components is managed separately.

<img alt="image" src="https://github.com/fockspaces/noteTaker/assets/63909491/44377ac5-61ef-428f-9043-510c472a2e96">

### Workflow

- Backend Process: If the tests pass successfully, a Docker image is pushed to a Docker Hub, triggering an update in the AWS ECS services.

- Frontend Process: Every commit initiates a build process for the React application. The resulting static files are uploaded directly to AWS S3 for web hosting, followed by an invalidation of the CloudFront cache.

### Testing

Our project utilizes integration testing, focusing primarily on typical use-cases and critical paths.



### Tools

- GitHub Actions: Automates the workflow from code push to deployment.
- Jest and SuperTest: Utilizes for integrated testing in the backend API.
- Docker: Ensures consistent, reproducible environments for AWS ECS.
- Terraform: Manages and provisions AWS services resources, enhancing scalability and consistency.

---



## Technique

Technologies and tools utilized in the project.

### Infrastructure

- Docker
- Terraform

### Environment

- Node.js / Express.js

### Database

- MongoDB Atlas
- ElastiCache (Redis)

### Test

- Jest, SuperTest

### CI / CD

- GitHub Actions

### Third Party Library

- OpenAI
- Tiptap

### Frontend

- React (Hook)
- Sass

## Cloud Services (AWS)

### Server

- Elastic Load Balancer
- Elastic Container Service (ECS)
- Elastic Compute Cloud (EC2)
- Fargate

### Storage

- Simple Storage Service (S3)
- CloudFront (CDN)

### Message Broker

- Simple Queue Service (SQS)
- Lambda

### DNS

- Route 53

---

## Contact

🧑🏻‍💻 Feng Ming, Chang

✉️ a86gj3sp4@gmail.com
