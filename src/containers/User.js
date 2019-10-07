import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateObject } from '../store/utility';

class User extends Component{

    state = {
        userinfo: null,
    }

    getUserInfo = () => {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
    
        let url = 'http://localhost:8080/user/getUserById?' + 'userId=' + userId;
        let config = {
            headers: {
                Authorization: 'Bearer '+token,
            }
        }
        axios.get(url,config).then(
            response => {
                this.setState(this.state,updateObject(this.state,{userinfo:response.data}));
            }
        ).catch(
            err => console.log(err)
        );
    }

    render(){
        this.props.getUserInfo();
        return (
            <div>
                <button onClick={this.props.logout}>log out</button>
                user
                <img src="http://localhost:8080/res/avatar?avatarlocation=avatar1_ava.png" alt="myAvatar" height="242" width="242"/>
                <p>
                    <button onClick={this.props.seeAllUsers}>_DEBUG: get all users</button>
                </p>
            </div>
        );
    }

}


const mapStateToProps = (state) => ({
    logStatus: state.auth.logStatus,
    userId: state.auth.userId,
    token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({type: 'auth_logout'}),
    seeAllUsers: () => dispatch({type:'test_get_all_users'}),
    getUserInfo: () => dispatch({type: 'user_get_info'})
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
