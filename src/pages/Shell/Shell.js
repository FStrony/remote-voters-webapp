import React, { Component } from 'react'
import { Login } from '../Login'
import { HomeVote } from '../Vote'
import Private from './Private'
import { Switch, Route } from 'react-router'

class Shell extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={HomeVote} />
                <Route exact path='/login' component={Login} />
                <Route path='/' component={Private} />
            </Switch>
        )
    }
}

export default Shell