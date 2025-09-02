import React, { createContext, useState } from "react";
import ai from "../config/gemini";

export const GeminiContext = createContext();

const GeminiContextProvider = (props) => {
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [onSent, setOnSent] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [showResult, setShowResult] = useState(false); // New state to control result display

  const formatResponse = (text) => {
    let formattedText = text;

    // Replace **text** with <b>text</b>
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Replace ### heading with <h3>heading</h3> (and similar for ##, #)
    formattedText = formattedText.replace(/### (.*)/g, '<h3>$1</h3>');
    formattedText = formattedText.replace(/## (.*)/g, '<h2>$1</h2>');
    formattedText = formattedText.replace(/\/ (.*)/g, '<h1>$1</h1>'); // Corrected from # to / for consistency with previous code

    // Replace ```code``` with <pre><code>code</code></pre>
    formattedText = formattedText.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');

    // Replace * with <br/> for line breaks, but be careful not to break other markdown
    // This specific replacement should be done carefully. For now, let's assume * is primarily for line breaks.
    formattedText = formattedText.replace(/\* /g, '<br/>');

    return formattedText;
  };

  const newChat = () => {
    setLoading(false);
    setOnSent(false);
    setShowResult(false);
  }

  const sendPrompt = async (prompt) => {
    setResultData("");
    setLoading(true);
    setOnSent(true);
    setShowResult(true); // Show result area when prompt is sent
    setRecentPrompt(prompt);

    let response;
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      response = formatResponse(result.text);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      response = "Failed to get response from Gemini API.";
    } finally {
      setResultData(response);
      setLoading(false);
      setPrevPrompts(prev => [...prev, { prompt: prompt, response: response }]); // Store both prompt and response
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setOnSent,
    recentPrompt,
    setRecentPrompt,
    loading,
    setLoading,
    resultData,
    setResultData,
    sendPrompt,
    showResult,
    setShowResult,
    newChat
  };

  return (
    <GeminiContext.Provider value={contextValue}>
      {props.children}
    </GeminiContext.Provider>
  );
};

export default GeminiContextProvider;
