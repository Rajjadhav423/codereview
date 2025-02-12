# Code Review Full Stack Application

## Overview

This project is a full-stack web application designed to assist developers in reviewing their code. It leverages AI to provide detailed feedback on code quality, best practices, performance, and potential issues.

## Features

- **Code Editor**: A web-based code editor where users can input their code.
- **AI-Powered Code Review**: Utilizes Google's Generative AI to analyze and review the code.
- **Detailed Feedback**: Provides a structured review including overall assessment, suggestions for improvements, and identification of critical issues.
- **User-Friendly Interface**: A responsive and intuitive UI for seamless user experience.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **React Simple Code Editor**: For the code editor component.
- **PrismJS**: For syntax highlighting.
- **React Markdown**: For rendering markdown content.
- **Tailwind CSS**: For styling the application.

### Backend
- **Node.js**: For the server-side runtime environment.
- **Express**: For building the RESTful API.
- **Google Generative AI**: For generating code reviews.
- **dotenv**: For managing environment variables.

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- A Google Generative AI API key.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Rajjadhav423/codereview
    cd codereview
    ```

2. Install dependencies for both client and server:
    ```sh
    cd server
    npm install
    cd ../client
    npm install
    ```

3. Create a `.env` file in the `server` directory and add your API key:
    ```env
    API_KEY=your_google_generative_ai_api_key
    ```

### Running the Application

1. Start the server:
    ```sh
    cd server
    npm start
    ```

2. Start the client:
    ```sh
    cd client
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Enter your code in the code editor.
2. Click the "Review Code" button.
3. View the detailed feedback provided by the AI.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
