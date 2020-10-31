import React, { Component } from 'react'
import { Login } from '../Login'
import Private from './Private'
import { Switch, Route } from 'react-router'

class Shell extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route path='/' component={Private} />
            </Switch>
        )
    }
}

export default Shell