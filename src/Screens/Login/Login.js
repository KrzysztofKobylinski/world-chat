import Select from 'react-select'
import _ from 'lodash'
import React from "react";
import * as firebase from "firebase";
import fire from "../../config/Fire";
import "./Login.css";
import {
  Button,
  ButtonGroup,
  FormGroup,
  InputGroup,
  Card
} from "@blueprintjs/core";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
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

  makeOption = x => {
    console.log(2, x, this.props)
    return {
      value: x,
      label: x
    }
  }
  languages = [
    'en', 'pl', 'es', 'de', 'ch'
  ]
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

  renderLoginStep = () => (
    <div className="panelInterior">
      <div className="loginContent">
        <div className="column">
          <h3>Login using provider:</h3>
          <ButtonGroup large={true} vertical={true} fill={true}>
            <Button bsStyle="danger" onClick={this.handleProvider("Google")}>
              Google
            </Button>
            <Button bsStyle="primary" onClick={this.handleProvider("Facebook")}>
              Facebook
            </Button>
            <Button bsStyle="info" onClick={this.handleProvider("Twitter")}>
              Twitter
            </Button>
          </ButtonGroup>
        </div>
        <div className="column">
          <h3>...or in more traditional way</h3>
          <FormGroup
            label="Email:"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              id="text-input-email"
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              placeholder="eg. johndoe@email.com"
            />
          </FormGroup>
          <FormGroup
            label="Password:"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              id="text-input-password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              placeholder="eg. password1"
            />
          </FormGroup>
          <Button type="submit" onClick={this.login}>
            Zaloguj
          </Button>
          <Button type="submit" onClick={this.signup}>
            Zarejestruj
          </Button>
          {this.renderSelect()}
        </div>
      </div>
      <div className="toRight">
        {this.renderBackwardButton()}
        {this.renderForwardButton("Almost there!")}
      </div>
    </div>
  );

  renderSelect = () => (
    <Select
      value={this.makeOption(this.props.language)}
      options={_.map(this.languages, this.makeOption)}
      onChange={item => this.props.onLanguageChange(item.value)}
    ></Select>
  )

  renderForwardButton = text => {
    return (
      <Button
        large="true"
        onClick={() => this.setState({ step: this.state.step + 1 })}
        rightIcon="arrow-right"
        intent="success"
        text={text}
      />
    );
  };

  renderBackwardButton = () => {
    return (
      <Button
        large="true"
        onClick={() => this.setState({ step: this.state.step - 1 })}
        icon="arrow-left"
        minimal="true"
        text="Go back"
      />
    );
  };

  renderIntroStep = () => (
    <div className="panelInterior">
      <h1>World Chat</h1>
      <div className="content">
        Chatting with people around the world has never been that easy!{" "}
      </div>

      <div className="toRight">{this.renderForwardButton("Lets start!")}</div>
    </div>
  );

  renderInstructionPanel1 = () => (
    <div className="panelInterior">
      <h1>World Chat</h1>
      <div className="content">
        {" "}
        There is about 1.2 bilion people speaking Chinese langauge and about 1
        bilion speaking English. That leaves us with more than 5 bilion people
        worldwide, who are not familiar with English or Chinese language. We
        want to give them a chance to comunicate with the rest of the world!{" "}
      </div>

      
      <div className="toRight">
        {this.renderBackwardButton()}
        {this.renderForwardButton("Next Step!")}
      </div>
    </div>
  );
  renderInstructionPanel2 = () => (
    <div className="panelInterior">
      <h1>World Chat</h1>
      <div className="content">
        Our App is For People who want or need to speak with their friends,
        coworkers, partners, but want to be understood through and through{" "}
      </div>

      <div className="toRight">
        {this.renderBackwardButton()}
        {this.renderForwardButton("Next Step!")}
      </div>
    </div>
  );

  render() {
    const currStep = this.state.step;
    let panel;
    if (currStep === 0) {
      panel = this.renderIntroStep();
    } else if (currStep === 1) {
      panel = this.renderInstructionPanel1();
    } else if (currStep === 2) {
      panel = this.renderInstructionPanel2();
    } else  {
      panel = this.renderLoginStep();
    }
    return (
      <Card className="card" elevation={4}>
        {panel}
      </Card>
    );
  }
}
export default Login;
