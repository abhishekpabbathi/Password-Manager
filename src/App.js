import './App.css'
import {Component} from 'react'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    eachListsCount: 0,
    onClickShowPasswords: false,
    searchInput: '',
  }

  colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A6', '#33FFF6']

  prevColor = ''

  onClickShowPasswords = () => {
    this.setState(prevState => ({
      onClickShowPasswords: !prevState.onClickShowPasswords,
    }))
  }

  onClickWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onClickUsername = event => {
    this.setState({username: event.target.value})
  }

  onClickPassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickButton = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website !== '' && username !== '' && password !== '') {
      const newList = {
        id: Date.now(),
        website,
        username,
        password,
      }
      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newList],
        website: '',
        username: '',
        password: '',
        eachListsCount: prevState.eachListsCount + 1,
      }))
    }
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(each => each.id !== id),
      eachListsCount: prevState.eachListsCount - 1,
    }))
  }

  getRandomColor = () => {
    const availableColors = this.colors.filter(
      color => color !== this.prevColor,
    )
    const randomColor =
      availableColors[Math.floor(Math.random() * availableColors.length)]
    this.prevColor = randomColor
    return randomColor
  }

  render() {
    const {
      website,
      username,
      password,
      passwordList,
      eachListsCount,
      onClickShowPasswords,
      searchInput,
    } = this.state
    const filteredList = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          alt="app logo"
          className="password-manager-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <form className="details-entry-container" onSubmit={this.onClickButton}>
          <div className="head-inputs-button-container">
            <h1 className="title">Add New Password</h1>
            <div className="image-input-container">
              <img
                className="website-img"
                alt="website"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              />
              <span className="vertical-line" />
              <input
                onChange={this.onClickWebsiteInput}
                className="Website-input"
                value={website}
                type="text"
                placeholder="Enter Website"
              />
            </div>

            <div className="image-input-container">
              <img
                className="website-img"
                alt="username"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              />
              <span className="vertical-line" />
              <input
                onChange={this.onClickUsername}
                className="Website-input"
                type="text"
                value={username}
                placeholder="Enter Username"
              />
            </div>

            <div className="image-input-container">
              <img
                className="website-img"
                alt="password"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              />
              <span className="vertical-line" />
              <input
                onChange={this.onClickPassword}
                className="Website-input"
                value={password}
                type="password"
                placeholder="Enter Password"
              />
            </div>

            <div className="add-button-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </div>
          <img
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="password-manager-image-sm"
          />
          <img
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager-image-lg"
          />
        </form>

        <div className="results-container">
          <div className="top-section-results-container">
            <div className="heading-count-container">
              <h1 className="counter-heading">Your Passwords</h1>
              <p className="count">{eachListsCount}</p>
            </div>
            <div className="search-image-input-container">
              <img
                className="search-image"
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <span className="show-password-search-vertial-line" />
              <input
                type="search"
                className="bottom-results-search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="show-password-head-container">
            <label className="show-password-head">
              <input
                className="checkbox"
                type="checkbox"
                onClick={this.onClickShowPasswords}
              />
              <p> Show Passwords </p>
            </label>
          </div>

          <ul className="passwords-no-passwords-image-container">
            {filteredList.length === 0 ? (
              <div className="img-no-password">
                <img
                  className="no-passwords-image"
                  alt="no passwords"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                />
                <p>No Passwords</p>
              </div>
            ) : (
              filteredList.map(eachData => (
                <li className="each-list-container" key={eachData.id}>
                  <p
                    className="profile"
                    style={{backgroundColor: this.getRandomColor()}}
                  >
                    {eachData.website[0]}
                  </p>
                  <div className="website-name-password-container">
                    <p>{eachData.website}</p>
                    <p>{eachData.username}</p>
                    <p>
                      {onClickShowPasswords ? (
                        eachData.password
                      ) : (
                        <img
                          className="stars"
                          alt="stars"
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        />
                      )}
                    </p>
                  </div>
                  <button
                    className="delete-button"
                    data-testid="delete"
                    onClick={() => this.deletePassword(eachData.id)}
                  >
                    <img
                      className="delete-image"
                      alt="delete"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
