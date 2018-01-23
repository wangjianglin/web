import React, {Component} from 'react'
// import {IndexLink, Link} from 'react-router'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import styles from '../sass/Navbar'
class Navbar extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <nav className={styles.navbar}>
            <ul>
               <li><Link to="/">home</Link></li>
        <li><Link to="/explore">explore</Link></li>
        <li><Link to="/about">about</Link></li>
        <li><Link to="/topics">topics</Link></li>
        </ul>
            </nav>
        )
    }
}

export default Navbar
