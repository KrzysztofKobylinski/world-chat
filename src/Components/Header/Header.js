import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import fire from '../../config/Fire'
import './Header.css'
import { chooseWhatToShow, noAvatar } from '../../libs/helpers'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newPostBody: '',
      newPostUser: '',
      newPostAvatar: ''
    }
  }

  logout = e => {
    e.preventDefault()
    fire.auth().signOut()
  }

  render() {
    const { user } = this.props
    return (
      <div className="headerDisplay">
        <div
          className="headerPhoto"
          style={{
            backgroundImage: `url(${chooseWhatToShow(user.photoURL, noAvatar)})`
          }}
        />
        <div>
          <h3>Witaj, {chooseWhatToShow(user.displayName, user.email)}!</h3>
          <p>ProviderID to {this.props.user.providerData[0].providerId}</p>
        </div>
        <div className="button">
          <Button bsStyle="primary" onClick={this.logout}>
            Wyloguj
          </Button>
        </div>
      </div>
    )
  }
}

export default Header
