import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import closeButton from '../../assets/icons/close-24px.svg';
import '../MessageModal/messageModal.scss';
import fire from '../../config/fire';


function MessageModal({closeModal, name}) {

    let {id} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");


    useEffect(() => {
        fire.firestore().doc(`chefs/${id}`)
          .collection("messages")
          .orderBy("createdAt")
          .limit(50)
          .onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setMessages(data);
          });
      }, []);
      
      const handleOnChange = (event) => {
        setNewMessage(event.target.value);
      };
      const handleOnSubmit = (event) => {
        event.preventDefault();
        if (fire.firestore()) {
          fire.firestore().doc(`chefs/${id}`).collection("messages").add({
            content: newMessage,
            createdAt: fire.firestore.FieldValue.serverTimestamp()
          });
        }
        setNewMessage("");
      };

    return (
        <div className="message-modal">
        <div className="message-modal__top">
            <h4 className="message-modal__header">Your Chat With Chef {name}</h4>
        </div>
            <img onClick={closeModal} className="message-modal__closeButton" src={closeButton} alt=""/>
            <div className="message-modal__chat">
            <div>
            {messages.map((message) => (
              <div key={message.id}>
                {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleOnSubmit} className="message-modal__form">
            <input type="text" value={newMessage} onChange={handleOnChange} placeholder="" />
            <button type="submit" disabled={!newMessage}>Send</button>
          </form>
            </div>
        </div>
    );


};

export default MessageModal
