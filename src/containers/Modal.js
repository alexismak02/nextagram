import React, {Component} from 'react';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';

export default class Modal extends React.Component {
    state={
        logIn: true,
    };

    toggleLogin=()=>{
        const {logIn}=this.state
        this.setState({
            logIn: !logIn
        })
    }
    
    render(){
        const {showModal, toggle, toggleNotice}=this.props
        const {logIn}=this.state

        return(
            <>
                {logIn?<LoginModal showModal={showModal} toggle={toggle} toggleLogin={this.toggleLogin}/>:<SignUpModal showModal={showModal} toggle={toggle} toggleLogin={this.toggleLogin}/>}
            </>
        )
    }
}
