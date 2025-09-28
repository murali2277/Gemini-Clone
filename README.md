# Gemini Clone

This is a simple web application that acts as a clone of the Google Gemini interface. It allows users to enter a prompt and receive a response from the Gemini API.

## Features

*   **Interactive Chat Interface**: A clean and simple UI for sending prompts and viewing responses.
*   **Dynamic Typing Effect**: AI responses are displayed with a realistic typing animation for an enhanced user experience.
*   **Persistent Chat History**: Previous prompts and their responses are stored and accessible via a sidebar, allowing users to revisit past conversations.
*   **New Chat Functionality**: Easily start a fresh conversation with the AI.
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

## Docker Usage

You can run Gemini Clone in a Docker container:

1. **Build the Docker image:**
    ```bash
    docker build -t gemini-clone .
    ```

2. **Run the Docker container:**
    ```bash
    docker run -p 5173:5173 gemini-clone
    ```

3. Open your browser at [http://localhost:5173](http://localhost:5173).

**Note:**  
The dev script uses `vite --host` so the server binds to `0.0.0.0` and is accessible outside the container.  
Make sure your `.env` file is present and contains your API key before building the image.

## Security Note

This project directly calls the Google Gemini API from the frontend. This means your `VITE_GEMINI_API_KEY` is exposed in the client-side code. This is **not recommended for production applications** as it poses a significant security risk. For production environments, it is highly recommended to use a backend server to proxy requests to the Gemini API, keeping your API key secure on the server-side.
