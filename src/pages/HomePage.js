import React, {Component} from 'react';
import Image from "react-graceful-image";
import {Row,Col} from 'reactstrap';
import UserImages from '../containers/UserImages';


export default class HomePage extends React.Component {
    render(){ 
        const {users}=this.props
        
        const inlinestyling = {
            backgroundColor:"rgb(227, 222, 222)",
            padding: 4,
        }
        console.log(users)
        return(
        <>
            {users.map((user,index)=>
            <Row key={index} className="mt-4 mb-4" style={inlinestyling}> 
                <Col md="3">
                    <Image src={user.profileImage} className="rounded-circle" width="150" height="150" alt="" />
                    <div>{user.username}</div>
                </Col>
                <Col md="9">
                    <UserImages userId={user.id}/>
                </Col>
            </Row>
            )}
        </>
        )
        
    }
}

