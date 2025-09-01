import React, { createContext, useState } from "react";
import ai from "../config/gemini";

export const GeminiContext = createContext();

const GeminiContextProvider = (props) => {
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [onSent, setOnSent] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

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

  const sendPrompt = async (prompt) => {
    setResultData("");
    setLoading(true);
    setOnSent(true);
    setRecentPrompt(prompt);
    setPrevPrompts(prev => [...prev, prompt]); // Add current prompt to history

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      const formattedText = formatResponse(result.text);
      setResultData(formattedText);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setResultData("Failed to get response from Gemini API.");
    } finally {
      setLoading(false);
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
  };

  return (
    <GeminiContext.Provider value={contextValue}>
      {props.children}
    </GeminiContext.Provider>
  );
};

export default GeminiContextProvider;
