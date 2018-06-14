import React, {Component} from 'react'
// import styles from '../sass/Header'
var styles = require('../sass/Header')
// import imgAvatar from '../assets/avatar.png'
var imgAvatar = require('../assets/avatar.png')

class Header extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <header className={styles.header}>
                <div className={styles.left}>
                    <span className={styles.span}>CESS</span>
                </div>
                <div className={styles.right}>
                    <span className={styles.description}>Hello, world！</span>
                    <a href="/oauth2/logout">注销</a>
                    <img className={styles.img} src={imgAvatar}/>
                </div>
            </header>
        )
    }
}

export default Header
