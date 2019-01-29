import React from "react";
import {Route, Link} from "react-router-dom";
import UserImages from "../containers/UserImages";
import Loader from "../components/Loader";
import Image from "react-graceful-image";
import {Row,Col} from 'reactstrap';

class UserProfilePage extends React.Component {
    
    render() {
        
        const {users}=this.props
        const user=users.find((user)=>(
            user.id==this.props.match.params.id))
           
        let userId=this.props.match.params.id
        return (
            <div>
                {user?
                <Row>
                    <Col md="3" >
                        <Image src={user.profileImage} className="rounded-circle" width="150" height="150" alt="" />
                        <div>{user.username}</div>
                    </Col>
                    <Col md="9">
                        <UserImages userId={userId}/>
                    </Col>
                </Row>:
                <Loader/>}
            </div>
        )
    }
}

export default UserProfilePage