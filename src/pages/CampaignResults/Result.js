import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { FadeLoader } from 'react-spinners'
import webAppRoutes from '../../routesWebApp'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Toast } from '../Util'
import { format } from 'react-string-format'
import { GoogleCharts } from 'google-charts'

import clients from '../../clients'
import logo from '../../images/logo.png'

import './result.css'

const { remoteVotersApi } = clients

const { routesWebApp } = webAppRoutes

var $chrt_main = '#41719c'
var $chrt_second = '#4c84b6'
var $chrt_third = '#5694cb'
var $chrt_fourth = '#7aa9da'
var $chrt_fifth = '#a4c0e3'
var $chrt_mono = '#c4d5eb'

const colors = {
    0: { color: $chrt_main },
    1: { color: $chrt_second },
    2: { color: $chrt_third },
    3: { color: $chrt_fourth },
    4: { color: $chrt_fifth },
    5: { color: $chrt_mono }
}

const override = css`
  display: block;
  margin: 2px auto;
  border-color: black;
`

class Result extends Component {
    state = {
        companyId: '',
        campaignId: '',
        title: '',
        description: '',
        campaignResult: [],
        loader: true
    }

    static getDerivedStateFromProps(props, state) {
        state.companyId = props.location.state.companyId
        state.campaignId = props.location.state.campaignId
        return null
    }

    componentDidMount = () => {
        remoteVotersApi.client
            .get(format(remoteVotersApi.endpoints.campaign.result, this.state.companyId, this.state.campaignId))
            .then(response => {
                this.setState({
                    loader: false,
                    campaignResult: response.data.VoteSummary,
                    title: response.data.Campaign.Title,
                    description: response.data.Campaign.Description
                })
                console.log(this.state.campaignResult[0].Description)
                console.log(this.state.campaignResult[0].TotalVotes)
                GoogleCharts.load(this.composeGraph)
            }).catch(response => {
                toast.error('Ocorreu um erro! Tente novamente!')
                this.setState({
                    loader: false
                })
            })
    }

    composeGraph = () => {
        const list = this.state.campaignResult
        let itens = [['Opção de voto', 'Total de votos', { role: 'style' }]]
        list.map(op => {
            itens.push([op.Description, op.TotalVotes, `color: ${$chrt_main}`])
        })

        var data = GoogleCharts.api.visualization.arrayToDataTable(itens)

        var options = {
            legend: { position: 'bottom', alignment: 'center' },
            chartArea: { width: '60%' },
            hAxis: {
                minValue: 0
            },
            vAxis: {}
        }

        var chart = new GoogleCharts.api.visualization.ColumnChart(
            document.getElementById('chart1')
        )

        chart.draw(data, options)
    }

    render() {
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
                                        pathname: routesWebApp.dashboard.home,
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
                        <h1>Resultados da votação</h1>
                        <br />
                        <h4>Campanha: {this.state.title} <br /></h4>
                        <p className="lead">{this.state.description}</p>

                        <br />
                        <div
                            id='chart1'
                            className='chart no-padding'
                            style={{
                                height: '350px',
                                display: this.state.loader ? 'none' : 'block'
                            }}
                        />
                    </div>
                </main>

                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">© 2020-2021 Helix Code</p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><a target="_blank" href="https://fstrony.github.io">Suporte</a></li>
                    </ul>
                </footer>
                <Toast />
            </div>
        )
    }
}

Result.propTypes = {
    history: PropTypes.object.isRequired
}

export default Result