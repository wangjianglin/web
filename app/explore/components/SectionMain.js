import React, {Component} from 'react'
// import styles from '../sass/SectionMain'

class SectionMain extends Component {
    constructor() {
        super()
    }

    handleFetch() {
        const {actions} = this.props

        actions.fetchUserInfo()
    }

    handleClear() {
        const {actions} = this.props

        actions.clearUserInfo()
    }

    render() {
        const {userInfo} = this.props

        return (
            <section>
                Explore
                <a href="javascript:void(0)"
                    onClick={this.handleFetch.bind(this)}>
                    Fetch Data
                </a>
                <a href="javascript:void(0)"
                                    onClick={this.handleClear.bind(this)}>
                    Clear
                </a>
                <br/>
                <span>{userInfo && JSON.stringify(userInfo)}</span>
            </section>
        )
    }
}

export default SectionMain
