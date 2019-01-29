import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Alert} from 'reactstrap';
import axios from 'axios';

export default class SignUpModal extends React.Component {

    state={
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
        hasErrors: false,
        errors: [],
        message: "",
        isSignUp: false,
    }

    handleSubmit=(event)=>{
        const {email,password,username}=this.state
        event.preventDefault()
        // alert(`Awesome! You are officially registered with us now!`)
    
        axios({
            method: 'post',
            url: 'https://insta.nextacademy.com/api/v1/users/new',
            data: {
              username: username,
              email: email,
              password: password,
            }
        })

        .then(response=> {
        console.log(response)
        const{isSignUp,message}=this.state
        this.setState({
            isSignUp:!isSignUp,
            message: response.data.message,})
        })

        .catch(error=>{
        console.log('ERROR: ',error.response.data)
        const {hasErrors}=this.state
        this.setState({
            hasErrors: !hasErrors,
            errors: error.response.data.message,
            })
        })
       
    }

    handleInput=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        this.setState({
           [name]: value
        })
    }    

    validateEmail=(email)=>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    checkSamePassword=(password,confirmPassword)=>{
        return password===confirmPassword
    }

    render(){
        const {showModal,toggle,toggleLogin}=this.props
        const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
        
        const {email,password,username,confirmPassword,hasErrors,errors,isSignUp,message} = this.state;
        //const isEnabled = email.length>0 && password.length>=8 && username.length>0;

        return (
            
            <Modal isOpen={showModal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>Sign Up Form</ModalHeader>
                {isSignUp?<Alert>{message}</Alert>:null}
                {hasErrors?errors.map((error)=>(<Alert className="m-3 mb-3" color="danger">{error}</Alert>)):null}
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" onChange={this.handleInput} placeholder="John Doe" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" onChange={this.handleInput} placeholder="e.g.johndoe@yahoo.com" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" onChange={this.handleInput} placeholder="min. 8 alphanumeral" />
                            <FormText>Minimum 8 characters</FormText>                        
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" onChange={this.handleInput} placeholder="min. 8 alphanumeral" className={password===confirmPassword?"":"error"}/>
                            {password.length>=8&&confirmPassword.length>=8&&password===confirmPassword?<FormText>Password success!</FormText>:<FormText>Different from the above password</FormText>}                     
                        </FormGroup>
                        <Button color="primary" block onClick={this.handleSubmit} disabled={email&&password&&username&&this.validateEmail(email)&&this.checkSamePassword(password,confirmPassword)?false:true}>Sign Up</Button>
                    </Form>  
                </ModalBody>
                <ModalFooter>
                    <Label>Already a user?</Label>
                    <Button color="primary" onClick={toggleLogin}>Log In</Button>
                </ModalFooter>
            </Modal>
        )
      
    }
}


