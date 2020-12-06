import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { Toast } from '../Util'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

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
        loader: false,
        loaderModal: false,
        isRegistrationModalOpen: false,


        companyName: '',
        cnpj: '',
        address1: '',
        address2: '',
        postCode: '',
        state: '',
        city: '',
        country: '',
        registration_email: '',
        registration_password: ''
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
                        pathname: routesWebApp.dashboard.home,
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

    closeRegistrationModal = () => {
        this.setState({
            isRegistrationModalOpen: false
        })
        this.clearModelFields()
    }

    openRegistrationModal = () => {
        this.setState({
            isRegistrationModalOpen: true
        })
    }

    clearModelFields = () => {
        this.setState({
            companyName: '',
            cnpj: '',
            address1: '',
            address2: '',
            postCode: '',
            state: '',
            city: '',
            country: '',
            registration_email: '',
            registration_password: ''
        })
    }

    validateMandatoryFields = () => {

        if (!this.state.companyName)
            return false

        if (!this.state.cnpj)
            return false

        if (!this.state.address1)
            return false

        if (!this.state.postCode)
            return false

        if (!this.state.country)
            return false

        if (!this.state.city)
            return false

        if (!this.state.state)
            return false

        if (!this.state.registration_email)
            return false

        if (!this.state.registration_password)
            return false

        return true;
    }

    saveCompany = () => {
        this.setState({ loaderModal: true })
        if (this.validateMandatoryFields()) {

            var companyModel = {
                companyName: this.state.companyName,
                cnpj: this.state.cnpj,
                address1: this.state.address1,
                address2: this.state.address2,
                postCode: this.state.postCode,
                state: this.state.state,
                city: this.state.city,
                country: this.state.country,
                email: this.state.registration_email,
                password: this.state.registration_password
            }

            remoteVotersApi.client
                .post(remoteVotersApi.endpoints.company.create, companyModel)
                .then(response => {

                    toast.success('Conta criada com sucesso!')
                    this.closeRegistrationModal()

                }).catch(response => {
                    toast.error('Occoreu um erro, tente novamente!')
                })

        } else {
            toast.warn("Por favor, preencha os campos obrigatórios!")
        }
        this.setState({ loaderModal: false })
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
                    <br />
                    <Link to={"#"} onClick={this.openRegistrationModal}>Cadastre-se</Link>
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

                <Modal show={this.state.isRegistrationModalOpen} onHide={this.closeRegistrationModal}>
                    <Modal.Header>
                        <Modal.Title>Cadastrar nova empresa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container mb-auto">
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <input type="text" className="form-control" id="companyName" name="companyName" onBlur={this.lostFocus} placeholder="Razão Social" value={this.state.companyName} onChange={this.onChangeInput} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <input type="text" className="form-control" id="cnpj" name="cnpj" onBlur={this.lostFocus} placeholder="CNPJ" value={this.state.cnpj} onChange={this.onChangeInput} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <input type="text" className="form-control" id="address1" name="address1" onBlur={this.lostFocus} placeholder="Endereço 1" value={this.state.address1} onChange={this.onChangeInput} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <input type="text" className="form-control" id="address2" name="address2" placeholder="Endereço 2 (Opcional)" value={this.state.address2} onChange={this.onChangeInput} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" id="postCode" name="postCode" onBlur={this.lostFocus} placeholder="CEP" value={this.state.postCode} onChange={this.onChangeInput} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" id="country" name="country" onBlur={this.lostFocus} placeholder="País" value={this.state.country} onChange={this.onChangeInput} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" id="city" name="city" onBlur={this.lostFocus} placeholder="Cidade" value={this.state.city} onChange={this.onChangeInput} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" id="state" name="state" onBlur={this.lostFocus} placeholder="Estado" value={this.state.state} onChange={this.onChangeInput} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <input type="email" className="form-control" onBlur={this.lostFocus} id="registration_email" name="registration_email" placeholder="Email" value={this.state.registration_email} onChange={this.onChangeInput} />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <input type="password" className="form-control" onBlur={this.lostFocus} id="registration_password" name="registration_password" placeholder="Senha" value={this.state.registration_password} onChange={this.onChangeInput} />
                                </div>
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <FadeLoader
                            css={override}
                            heightUnit={'px'}
                            widthUnit={'px'}
                            height={20}
                            width={5}
                            radius={100}
                            margin={'1px'}
                            color='black'
                            loading={this.state.loaderModal}
                        />
                        <button type='button' className='btn btn-danger' onClick={this.closeRegistrationModal} hidden={this.state.loaderModal}>Cancelar</button>&nbsp;
                        <button type='button' className='btn btn-primary' onClick={this.saveCompany} hidden={this.state.loaderModal}>Salvar</button>

                    </Modal.Footer>
                </Modal>

                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">© 2020-2021 Helix Code</p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><a target="_blank" href="https://fstrony.github.io">Suporte</a></li>
                    </ul>
                </footer>
            </form >
        )
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired
}

export default Login