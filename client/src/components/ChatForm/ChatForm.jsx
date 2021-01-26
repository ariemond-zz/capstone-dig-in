import React, {useRef, useState} from 'react';
import fire from '../../config/fire';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatForm() {
  const dummy = useRef();
  const messagesRef = fire.firestore().collection('chats');
  const query = messagesRef.orderBy('timestamp').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = fire.auth.currentUser;

    await messagesRef.add({
      content: formValue,
      timestamp: fire.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section>
      <main>

        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>

      </main>

      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

        <button type="submit" disabled={!formValue}>🕊️</button>

      </form>
    </section>
  )
}


function ChatMessage(props) {
  const { content, uid, photoURL } = props.message;

  const messageClass = uid === fire.auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{content}</p>
    </div>
  )
}


export default ChatForm
