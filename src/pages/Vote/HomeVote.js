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

import './homeVote.css'

const { remoteVotersApi } = clients

const { routesWebApp } = webAppRoutes

const override = css`
  display: block;
  margin: 2px auto;
  border-color: black;
`

class HomeVote extends Component {

    state = {
        campaignCode: '',
        loader: false,
        errorMessage: '',
        validIndicator: ''
    }

    onChangeInput = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    searchCampaign = () => {
        if (this.state.campaignCode) {
            this.setState({ loader: true })

            remoteVotersApi.client
                .get(remoteVotersApi.endpoints.campaign.getByCode + this.state.campaignCode)
                .then(response => {
                    toast.success('Código de campanha válido!')
                    console.log(response.data)
                })
                .catch(response => {
                    toast.error('Código de campanha inválido')
                    this.setState({ loader: false })
                })
        }
    }

    lostFocus = () => {
        if (this.state.campaignCode) {
            this.setState({ validIndicator: 'is-valid' })
        } else {
            this.setState({ validIndicator: 'is-invalid' })
        }
    }

    render() {
        return (
            <form className="form-home-vote">
                <img src={logo} alt="RemoteVoters" width="200" height="200" />
                <h1 className="h3 mb-3 font-weight-normal">Informe o código da campanha</h1>
                <label htmlFor="campaignCode" className="sr-only">Código da campanha</label>
                <input type="text" id="campaignCode" onBlur={this.lostFocus} name="campaignCode" className={`form-control mb-3 ${this.state.validIndicator}`} placeholder="Código da campanha" value={this.state.campaignCode} required={true} autoFocus={true} onChange={this.onChangeInput} />

                <button style={{
                    display: this.state
                        .loader
                        ? 'none'
                        : 'block'
                }}
                    onClick={this.searchCampaign}
                    className="mb-5 btn btn-lg btn-primary btn-block"
                    type="button">Buscar</button>


                <FadeLoader
                    css={override}
                    heightUnit={'px'}
                    widthUnit={'px'}
                    height={20}
                    width={5}
                    radius={100}
                    margin={'2px'}
                    color='black'
                    loading={this.state.loader}
                />

                <Link to={routesWebApp.login}>Portal empresa</Link>
                <p className="mt-4 mb-3 text-muted">© 2020-2021 Helix Code</p>
                <Toast />
            </form>
        )
    }
}

HomeVote.propTypes = {
    history: PropTypes.object.isRequired
}

export default HomeVote