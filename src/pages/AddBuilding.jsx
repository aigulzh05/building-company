import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";

import BuildingService from "../service/building";


export function AddBuildingPage() {
  const [buildings, setBuildings] = useState(null);
  const [page, setPage] = useState(0);
  const [buildingId, setBuildingId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [modalName, setModal] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [name, setName] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfFloors, setNumberOfFloors] = useState("");
  const [numberOfApartments, setNumberOfApartments] = useState("");

  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");
  const [show, setShow] = useState(false);
  const [state, setState] = useState(false);

  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    getBuildingsFromServer(0);
  }, []);

  const getBuildingsFromServer = (pageNumber) => {
    setLoading(true);
    BuildingService.list(pageNumber)
      .then((res) => {
        console.log({ res });
        if (res.error) {
          setMessage(res.error);
          return;
        }
        setBuildings(res.data);
        setPage(pageNumber);
      })
      .catch((error) => {
        console.log({ error });
        setBuildings(FakeUsers);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateBuildingFromServer = () => {
    setLoading(true);
    BuildingService.update(
      buildingId,
      dateStart,
      dateEnd,
      name,
      description,
      numberOfFloors,
      numberOfApartments,
      address,
      state
    )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getBuildingsFromServer(page);
        setLoading(false);
      });
  };
  const createBuildingFromServer = () => {
    setLoading(true);

    BuildingService.save(
      dateStart,
      dateEnd,
      name,
      description,
      numberOfFloors,
      numberOfApartments,
      address,
      img
    )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getBuildingsFromServer(0);
        setLoading(false);
      });
  };

  const updatePhotoFromServer = () => {
    BuildingService.updatePhoto(buildingId, img)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getBuildingsFromServer(page);
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
      setBuildingId(0);
      setDateStart(new Date());
      setDateEnd(new Date());
      setName("");
      setDescription("");
      setNumberOfFloors("");
      setNumberOfApartments("");
      setAddress("");
    }
    if (action === "update") {
      //update
      // const thisBuilding = buildings?.content?.filter((u) => u.id === id)[0];
      const thisBuilding = buildings?.content[0];

      setBuildingId(1);
      // setBuildingId(thisBuilding.id);
      setDateStart(thisBuilding.dateStart);
      setDateEnd(thisBuilding.dateEnd);
      setName(thisBuilding.name);
      setDescription(thisBuilding.description);
      setAddress(thisBuilding.address);
      setNumberOfApartments(thisBuilding.numberOfApartments);
      setNumberOfFloors(thisBuilding.numberOfFloors);
      setPhotoUrl(thisBuilding.imgUrl);
      setState(thisBuilding.state);
    }
    if (action === "photo") {
      //photo
      // const thisUser = buildings?.content?.filter((u) => u.id === id)[0];
      const thisBuilding = buildings?.content[0];
      setPhotoUrl(thisBuilding.imgUrl);
      setImg(null);
      setBuildingId(1);
      // setBuildingId(thisBuilding.id);
    }
  };

  function handleSave(event) {
    event.preventDefault();
    setShow(false);
    if (modalName === "create") {
      createBuildingFromServer();
    }
    if (modalName === "update") {
      updateBuildingFromServer();
    }
    if (modalName === "photo") {
      updatePhotoFromServer();
    }
  }

  const handlePage = (pageNumber) => {
    getUsersFromServer(pageNumber);
  };
  return (
    <div className="p-2">
      <h2 className="text-center">building page</h2>

      {message}
      {buildings ? (
        <Button
          className="my-2"
          variant="primary"
          onClick={() => handleShow(0, "create")}
        >
          Add building
        </Button>
      ) : null}
      {buildings ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Floors</th>
              <th>Apartments</th>
              <th>address</th>
              <th>img</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buildings?.content?.map((building, index) => (
              <tr key={building.id}>
                <td>{index + 1 + page * 2}</td>
                <td>{building.name}</td>
                <td>{building.dateStart}</td>
                <td>{building.dateEnd}</td>
                <td>{building.numberOfFloors}</td>
                <td>{building.numberOfApartments}</td>
                <td>{building.address}</td>

                <td>
                  {building.imgUrl ? (
                    <img
                      src={building.imgUrl}
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
                    <Button
                      onClick={() => handleShow(building.id, "update")}
                      variant="outline-primary"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleShow(building.id, "photo")}
                      variant="outline-secondary"
                      size="sm"
                    >
                      Photo
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
      {modalName === "create" ? (
        <CreateModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          dateStart={dateStart}
          name={name}
          dateEnd={dateEnd}
          description={description}
          numberOfFloors={numberOfFloors}
          numberOfApartments={numberOfApartments}
          address={address}
          img={img}
          state={state}
          setModal={setModal}
          setDateStart={setDateStart}
          setName={setName}
          setDateEnd={setDateEnd}
          setDescription={setDescription}
          setNumberOfFloors={setNumberOfFloors}
          setNumberOfApartments={setNumberOfApartments}
          setAddress={setAddress}
          setImg={setImg}
          setShow={setShow}
          setState={setState}
        />
      ) : null}

      {modalName === "update" ? (
        <UpdateModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          dateStart={dateStart}
          name={name}
          dateEnd={dateEnd}
          description={description}
          numberOfFloors={numberOfFloors}
          numberOfApartments={numberOfApartments}
          address={address}
          img={img}
          photoUrl={photoUrl}
          state={state}
          setModal={setModal}
          setDateStart={setDateStart}
          setName={setName}
          setDateEnd={setDateEnd}
          setDescription={setDescription}
          setNumberOfFloors={setNumberOfFloors}
          setNumberOfApartments={setNumberOfApartments}
          setAddress={setAddress}
          setImg={setImg}
          setShow={setShow}
          setState={setState}
        />
      ) : null}

      {modalName === "photo" ? (
        <PhotoModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          photoUrl={photoUrl}
          img={img}
          setImg={setImg}
        />
      ) : null}

      {buildings?.totalPages ? (
        <Pagination style={{ justifyContent: "center" }}>
          {Array.from(Array(buildings.totalPages).keys()).map((_, number) => (
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
  dateStart,
  name,
  dateEnd,
  description,
  numberOfFloors,
  numberOfApartments,
  address,
  img,

  setDateStart,
  setName,
  setDateEnd,
  setDescription,
  setNumberOfFloors,
  setNumberOfApartments,
  setAddress,
  setImg,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Building {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicDateStart">
        <Form.Label>dateStart</Form.Label>
        <Form.Control
          type="date"
          name="dateStart"
          value={dateStart}
          onChange={(e) => {
            setDateStart(e.target.value);
          }}
          placeholder="Enter date to start"
        />
        <Form.Text className="text-muted">Enter date to start.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDateEnd">
        <Form.Label>dateEnd</Form.Label>
        <Form.Control
          type="date"
          name="dateEnd"
          value={dateEnd}
          onChange={(e) => {
            setDateEnd(e.target.value);
          }}
          placeholder="Enter date to end"
        />
        <Form.Text className="text-muted">Enter date to end.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter name"
        />
        <Form.Text className="text-muted">Enter name.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Enter description"
        />
        <Form.Text className="text-muted">Enter description.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumberOfFloors">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="numberOfFloors"
          value={numberOfFloors}
          onChange={(e) => {
            setNumberOfFloors(e.target.value);
          }}
          placeholder="Enter number of floors"
        />
        <Form.Text className="text-muted">Enter nameber of floors.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumberOfApartments">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="numberOfApartments"
          value={numberOfApartments}
          onChange={(e) => {
            setNumberOfApartments(e.target.value);
          }}
          placeholder="Enter number of apartments"
        />
        <Form.Text className="text-muted">
          Enter nameber of apartents.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Enter address"
        />
        <Form.Text className="text-muted">Enter address.</Form.Text>
      </Form.Group>

      <div className="d-flex justify-content-center">
        <img
          src={
            img
              ? URL.createObjectURL(img)
              : "https://www.w3schools.com/w3images/avatar2.png"
          }
          alt="AvatarDefault"
          className="avatar"
        />
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

  dateStart,
  name,
  dateEnd,
  description,
  numberOfFloors,
  numberOfApartments,
  address,
  img,
  state,
  photoUrl,
  setDateStart,
  setName,
  setDateEnd,
  setDescription,
  setNumberOfFloors,
  setNumberOfApartments,
  setAddress,
  setImg,
  setState,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Building {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicDateStart">
        <Form.Label>dateStart</Form.Label>
        <Form.Control
          type="date"
          name="dateStart"
          value={dateStart}
          onChange={(e) => {
            setDateStart(e.target.value);
          }}
          placeholder="Enter date to start"
        />
        <Form.Text className="text-muted">Enter date to start.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDateEnd">
        <Form.Label>dateEnd</Form.Label>
        <Form.Control
          type="date"
          name="dateEnd"
          value={dateEnd}
          onChange={(e) => {
            setDateEnd(e.target.value);
          }}
          placeholder="Enter date to end"
        />
        <Form.Text className="text-muted">Enter date to end.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter name"
        />
        <Form.Text className="text-muted">Enter name.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Enter description"
        />
        <Form.Text className="text-muted">Enter description.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumberOfFloors">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="numberOfFloors"
          value={numberOfFloors}
          onChange={(e) => {
            setNumberOfFloors(e.target.value);
          }}
          placeholder="Enter number of floors"
        />
        <Form.Text className="text-muted">
          Enter nameber of appartments.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNumberOfapp">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="numberOfApartments"
          value={numberOfApartments}
          onChange={(e) => {
            setNumberOfApartments(e.target.value);
          }}
          placeholder="Enter number of floors"
        />
        <Form.Text className="text-muted">
          Enter nameber of appartments.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Enter address"
        />
        <Form.Text className="text-muted">Enter address.</Form.Text>
      </Form.Group>

      <div className="d-flex justify-content-center">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Avatar"
            className="avatar"
            style={{ width: "100px", height: "100px" }}
          />
        ) : (
          <img
            src={"https://www.w3schools.com/w3images/avatar2.png"}
            alt="AvatarDefault"
            className="avatar"
          />
        )}
      </div>

      <Form.Group className="mb-3" controlId="formBasicstate">
        <Form.Label>state</Form.Label>
        <Form.Select
          aria-label="state select"
          // selected={state}
          defaultValue={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value={0} key={0}>
            Choose state
          </option>
          {[
            { id: "COMPLETED", name: "COMPLETED" },
            { id: "INPROCESS", name: "INPROCESS" },
            { id: "SUSPEND", name: "SUSPEND" },
            { id: "ESTIMATED", name: "ESTIMATED" },
          ].map((stateItem) => (
            <option key={stateItem.id} value={stateItem.id}>
              {stateItem.name}
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
        update
      </Button>
    </Modal.Footer>
  </Modal>
);

const PhotoModal = ({
  show,
  handleClose,
  handleSave,
  modalName,
  img,
  photoUrl,
  setImg,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Building {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="d-flex justify-content-center">
        {photoUrl ? (
          <img
            src={img ? URL.createObjectURL(img) : photoUrl}
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
