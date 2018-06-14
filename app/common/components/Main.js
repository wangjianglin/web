import React, {Component} from 'react'
import styles from '../sass/Main'

import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'

import Home from '../../home/containers/App'
// import About from '../../about/containers/App'
// import Explore from '../../explore/containers/App'

import Loadable from 'react-loadable';


const About = Loadable({
  // loader: () => import('../../explore/containers/App'),
  loader: () => {
    return new Promise((resolve, reject) =>
            require.ensure(
               ['../../about/containers/App'],
               (require) => resolve(require('../../about/containers/App')),
               (error) =>reject(error),
               'dashboardChunk1'
            )
         )
  },
  loading() {
    return <div>Loading...</div>
  }
});

//new Promise((resolve) =>
//   require.ensure(['path/to/module'], () =>
//     resolve(require('path/to/module'))
//   , 'modulename')
// ).then(doStuff)

const Explore = Loadable({
  // loader: () => import('../../explore/containers/App'),
  loader: () => {
    return new Promise((resolve, reject) =>
            require.ensure(
               ['../../explore/containers/App'],
               (require) => resolve(require('../../explore/containers/App')),
               (error) =>reject(error),
               'dashboardChunk'
            )
         )
  },
  loading() {
    return <div>Loading...</div>
  }
});

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import actions from '../actions'

class Main extends Component {
    constructor() {
        super()
    }

    render() {
        const {children} = this.props

        return (
            <main className={styles.main}>
  
            <Switch>
                <Route path="/explore" component={Explore}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
                <Route path="/" component={Home}/>
                </Switch>
  
            
            </main>
        )
    }
}

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)


function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

// export default Main


//
//       <Route path="/topics" component={Topics}/>