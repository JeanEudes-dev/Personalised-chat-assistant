# Chat Assistant

A simple chat assistant web application built with React. The app allows users to interact with an AI assistant, save chat histories, switch between light and dark themes, and create new chats.

## Features

- **Chat Interface**: Users can send messages and receive automated responses from the bot.
- **Chat History**: View the list of previous chats stored in the browser's local storage.
- **Create New Chat**: Clear the current chat and start a new one, with the first two words of the initial message as the chat's name.
- **Light/Dark Theme**: Toggle between light and dark themes for the chat interface.
- **Persistent Data**: Chat history is saved in the browser's local storage, so chats persist across page reloads.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/chat-assistant.git
   cd chat-assistant
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm start
   ```

4. Open the app in your browser at `http://localhost:3000`.

## Usage

- **Send a message**: Type a message into the input field and press enter or click the send button.
- **Toggle theme**: Click the theme toggle button to switch between light and dark modes.
- **Create new chat**: Click the "Create New Chat" button to start a new conversation and clear the current chat history.
- **View chat history**: Click on the chat history icon to view previous chats. Each chat is stored with a name based on the first two words of the first message.

## Technologies Used

- **React**: The frontend framework for building the chat interface.
- **TypeScript**: Used to add type safety to the project.
- **React Icons**: For using icons in the app.
- **localStorage**: For storing chat history persistently.

## Future Enhancements

- Integrate a real chatbot API for dynamic responses.
- Improve message formatting (e.g., support for rich media like images, videos, etc.).
- Implement a user authentication system for personalized chat histories.
- Add more advanced features like sentiment analysis or advanced AI features.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add feature xyz'`).
5. Push to the branch (`git push origin feature-xyz`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
