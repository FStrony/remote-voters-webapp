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

    searchCampaign = (e) => {
        e.preventDefault();
        if (this.state.campaignCode) {
            this.setState({ loader: true })

            remoteVotersApi.client
                .get(remoteVotersApi.endpoints.campaign.getByCode + this.state.campaignCode)
                .then(response => {

                    this.setState({ loader: false })
                    if (response.data.status) {
                        toast.success('Código de campanha válido!')
                        this.props.history.push({
                            pathname: routesWebApp.vote.detail,
                            state: {
                                campaign: response.data
                            }
                        })
                    } else {
                        toast.warn('Essa campanha de votação ainda não começou!')
                    }
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
            <form className="form-home-vote needs-validation" onSubmit={this.searchCampaign}>
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
                    className="mb-5 btn btn-lg btn-primary btn-block"
                    type="submit">Buscar</button>


                <FadeLoader
                    css={override}
                    heightUnit={'px'}
                    widthUnit={'px'}
                    height={20}
                    width={5}
                    radius={100}
                    margin={'1px'}
                    color='black'
                    loading={this.state.loader}
                />
                <Toast />

                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">© 2020-2021 Helix Code</p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><Link to={routesWebApp.login}>Portal</Link></li>
                        <li className="list-inline-item"><a target="_blank" href="https://fstrony.github.io">Suporte</a></li>
                    </ul>
                </footer>
            </form>
        )
    }
}

HomeVote.propTypes = {
    history: PropTypes.object.isRequired
}

export default HomeVote