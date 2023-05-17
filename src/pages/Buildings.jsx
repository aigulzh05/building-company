import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import Form from "react-bootstrap/Form";

const cards = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Empire_State_Building_86th_floor.jpg/273px-Empire_State_Building_86th_floor.jpg",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Empire_State_Building_86th_floor.jpg/273px-Empire_State_Building_86th_floor.jpg",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Empire_State_Building_86th_floor.jpg/273px-Empire_State_Building_86th_floor.jpg",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Empire_State_Building_86th_floor.jpg/273px-Empire_State_Building_86th_floor.jpg",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Empire_State_Building_86th_floor.jpg/273px-Empire_State_Building_86th_floor.jpg",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Empire_State_Building_86th_floor.jpg/273px-Empire_State_Building_86th_floor.jpg",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
];
export function BuildingsPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // let formData = new FormData(event.currentTarget);
    // let username = formData.get("username").trim();
    // let password = formData.get("password").trim();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Buildings page</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: 30,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingBlock: "20px",
        }}
      >
        {cards.map((card, index) => (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={card.image} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
              <a href={card.actionUrl} target={"_blank"}>
                <Button variant={index == 0 ? "primary" : "secondary"}>
                  {card.actionText}
                </Button>
              </a>
            </Card.Body>
          </Card>
        ))}
      </div>
     
     
  
    </div>
  );
}
