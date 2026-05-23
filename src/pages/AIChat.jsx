import { useState } from "react";
import axios from "../config/axios";
import "./AIChat.css";

function AIChatWidget() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async() => {

        if(!message) return;

        const userMessage = {
            sender: "user",
            text: message
        };

        setMessages((prev) => [...prev, userMessage]);

        try {

            navigator.geolocation.getCurrentPosition(
                async(position) => {

                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    const res = await axios.post(
                        "/api/ai/chat",
                        {
                            message,
                            latitude,
                            longitude
                        },
                        {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        }
                    );

                    const aiMessage = {
                        sender: "ai",
                        text: res.data.reply
                    };

                    setMessages((prev) => [...prev, aiMessage]);

                    setMessage("");
                }
            );

        } catch(err) {
            console.log(err);
        }
    };

    return (
        <>
            <button
                className="chat-toggle"
                onClick={() => setOpen(!open)}
            >
                🤖
            </button>

            {
                open && (
                    <div className="chat-popup">

                        <div className="chat-header">
                            Ask Gemini ✨
                        </div>

                        <div className="chat-body">

                            {
                                messages.length === 0 && (
                                    <div className="welcome-text">
                                        Hello 👋 <br />
                                        Ask me about trips, vehicles & tourist places
                                    </div>
                                )
                            }

                            {
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={
                                            msg.sender === "user"
                                            ? "user-msg"
                                            : "ai-msg"
                                        }
                                    >
                                        {msg.text}
                                    </div>
                                ))
                            }

                        </div>

                        <div className="chat-footer">

                            <input
                                type="text"
                                placeholder="Ask anything..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <button onClick={sendMessage}>
                                ➤
                            </button>

                        </div>

                    </div>
                )
            }
        </>
    );
}

export default AIChatWidget;