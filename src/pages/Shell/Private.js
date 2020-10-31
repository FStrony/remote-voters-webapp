import React, { Component } from 'react'
import PropTypes from 'prop-types'
import webAppRoutes from '../../routesWebApp'
import { Route, Link, Redirect } from 'react-router-dom'
import { Toast } from '../Helpers'

const { routesWebApp } = webAppRoutes

class Private extends Component {

    render() {
        return (
            <h1>Test</h1>
        )
    }

}

Private.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

export default Private