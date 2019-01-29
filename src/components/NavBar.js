import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from '../components/logo.png';
import Modal from '../containers/Modal';
import {Navbar, NavbarBrand, Nav, NavItem, Button, FormGroup, Input} from 'reactstrap';

export default class NavBar extends React.Component {
    state={
        showModal: false,
    };
    
    //Toggle modal
    toggle=()=>{
        const {showModal}=this.state
        this.setState({
            showModal: !showModal,
        });
    }

    //Remove user from local storage
    handleLogout=()=>{
        localStorage.removeItem('jwt')
        this.props.refreshApp()
    }

    render(){
        const {showModal}=this.state
        
        return(
            <>
            {showModal?<Modal showModal={showModal} toggle={this.toggle}/>:null}
            <Navbar color="dark" light expand="md">
                <NavbarBrand href="#" style={{color:"rgb(203, 218, 244)"}}>
                    <img src={logo} width="40" height="40" className="d-inline-block align-top" alt=""/>    
                    Nextagram
                </NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem className="mt-2">
                        <FormGroup>
                            <Input type="text" placeholder="Search" />
                        </FormGroup>{' '}
                    </NavItem>
                    <NavItem className="mt-3 mr-2">
                        <Link to="/" style={{color:"rgb(241, 242, 191)"}}>Home</Link>
                    </NavItem>
                    <NavItem className="mt-3 mr-2">
                        <Link to="/users/1" style={{color:"rgb(203, 218, 244)"}}>User Profile</Link>
                    </NavItem>
                    <NavItem className="mt-3 mr-2">
                        <Link to="/users/me" style={{color:"rgb(241, 242, 191)"}}>My Profile</Link>
                    </NavItem>
                    <NavItem className="mt-3 mr-2">
                        {localStorage.getItem('jwt')?<Link to="/" style={{color:"rgb(203, 218, 244)"}} onClick={this.handleLogout}>Logout</Link>:<Link to="/" style={{color:"rgb(203, 218, 244)"}} onClick={this.toggle}>Login</Link>}
                    </NavItem>
                </Nav>
        </Navbar>
        </>)    
    }
}
