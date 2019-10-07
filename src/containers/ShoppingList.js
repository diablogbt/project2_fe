import React, { Component } from 'react';
import { Route, NavLink, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import User from './User';

// import {TabMenu} from 'primereact/tabmenu';

class ShoppingList extends Component{

    render(){
        return (
            <div>
                <nav>
                    <p><NavLink to="/user">my profile</NavLink></p>
                </nav>
                <p>shopping list page under work...</p>
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
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)
