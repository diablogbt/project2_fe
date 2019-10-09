import React, { Component } from 'react';
import { Route, NavLink, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import User from './User';
import ShoppingListHeader from '../components/Topside/ShoppingListHeader';
import SideTool from '../components/SideTool/SideTool';
import axios from 'axios';
import { updateObject } from '../store/utility';
import * as actions from '../store/actions/Index'

// import {TabMenu} from 'primereact/tabmenu';

class ShoppingList extends Component{

    state= {
        
    }

    clickonavatar = () => {
        console.log('click on avatar');
    }

    componentDidMount() {
        this.props.getUserInfo();
    }

    render(){
        

        return (
            <div>
                <div>
                    <ShoppingListHeader clickonavatar={this.clickonavatar}/>
                </div>
                <div className="BodyOverlay">
                    <div className="SideBarOverlay">
                    <SideTool/>
                    </div>
                    <div></div>
                </div>
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
    getUserInfo: () => actions.getUserInfo()(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)
