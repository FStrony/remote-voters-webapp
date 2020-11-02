import React, { Component } from 'react'
import { Login } from '../Login'
import { HomeVote, AuthVote } from '../Vote'
import Private from './Private'
import { Switch, Route } from 'react-router'
import webAppRoutes from '../../routesWebApp'

const { routesWebApp } = webAppRoutes

class Shell extends Component {
    render() {
        //<Route path='/' component={Private} />
        return (
            <Switch>
                <Route exact path={routesWebApp.initial} component={HomeVote} />
                <Route exact path={routesWebApp.vote.detail} component={AuthVote} />
                <Route exact path={routesWebApp.login} component={Login} />       
            </Switch>
        )
    }
}

export default Shell