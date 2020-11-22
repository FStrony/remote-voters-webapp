import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { FadeLoader } from 'react-spinners'
import webAppRoutes from '../../routesWebApp'
import PropTypes, { element } from 'prop-types'
import { toast } from 'react-toastify'
import { Toast } from '../Util'
import { Pencil, Trash, Receipt, Lock, Unlock } from 'react-bootstrap-icons';
import { format } from 'react-string-format'

import clients from '../../clients'
import logo from '../../images/logo.png'

import './dashboard.css'

const { remoteVotersApi } = clients

const { routesWebApp } = webAppRoutes

const override = css`
  display: block;
  margin: 2px auto;
  border-color: black;
`
class Dashboard extends Component {
    state = {
        companyId: '',
        loader: true,
        campaigns: []
    }

    static getDerivedStateFromProps(props, state) {
        state.companyId = props.location.state.companyId
        return null
    }

    componentDidMount = () => {
        this.getCampaign()
    }

    getCampaign = () => {
        this.setState({ loader: true })
        remoteVotersApi.client
            .get(remoteVotersApi.endpoints.campaign.getAllByCompanyId + this.state.companyId)
            .then(response => {
                this.setState({
                    campaigns: response.data,
                    loader: false
                })
                console.log(this.state.campaigns)
            }).catch(response => {
                toast.error('Ocorreu um erro! Tente novamente!')
                this.setState({
                    loader: false
                })
            })
    }

    activateCampaign = (campaignId) => {
        remoteVotersApi.client
            .put(format(remoteVotersApi.endpoints.campaign.activate, this.state.companyId, campaignId))
            .then(response => {
                toast.success('Campanha ativada com sucesso!')
                this.getCampaign()
            }).catch(response => {
                toast.error('Occoreu um erro! Tente novamente!')
            })
    }

    deactivateCampaign = (campaignId) => {
        remoteVotersApi.client
            .put(format(remoteVotersApi.endpoints.campaign.deactivate, this.state.companyId, campaignId))
            .then(response => {
                toast.success('Campanha desativada com sucesso!')
                this.getCampaign()
            }).catch(response => {
                toast.error('Occoreu um erro! Tente novamente!')
            })
    }

    deleteCampaign = (campaignId) => {
        remoteVotersApi.client
            .delete(format(remoteVotersApi.endpoints.campaign.delete, this.state.companyId, campaignId))
            .then(response => {
                toast.success('Campanha deletada com sucesso!')
                this.getCampaign()
            }).catch(response => {
                toast.error('Occoreu um erro! Tente novamente!')
            })
    } 

    render() {

        let to_display = []
        if (this.state.campaigns.length > 0) {
            to_display = []
            this.state.campaigns.forEach(c => {
                to_display.push(
                    <tr>
                        <td>{c.CampaignCode}</td>
                        <td>{c.Title}</td>
                        <td>
                            {c.Status ? 'Ativo' : 'Desativado'}
                        </td>
                        <td>
                            <button type="button" class="btn btn-dark btn-sm mr-1" title="Editar">
                                <Pencil aria-hidden="true" />
                            </button>
                            <button type="button" class="btn btn-dark btn-sm mr-1" title="Resultados da votação">
                                <Receipt aria-hidden="true" />
                            </button>

                            {c.Status ?
                                (
                                    <button type="button" class="btn btn-dark btn-sm mr-1" title="Desativar" onClick={() => this.deactivateCampaign(c.Id)}>
                                        <Lock aria-hidden="true" />
                                    </button>
                                ) : (
                                    <button type="button" class="btn btn-dark btn-sm mr-1" title="Ativar" onClick={() => this.activateCampaign(c.Id)}>
                                        <Unlock aria-hidden="true" />
                                    </button>
                                )
                            }
                            <button type="button" class="btn btn-dark btn-sm" title="Deletar" onClick={() => this.deleteCampaign(c.Id)}>
                                <Trash aria-hidden="true" />
                            </button>
                        </td>
                    </tr>
                )
            });
        } else {
            to_display = []
            to_display.push(
                <tr>
                    <td colSpan={4}> Nenhuma campanha cadastra</td>
                </tr>
            )
        }

        return (
            <div className="d-flex flex-column h-100" style={{
                width: '100%'
            }}>
                <header>
                    <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light pb-0 pt-0">
                        <a className="navbar-brand mb-0 pb-0 h1" href="https://fstrony.github.io" target="_blank"><img src={logo} alt="RemoteVoters" width="50" height="50" loading="lazy" /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to={{
                                        pathname: routesWebApp.dashboard,
                                        state: {
                                            companyId: this.state.companyId
                                        }
                                    }}>Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Cadastrar Campanha</a>
                                </li>
                            </ul>
                            <form className="form-inline mt-2 mt-md-0">
                                <Link className="btn btn-outline-dark my-2 my-sm-0" to={routesWebApp.login}>Logout</Link>
                            </form>
                        </div>
                    </nav>
                </header>

                <main role="main" className="flex-shrink-0">
                    <div className="container">
                        <p>{this.state.loader}</p>
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

                        <table class="table table-striped" >
                            <thead>
                                <tr>
                                    <th scope="col">Codigo da Campanha</th>
                                    <th scope="col">Titulo</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {to_display}
                            </tbody>
                        </table>

                    </div>
                </main>

                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1 text-muted">© 2020-2021 Helix Code</p>
                </footer>
                <Toast />
            </div>
        )
    }

}

Dashboard.propTypes = {
    history: PropTypes.object.isRequired
}

export default Dashboard