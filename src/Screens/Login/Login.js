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

  renderLoginStep = () => 
      <div>
        <FormGroup label="Email:" labelFor="text-input" labelInfo="(required)">
          <InputGroup
            id="text-input"
            value={this.state.email}
            onChange={this.handleChange}
            type="email"
            name="email"
            placeholder="johndoe@email.com"
          />
        </FormGroup>
        <FormGroup label="Password:" labelFor="text-input" labelInfo="(required)">
          <InputGroup
            id="text-input"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="password1"
          />
        </FormGroup>
        <ButtonGroup fill={true}>
          <Button type="submit" onClick={this.login}>
            Zaloguj
          </Button>
          <Button type="submit" onClick={this.signup}>
            Zarejestruj
          </Button>
        </ButtonGroup>
        Login using:
        <ButtonGroup fill={true}>
          <Button bsStyle="danger" onClick={this.handleProvider('Google')}>
            Google'a
          </Button>
          <Button bsStyle="primary" onClick={this.handleProvider('Facebook')}>
            Facebooka
          </Button>
          <Button bsStyle="info" onClick={this.handleProvider('Twitter')}>
            Twittera
          </Button>
        </ButtonGroup>
      </div>


  renderIntroStep = () =>
    <div>

    </div>
  render() {
    console.log('this.renderLoginStep', this.renderLoginStep())
    return (
      <div className="splash">
        <div className="panel">

          <Card elevation={4}>
          {
            this.renderLoginStep()
            }
          </Card>
        </div>
      </div>
    )
  }
}
export default Login
