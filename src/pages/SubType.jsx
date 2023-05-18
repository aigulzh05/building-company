import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";

import SubTypeService from "../service/subType";
import GlobalTypeService from "../service/globalType";

export function SubTypePage() {
  const [subTypes, setSubTypes] = useState([]);
  const [subTypeId, setSubTypeId] = useState(0);
  const [globalTypes, setGlobalTypes] = useState([]);
  const [globalTypeId, setGlobalTypeId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalName, setModal] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getSubTypesFromServer();
    getGlobalTypesFromServer();
  }, []);

  const getSubTypesFromServer = () => {
    setLoading(true);
    SubTypeService.list()
      .then((res) => {
        console.log(res);
        if (res.error) {
          setMessage(res.error);
          return;
        }
        setSubTypes(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
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
  const updateSubTypeFromServer = () => {
    setLoading(true);
    SubTypeService.update(subTypeId, name, globalTypeId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getSubTypesFromServer();
        setLoading(false);
      });
  };
  const createSubTypeFromServer = () => {
    setLoading(true);

    SubTypeService.save(name, globalTypeId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getSubTypesFromServer();
        setLoading(false);
      });
  };
  const deleteSubTypeFromServer = () => {
    setLoading(true);
    SubTypeService.remove(subTypeId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getSubTypesFromServer();
        setLoading(false);
      });
  };
  const handleClose = () => {
    setShow(false);
    // setSubTypeId(0);
    // setName('');
    // setSalary(0);
  };
  const handleShow = (id, action) => {
    setShow(true);
    setModal(action);
    if (action === "create") {
      //create
      setSubTypeId(0);
      setName("");
    }
    if (action === "update") {
      //update
      const thisGT = subTypes?.content?.filter((p) => p.id === id)[0];
      setSubTypeId(thisGT.id);
      setName(thisGT.name);
      // setGlobalTypeId(thisGT.globaltype);  ???????????///
    }
    if (action === "delete") {
      //delete
      const thisGT = subTypes?.content?.filter((p) => p.id === id)[0];
      setSubTypeId(thisGT.id);
      setName(thisGT.name);
    }
  };

  function handleSave(event) {
    event.preventDefault();
    setShow(false);
    if (modalName === "create") {
      createSubTypeFromServer();
    }
    if (modalName === "update") {
      updateSubTypeFromServer();
    }
    if (modalName === "delete") {
      deleteSubTypeFromServer();
    }
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Sub Type page</h2>
      {message}
      {subTypes?.content ? (
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
              {subTypes?.content?.map((pos, index) => (
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
          <Modal.Title>Sub type {modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalName === "delete" ? (
            <p>Are you sure? {name}</p>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="formBasicGlobalType">
                <Form.Label>GlobalType</Form.Label>
                <Form.Select
                  aria-label="position select"
                  selected={globalTypeId}
                  onChange={(e) => setGlobalTypeId(e.target.value)}
                >
                  <option value={0} key={0}>
                    Choose global type
                  </option>
                  {globalTypes?.content?.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted">Choose GlobalType</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>SubType name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter sub type"
                />
                <Form.Text className="text-muted">
                  Enter sub type name.
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
