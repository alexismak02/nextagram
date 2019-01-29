import React, {Component} from 'react';
import {Route, Switch, Link} from "react-router-dom";
import './App.css';
import axios from 'axios';
import Navbar from './components/NavBar';
import Loader from './components/Loader';
import LoginModal from './containers/LoginModal';
import SignUpModal from './containers/SignUpModal';
import Router from './pages/Router';


class App extends React.Component {
  state = {
    users: [],
    load: true,
    hasErrors: false,
    loginModal: false,
    signupModal: false,
  }

  refreshApp=()=>{
    this.forceUpdate()
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'https://insta.nextacademy.com/api/v1/users',
    })

    .then(result=>{
      const {users,load}=this.state
      this.setState({
        users: result.data,
        load: !load,
      });
    })


    .catch(error=>{
      console.log('ERROR: ',error.response.data)
      const {hasErrors}=this.state
      this.setState({
        hasErrors: !hasErrors,
      })
    })
  }

  

  render(){
    const {users,load,loginModal,signupModal}=this.state
    return(
      <>
        <Navbar refreshApp={this.refreshApp}/>
        <Loader load={load}/>
        <LoginModal loginModal={loginModal}/>
        <SignUpModal signupModal={signupModal}/>
        <Router users={users}/>
      </>
    )
  }
}
export default App;

