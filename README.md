# Gemini Clone

This is a simple web application that acts as a clone of the Google Gemini interface. It allows users to enter a prompt and receive a response from the Gemini API.

## Features

*   **Interactive Chat Interface**: A clean and simple UI for sending prompts and viewing responses.
*   **Direct Gemini API Integration**: The frontend directly communicates with the Google Gemini API.
*   **Response Formatting**: The application formats the Gemini response to display bold text and line breaks.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or later)
*   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/murali2277/Gemini-Clone.git
    cd Gemini-Clone
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Configuration

1.  **Create a `.env` file** in the root of the project.

2.  **Add your Gemini API key** to the `.env` file. The variable must be prefixed with `VITE_` for it to be accessible in the client-side code.
    ```
    VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    Replace `YOUR_API_KEY_HERE` with your actual Google Gemini API key.

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173/` or a similar port).

## Security Note

This project directly calls the Google Gemini API from the frontend. This means your `VITE_GEMINI_API_KEY` is exposed in the client-side code. This is **not recommended for production applications** as it poses a significant security risk. For production environments, it is highly recommended to use a backend server to proxy requests to the Gemini API, keeping your API key secure on the server-side.
