import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import '../MessageForm/messageForm.scss';

function MessageForm() {
  const initialInputState = { name: "", message: "" };
  const [newMessage, setNewMessage] = useState(initialInputState);

  const { name, message } = newMessage;

  const handleInputChange = e => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const sendMessage = e => {
    Axios({
      method: "POST",
      url: "http://localhost:8080/send",
      data: { name, message },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.data.msg === "suc") {
        console.log("Email has been sent");
        setNewMessage(initialInputState);
      } else {
        console.log("FAILURE");
      }
    });
  };

  return (
    <div className="message">
      <Row className="mt-4">
        <Col sm="10" md={{ size: 6, offset: 3 }}>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                name="name"
                onChange={handleInputChange}
                value={name}
                style={{width: 250}}
                placeholder="Enter your name here"
                className="message__input"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                type="textarea"
                value={message}
                onChange={handleInputChange}
                style={{ height: 150 , width: 250}}
                name="message"
                placeholder="Enter your message here"
                className="message__input"
              ></Input>
            </FormGroup>
            <Button onClick={sendMessage} className="message__button">SUBMIT</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default MessageForm