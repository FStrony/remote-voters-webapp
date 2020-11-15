import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { FadeLoader } from 'react-spinners'
import webAppRoutes from '../../routesWebApp'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Toast } from '../Util'

import clients from '../../clients'
import logo from '../../images/logo.png'

const { remoteVotersApi } = clients

const { routesWebApp } = webAppRoutes

const override = css`
  display: block;
  margin: 2px auto;
  border-color: black;
`
class Dashboard extends Component {

    render() {
        return (<h1>Dashboard TO DO</h1>)
    }

}

Dashboard.propTypes = {
    history: PropTypes.object.isRequired,
    companyId: PropTypes.string.isRequired
}

export default Dashboard