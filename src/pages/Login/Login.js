import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import clients from '../../clients'
import logo from '../../images/logo.png'

import './login.css'

const {
    remoteVotersApi: { client, endpoints }
} = clients

class Login extends Component {
    state = {
        email: '',
        password: '',
        keepLoggedIn: false,
        errorMessage: ''
    }

    onChangeInput = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    render() {
        return (
            <form className="form-signin">
                <img src={logo} alt="RemoteVoters" width="200" height="200" />
                <h1 className="h3 mb-3 font-weight-normal">Por favor, efetue o login</h1>
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="Email" value={this.state.email} required="true" autoFocus="true" onChange={this.onChangeInput} />
                <label htmlFor="password" className="sr-only">Senha</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Senha" value={this.state.password} required="true" onChange={this.onChangeInput} />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value={this.state.keepLoggedIn} /> Manter logado
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                <p className="mt-5 mb-3 text-muted">© 2020-2021 Helix Code</p>
            </form>
        )
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired
}

export default Login