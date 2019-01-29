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
    const jwt = `Bearer ${localStorage.getItem('jwt')}`
    console.log(jwt)
    axios({
      method: 'get',
      url: 'https://insta.nextacademy.com/api/v1/images/me',
      headers: {Authorization: jwt}
    })

    .then(result=>{
      const myImages=result.data
      this.setState({myImages,})
    })

    .catch(error=>{
      console.log('Error:', error)
    })
  }

  render(){
    const {myImages}=this.state
    return(
        <>
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