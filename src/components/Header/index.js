import {Component} from 'react'

import {Link} from 'react-router-dom'

import {MdOutlineMenuOpen, MdOutlineClose} from 'react-icons/md'

import './index.css'

class Header extends Component {
  state = {showMenu: false, currentPath: '', inputText: ''}

  componentDidMount() {
    const path = window.location.pathname
    this.setState({currentPath: path})
  }

  onClickShowMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onClickSearch = () => {
    const {onSearchInput} = this.props
    const {inputText} = this.state

    if (inputText !== '') {
      onSearchInput(inputText)
    }
  }

  onEnterSearchInput = event => {
    const {onSearchInput} = this.props
    const {inputText} = this.state
    if (event.key === 'Enter' && inputText !== '') {
      onSearchInput(inputText)
    }
  }

  render() {
    const {showMenu, currentPath} = this.state
    const popularClassName = currentPath === '/' && 'active'
    const topRatedClassName = currentPath === '/top-rated' && 'active'
    const upcomingClassName = currentPath === '/upcoming' && 'active'

    return (
      <nav className="navbar-header">
        <div className="responsive-navbar">
          <div className="navbar-container">
            <Link to="/" className="nav-link">
              <h1 className="navbar-title">
                movie<span className="span-element">DB</span>
              </h1>
            </Link>
            <div className="navbar-links">
              <Link to="/" className="nav-link">
                <h1 className={`navbar-link ${popularClassName}`}>Popular</h1>
              </Link>
              <Link to="/top-rated" className="nav-link">
                <h1 className={`navbar-link ${topRatedClassName}`}>
                  Top Rated
                </h1>
              </Link>
              <Link to="/upcoming" className="nav-link">
                <h1 className={`navbar-link ${upcomingClassName}`}>Upcoming</h1>
              </Link>
            </div>
          </div>
          <div className="navbar-container">
            <div className="search-container">
              <Link to="/search" className="nav-link">
                <input
                  type="text"
                  className="search-input"
                  onChange={this.onChangeInput}
                  onKeyDown={this.onEnterSearchInput}
                  placeholder="Search by Movie Name"
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onClickSearch}
                >
                  Search
                </button>
              </Link>
            </div>
            <button
              className="menu-bar"
              type="button"
              onClick={this.onClickShowMenu}
            >
              {showMenu ? (
                <MdOutlineClose size={22} />
              ) : (
                <MdOutlineMenuOpen size={22} />
              )}
            </button>
          </div>
        </div>
        {showMenu && (
          <ul className="mini-list">
            <Link to="/" className="nav-link">
              <li className={`mini-list-item ${popularClassName}`}>Popular</li>
            </Link>
            <Link to="/top-rated" className="nav-link">
              <li className={`mini-list-item ${topRatedClassName}`}>
                Top Rated
              </li>
            </Link>
            <Link to="/upcoming" className="nav-link">
              <li className={`mini-list-item ${upcomingClassName}`}>
                Upcoming
              </li>
            </Link>
          </ul>
        )}
      </nav>
    )
  }
}

// <li className="mini-list-item">
//   <button type="button" onClick={this.onClickShowMenu} className="close-button">
//     <AiFillCloseCircle size={22} />
//   </button>
// </li>

export default Header
