import React from 'react'
import fire from '../config/Fire'
import Chat from '../Screens/Chat/Chat'
import Login from '../Screens/Login/Login'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null
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
    const settings = { timestampsInSnapshots: true }
    firestore.settings(settings)
    return (
      <div>
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
