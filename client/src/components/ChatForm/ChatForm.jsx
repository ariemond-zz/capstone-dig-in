import React from 'react';
import fire from '../../config/fire';
// import {db} from '../../config/fire';

export class ChatForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          user: fire.auth().currentUser,
          chats: [],
          content: '',
          readError: null,
          writeError: null
        };
      }
      
      async componentDidMount() {
        this.setState({ readError: null });
        try {
          fire.db.ref("chats").on("value", snapshot => {
            let chats = [];
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
            this.setState({ chats });
          });
        } catch (error) {
          this.setState({ readError: error.message });
        }
      }

      handleChange(event) {
        this.setState({
          content: event.target.value
        });
      }

      async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
          await fire.db.ref("chats").push({
            content: this.state.content,
            timestamp: Date.now(),
            uid: this.state.user.uid
          });
          this.setState({ content: '' });
        } catch (error) {
          this.setState({ writeError: error.message });
        }
      }

      render() {
        return (
            <div>
              <div className="chats">
                {this.state.chats.map(chat => {
                  return <p key={chat.timestamp}>{chat.content}</p>
                })}
              </div>
              <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.content}></input>
                {this.state.error ? <p>{this.state.writeError}</p> : null}
                <button type="submit">Send</button>
              </form>
              <div>
                Login in as: <strong>{this.state.user.email}</strong>
              </div>
            </div>
          );
        }
    }






export default ChatForm
