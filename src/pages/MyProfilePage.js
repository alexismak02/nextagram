import React, {Component} from 'react';
import {Route, Switch, Link} from "react-router-dom";
// import './App.css';
import axios from 'axios'
import Image from 'react-graceful-image'

class MyProfilePage extends React.Component {
  state = {
    myImages:[],
  }

  componentDidMount(){
    const jwt = JSON.parse(localStorage.myData).auth_token
    
    axios({
      method: 'get',
      url: 'https://insta.nextacademy.com/api/v1/images/me',
      headers: {Authorization: `Bearer ${jwt}`}
    })

    .then(result=>{
      const myImages=result.data
      this.setState({myImages,})
    })

    .catch(error=>{
      console.log('Error:', error)
      alert('You have not logged in!')
    })
  }

  render(){
    const {myImages}=this.state
    const username= JSON.parse(localStorage.myData).user.username
    const profileImage= JSON.parse(localStorage.myData).user.profile_picture
    
    return(

        <>
        {username}
        <Image src={`http://next-curriculum-instagram.s3.amazonaws.com/${profileImage}`} alt=""/>
        {
            myImages.map((myImage,index)=>
            <Image key={index} src={myImage} className="mr-2 mb-2" width="200" height="200" alt=""/>)
        }
                <h1>Hello</h1>
        
        </>


    )
  }
}

export default MyProfilePage