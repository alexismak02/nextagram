import React, {Component} from 'react';

export default class Loader extends React.Component {
    render(){
        const {load}=this.props
        return(
            load?<img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif" width="50" height="50" alt=""/>:null
        )    
    }
}
