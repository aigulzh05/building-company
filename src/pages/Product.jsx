import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";

import PositionService from "../service/position";
import GlobalTypeService from "../service/globalType";
import ProductService from "../service/product";
import { Cascader } from "antd";
import { Modal as AntModal } from "antd";

const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

export function ProductPage() {
  const [globalTypes, setGlobalTypes] = useState(null);
  const [globalTypesSelect, setGlobalTypesSelect] = useState([]);
  const [globalTypeId, setGlobalTypeId] = useState(0);
  const [subTypeId, setSubTypeId] = useState(0);
  const [productId, setProductId] = useState(0);
  const [products, setProducts] = useState(null);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [modalName, setModal] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    getProductsFromServer(0);
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
        let dd = [];
        res.data.content?.forEach((element) => {
          if (element.subTypeList.length) {
            dd.push({
              value: element.id,
              label: element.name,
              children: element.subTypeList.map((el) => {
                return { value: el.id, label: el.name };
              }),
            });
          } else {
            // dd.push({ value: element.id, label: element.name });
          }
        });
        setGlobalTypesSelect(dd);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getProductsFromServer = (pageNumber) => {
    setLoading(true);
    ProductService.list(pageNumber)
      .then((res) => {
        console.log({ res });
        if (res.error) {
          setMessage(res.error);
          return;
        }
        setProducts(res.data);
        setPage(pageNumber);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateProductFromServer = () => {
    setLoading(true);
    ProductService.update(productId, name, quantity, price, subTypeId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getProductsFromServer(page);
        setLoading(false);
      });
  };
  const createProductFromServer = () => {
    setLoading(true);

    ProductService.save(name, quantity, price, subTypeId, photo)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getProductsFromServer(0);
        setLoading(false);
      });
  };
  const deleteProductFromServer = () => {
    setLoading(true);
    ProductService.remove(productId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getProductsFromServer(page);
        setLoading(false);
      });
  };
  const updatePhotoFromServer = () => {
    ProductService.updatePhoto(productId, photo)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getProductsFromServer(page);
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
      setGlobalTypeId(0);
      setSubTypeId(0);
      setProductId(0);
      setPrice(0);
      setQuantity(0);
      setName("");
    }
    if (action === "update") {
      //update
      const thisProd = products?.content?.filter((u) => u.id === id)[0];
      setGlobalTypeId(thisProd.globalTypeId);
      setSubTypeId(thisProd.subTypeId);
      setProductId(thisProd.id);
      setPrice(thisProd.price);
      setQuantity(thisProd.quantity);
      setName(thisProd.name);
      setPhotoUrl(thisProd.imgUrl);
      setPhoto(null);
    }
    if (action === "photo") {
      //photo
      const thisProd = products?.content?.filter((u) => u.id === id)[0];
      setGlobalTypeId(thisProd.globalTypeId);
      setSubTypeId(thisProd.subTypeId);
      setProductId(thisProd.id);
      setPrice(thisProd.price);
      setQuantity(thisProd.quantity);
      setName(thisProd.name);
      setPhotoUrl(thisProd.imgUrl);
      setPhoto(null);
    }
    if (action === "delete") {
      //delete
      const thisProd = products?.content?.filter((u) => u.id === id)[0];
      setGlobalTypeId(thisProd.globalTypeId);
      setSubTypeId(thisProd.subTypeId);
      setProductId(thisProd.id);
      setPrice(thisProd.price);
      setQuantity(thisProd.quantity);
      setName(thisProd.name);
      setPhotoUrl(thisProd.imgUrl);
      setPhoto(null);
    }
  };

  function handleSave(event) {
    event.preventDefault();
    setShow(false);
    if (modalName === "create") {
      createProductFromServer();
    }
    if (modalName === "update") {
      updateProductFromServer();
    }
    if (modalName === "photo") {
      updatePhotoFromServer();
    }
    if (modalName === "delete") {
      deleteProductFromServer();
    }
  }

  const handlePage = (pageNumber) => {
    getProductsFromServer(pageNumber);
  };
  return (
    <div className="p-2">
      <h2 className="text-center">ADD PRODUCT</h2>

      {message}
      {products ? (
        <Button
          className="my-2"
          variant="primary"
          onClick={() => handleShow(0, "create")}
        >
          Add
        </Button>
      ) : null}
      {products ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>price</th>
              <th>quantity</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.content?.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1 + page * 3}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.imgUrl ? (
                    <img src={product.imgUrl} alt="Avatar" className="avatar" />
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
                      onClick={() => handleShow(product.id, "update")}
                      variant="outline-primary"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleShow(product.id, "photo")}
                      variant="outline-secondary"
                      size="sm"
                    >
                      Photo
                    </Button>
                    <Button
                      onClick={() => handleShow(product.id, "delete")}
                      variant="outline-danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}

      {modalName === "create" && globalTypesSelect.length ? (
        <CreateModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          globalTypes={globalTypes}
          globalTypeId={globalTypeId}
          subTypeId={subTypeId}
          productId={productId}
          products={products}
          name={name}
          price={price}
          quantity={quantity}
          photo={photo}
          photoUrl={photoUrl}
          setGlobalTypeId={setGlobalTypeId}
          setSubTypeId={setSubTypeId}
          setProductId={setProductId}
          setPrice={setPrice}
          setQuantity={setQuantity}
          setName={setName}
          setPhoto={setPhoto}
          globalTypesSelect={globalTypesSelect}
        />
      ) : null}

      {modalName === "update" && globalTypesSelect.length ? (
        <UpdateModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          globalTypes={globalTypes}
          globalTypeId={globalTypeId}
          subTypeId={subTypeId}
          productId={productId}
          products={products}
          name={name}
          price={price}
          quantity={quantity}
          photo={photo}
          photoUrl={photoUrl}
          setGlobalTypeId={setGlobalTypeId}
          setSubTypeId={setSubTypeId}
          setProductId={setProductId}
          setPrice={setPrice}
          setQuantity={setQuantity}
          setName={setName}
          setPhoto={setPhoto}
          globalTypesSelect={globalTypesSelect}
        />
      ) : null}

      {modalName === "delete" ? (
        <DeleteModal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          modalName={modalName}
          globalTypes={globalTypes}
          globalTypeId={globalTypeId}
          subTypeId={subTypeId}
          productId={productId}
          products={products}
          name={name}
          price={price}
          quantity={quantity}
          photo={photo}
          photoUrl={photoUrl}
          setGlobalTypeId={setGlobalTypeId}
          setSubTypeId={setSubTypeId}
          setProductId={setProductId}
          setPrice={setPrice}
          setQuantity={setQuantity}
          setName={setName}
          setPhoto={setPhoto}
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

      {products?.totalPages ? (
        <Pagination style={{ justifyContent: "center" }}>
          {Array.from(Array(products.totalPages).keys()).map((_, number) => (
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
  globalTypes,
  globalTypeId,
  subTypeId,
  productId,
  products,
  name,
  price,
  quantity,
  photo,
  photoUrl,
  setGlobalTypeId,
  setSubTypeId,
  setProductId,
  setPrice,
  setQuantity,
  setName,
  setPhoto,
  globalTypesSelect,
}) => (
  <AntModal
    title={modalName}
    open={show}
    onOk={handleSave}
    onCancel={handleClose}
  >
    {/* <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>User {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body> */}
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Name</Form.Label>
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

    <Form.Group className="mb-3" controlId="formBasicQuantity">
      <Form.Label>Quantity</Form.Label>
      <Form.Control
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        placeholder="Enter Quantity"
      />
      <Form.Text className="text-muted">Enter Quantity.</Form.Text>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="number"
        name="Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        placeholder="Enter Price"
      />
      <Form.Text className="text-muted">Enter Price.</Form.Text>
    </Form.Group>

    {/* <Form.Group className="mb-3" controlId="formBasicGlobalType">
      <Form.Label>GlobalType {globalTypeId}</Form.Label>
      <Form.Select
        aria-label="GlobalType select"
        selected={globalTypeId}
        onChange={(e) => setGlobalTypeId(e.target.value)}
      >
        <option value={0} key={0}>
          Choose GlobalType
        </option>
        {globalTypes?.content?.map((glob) => (
          <option key={glob.id} value={glob.id}>
            {glob.name}
          </option>
        ))}
      </Form.Select>
      <Form.Text className="text-muted">Choose GlobalType</Form.Text>
    </Form.Group> */}
    <Form.Group className="mb-3" controlId="formBasicSubType">
      <Form.Label>SubType</Form.Label>
      <Cascader
        options={globalTypesSelect}
        onChange={(selected) => {
          console.log(selected);
          setSubTypeId(selected[selected.length - 1]);
        }}
      />{" "}
    </Form.Group>

    {/* <Form.Group className="mb-3" controlId="formBasicSubType">
      <Form.Label>SubType {subTypeId}</Form.Label>

      <Form.Select
        aria-label="SubType select"
        selected={subTypeId}
        onChange={(e) => setSubTypeId(e.target.value)}
      >
        <option value={0} key={0}>
          Choose SubType
        </option>
        {globalTypes?.content?.subTypeList // ?.filter((x) => x.id === globalTypeId)[0]
          ?.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
      </Form.Select>
      <Form.Text className="text-muted">Choose SubType</Form.Text>
    </Form.Group> */}

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
    {/* </Modal.Body> */}
    {/* <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Create
      </Button>
    </Modal.Footer>
  </Modal> */}
  </AntModal>
);

const UpdateModal = ({
  show,
  handleClose,
  handleSave,
  modalName,

  globalTypes,
  globalTypeId,
  subTypeId,
  productId,
  products,
  name,
  price,
  quantity,
  photo,
  photoUrl,
  setGlobalTypeId,
  setSubTypeId,
  setProductId,
  setPrice,
  setQuantity,
  setName,
  setPhoto,
  globalTypesSelect,
}) => (
  <AntModal
    title={modalName}
    open={show}
    onOk={handleSave}
    onCancel={handleClose}
  >
    {/* <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>User {modalName}</Modal.Title>
    </Modal.Header>
    <Modal.Body> */}
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Name</Form.Label>
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

    <Form.Group className="mb-3" controlId="formBasicQuantity">
      <Form.Label>Quantity</Form.Label>
      <Form.Control
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        placeholder="Enter Quantity"
      />
      <Form.Text className="text-muted">Enter Quantity.</Form.Text>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="number"
        name="Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        placeholder="Enter Price"
      />
      <Form.Text className="text-muted">Enter Price.</Form.Text>
    </Form.Group>

    {/* <Form.Group className="mb-3" controlId="formBasicGlobalType">
        <Form.Label>GlobalType {globalTypeId}</Form.Label>
        <Form.Select
          aria-label="GlobalType select"
          selected={globalTypeId}
          onChange={(e) => setGlobalTypeId(e.target.value)}
        >
          <option value={0} key={0}>
            Choose GlobalType
          </option>
          {globalTypes?.content?.map((glob) => (
            <option key={glob.id} value={glob.id}>
              {glob.name}
            </option>
          ))}
        </Form.Select>
        <Form.Text className="text-muted">Choose GlobalType</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSubType">
        <Form.Label>SubType {subTypeId}</Form.Label>
        <Form.Select
          aria-label="SubType select"
          selected={subTypeId}
          onChange={(e) => setSubTypeId(e.target.value)}
        >
          <option value={0} key={0}>
            Choose SubType
          </option>
          {globalTypes?.content
            ?.filter((x) => x.id === globalTypeId)[0]
            ?.subTypeList?.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
        </Form.Select>
        <Form.Text className="text-muted">Choose SubType</Form.Text>
      </Form.Group> */}
    <Form.Group className="mb-3" controlId="formBasicSubType">
      <Form.Label>SubType</Form.Label>
      <Cascader
        options={globalTypesSelect}
        onChange={(selected) => {
          console.log(selected);
          setSubTypeId(selected[selected.length - 1]);
        }}
      />{" "}
    </Form.Group>
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
    {/* </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Update Photo
      </Button>
    </Modal.Footer>
  </Modal> */}
  </AntModal>
);

const DeleteModal = ({ show, handleClose, handleSave, name }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete product</Modal.Title>
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
