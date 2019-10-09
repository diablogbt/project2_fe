import React from 'react';
import { Route, NavLink, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Auth from './containers/Auth/Auth';
import ShoppingList from './containers/ShoppingList';
import * as actions from './store/actions/Index'
import User from './containers/User';
import { Layout } from './components/Layout/Layout';
import ShoppingListHeader from './components/Topside/ShoppingListHeader';
import SideTool from './components/SideTool/SideTool';

class App extends React.Component {

  // TODO: disable this property
  state = {
    is_test: false,
  }

  componentDidMount(){
    console.log(this.props);
    this.props.initLogState();
  }

  render() {
    

    let startpage = (
      <div className="App-header">

        <Layout></Layout>

        <nav className="App-link">
          <NavLink to="/login">Login</NavLink>
        </nav>
        <Switch>
          <Route path="/login" component={Auth}/>
        </Switch>
      </div>
    );

    if(this.props.isAuthenticated && !this.state.is_test) {
      startpage = (
      <div>
        <div>
          <nav>
              <p><NavLink to="/shoppinglist">Shopping List</NavLink>|<NavLink to="/user">User</NavLink></p>
          </nav>
          <Switch>
              <Route path="/shoppinglist" component={ShoppingList}/>
              <Route path="/user" component={User}/>
          </Switch>
        </div>
      </div>
      )
    }
    else
    // page 
    if(this.state.is_test){
      startpage = (
        <div>
          testpage
        </div>
      );
    }

    return startpage;
  }
}

const mapStateToProps = state => ({
    logo: state.auth.logo,
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    initLogState: ()=>actions.authCheckState()(dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
