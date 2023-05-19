import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import Form from "react-bootstrap/Form";
import { motion } from 'framer-motion';

const cards = [
  {
    image:
      "https://www.alfaplan.ru/upload/information_system_33/1/5/3/item_1534/information_items_property_182181.webp",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
  {
    image:
      "https://img06.rl0.ru/afisha/e780x-i/daily.afisha.ru/uploads/images/b/85/b85b08e265dc278012342aa73358873d.jpg",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
  {
    image:
      "https://moscowseasons.com/uploads/2019/05/29/5cee47a50e8e6.jpeg",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
  {
    image:
      "https://www.alfaplan.ru/upload/information_system_33/1/8/4/item_1846/information_items_property_254476.webp",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
  {
    image:
      "https://vash-vybor.info/wp-content/uploads/2017/02/dom-v-stile-haj-tek-13-820x592.jpg",
    title: "Card Title",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    actionUrl: "#",
    actionText: "Go somewhere",
  },
  {
    image:
      "https://news.store.rambler.ru/img/2a36c9870d2741f9a5ad9db4951a42b6?img-1-resize=width%3A1280%2Cheight%3A720%2Cfit%3Acover&img-format=auto",
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
      <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -100 }}
    transition={{ duration: 0.5 }}
    className="container py-5"
  >
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
      </motion.div>
     
     
  
    </div>
  );
}
