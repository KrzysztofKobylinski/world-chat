import Select from 'react-select'
import _ from 'lodash'
import React from 'react'
import * as firebase from 'firebase'
import fire from '../../config/Fire'
import './Login.css'
import { Button, ButtonGroup, FormGroup, InputGroup, Card, Callout } from '@blueprintjs/core'

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

  makeOption = x => {
    return {
      value: x,
      label: x
    }
  }
  languages = ['en', 'pl', 'es', 'de', 'ch']
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
          <h3>Login using...</h3>
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
          <Button type="submit" intent="primary" onClick={this.login}>
            Zaloguj
          </Button>
          <Button type="submit" onClick={this.signup}>
            Zarejestruj
          </Button>
          <div className="callOut">
            <Callout>
              <div>
                <i>Test Account:</i>
              </div>
              <div>
                <i>email: bradpitt@gmail.com</i>
              </div>
              <div>
                <i>password: Angelina123</i>
              </div>
            </Callout>
          </div>
        </div>
      </div>
      <div className="toLeft">{this.renderBackwardButton()}</div>
    </div>
  )

  renderSelect = () => (
    <Select
      value={this.makeOption(this.props.language)}
      options={_.map(this.languages, this.makeOption)}
      onChange={item => this.props.onLanguageChange(item.value)}
    ></Select>
  )

  renderLanguageStep = () => (
    <div className="panelInterior">
      <h3>Please tell us what language you prefer to use!</h3>

      <div className="content">
        {this.renderSelect()}
        <div className="callOut">
          <Callout title="Important note!">All users posts will be displayed in this language!</Callout>
        </div>
      </div>

      <div className="spaceBetween">
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
      <div className="content">
        Chatting with people around the world has never been <strong>that</strong> easy!{' '}
      </div>
      <div className="customFooter">
        <div className="skip">
          <Button
            large="true"
            onClick={() => this.setState({ step: this.state.step + 2 })}
            rightIcon="arrow-right"
            minimal="true"
            text={'Skip intro'}
          />
        </div>
        <div className="toRight">{this.renderForwardButton('Lets start!')}</div>
      </div>
    </div>
  )

  renderInstructionPanel1 = () => (
    <div className="panelInterior">
      <h1>World Chat</h1>
      <div className="content">
        <p>There is more than 1.2 billion people speaking Chinese and about 1 billion speaking English.</p>
        <p>
          That leaves us with more than 5 billion people worldwide, who are not familiar with any of "popular" language.
        </p>
        <p>We want to give them a chance to communicate with the rest of the world!</p>
      </div>

      <div className="spaceBetween">
        {this.renderBackwardButton()}
        {this.renderForwardButton('Next Step!')}
      </div>
    </div>
  )

  render() {
    const currStep = this.state.step
    let panel
    if (currStep === 0) {
      panel = this.renderIntroStep()
    } else if (currStep === 1) {
      panel = this.renderInstructionPanel1()
    } else if (currStep === 2) {
      panel = this.renderLanguageStep()
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
