import React from 'react';
import { connect } from 'react-redux';

import './UserAvatar.css';


class Useravatar extends React.Component {
    
    render(){
        let avatarURL = this.props.avatarURL;
        if(!avatarURL) avatarURL='avatar_def.png';
        return (
            <div className="myAvatarLayout" style={{height: this.props.height}}>
                <div className="myAvatarName">
                    <p className="myAvatarName">{this.props.avatarName}</p>
                    <i class="pi pi-caret-down"></i>
                </div>
                <div>
                    <img src={'http://localhost:8080/res/avatar?avatarlocation='+avatarURL} 
                        alt="useravatar" height={this.props.height}
                        onClick={this.props.click}
                        style={{borderRadius: "50%"}}></img>
                </div>
            </div>
        );
    }
    
}


const mapStateToProps = (state) => ({
    avatarURL: state.user.userInfo.avatarlocation,
    avatarName: state.user.userInfo.username,
})

export default connect(mapStateToProps, null)(Useravatar)
