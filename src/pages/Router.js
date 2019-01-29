import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom"
import HomePage from './HomePage';
import UserProfilePage from './UserProfilePage';
import MyProfilePage from './MyProfilePage';

export default class Router extends React.Component {
    render(){
        const {users}=this.props
        return(
        <Switch>
            <Route exact path="/" component={props=><HomePage users={users} {...props}/>}/>
            <Route path="/users/me" component={MyProfilePage}/>
            <Route path="/users/:id" component={props=><UserProfilePage users={users} {...props}/>}/>
        </Switch>
        )
    }
}