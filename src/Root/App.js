import React from 'react'
import fire from '../config/Fire'
import Chat from '../Screens/Chat/Chat'
import Login from '../Screens/Login/Login'
import './App.css'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      language: null
    }
  }

  componentDidMount() {
    this.authListener()
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  render() {
    const user = fire.auth().currentUser
    const database = fire.database()
    const firestore = fire.firestore()
    const settings = { }
    firestore.settings(settings)
    return (
      <div className="splash">
        {this.state.user ? (
          <Chat user={user} database={database} firestore={firestore} />
        ) : (
          <Login database={database} />
        )}
      </div>
    )
  }
}

export default App
