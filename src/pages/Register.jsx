import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import AuthService from "../service/auth";
import { useState } from "react";
export function RegisterPage() {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let name = formData.get("name").trim();
    let username = formData.get("username").trim();
    let password = formData.get("password").trim();
    let passwordConfirm = formData.get("passwordConfirm").trim();

    if (!name || name.length < 5) {
      setMessage("Name length must be at least 5 symbols");
      return;
    }
    if (!username || username.length < 5) {
      setMessage("Username length must be at least 5 symbols");
      return;
    }

    if (!password || password.length < 8) {
      setMessage("Password length must be at least 8 symbols");
      return;
    }
    if (passwordConfirm != password) {
      setMessage(
        "Confirm password and password are not match! Retype confirm password"
      );
      return;
    }
    setLoading(true);
    AuthService.register(name, username, password)
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
          return;
        }
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      {message && (
        <Alert key={"danger"} variant={"danger"}>
          {message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter name" />
          <Form.Text className="text-muted">
            Your name will be displayed anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <Form.Text className="text-muted">
            We'll never share your username with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
          <Form.Label>Password Confirm</Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirm"
            placeholder="Retype password"
          />
        </Form.Group>
        <Button variant="primary" disabled={loading} type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
