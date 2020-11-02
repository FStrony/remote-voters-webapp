import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { FadeLoader } from 'react-spinners'
import webAppRoutes from '../../routesWebApp'
import PropTypes, { element } from 'prop-types'
import { toast } from 'react-toastify'
import { Toast } from '../Util'
import axios from 'axios'
import ObjectID from 'bson-objectid'

import clients from '../../clients'
import logo from '../../images/logo.png'


import './authVote.css'

const { remoteVotersApi } = clients

const { routesWebApp } = webAppRoutes

const override = css`
  display: block;
  margin: 2px auto;
  border-color: black;
`
class AuthVote extends Component {
    state = {
        authenticated: false,
        campaign: {},
        loader: false,
        selectedOption: null,
        identity: null
    }

    static getDerivedStateFromProps(props, state) {
        state.campaign = props.location.state.campaign
        if (!state.campaign.auth) {
            state.authenticated = true
        }
//TODO
        console.log(ObjectID(state.campaign.id))
        console.log(state.campaign.id)
        return null
    }

    requestVoter = (e) => {
        e.preventDefault();
        this.setState({ loader: true }) 

        if (this.state.authenticated) {

            var requestBody = {
                VoterIdentity: this.state.identity,
                CampaignId: this.state.campaign.id,
                CompanyId: this.state.campaign.companyId,
                CampaignOptionId: this.state.campaign.campaignOptions[this.state.selectedOption].id
            } 
            // TODO
            remoteVotersApi.client
                .post(remoteVotersApi.endpoints.vote.register, requestBody)
                .then(response => {
                    console.log("Success " + response)
                })
                .catch(response => {
                    console.log("Error " + response)
                    toast.error('Occoreu um erro, tente novamente!')
                    this.setState({ loader:false})
                })

        } else {

            let count = 0
            var body = {}
            this.state.campaign.fieldsName.forEach(element => {
                body[element] = document.getElementById(`${count}`).value
                count++
            })
    
            axios.post(this.state.campaign.urlAuth, body)
                .then(response => {
                    if (response.data) {
                        toast.success('Autenticação realizada com sucesso!')
                        this.setState({ identity: body, authenticated: true, loader: false})
                    } else {
                        toast.warn('Dados inválidos!')
                        toast.setState({ loader:false})
                    }
                })
                .catch(response => {
                    toast.error('Occoreu um erro durante a autenticação!')
                    toast.setState({ loader:false})
                })
        }
    }

    lostFocus = (e) => {
        if (e.target.value) {
            e.target.className = 'form-control is-valid'
        } else {
            e.target.className = 'form-control is-invalid'
        }
    }

    onChangeSelect = (e) => {
        this.setState({ selectedOption: e.currentTarget.value })
    }

    render() {
        let fields = []
        let count = 0;
        if (!this.state.authenticated && this.state.campaign.fieldsName.length > 0 && this.state.campaign.urlAuth) {
            this.state.campaign.fieldsName.forEach(element => {
                fields.push(
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor={count}>{element}</label>
                            <input type="text" className="form-control" onBlur={this.lostFocus} id={count} name={element} placeholder={element} required={true} />
                        </div>
                    </div>
                )
                count++
            })
        } else {
            this.state.campaign.campaignOptions.forEach(element => {
                fields.push(
                    <div className="d-block my-3">
                        <div className="custom-control custom-radio">
                            <input id={count} name="voteOption" type="radio" className="custom-control-input" value={count} required={true} onChange={this.onChangeSelect}/>
                            <label className="custom-control-label" htmlFor={count}>{element.description}</label>
                        </div>
                    </div>
                )
                count++
            })
        }

        let text_to_display = ""
        let to_display = ""
        let btnText = ""
        if (this.state.authenticated) {
            text_to_display = "Opções de voto"
            btnText = "Votar"
            to_display = fields
        } else {
            text_to_display = "Dados para autenticação"
            btnText = "Autenticar"
            to_display = fields
        }


        return (
            <div className="container mb-auto">
                <div className="pb-3 text-center">
                    <img className="d-block mx-auto" src={logo} alt="RemoteVoters" width="200" height="200" />
                    <h2>Campanha: {this.state.campaign.title} <br />Disponibilizada por: {this.state.campaign.companyName}</h2>
                    <p className="lead">{this.state.campaign.description}</p>
                </div>
                <div className="row">
                    <div className="col-md-12 order-md-1">
                        <h4 className="mb-3">{text_to_display}</h4>
                        <form className="needs-validation" onSubmit={this.requestVoter}>
                            {to_display}
                            <hr className="mb-4" />
                            <button
                                style={{
                                    display: this.state.loader ? 'none' : 'block'
                                }}
                                className="btn mb-1 btn-primary btn-lg btn-block"
                                type="submit">
                                {btnText}
                            </button>
                        </form>
                    </div>
                </div>
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

                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">© 2020-2021 Helix Code</p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><Link to={routesWebApp.login}>Portal</Link></li>
                        <li className="list-inline-item"><a target="_blank" href="https://fstrony.github.io">Suporte</a></li>
                    </ul>
                </footer>
                <Toast />
            </div>
        )
    }
}

AuthVote.propTypes = {
    history: PropTypes.object.isRequired
}

export default AuthVote