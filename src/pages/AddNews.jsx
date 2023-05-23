import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";

import NewsService from "../service/news";

export function AddNewsPage() {
  const [newsList, setNewsList] = useState([]);

  const [header, setHeader] = useState("");
  const [newsId, setNewsId] = useState(0);
  const [page, setPage] = useState(0);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalName, setModal] = useState("");
  const [show, setShow] = useState(false);

  const [imgUrl, setImgUrl] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    getNewsFromServer(0);
  }, []);

  const getNewsFromServer = (currentPage) => {
    setLoading(true);
    NewsService.list(currentPage)
      .then((res) => {
        console.log(res);
        if (res.error) {
          setMessage(res.error);
          return;
        }
        setNewsList(res.data);
      })
      .catch((error) => {
        console.log(error);
        setNewsList();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const createNewsFromServer = () => {
    setLoading(true);
    NewsService.save(header, text, img)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getNewsFromServer(page);
        setLoading(false);
      });
  };
  const deleteNewsFromServer = () => {
    setLoading(true);
    NewsService.remove(newsId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getNewsFromServer(page);
        setLoading(false);
      });
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id, action) => {
    setShow(true);
    setModal(action);
    if (action === "create") {
      //create
      setText("");
      setHeader("");
      setNewsId(0);
    }
    if (action === "update") {
      //update
      const thisNews = newsList?.content?.filter((p) => p.id === id)[0];
      setText(thisNews.text);
      setHeader(thisNews.header);
      setNewsId(thisNews.id);
    }
    if (action === "delete") {
      //delete
      const thisNews = newsList?.content?.filter((p) => p.id === id)[0];
      setText(thisNews.text);
      setHeader(thisNews.header);
      setNewsId(thisNews.id);
    }
  };

  function handleSave(event) {
    event.preventDefault();
    setShow(false);
    if (modalName === "create") {
      createNewsFromServer();
    }
    // if (modalName === "update") {
    //   updatePositionFromServer();
    // }
    if (modalName === "delete") {
      deleteNewsFromServer();
    }
  }
  const handlePage = (pageNumber) => {
    getNewsFromServer(pageNumber);
    setPage(pageNumber);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>News page</h2>
      {message}
      {newsList?.content ? (
        <>
          <Button variant="primary" onClick={() => handleShow(0, "create")}>
            Create new +
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Header</th>
                <th>Text</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsList?.content?.map((news, index) => (
                <tr key={news.id}>
                  <td>{index + 1}</td>
                  <td>{news.header}</td>
                  <td>{news.text}</td>
                  <td>
                    {news.photoUrl ? (
                      <img
                        src={news.photoUrl}
                        alt="Avatar"
                        className="avatar"
                      />
                    ) : (
                      <img
                        src={"https://www.w3schools.com/w3images/avatar2.png"}
                        alt="AvatarDefault"
                        className="avatar"
                      />
                    )}
                  </td>
                  <td>
                    <div className="d-flex flex-row justify-content-start gap-3">
                      {/* <Button
                        onClick={() => handleShow(news.id, "update")}
                        variant="secondary"
                      >
                        Edit
                      </Button> */}

                      <Button
                        onClick={() => handleShow(news.id, "delete")}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}

      {newsList?.totalPages ? (
        <Pagination style={{ justifyContent: "center" }}>
          {Array.from(Array(newsList.totalPages).keys()).map((_, number) => (
            <Pagination.Item
              key={number}
              active={number === page}
              onClick={() => handlePage(number)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      ) : null}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Postion {modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalName === "delete" ? (
            <p>Are you sure? {header}</p>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="formBasicHeader">
                <Form.Label>Header</Form.Label>
                <Form.Control
                  type="text"
                  name="header"
                  value={header}
                  onChange={(e) => {
                    setHeader(e.target.value);
                  }}
                  placeholder="Enter Header"
                />
                <Form.Text className="text-muted">Enter your Header.</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  type="text"
                  name="text"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  placeholder="Enter Text"
                />
                <Form.Text className="text-muted">Enter your Text</Form.Text>
              </Form.Group>
              <div className="d-flex justify-content-center">
                {imgUrl ? (
                  <img
                    src={img ? URL.createObjectURL(img) : imgUrl}
                    alt="Avatar"
                    className="avatar"
                    style={{ width: "100px", height: "100px" }}
                  />
                ) : (
                  <img
                    src={
                      img
                        ? URL.createObjectURL(img)
                        : "https://www.w3schools.com/w3images/avatar2.png"
                    }
                    alt="AvatarDefault"
                    className="avatar"
                  />
                )}
              </div>
              <Form.Group className="mb-3" controlId="formBasicPhoto">
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  // value={photo}
                  onChange={(e) => {
                    setImg(e.target.files[0]);
                  }}
                  placeholder="Choose Photo"
                />
                <Form.Text className="text-muted">Choose Photo</Form.Text>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {modalName === "delete" ? "Delete" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
