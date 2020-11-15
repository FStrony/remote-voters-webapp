import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { Toast } from '../Util'

import webAppRoutes from '../../routesWebApp'
import clients from '../../clients'
import logo from '../../images/logo.png'

import './login.css'

const { remoteVotersApi } = clients

const { routesWebApp } = webAppRoutes

const override = css`
  display: block;
  margin: 2px auto;
  border-color: black;
`

class Login extends Component {
    state = {
        email: '',
        password: '',
        keepLoggedIn: false,
        loader: false
    }

    login = (e) => {
        e.preventDefault();

        this.setState({
            loader: true
        })

        var requestBody = {
            Email: this.state.email,
            Password: this.state.password
        }

        remoteVotersApi.client
            .post(remoteVotersApi.endpoints.authentication, requestBody)
            .then(response => {

                this.setState({
                    loader: false
                })

                if (response.data) {
                    toast.success('Login realizado com sucesso')

                    this.props.history.push({
                        pathname: routesWebApp.dashboard,
                        state: {
                            companyId: response.data
                        }
                    })
                } else {
                    toast.error('Email/Senha inválidos!')
                }
            }).catch(response => {
                toast.error('Occoreu um erro, tente novamente!')

                this.setState({
                    loader: false,
                })
            })
    }

    onChangeInput = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    lostFocus = (e) => {
        if (e.target.value) {
            e.target.className = 'form-control is-valid'
        } else {
            e.target.className = 'form-control is-invalid'
        }
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.login}>
                <img src={logo} alt="RemoteVoters" width="200" height="200" />
                <h1 className="h3 mb-3 font-weight-normal">Por favor, efetue o login</h1>
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="Email" onBlur={this.lostFocus} value={this.state.email} required={true} autoFocus={true} onChange={this.onChangeInput} />
                <label htmlFor="password" className="sr-only">Senha</label>
                <input type="password" id="password" name="password" className="form-control" onBlur={this.lostFocus} placeholder="Senha" value={this.state.password} required={true} onChange={this.onChangeInput} />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value={this.state.keepLoggedIn} /> Manter logado
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" style={{
                    display: this.state
                        .loader
                        ? 'none'
                        : 'block'
                }}>Login</button>
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
                <p className="mt-5 mb-3 text-muted">© 2020-2021 Helix Code</p>
            </form>
        )
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired
}

export default Login