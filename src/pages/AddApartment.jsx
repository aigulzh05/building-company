import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";

import ApartmentService from "../service/apartment";
import BuildingService from "../service/building";

export function AddApartmentPage() {
  const [buildings, setBuildings] = useState(null);

  const [apartments, setApartments] = useState(null);
  const [page, setPage] = useState(0);
  const [apartmentId, setApartmentId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalName, setModal] = useState("");
  const [name, setName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [area, setArea] = useState("");
  const [pricePerArea, setPricePerArea] = useState("");
  const [description, setDescription] = useState("");

  const [buildingId, setBuildingId] = useState(0);
  const [buildingName, setBuildingName] = useState("");

  const [numberOfApartments, setNumberOfApartments] = useState("");

  const [img, setImg] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(false);

  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    getApartmentsFromServer(0);
    getBuildingsFromServer();
  }, []);

  const getBuildingsFromServer = () => {
    BuildingService.list(0)
      .then((res) => {
        console.log({ res });
        if (res.error) {
          return;
        }
        setBuildings(res.data);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const getApartmentsFromServer = (pageNumber) => {
    setLoading(true);
    ApartmentService.list(pageNumber)
      .then((res) => {
        console.log({ res });
        if (res.error) {
          setMessage(res.error);
          return;
        }
        setApartments(res.data);
        setPage(pageNumber);
      })
      .catch((error) => {
        console.log({ error });
        setApartments();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateApartmentFromServer = () => {
    setLoading(true);
    ApartmentService.update(
      apartmentId,
      roomNumber,
      area,
      pricePerArea,
      status,
      parseInt(buildingId)
    )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getApartmentsFromServer(page);
        setLoading(false);
      });
  };
  const createApartmentFromServer = () => {
    setLoading(true);

    ApartmentService.save(roomNumber, area, pricePerArea, img, buildingId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getApartmentsFromServer(0);
        setLoading(false);
      });
  };

  const updatePhotoFromServer = () => {
    ApartmentService.updatePhoto(apartmentId, img)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getApartmentsFromServer(page);
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
      setApartmentId(0);
      setRoomNumber("");
      setArea("");
      setPricePerArea("");
      setImg("");
      setApartmentId("");
    }
    if (action === "update") {
      //update
      // const thisBuilding = buildings?.content?.filter((u) => u.id === id)[0];
      const thisApartment = apartments?.content[0];

      //setApartmentId(1);

      setApartmentId(thisApartment.id);
      setRoomNumber(thisApartment.roomNumber);
      setArea(thisApartment.area);
      setPricePerArea(thisApartment.pricePerArea);
      setStatus(thisApartment.status);
      setBuildingId(thisApartment?.building?.id || 1);
    }
    if (action === "photo") {
      //photo
      // const thisUser = apartments?.content?.filter((u) => u.id === id)[0];
      const thisApartment = apartments?.content[0];
      setPhotoUrl(thisApartment.imgUrl);
      setImg(null);
      // setBuildingId(1);
      setApartmentId(thisApartment.id);
    }
  };

  function handleSave(event) {
    event.preventDefault();
    setShow(false);
    if (modalName === "create") {
      createApartmentFromServer();
    }
    if (modalName === "update") {
      updateApartmentFromServer();
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
      <h2 className="text-center">ADD APARTMENT </h2>

      {message}
      {apartments ? (
        <Button
          className="my-2"
          variant="primary"
          onClick={() => handleShow(0, "create")}
        >
          Add apartment
        </Button>
      ) : null}
      {apartments ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Room Number</th>
              <th>Area</th>
              <th>Price per area</th>
              <th>Image</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apartments?.content?.map((apartment, index) => (
              <tr key={apartment.id}>
                <td>{index + 1 + page * 2}</td>
                <td>{apartment.name}</td>
                <td>{apartment.roomNumber}</td>
                <td>{apartment.area}</td>
                <td>{apartment.pricePerArea}</td>

                <td>
                  {apartment.imgUrl ? (
                    <img
                      src={apartment.imgUrl}
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
                      onClick={() => handleShow(apartment.id, "update")}
                      variant="outline-primary"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleShow(apartment.id, "photo")}
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
          roomNumber={roomNumber}
          area={area}
          pricePerArea={pricePerArea}
          buildingId={buildingId}
          img={img}
          status={status}
          setModal={setModal}
          setRoomNumber={setRoomNumber}
          setArea={setArea}
          setPricePerArea={setPricePerArea}
          setBuildingId={setBuildingId}
          setImg={setImg}
          setShow={setShow}
          setStatus={setStatus}
          buildings={buildings}
        />
      ) : null}

      {modalName === "update" ? (
        <UpdateModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          roomNumber={roomNumber}
          area={area}
          pricePerArea={pricePerArea}
          buildingId={buildingId}
          img={img}
          status={status}
          setModal={setModal}
          setRoomNumber={setRoomNumber}
          setArea={setArea}
          setPricePerArea={setPricePerArea}
          setBuildingId={setBuildingId}
          setImg={setImg}
          setShow={setShow}
          setStatus={setStatus}
          buildings={buildings}
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

      {apartments?.totalPages ? (
        <Pagination style={{ justifyContent: "center" }}>
          {Array.from(Array(apartments.totalPages).keys()).map((_, number) => (
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
  roomNumber,
  area,
  pricePerArea,
  buildingId,
  img,
  buildings,
  setRoomNumber,
  setArea,
  setPricePerArea,
  setBuildingId,
  setImg,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Apartment {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicRoomNumber">
        <Form.Label>Room number</Form.Label>
        <Form.Control
          type="text"
          name="roomNumber"
          value={roomNumber}
          onChange={(e) => {
            setRoomNumber(e.target.value);
          }}
          placeholder="Enter room number"
        />
        <Form.Text className="text-muted">Enter room number.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicArea">
        <Form.Label>Area</Form.Label>
        <Form.Control
          type="text"
          name="area"
          value={area}
          onChange={(e) => {
            setArea(e.target.value);
          }}
          placeholder="Enter area"
        />
        <Form.Text className="text-muted">Enter area.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPricePerArea">
        <Form.Label>Price per area</Form.Label>
        <Form.Control
          type="text"
          name="nampricePerAreae"
          value={pricePerArea}
          onChange={(e) => {
            setPricePerArea(e.target.value);
          }}
          placeholder="Enter pricePerArea"
        />
        <Form.Text className="text-muted">Enter price Per Area.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPosition">
        <Form.Label>Building</Form.Label>
        <Form.Select
          aria-label="building select"
          selected={buildingId}
          onChange={(e) => setBuildingId(e.target.value)}
        >
          <option value={0} key={0}>
            Choose building
          </option>
          {buildings?.content?.map((building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
        </Form.Select>
        <Form.Text className="text-muted">Choose building</Form.Text>
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
  roomNumber,
  area,
  pricePerArea,
  buildingId,
  img,
  status,
  setRoomNumber,
  setArea,
  setPricePerArea,
  setBuildingId,
  setImg,
  setStatus,
  buildings,
  photoUrl,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Apartment {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicRoomNumber">
        <Form.Label>roomNumber</Form.Label>
        <Form.Control
          type="text"
          name="roomNumber"
          value={roomNumber}
          onChange={(e) => {
            setRoomNumber(e.target.value);
          }}
          placeholder="Enter room number"
        />
        <Form.Text className="text-muted">Enter room number.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicArea">
        <Form.Label>Area</Form.Label>
        <Form.Control
          type="text"
          name="area"
          value={area}
          onChange={(e) => {
            setArea(e.target.value);
          }}
          placeholder="Enter area"
        />
        <Form.Text className="text-muted">Enter area.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPricePerArea">
        <Form.Label>pricePerArea</Form.Label>
        <Form.Control
          type="text"
          name="nampricePerAreae"
          value={pricePerArea}
          onChange={(e) => {
            setPricePerArea(e.target.value);
          }}
          placeholder="Enter pricePerArea"
        />
        <Form.Text className="text-muted">Enter price Per Area.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPosition">
        <Form.Label>building</Form.Label>
        <Form.Select
          aria-label="building select"
          selected={buildingId}
          onChange={(e) => setBuildingId(e.target.value)}
        >
          <option value={0} key={0}>
            Choose building
          </option>
          {buildings?.content?.map((building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
        </Form.Select>
        <Form.Text className="text-muted">Choose building</Form.Text>
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

      <Form.Group className="mb-3" controlId="formBasicStatus">
        <Form.Label>status</Form.Label>
        <Form.Select
          aria-label="status select"
          // selected={state}
          defaultValue={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={0} key={0}>
            Choose state
          </option>
          {[
            { id: "SOLD", name: "SOLD" },
            { id: "FREE ", name: "FREE" },
            { id: "RESERVED", name: "RESERVED" },
          ].map((statusItem) => (
            <option key={statusItem.id} value={statusItem.id}>
              {statusItem.name}
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
      <Modal.Title>Apartment {modalName}</Modal.Title>
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
