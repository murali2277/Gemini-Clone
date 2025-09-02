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
    let responseArray = text.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "</b>" + responseArray[i] + "<b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    return newResponse2;
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
