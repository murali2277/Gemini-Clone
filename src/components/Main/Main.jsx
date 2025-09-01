import React, { useContext, useState, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { GeminiContext } from "../../context/GeminiContext";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    loading,
    resultData,
    sendPrompt,
    setPrevPrompts, // Added setPrevPrompts to context
    setRecentPrompt, // Added setRecentPrompt to context
    setResultData, // Added setResultData to context
    setLoading, // Added setLoading to context
    setOnSent // Added setOnSent to context
  } = useContext(GeminiContext);

  const [input, setInput] = useState("");
  const [displayText, setDisplayText] = useState(""); // State for typing effect

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setDisplayText((prev) => prev + nextWord);
    }, 75 * index);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setDisplayText(""); // Clear display text
    await sendPrompt(input);
    setInput(""); // Clear input field
  };

  useEffect(() => {
    if (resultData) {
      const words = resultData.split(" ");
      setDisplayText(""); // Clear previous display text before typing new response
      for (let i = 0; i < words.length; i++) {
        delayPara(i, words[i] + " ");
      }
    }
  }, [resultData]);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!onSent ? ( // Show greet and cards only if no prompt has been submitted yet
          <>
            <div className="greet">
              <p>
                <span>Hello, Hi...</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p> {/* Display the stored previous prompt */}
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: displayText }}></p> // Use dangerouslySetInnerHTML for formatted response
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={handleSubmit} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
