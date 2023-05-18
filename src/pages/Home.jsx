import { useState } from "react";
 
import Carousel from 'react-bootstrap/Carousel'


  
export function HomePage() {
  const [loading, setLoading] = useState(false);

  

  return (
    <div>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://f.partnerkin.com/uploads/storage/files/file_1622032085.gif"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
    
    </Carousel>
    </div>
    
    // <div style={{ padding: "20px" }}>
    //   <h2 style={{ textAlign: "center" }}>Home page</h2>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-around",
    //       gap: 30,
    //       flexDirection: "row",
    //       flexWrap: "wrap",
    //       paddingBlock: "20px",
    //     }}
    //   >
    //     {cards.map((card, index) => (
    //       <Card style={{ width: "18rem" }}>
    //         <Card.Img variant="top" src={card.image} />
    //         <Card.Body>
    //           <Card.Title>{card.title}</Card.Title>
    //           <Card.Text>{card.text}</Card.Text>
    //           <a href={card.actionUrl} target={"_blank"}>
    //             <Button variant={index == 0 ? "primary" : "secondary"}>
    //               {card.actionText}
    //             </Button>
    //           </a>
    //         </Card.Body>
    //       </Card>
    //     ))}
    //   </div>
      // <h3 style={{ textAlign: "center", paddingTop: "20px" }}>Вопросы</h3>

      // <Accordion defaultActiveKey="0">
      //   <Accordion.Item eventKey="0">
      //     <Accordion.Header>Accordion Item #1</Accordion.Header>
      //     <Accordion.Body>
      //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      //       ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      //       aliquip ex ea commodo consequat. Duis aute irure dolor in
      //       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      //       pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      //       culpa qui officia deserunt mollit anim id est laborum.
      //     </Accordion.Body>
      //   </Accordion.Item>
      //   <Accordion.Item eventKey="1">
      //     <Accordion.Header>Accordion Item #2</Accordion.Header>
      //     <Accordion.Body>
      //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      //       ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      //       aliquip ex ea commodo consequat. Duis aute irure dolor in
      //       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      //       pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      //       culpa qui officia deserunt mollit anim id est laborum.
      //     </Accordion.Body>
      //   </Accordion.Item>
      // </Accordion>

    //   <h3 style={{ textAlign: "center", paddingTop: "20px" }}>Контакты</h3>

    //   <Form style={{ paddingBlock: "20px" }} onSubmit={handleSubmit}>
    //     <Row>
    //       <Col>
    //         <Form.Group className="mb-3" controlId="formBasicEmail">
    //           <Form.Label>Name</Form.Label>
    //           <Form.Control
    //             type="text"
    //             name="name"
    //             placeholder="Enter username"
    //           />
    //           <Form.Text className="text-muted">Enter your name.</Form.Text>
    //         </Form.Group>
    //       </Col>
    //       <Col>
    //         <Form.Group className="mb-3" controlId="formBasicEmail">
    //           <Form.Label>Phone</Form.Label>
    //           <Form.Control
    //             type="text"
    //             name="phone"
    //             placeholder="Enter phone"
    //           />
    //           <Form.Text className="text-muted">
    //             Enter your phone number for contact
    //           </Form.Text>
    //         </Form.Group>
    //       </Col>
    //     </Row>
    //     <Form.Group className="mb-3" controlId="formBasicEmail">
    //       <Form.Label>Message</Form.Label>
    //       <Form.Control
    //         type="text"
    //         name="message"
    //         placeholder="Enter message text"
    //       />
    //       <Form.Text className="text-muted">Enter your message</Form.Text>
    //     </Form.Group>

    //     <Button variant="primary" disabled={loading} type="submit">
    //       Send
    //     </Button>
    //   </Form>

    //   <Row>
    //     <Col>
    //       <Stack>
    //         <p>O!: +996 555 123 123</p>
    //         <p>Beeline: +996 555 123 123</p>
    //         <p>Mega: +996 555 123 123</p>
    //       </Stack>
    //     </Col>
    //     <Col>
    //       <Stack>
    //         <p> Email: contact.me@building.com</p>
    //         <p> Email: contact.me@building.com</p>
    //         <p> Email: contact.me@building.com</p>
    //       </Stack>
    //     </Col>
    //   </Row>
    // </div>
  );
}
