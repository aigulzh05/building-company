import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

import { useAuth } from "../service/authProvider";
import AuthService from "../service/auth";
import UserService from "../service/user";
import { useState } from "react";
export function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let username = formData.get("username").trim();
    let password = formData.get("password").trim();
    if (!username || username.length < 3) {
      setMessage("Username length must be at least 5 symbols");
      return;
    }
    if (!password || password.length < 3) {
      setMessage("Password length must be at least 8 symbols");
      return;
    }
    setLoading(true);
    AuthService.login(username, password)
      .then((res) => {
        if (res.data.accessToken && res.data.refreshToken) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("refresh-token", res.data.refreshToken);
          getMeFromServer();
        }
        if (data.error) {
          setMessage(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const getMeFromServer = () => {
    UserService.detailMe()
      .then((res) => {
        if (res.data)
          auth.signin(res.data, () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <Container>
      <Stack gap={3} style={{ paddingTop: "50px" }}>
        <Alert key={"warning"} variant={"warning"}>
          You must log in to view the page at {from}
        </Alert>

        {message && (
          <Alert key={"danger"} variant={"danger"}>
            {message}
          </Alert>
        )}
      </Stack>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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

        <Button variant="primary" disabled={loading} type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
