import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
];
export function HomePage() {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Home page</h2>
      <div
        style={{
          display: "flex",
          gap: 30,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingBlock: "20px",
        }}
      >
        {cards.map((card) => (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={card.image} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
              <a href={card.actionUrl} target={"_blank"}>
                <Button variant="primary">{card.actionText}</Button>
              </a>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
