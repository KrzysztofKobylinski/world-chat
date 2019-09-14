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
    this.setState({ language: navigator.language.substring(0, 2) })
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

  onLanguageChange = language => this.setState({ language: language })

  render() {
    console.log('currLang', this.state.language)
    const user = fire.auth().currentUser
    const database = fire.database()
    const firestore = fire.firestore()
    const settings = {}
    firestore.settings(settings)
    return (
      <div className="splash">
        {this.state.user && this.state.language ? (
          <Chat
            user={user}
            database={database}
            firestore={firestore}
            onLanguageChange={this.onLanguageChange}
            language={this.state.language}
          />
        ) : (
          <Login
            database={database}
            onLanguageChange={this.onLanguageChange}
            language={this.state.language}
          />
        )}
      </div>
    )
  }
}

export default App
