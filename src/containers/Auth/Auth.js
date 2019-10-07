import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/Index'
import { updateObject } from '../../store/utility';


class Auth extends Component{

    state = {
        controls:{
            username: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'User Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                type: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            email: {
                type: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Email: xxx@xxx.com'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            }
        },
        logmodelist: ['login','signup'],
        authmodeinputs: {
            login: ['username','password'],
            signup: ['username','password','email']
        },
        authmodehandler: {
            login: this.loginHandler,
            signup: this.signupHandler
        },
        authmode:'login'
    }

    render() {
        // console.log(this.props.token);

        const formElementsArray=[];
        for(let key of this.state.authmodeinputs[this.state.authmode]){
            formElementsArray.push({
                id:key,
                property: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(element => (
            <input 
                key={element.id}
                type={element.property.config.type}
                value={element.property.value}
                placeholder={element.property.config.placeholder}
                onChange={(event)=>this.inputChangeHandler(event,element.id)}
                required={element.property.validation.required}
            />
        ));

        let note='';
        switch (this.props.logStatus) {
            case 'init':
                note = 'please input name and pass';
                break;
            case 'process':
                note = 'verifying...';
            default:
                break;
        }
        if(this.props.error)
            note = 'wrong username or password, please input again..';

        return (
            <div>
                <p>{note}</p>
                <p>{this.state.notemode}</p>
                <p></p>
                <form onSubmit={this.loginHandler}>
                    <div>{form}</div>
                    <div>
                        <button type="submit">{this.state.authmode}</button>
                        <button onClick= {this.authModeChangeHandler}>to {this.state.authmode === 'login'?'signup':'login'}</button>
                    </div>
                </form>
            </div>
        );
    }

    inputChangeHandler = (event, elementId) => {        
        let updatedstate = this.state;
        updatedstate.controls[elementId].value=event.target.value;
        
        this.setState(updatedstate);
    }
    // inputChangedHandler = ( event, controlName ) => {
    //     // console.log(...this.state.controls);
    //       const updatedControls = {
    //           ...this.state.controls,
    //           [controlName]: {
    //               ...this.state.controls[controlName],
    //               value: event.target.value,
    //               valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
    //               touched: true
    //           }
    //       };
    //       console.log(updatedControls);
    //       console.log(this.state);
    //       this.setState( { controls: updatedControls } );
  
    //   }
    
    loginHandler = (event) => {
        event.preventDefault();
        console.log('submit: '+this.state.controls.username.value+ ', '+this.state.controls.password.value);
        this.props.login(this.state.controls.username.value,this.state.controls.password.value,this.state.authmode);
    }
    
    authModeChangeHandler = (event) => {
        event.preventDefault();
        console.log('switch authmode');
        this.setState(updateObject(this.state,
            {authmode: this.state.authmode==='login'? 'signup': 'login'}
        ));
    }

}


const mapStateToProps = (state) => ({
    logStatus: state.auth.logStatus,
    userId: state.auth.userId,
    token: state.auth.token,
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    // login: (uname,pwd)=> dispatch({type:'auth_login_start', uname, pwd}),
    login: (uname,pwd,authmode)=> actions.authLogin(uname,pwd,authmode)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
