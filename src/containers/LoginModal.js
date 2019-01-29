import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Alert } from 'reactstrap';
import '../../src/App.css';
import axios from 'axios';

export default class LoginModal extends React.Component {

    state={
        email: "",
        password: "",
        hasErrors: false,
        error: "",
        message: "",
        isLogin: false,
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        const {email,password}=this.state
        console.log(`Email: ${email}, Password: ${password}`)

        axios({
            method: 'post',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
              email: email,
              password: password,
              
            }
        })

        .then(response=> {
        console.log(response)
        localStorage.setItem('jwt',response.data.auth_token)
        setTimeout(this.props.toggle,3000)
        const{isLogin}=this.state
        this.setState({
            isLogin: !isLogin,
            message: response.data.message,})
        })

        .catch(error=>{
        console.log('ERROR: ',error.response.data)
        const {hasErrors}=this.state
        this.setState({
            hasErrors: !hasErrors,
            error: error.response.data.message,
            })
        })
       
    }

    handleInput=(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }    

    validateEmail=(email)=>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render(){
        const {showModal,toggle,toggleLogin}=this.props
        const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
        
        const {email,password,hasErrors,error,isLogin,message} = this.state;

        return (
            <Modal isOpen={showModal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>Log In Form</ModalHeader>
                {isLogin?<Alert>{message}</Alert>:null}
                {hasErrors?<Alert className="m-3 mb-3" color="danger">{error}</Alert>:null}
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" onChange={this.handleInput} placeholder="e.g.johndoe@yahoo.com" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" onChange={this.handleInput} placeholder="min. 8 alphanumeral" />
                            <FormText>Forgot password?</FormText>
                        </FormGroup>
                        <Button color="primary" block onClick={toggle} onClick={this.handleSubmit} disabled={email&&password&&this.validateEmail(email)?false:true}>Login</Button>
                        
                    </Form>  
                </ModalBody>
                <ModalFooter>
                    <Label>Not yet a user?</Label>
                    <Button color="primary" onClick={toggleLogin}>Sign up</Button>
                </ModalFooter>
            </Modal>
        )
      
    }
}