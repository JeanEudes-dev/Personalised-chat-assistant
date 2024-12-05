---

# Chat Assistant

This is the Chat Assistant project, which includes a backend powered by Node.js and Express.js, and a frontend built with React. The backend integrates with Hugging Face's API for AI-powered conversational capabilities.

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the Project](#running-the-project)
6. [API Documentation](#api-documentation)
7. [Collaboration](#collaboration)
8. [Troubleshooting](#troubleshooting)

---

## Features

- AI-driven conversational responses via Hugging Face.
- Chat management with endpoints to fetch history, create chats, and add messages.
- Separate backend and frontend for modular development.

---

## Prerequisites

Ensure you have the following:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning the repository)
- A **Hugging Face API key** (register [here](https://huggingface.co/))

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/chat-assistant.git
cd chat-assistant
```

### 2. Install Dependencies
For the backend:
```bash
cd chat-assistant-backend
npm install
```

For the frontend:
```bash
cd ../
npm install
```

---

## Configuration

### Backend
1. Navigate to `chat-assistant-backend`:
   ```bash
   cd chat-assistant-backend
   ```

2. Create a `.env` file:
   ```bash
   touch .env
   ```

3. Add the following environment variables:
   ```env
   PORT=5000
   HUGGINGFACE_API_KEY=your_hugging_face_api_key
   ```

   Replace `your_hugging_face_api_key` with your actual Hugging Face API key.

### Frontend
- No additional configuration is needed unless environment-specific setup is required.

---

## Running the Project

### Backend
1. Navigate to the backend folder:
   ```bash
   cd chat-assistant-backend
   ```

2. Start the backend server:
   ```bash
   npx nodemon server.js
   ```

   The backend will run at `http://localhost:5000` by default.

### Frontend
1. Navigate to the project root directory:
   ```bash
   cd ../
   ```

2. Start the frontend server:
   ```bash
   npm start
   ```

   The frontend will run at `http://localhost:3000` by default.

---

## API Documentation

### Endpoints

#### **1. Chat Routes**
Base Path: `/api/chats`

- **GET `/`**  
  Fetch chat history.
  
- **POST `/`**  
  Create a new chat.  
  **Body**:  
  ```json
  {
    "name": "Chat name"
  }
  ```

- **POST `/:id/messages`**  
  Add a message to an existing chat.  
  **Body**:  
  ```json
  {
    "sender": "User or Bot",
    "text": "Message content"
  }
  ```

#### **2. AI Routes**
Base Path: `/api/chats/ai`

- **POST `/ai`**  
  Get an AI-generated response.  
  **Body**:  
  ```json
  {
    "text": "User input message"
  }
  ```

---

## Collaboration

### Best Practices
1. **Branching**:  
   Use Git branching to manage features:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Commit Messages**:  
   Write clear and concise commit messages:
   ```bash
   git commit -m "Add feature X to improve Y"
   ```

3. **Pull Requests (PRs)**:  
   Create PRs for code review before merging changes to the main branch.

4. **Code Style**:  
   - Follow consistent naming conventions.
   - Use a linter (e.g., ESLint) for JavaScript.

5. **Documentation**:  
   Update the README or any related documentation for any new feature or major change.

6. **Communication**:  
   Use tools like Slack, Teams, or email for effective team collaboration.

### Setting Up the Repository
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-assistant.git
   ```

2. Set up the environment following the instructions above.

3. Sync changes regularly:
   ```bash
   git pull origin main
   ```

4. Push your updates:
   ```bash
   git push origin your-branch-name
   ```

---

## Troubleshooting

### Common Issues
- **Backend not starting**: Ensure your `.env` file is configured correctly and `server.js` is the correct entry point.
- **Frontend not connecting to the backend**: Check the API URLs in the frontend configuration.
- **Invalid Hugging Face API key**: Verify your key in the `.env` file.

### Debugging
Use `console.log` to debug or add breakpoints if using a debugger.

---