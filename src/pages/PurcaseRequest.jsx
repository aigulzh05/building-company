import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";

import PurcaseRequestService from "../service/purcaseRequest";

export function PurcaseRequestPage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [purcaseId, setPurchaseId] = useState(0);
  const [purcaseRequests, setPurchaseRwquests] = useState("");
  const [modalName, setModal] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getPurcaseRequestsFromServer();
  }, []);

  const getPurcaseRequestsFromServer = () => {
    setLoading(true);
    PurcaseRequestService.list()
      .then((res) => {
        console.log(res);
        if (res.error) {
          setMessage(res.error);
          return;
        }
        setPurchaseRwquests(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deletePurcaseRequestsFromServer = () => {
    setLoading(true);
    PurcaseRequestService.remove(purcaseId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getPurcaseRequestsFromServer();
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
    if (action === "delete") {
      //delete
      const thisPurcase = purcaseRequests?.content?.filter(
        (p) => p.id === id
      )[0];
      setPurchaseId(thisPurcase.id);
      setName(thisPurcase.name);
      setPhoneNumber(thisPurcase.phoneNumber);
      setText(thisPurcase.text);
    }
  };

  function handleSave(event) {
    event.preventDefault();
    setShow(false);
    if (modalName === "delete") {
      deletePurcaseRequestsFromServer();
    }
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>PURCHASE</h2>
      {message}
      {purcaseRequests?.content ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Massage</th>
              </tr>
            </thead>
            <tbody>
              {purcaseRequests?.content?.map((purcaseRequest, index) => (
                <tr key={purcaseRequest.id}>
                  <td>{index + 1}</td>
                  <td>{purcaseRequest.customerName}</td>
                  <td>{purcaseRequest.phoneNumber}</td>
                  <td>{purcaseRequest.message}</td>
                  <td>
                    <div className="d-flex flex-row justify-content-start gap-3">
                      <Button
                        onClick={() => handleShow(purcaseRequest.id, "delete")}
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
          <Modal.Title>Purcase Request {modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalName === "delete" ? (
            <p>
              Are you sure? {name} - ${phoneNumber} - ${text}
            </p>
          ) : (
            <></>
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
