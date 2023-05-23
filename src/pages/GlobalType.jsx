import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";

import GlobalTypeService from "../service/globalType";
import SubTypeService from "../service/subType";
import { Col, Row } from "react-bootstrap";

export function GlobalTypePage() {
  const [globalTypes, setGlobalTypes] = useState(null);
  const [currentGlobalType, setCurrentGlobalType] = useState(null);
  const [currentSubType, setCurrentSubType] = useState(null);
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
  const addSubTypeFromServer = () => {
    setLoading(true);

    SubTypeService.save(name, globalTypeId)
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
  const updateSubTypeFromServer = () => {
    setLoading(true);
    SubTypeService.update(currentSubType.id, name, globalTypeId)
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
  const handleShow = (id, action, subid = 0) => {
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
      setCurrentGlobalType(thisGT);
    }
    if (action === "addsubtype") {
      //addsubtype
      const thisGT = globalTypes?.content?.filter((p) => p.id === id)[0];
      setGlobalTypeId(thisGT.id);
      setName("");
      setCurrentGlobalType(thisGT);
    }
    if (action === "updatesubtype") {
      //updatesubtype
      const thisGT = globalTypes?.content?.filter((p) => p.id === id)[0];
      const thisST = thisGT?.subTypeList?.filter((p) => p.id === subid)[0];

      setGlobalTypeId(thisGT.id);
      setName(thisST.name);
      setCurrentGlobalType(thisGT);
      setCurrentSubType(thisST);
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
    if (modalName === "addsubtype") {
      addSubTypeFromServer();
    }
    if (modalName === "updatesubtype") {
      updateSubTypeFromServer();
    }
    if (modalName === "delete") {
      deleteGlobalTypeFromServer();
    }
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Global Type page</h2>
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
                <th>subtype</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {globalTypes?.content?.map((pos, index) => (
                <tr key={pos.id}>
                  <td>{index + 1}</td>
                  <td>{pos.name}</td>
                  <td>
                    <Row>
                      {pos?.subTypeList?.map((sub) => (
                        <Col>
                          <Button
                            onClick={() =>
                              handleShow(pos.id, "updatesubtype", sub.id)
                            }
                            variant="secondary"
                            key={sub.id}
                          >
                            {sub.name}
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  </td>
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

                      <Button
                        onClick={() => handleShow(pos.id, "addsubtype")}
                        variant="secondary"
                      >
                        Add subtype
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}

      {modalName === "delete" ? (
        <DeleteModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          name={name}
        />
      ) : null}
      {modalName === "create" ? (
        <CreateModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          name={name}
          setName={setName}
        />
      ) : null}
      {modalName === "update" ? (
        <UpdateModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          name={name}
          setName={setName}
          currentGlobalType={currentGlobalType}
        />
      ) : null}
      {modalName === "addsubtype" ? (
        <AddSubTypeModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          name={name}
          setName={setName}
          currentGlobalType={currentGlobalType}
        />
      ) : null}
      {modalName === "updatesubtype" ? (
        <UpdateSubTypeModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          name={name}
          setName={setName}
          currentGlobalType={currentGlobalType}
          currentSubType={currentSubType}
        />
      ) : null}
    </div>
  );
}

const DeleteModal = ({ show, handleClose, handleSave, name }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete global type</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Are you sure? {name}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        "Delete"
      </Button>
    </Modal.Footer>
  </Modal>
);

const CreateModal = ({ show, handleClose, handleSave, name, setName }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add global type</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>GlobalType name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter name"
        />
        <Form.Text className="text-muted">Enter global type name.</Form.Text>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        "Save"
      </Button>
    </Modal.Footer>
  </Modal>
);
const UpdateModal = ({
  show,
  handleClose,
  handleSave,
  name,
  setName,
  currentGlobalType,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Update global type</Modal.Title>
    </Modal.Header>
    <Modal.Body>
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
        <Form.Text className="text-muted">Enter global type name.</Form.Text>
      </Form.Group>
      <ol>
        {currentGlobalType?.subTypeList?.map((sub) => (
          <li key={sub.id}>{sub.name}</li>
        ))}
      </ol>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Update
      </Button>
    </Modal.Footer>
  </Modal>
);

const AddSubTypeModal = ({
  show,
  handleClose,
  handleSave,
  name,
  setName,
  currentGlobalType,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>
        Add sub type for global type {currentGlobalType.name}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Subtype name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Subtype name"
        />
        <Form.Text className="text-muted">Enter SubType name.</Form.Text>
      </Form.Group>
      <ul>
        {currentGlobalType?.subTypeList?.map((sub) => (
          <li key={sub.id}>{sub.name}</li>
        ))}
      </ul>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Add sub type
      </Button>
    </Modal.Footer>
  </Modal>
);

const UpdateSubTypeModal = ({
  show,
  handleClose,
  handleSave,
  name,
  setName,
  currentGlobalType,
  currentSubType,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>
        update sub type for global type {currentGlobalType.name}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Subtype name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Subtype name"
        />
        <Form.Text className="text-muted">Enter SubType name.</Form.Text>
      </Form.Group>
      <ul>
        {currentGlobalType?.subTypeList?.map((sub) => (
          <li key={sub.id}>{sub.name}</li>
        ))}
      </ul>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Update sub type
      </Button>
    </Modal.Footer>
  </Modal>
);
