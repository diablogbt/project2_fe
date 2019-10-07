import React from 'react';
import { Route, NavLink, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Auth from './containers/Auth/Auth';
import ShoppingList from './containers/ShoppingList';
import * as actions from './store/actions/Index'
import User from './containers/User';

class App extends React.Component {

  componentDidMount(){
    console.log(this.props);
    this.props.initLogState();
  }

  render() {
    let startpage = (
      <div>
        <nav>
          <NavLink to="/login">Login</NavLink>
        </nav>
        <p>{this.props.logo}</p>
        <Switch>
          <Route path="/login" component={Auth}/>
        </Switch>
      </div>
    );

    if(this.props.isAuthenticated) {
      startpage = (
      <div>
        <div>
          <nav>
              <p><NavLink to="/shoppinglist">Shopping List</NavLink></p>
          </nav>
          <Switch>
              <Route path="/shoppinglist" component={ShoppingList}/>
              <Route path="/user" component={User}/>
          </Switch>
        </div>
      </div>
      )
    }
    return startpage;
  }
}

const mapStateToProps = state => ({
    logo: state.auth.logo,
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    initLogState: ()=>actions.authCheckState()(dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
