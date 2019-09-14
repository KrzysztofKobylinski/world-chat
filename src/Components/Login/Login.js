import React, { Component } from "react";
import * as firebase from "firebase";
import fire from "../../config/Fire";
import {
  FormGroup,
  FormControl,
  Button,
  ButtonToolbar,
  Panel
} from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        console.log(err);
      });
  };

  signup = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        console.log(err);
      });
  };

  handleProvider = providerName => e => {
    e.preventDefault();
    let provider;
    if (providerName === "Google") {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (providerName === "Facebook") {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (providerName === "Twitter") {
      provider = new firebase.auth.TwitterAuthProvider();
    }
    fire
      .auth()
      .signInWithPopup(provider)
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(Panel);
    
    return (
      <div className="loginPanel">
        <Panel bsStyle="info">
          <Panel.Heading>
            <Panel.Title>
              <h1>Acai-Chat</h1>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <FormGroup controlId="formHorizontalEmail">
              Email:
              <FormControl
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Email"
              />
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              Hasło:
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Hasło"
              />
            </FormGroup>


            <ButtonToolbar>
              <Button type="submit" onClick={this.login}>
                Zaloguj
              </Button>
              <Button type="submit" onClick={this.signup}>
                Zarejestruj
              </Button>
            </ButtonToolbar>
          </Panel.Body>

          <Panel.Footer>
            Ewentualnie zaloguj się korzystając z:
            <ButtonToolbar>
              <Button bsStyle="danger" onClick={this.handleProvider("Google")}>
                Google'a
              </Button>
              <Button
                bsStyle="primary"
                onClick={this.handleProvider("Facebook")}
              >
                Facebooka
              </Button>
              <Button bsStyle="info" onClick={this.handleProvider("Twitter")}>
                Twittera
              </Button>
            </ButtonToolbar>
          </Panel.Footer>
        </Panel>
      </div>
    );
  }
}
export default Login;
