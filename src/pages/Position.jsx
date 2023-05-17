import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";

import PositionService from "../service/position";

const FakePostions = [
  {
    id: 1,
    name: "admin Fake",
    salary: 1500.0,
  },
  {
    id: 2,
    name: "manager",
    salary: 1000.0,
  },
];
export function PositionPage() {
  const [positions, setPositions] = useState([]);
  const [positionId, setPositionId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalName, setModal] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getPositionsFromServer();
  }, []);

  const getPositionsFromServer = () => {
    setLoading(true);
    PositionService.list()
      .then((res) => {
        console.log(res);
        setPositions(res.data);
      })
      .catch((error) => {
        console.log(error);
        setPositions(FakePostions);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const updatePositionFromServer = () => {
    setLoading(true);
    PositionService.update(positionId, name, salary)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getPositionsFromServer();
        setLoading(false);
      });
  };
  const createPositionFromServer = () => {
    setLoading(true);
    
    PositionService.save(name, salary)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getPositionsFromServer();
        setLoading(false);
      });
  };
  const deletePositionFromServer = () => {
    setLoading(true);
    PositionService.remove(positionId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getPositionsFromServer();
        setLoading(false);
      });
  };
  const handleClose = () => {
    setShow(false);
    // setPositionId(0);
    // setName('');
    // setSalary(0);
  };
  const handleShow = (id, action) => {
    setShow(true);
    setModal(action);
    if (action === "create") {
      //create
      setPositionId(0);
      setName("");
      setSalary(0);
    }
    if (action === "update") {
      //update
      const thisPos = positions.filter((p) => p.id === id)[0];
      setPositionId(thisPos.id);
      setName(thisPos.name);
      setSalary(thisPos.salary);
    }
    if (action === "delete") {
      //delete
      const thisPos = positions.filter((p) => p.id === id)[0];
      setPositionId(thisPos.id);
      setName(thisPos.name);
      setSalary(thisPos.salary);
    }
  };

  function handleSave(event) {
    event.preventDefault();
    setShow(false);
    if (modalName === "create") {
      createPositionFromServer();
    }
    if (modalName === "update") {
      updatePositionFromServer();
    }
    if (modalName === "delete") {
      deletePositionFromServer();
    }
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>position page</h2>
      <Row>
        <Button variant="primary" onClick={() => handleShow(0, "create")}>
          Create new +
        </Button>
      </Row>
      {positions.map((pos) => (
        <div key={pos.id}>
          <Row>
            <Col>
              {pos.name} - ${pos.salary}
            </Col>
            <Col>
              <Button
                onClick={() => handleShow(pos.id, "update")}
                variant="secondary"
              >
                Edit
              </Button>

              <Button
                onClick={() => handleShow(pos.id, "delete")}
                variant="danger"
              >
                Delete
              </Button>
            </Col>
          </Row>
        </div>
      ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Postion {modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalName === "delete" ? (
            <p>
              Are you sure? {name} - ${salary}
            </p>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Position name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter position"
                />
                <Form.Text className="text-muted">
                  Enter your position name.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicSalary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="number"
                  name="salary"
                  value={salary}
                  onChange={(e) => {
                    setSalary(parseInt(e.target.value));
                  }}
                  placeholder="Enter salary"
                />
                <Form.Text className="text-muted">Enter your salary</Form.Text>
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
