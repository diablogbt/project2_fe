import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateObject } from '../store/utility';
import * as actions from '../store/actions/Index'

class User extends Component{

    state = {
        userinfo: null,
    }

    render(){
        return (
            <div>
                <button onClick={this.props.logout}>log out</button>
                user
            </div>
        );
    }

    // getUserInfo = () => {
    //     let token = localStorage.getItem('token');
    //     let userId = localStorage.getItem('userId');
    
    //     let url = 'http://localhost:8080/user/getUserById?' + 'userId=' + userId;
    //     let config = {
    //         headers: {
    //             Authorization: 'Bearer '+token,
    //         }
    //     }
    //     axios.get(url,config).then(
    //         response => {
    //             this.setState(this.state,updateObject(this.state,{userinfo:response.data}));
    //         }
    //     ).catch(
    //         err => console.log(err)
    //     );
    // }

}


const mapStateToProps = (state) => ({
    logStatus: state.auth.logStatus,
    userId: state.auth.userId,
    token: state.auth.token,
    userInfo: state.user.userInfo
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({type: 'auth_logout'}),
    seeAllUsers: () => dispatch({type:'test_get_all_users'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
