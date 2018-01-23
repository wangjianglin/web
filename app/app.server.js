
import React from 'react';
//module.exports = require('./common/containers/Root')
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'


import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


import Header from './common/components/Header'
import Navbar from './common/components/Navbar'
import Main from './common/components/Main'

import Home from './home/containers/App'
import About from './about/containers/App'
import Explore from './explore/containers/App'

import actions from './common/actions'

const App = () => (
  <Router>
                <div>

            
                <Header/>
                <Navbar/>
                <Main>
                </Main>

            </div>
            </Router>
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
)(App)


// export default App


// import {render} from 'react-dom';
//  import React from 'react'
// import {
//   Route,
//   Link
// } from 'react-router-dom'

// const App = () => (
//     <div>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/topics">Topics</Link></li>
//       </ul>

//       <hr/>

//       <Route exact path="/" component={Home}/>
//       <Route path="/about" component={About}/>
//       <Route path="/topics" component={Topics}/>
//     </div>
// )

// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )

// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// )

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic}/>
//     <Route exact path={match.url} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )

// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )

// //render(<BasicExample/>, document.getElementById('app'));
// export default App