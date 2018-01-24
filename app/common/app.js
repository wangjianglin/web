import React, {Children, Component, cloneElement} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'

import Header from './components/Header'
import Navbar from './components/Navbar'
import Main from './components/Main'
import actions from './actions'
import styles from './sass/app'
import './sass/global'

class App extends Component {
    constructor() {
        super()
    }

    render() {
        const {children, ...props} = this.props

        return (
            <div className={styles.app}>

            
                <Header/>
                <Navbar/>
                <Main>
                    {Children.map(children, child =>
                        cloneElement(child, {...props})
                    )}
                </Main>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
