import React from 'react'
import * as firebase from 'firebase'
import fire from '../../config/Fire'
import './Login.css'
import { Button, ButtonGroup, FormGroup, InputGroup, Card } from '@blueprintjs/core'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      email: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  login = e => {
    e.preventDefault()
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        console.log(err)
      })
  }

  signup = e => {
    e.preventDefault()
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        console.log(err)
      })
  }

  handleProvider = providerName => e => {
    e.preventDefault()
    let provider
    if (providerName === 'Google') {
      provider = new firebase.auth.GoogleAuthProvider()
    } else if (providerName === 'Facebook') {
      provider = new firebase.auth.FacebookAuthProvider()
    } else if (providerName === 'Twitter') {
      provider = new firebase.auth.TwitterAuthProvider()
    }
    fire
      .auth()
      .signInWithPopup(provider)
      .catch(err => {
        console.log(err)
      })
  }

  renderLoginStep = () => (
    <div className="panelInterior">

      <div className="loginContent">
        <div className="column">
          <h3>Login using provider:</h3>
          <ButtonGroup large={true} vertical={true} fill={true}>
            <Button bsStyle="danger" onClick={this.handleProvider('Google')}>
              Google
            </Button>
            <Button bsStyle="primary" onClick={this.handleProvider('Facebook')}>
              Facebook
            </Button>
            <Button bsStyle="info" onClick={this.handleProvider('Twitter')}>
              Twitter
            </Button>
          </ButtonGroup>
        </div>
        <div className="column">
          <h3>...or in more traditional way</h3>
          <FormGroup label="Email:" labelFor="text-input" labelInfo="(required)">
            <InputGroup
              id="text-input-email"
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              placeholder="eg. johndoe@email.com"
            />
          </FormGroup>
          <FormGroup label="Password:" labelFor="text-input" labelInfo="(required)">
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
        </div>
      </div>
      <div className="toRight">
        {this.renderBackwardButton()}
        {this.renderForwardButton('Almost there!')}
      </div>
    </div>
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
    )
  }

  renderBackwardButton = () => {
    return (
      <Button
        large="true"
        onClick={() => this.setState({ step: this.state.step - 1 })}
        icon="arrow-left"
        minimal="true"
        text="Go back"
      />
    )
  }

  renderIntroStep = () => (
    <div className="panelInterior">
      <h1>World Chat</h1>
      <div className="content">Chatting with people around the world has never been that easy! </div>
      <div className="toRight">{this.renderForwardButton('Lets start!')}</div>
    </div>
  )
  render() {
    const currStep = this.state.step
    let panel
    if (currStep === 0) {
      panel = this.renderIntroStep()
    } else {
      panel = this.renderLoginStep()
    }
    return (
      <Card className="card" elevation={4}>
        {panel}
      </Card>
    )
  }
}
export default Login
