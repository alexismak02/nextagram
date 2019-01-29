import React, {Component} from 'react';
import Image from "react-graceful-image";
import axios from 'axios';

export default class UserImages extends React.Component {
    state={userImages:[]}

        componentDidMount(){
            const {userId}=this.props
            
            axios({
                method: 'get',
                url: `https://insta.nextacademy.com/api/v1/images?userId=${userId}`
            })

            .then(result=>{
                const userImages=result.data
                this.setState({userImages: userImages})
            })
            
            .catch(error=>{
                console.log('Error:', error)
            })
        }

    render(){
        const {userImages}=this.state
        return(
            <>{
                userImages.map((image,index)=>
                <Image key={index} src={image} className="mr-2 mb-2" width="200" height="200" alt=""/>)
            }</>
        )
    }
            
}