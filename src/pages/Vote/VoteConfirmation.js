import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import webAppRoutes from '../../routesWebApp'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Toast } from '../Util'

import logo from '../../images/logo.png'
import check from '../../images/check.png'
import './vote.css'

const { routesWebApp } = webAppRoutes

class VoteConfirmation extends Component {

    state = {
        campagin: {}
    }

    componentDidMount = () => {
        toast.success('Voto registrado com sucesso! Obrigado!')
    }

    redirectToInitial = () => {
        this.props.history.push({
            pathname: routesWebApp.initial
        })
    }

    static getDerivedStateFromProps(props, state) {
        state.campaign = props.location.state.campaign
        return null
    }

    render() {
        return (
            <div className="container mb-auto">
                <div className="pb-3 text-center">
                    <img className="d-block mx-auto" src={logo} alt="RemoteVoters" width="200" height="200" />
                    <div class="alert alert-success" role="alert">
                        <h4>Seu voto foi registrado com sucesso! Obrigado</h4>
                    </div>
                    <h4>Campanha: {this.state.campaign.Title} <br />Disponibilizada por: {this.state.campaign.CompanyName}</h4>
                    <p className="lead">{this.state.campaign.Description}</p>
                </div>
                <div className="row">
                    <div className="col-md-12 order-md-1">
                        <form className="needs-validation">
                            <img className="d-block mx-auto" src={check} alt="Confirmation" width="200" height="200" />

                            <hr className="mb-4" />
                            <button
                                className="btn mb-1 btn-success btn-lg btn-block"
                                onClick={this.redirectToInitial}
                                type="button">
                                Inicio
                            </button>
                        </form>
                    </div>
                </div>

                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">© 2020-2021 Helix Code</p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><Link to={routesWebApp.login}>Portal</Link></li>
                        <li className="list-inline-item"><a target="_blank" href="https://fstrony.github.io">Suporte</a></li>
                    </ul>
                </footer>
                <Toast />
            </div >
        )
    }
}

VoteConfirmation.propTypes = {
    history: PropTypes.object.isRequired
}

export default VoteConfirmation