import React, { Component } from 'react'
import { Login } from '../Login'
import { HomeVote, Vote, VoteConfirmation } from '../Vote'
import { Dashboard } from '../Dashboard'
import { Switch, Route } from 'react-router'
import webAppRoutes from '../../routesWebApp'

const { routesWebApp } = webAppRoutes

class Shell extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={routesWebApp.initial} component={HomeVote} />
                <Route exact path={routesWebApp.vote.detail} component={Vote} />
                <Route exact path={routesWebApp.vote.confirmation} component={VoteConfirmation} />
                <Route exact path={routesWebApp.login} component={Login} />  

                <Route exact paht={routesWebApp.dashboard} component={Dashboard} />     
            </Switch>
        )
    }
}

export default Shell