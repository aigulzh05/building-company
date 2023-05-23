import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PurcaseRequestService from "../service/purcaseRequest";

export function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [text, setText] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    sendToserver();
  };
  const sendToserver = () => {
    PurcaseRequestService.save(name, phoneNumber, text)
      .then((res) => {
        if (res.error) {
          return;
        }
        setMessage("Ваша заявка успешно отпавлено!");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Черный фон с прозрачностью 0.8
      }}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url("https://s0.rbk.ru/v6_top_pics/media/img/0/44/756603044119440.jpg")`,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          opacity: 0.2, // Прозрачность фото (от 0 до 1)
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div style={{ padding: "20px", zIndex: 2, position: "relative" }}>
        <h3 style={{ textAlign: "center", paddingTop: "20px", color: "white" }}>
          Frequently asked questions
        </h3>

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Where can we buy a house?</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What cities can you buy?</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <h3 style={{ textAlign: "center", paddingTop: "20px", color: "white" }}>
          Submit your application
        </h3>

        <Form style={{ paddingBlock: "20px" }} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter username"
                />
                <Form.Text className="text-muted">Enter your name.</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone"
                />
                <Form.Text className="text-muted">
                  Enter your phone number for contact
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              name="message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter message text"
            />
            <Form.Text className="text-muted" style={{ color: "white" }}>
              Enter your message
            </Form.Text>
          </Form.Group>

          <Button variant="dark" type="submit">
            Send
          </Button>
        </Form>

        <h3 style={{ textAlign: "center", paddingTop: "20px", color: "white" }}>
          Contact
        </h3>

        <Row style={{ backgroundColor: "white" }}>
          <Col>
            <Stack>
              <p>O!: +996 555 123 123</p>
              <p>Beeline: +996 555 123 123</p>
              <p>Mega: +996 555 123 123</p>
            </Stack>
          </Col>
          <Col>
            <Stack>
              <p>Email: contact.me@building.com</p>
              <p>Email: contact.me@building.com</p>
              <p>Email: contact.me@building.com</p>
            </Stack>
          </Col>
        </Row>
      </div>
    </div>
  );
}
