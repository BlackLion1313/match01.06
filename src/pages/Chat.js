import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "react-avatar";
import md5 from "md5";
import "./Chat.css";

function Chat() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [editedMessage, setEditedMessage] = useState(null);
  const [editedText, setEditedText] = useState("");

  const getMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "chat"));
    const messagesArray = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const message = {
        id: doc.id,
        text: data.text,
        author: data.author,
        date: data.date,
      };
      messagesArray.push(message);
    });
    messagesArray.sort((a, b) => b.date.seconds - a.date.seconds);
    setMessages(messagesArray);
  };

  const getMessagesRealTime = () => {
    const unsubscribe = onSnapshot(collection(db, "chat"), (querySnapshot) => {
      const messagesArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const message = {
          id: doc.id,
          text: data.text,
          author: data.author,
          date: data.date,
        };
        messagesArray.push(message);
      });
      messagesArray.sort((a, b) => b.date.seconds - a.date.seconds);
      setMessages(messagesArray);
    });
  };

  const transformDate = (seconds) => {
    const date = new Date(seconds * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en", options);
  };

  const handleInputChange = (e) => {
    setTextMessage(e.target.value);
  };

  const handleMessageSubmit = async () => {
    const messageObject = {
      text: textMessage,
      author: user.email,
      date: new Date(),
    };
    await addDoc(collection(db, "chat"), messageObject);
    setTextMessage("");
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, "chat", messageId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEditInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSaveEdit = async (message) => {
    const updatedMessage = { ...message, text: editedText };
    try {
      await updateDoc(doc(db, "chat", message.id), updatedMessage);
      setEditedMessage(null);
      setEditedText("");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleCancelEdit = () => {
    setEditedMessage(null);
    setEditedText("");
  };

  const handleContextMenu = (event, message) => {
    event.preventDefault();
    setEditedMessage(message);
    setEditedText(message.text);
  };

  useEffect(() => {
    getMessagesRealTime();
  }, []);

  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    const random = Math.floor(Math.random() * 1000);
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&r=g&s=40&${random}`;
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="chat-container">
        <div className="navigation-links">
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/users">Our Developers</Link>
        </div>
        <div className="user-info">
          {user && (
            <div className="user-details">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User Avatar" className="user-avatar" />
              ) : (
                <Avatar
                  name={user.displayName || user.email}
                  size="40"
                  round
                  src={`https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?d=identicon&r=g&s=40`}
                  className="user-avatar"
                />
              )}
              <span className="user-name">
                <strong style={{ color: "green" }}>Online</strong> {user.displayName || user.email}
              </span>
            </div>
          )}
        </div>
        <div className="messages">
          {messages &&
            messages.map((msg) => {
              const isUserMessage = msg.author === user.email;
              const messageClass = isUserMessage ? "message user" : "message";
              const gravatarUrl = `https://www.gravatar.com/avatar/${md5(msg.author.trim().toLowerCase())}?d=identicon&r=g&s=40`;

              return (
                <div
                  className={`message-container ${messageClass}`}
                  key={msg.id}
                  onContextMenu={(e) => handleContextMenu(e, msg)}
                >
                  <div className="avatar">
                    <Avatar
                      name={msg.author}
                      size="40"
                      round={isUserMessage}
                      src={gravatarUrl}
                      className="avatar-icon"
                    />
                  </div>
                  <div className="message-content">
                    {editedMessage && editedMessage.id === msg.id ? (
                      <div className="edit-message">
                        <input
                          type="text"
                          value={editedText}
                          onChange={handleEditInputChange}
                        />
                        <button onClick={() => handleSaveEdit(editedMessage)}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <>
                        <p className="message-text">{msg.text}</p>
                        <p className="message-info">
                          {msg.author} • {transformDate(msg.date.seconds)}
                        </p>
                        {isUserMessage && (
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteMessage(msg.id)}
                          >
                            &#10005;
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="input-container">
          <Form.Control
            type="text"
            value={textMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="mb-2"
          />
          <Button variant="primary" onClick={handleMessageSubmit} className="mb-2">
            Send
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Chat;
