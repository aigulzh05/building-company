import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";

import GlobalTypeService from "../service/globalType";

export function GlobalTypePage() {
  const [globalTypes, setGlobalTypes] = useState([]);
  const [globalTypeId, setGlobalTypeId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalName, setModal] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getGlobalTypesFromServer();
  }, []);

  const getGlobalTypesFromServer = () => {
    setLoading(true);
    GlobalTypeService.list()
      .then((res) => {
        console.log(res);
        if (res.error) {
          setMessage(res.error);
          return;
        }
        setGlobalTypes(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const updateGlobalTypeFromServer = () => {
    setLoading(true);
    GlobalTypeService.update(globalTypeId, name)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getGlobalTypesFromServer();
        setLoading(false);
      });
  };
  const createGlobalTypeFromServer = () => {
    setLoading(true);

    GlobalTypeService.save(name)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getGlobalTypesFromServer();
        setLoading(false);
      });
  };
  const deleteGlobalTypeFromServer = () => {
    setLoading(true);
    GlobalTypeService.remove(globalTypeId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getGlobalTypesFromServer();
        setLoading(false);
      });
  };
  const handleClose = () => {
    setShow(false);
    // setGlobalTypeId(0);
    // setName('');
    // setSalary(0);
  };
  const handleShow = (id, action) => {
    setShow(true);
    setModal(action);
    if (action === "create") {
      //create
      setGlobalTypeId(0);
      setName("");
    }
    if (action === "update") {
      //update
      const thisGT = globalTypes?.content?.filter((p) => p.id === id)[0];
      setGlobalTypeId(thisGT.id);
      setName(thisGT.name);
    }
    if (action === "delete") {
      //delete
      const thisGT = globalTypes?.content?.filter((p) => p.id === id)[0];
      setGlobalTypeId(thisGT.id);
      setName(thisGT.name);
    }
  };

  function handleSave(event) {
    event.preventDefault();
    setShow(false);
    if (modalName === "create") {
      createGlobalTypeFromServer();
    }
    if (modalName === "update") {
      updateGlobalTypeFromServer();
    }
    if (modalName === "delete") {
      deleteGlobalTypeFromServer();
    }
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Gloabl Type page</h2>
      {message}
      {globalTypes?.content ? (
        <>
          <Button variant="primary" onClick={() => handleShow(0, "create")}>
            Create new +
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {globalTypes?.content?.map((pos, index) => (
                <tr key={pos.id}>
                  <td>{index + 1}</td>
                  <td>{pos.name}</td>
                  <td>
                    <div className="d-flex flex-row justify-content-start gap-3">
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Global type {modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalName === "delete" ? (
            <p>Are you sure? {name}</p>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>GlobalType name</Form.Label>
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
                  Enter global type name.
                </Form.Text>
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
