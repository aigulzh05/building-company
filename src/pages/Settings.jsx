import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import UserService from "../service/user";

const FakeUsers = {
  id: 1,
  username: "username",
  firstName: "Bekzhan",
  lastName: "Satiev",
  photoUrl:
    "https://res.cloudinary.com/dks4go0cw/image/upload/v1684339473/cdjwh4pj2uzwiqxnm9a2.png",
  phoneNumber: "56789",
  address: "California",
  position: {
    id: 1,
    name: "admin",
    salary: 1500.0,
  },
};

export function SettingsPage() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalName, setModal] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);

  const [password, setPassword] = useState("");

  const [photoUrl, setPhotoUrl] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    getMeFromServer();
  }, []);

  const getMeFromServer = () => {
    setLoading(true);
    UserService.detailMe()
      .then((res) => {
        console.log({ res });
        if (res.error) {
          setMessage(res.error);
          return;
        }
        setMe(res.data);
      })
      .catch((error) => {
        console.log({ error });
        setMe(FakeUsers);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateUserFromServer = () => {
    setLoading(true);
    UserService.updateMe(firstName, lastName, phoneNumber, address)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getMeFromServer();
        setLoading(false);
      });
  };

  const updatePasswordFromServer = () => {
    setLoading(true);
    UserService.updatePasswordMe(password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getMeFromServer();
        setLoading(false);
      });
  };
  const updatePhotoFromServer = () => {
    UserService.updatePhotoMe(photo)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getMeFromServer();
      });
  };
  const handleClose = () => {
    setShow(false);
    // setName('');
  };
  const handleShow = (action) => {
    setModal(action);
    setTimeout(() => setShow(true), 300);

    if (action === "update") {
      //update
      setFirstName(me.firstName);
      setLastName(me.lastName);
      setPhoneNumber(me.phoneNumber);
      setAddress(me.address);
    }
    if (action === "photo") {
      //photo
      setPhotoUrl(me.photoUrl);
      setPhoto(null);
    }
    if (action === "password") {
      //password
      setPassword("");
    }
  };

  function handleSave(event) {
    event.preventDefault();
    setShow(false);

    if (modalName === "update") {
      updateUserFromServer();
    }
    if (modalName === "photo") {
      updatePhotoFromServer();
    }
    if (modalName === "password") {
      updatePasswordFromServer();
    }
  }

  return (
    <div className="p-2">
      <h2 className="text-center">Settings page</h2>

      {message}

      {me ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Photo</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key={me.id}>
              <td>{me.username}</td>
              <td>{me.firstName}</td>
              <td>{me.lastName}</td>
              <td>
                {me.photoUrl ? (
                  <img src={me.photoUrl} alt="Avatar" className="avatar" />
                ) : (
                  <img
                    src={"https://www.w3schools.com/w3images/avatar2.png"}
                    alt="AvatarDefault"
                    className="avatar"
                  />
                )}
              </td>
              <td>{me.position?.name}</td>
              <td>{me.position?.salary}</td>
              <td>
                <div className="d-flex flex-row justify-content-start gap-3">
                  <Button
                    onClick={() => handleShow("update")}
                    variant="outline-primary"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleShow("photo")}
                    variant="outline-secondary"
                    size="sm"
                  >
                    Photo
                  </Button>
                  <Button
                    onClick={() => handleShow("password")}
                    variant="outline-success"
                    size="sm"
                  >
                    Password
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      ) : null}

      {modalName === "update" ? (
        <UpdateModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          firstName={firstName}
          lastName={lastName}
          phoneNumber={phoneNumber}
          address={address}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setPhoneNumber={setPhoneNumber}
          setAddress={setAddress}
        />
      ) : null}

      {modalName === "password" ? (
        <PasswordModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          password={password}
          setPassword={setPassword}
        />
      ) : null}
      {modalName === "photo" ? (
        <PhotoModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          photoUrl={photoUrl}
          photo={photo}
          setPhoto={setPhoto}
        />
      ) : null}
    </div>
  );
}

const UpdateModal = ({
  show,
  handleClose,
  handleSave,
  modalName,

  firstName,
  lastName,
  phoneNumber,
  address,
  setFirstName,
  setLastName,
  setPhoneNumber,
  setAddress,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>User {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicfirstName">
        <Form.Label>firstName</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          placeholder="Enter firstName"
        />
        <Form.Text className="text-muted">Enter firstName.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasiclastName">
        <Form.Label>lastName</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          placeholder="Enter lastName"
        />
        <Form.Text className="text-muted">Enter lastName</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicphoneNumber">
        <Form.Label>phoneNumber</Form.Label>
        <Form.Control
          type="telephone"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          placeholder="Enter phoneNumber"
        />
        <Form.Text className="text-muted">Enter phoneNumber</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicaddress">
        <Form.Label>address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Enter address"
        />
        <Form.Text className="text-muted">Enter address</Form.Text>
      </Form.Group>
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

const PasswordModal = ({
  show,
  handleClose,
  handleSave,
  modalName,
  password,
  setPassword,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>User {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="text"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.trim());
          }}
          placeholder="Enter password"
        />
        <Form.Text className="text-muted">Enter password</Form.Text>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Update password
      </Button>
    </Modal.Footer>
  </Modal>
);

const PhotoModal = ({
  show,
  handleClose,
  handleSave,
  modalName,
  photo,
  photoUrl,
  setPhoto,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>User {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="d-flex justify-content-center">
        {photoUrl ? (
          <img
            src={photo ? URL.createObjectURL(photo) : photoUrl}
            alt="Avatar"
            className="avatar"
            style={{ width: "100px", height: "100px" }}
          />
        ) : (
          <img
            src={
              photo
                ? URL.createObjectURL(photo)
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
            setPhoto(e.target.files[0]);
          }}
          placeholder="Choose Photo"
        />
        <Form.Text className="text-muted">Choose Photo</Form.Text>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Update Photo
      </Button>
    </Modal.Footer>
  </Modal>
);
