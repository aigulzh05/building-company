import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";

import UserService from "../service/user";
import PositionService from "../service/position";

const FakeUsers = {
  content: [
    {
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
    },
  ],
  totalPages: 1,
  totalElements: 1,
  last: true,
  size: 3,
  number: 0,
  numberOfElements: 1,
  first: true,
  empty: false,
};

export function UserPage() {
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(0);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalName, setModal] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);

  const [positions, setPositions] = useState([]);
  const [positionId, setPositionId] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [photoUrl, setPhotoUrl] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    getUsersFromServer(0);
  }, []);

  const getUsersFromServer = (pageNumber) => {
    setLoading(true);
    UserService.list(pageNumber)
      .then((res) => {
        console.log(res);
        setUsers(res.data);
        setPage(pageNumber);
      })
      .catch((error) => {
        console.log(error);
        setUsers(FakeUsers);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getPositionsFromServer = () => {
    PositionService.list()
      .then((res) => {
        console.log(res);
        setPositions(res.data);
      })
      .catch((error) => {
        console.log(error);
        setPositions(FakePostions);
      })
      .finally(() => {});
  };

  const updateUserFromServer = () => {
    setLoading(true);
    UserService.update(userId, firstName, lastName, phoneNumber, address)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getUsersFromServer(page);
        setLoading(false);
      });
  };
  const createUserFromServer = () => {
    setLoading(true);

    UserService.save(positionId, username, password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getUsersFromServer(0);
        setLoading(false);
      });
  };
  const updatePasswordFromServer = () => {
    setLoading(true);
    UserService.updatePassword(userId, password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getUsersFromServer(page);
        setLoading(false);
      });
  };
  const updatePhotoFromServer = () => {
    UserService.updatePhoto(userId, photo)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getUsersFromServer(page);
      });
  };
  const handleClose = () => {
    setShow(false);
    // setUserId(0);
    // setName('');
    // setSalary(0);
  };
  const handleShow = (id, action) => {
    setModal(action);
    setTimeout(() => setShow(true), 300);
    if (action === "create") {
      //create
      setUserId(0);
      setUsername("");
      setPassword("");
      setPositionId(0);
      if (positions.length === 0) {
        getPositionsFromServer();
      }
    }
    if (action === "update") {
      //update
      const thisUser = users?.content?.filter((u) => u.id === id)[0];
      setUserId(thisUser.id);
      setFirstName(thisUser.firstName);
      setLastName(thisUser.lastName);
      setPhoneNumber(thisUser.phoneNumber);
      setAddress(thisUser.address);
      if (positions.length === 0) {
        getPositionsFromServer();
      }
    }
    if (action === "photo") {
      //photo
      const thisUser = users?.content?.filter((u) => u.id === id)[0];
      console.log({ thisUser });
      setPhotoUrl(thisUser.photoUrl);
      setUserId(thisUser.id);
      setPhoto(null);
    }
    if (action === "password") {
      //password
      setUserId(id);
      setPassword("");
    }
  };

  function handleSave(event) {
    event.preventDefault();
    setShow(false);
    if (modalName === "create") {
      createUserFromServer();
    }
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

  const handlePage = (pageNumber) => {
    getUsersFromServer(pageNumber);
  };
  return (
    <div className="p-2">
      <h2 className="text-center">user page</h2>
      <Button
        className="my-2"
        variant="primary"
        onClick={() => handleShow(0, "create")}
      >
        Add user
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.content?.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1 + page * 3}</td>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                {user.photoUrl ? (
                  <img src={user.photoUrl} alt="Avatar" className="avatar" />
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
                  <Button
                    onClick={() => handleShow(user.id, "update")}
                    variant="outline-primary"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleShow(user.id, "photo")}
                    variant="outline-secondary"
                    size="sm"
                  >
                    Photo
                  </Button>
                  <Button
                    onClick={() => handleShow(user.id, "password")}
                    variant="outline-success"
                    size="sm"
                  >
                    Password
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {modalName === "create" ? (
        <CreateModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          positions={positions}
          positionId={positionId}
          username={username}
          password={password}
          setPositionId={setPositionId}
          setUsername={setUsername}
          setPassword={setPassword}
        />
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

      {users?.totalPages ? (
        <Pagination style={{ justifyContent: "center" }}>
          {Array.from(Array(users.totalPages + 4).keys()).map((_, number) => (
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
    </div>
  );
}

const CreateModal = ({
  show,
  handleClose,
  handleSave,
  modalName,
  positions,
  positionId,
  username,
  password,
  setPositionId,
  setUsername,
  setPassword,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>User {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value.trim());
          }}
          placeholder="Enter username"
        />
        <Form.Text className="text-muted">Enter username.</Form.Text>
      </Form.Group>

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
      <Form.Group className="mb-3" controlId="formBasicPosition">
        <Form.Label>Position</Form.Label>
        <Form.Select
          aria-label="position select"
          selected={positionId}
          onChange={(e) => setPositionId(e.target.value)}
        >
          <option value={0} key={0}>
            Choose position
          </option>
          {positions?.map((pos) => (
            <option key={pos.id} value={pos.id}>
              {pos.name} - ${pos.salary}
            </option>
          ))}
        </Form.Select>
        <Form.Text className="text-muted">Choose postion</Form.Text>
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Create
      </Button>
    </Modal.Footer>
  </Modal>
);

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
