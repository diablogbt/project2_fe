import axios from 'axios';

export const authStart = () => {
    return {
        type: 'auth_start'
    }
}

export const authSuccess = (token, userId) => {
    return {
        type:'auth_success',
        myToken: token,
        myId: userId
    }
}

export const authFail = (err) => {
    return {
        type: 'auth_fail',
        error:err
    }
}

export const authLogin = (uname, pwd, authmode) => {
    return dispatch => {
        dispatch(authStart());
        let url='http://localhost:8080/auth/authenticate';
        let data = {uname: uname, pwd: pwd};

        switch (authmode) {
            case 'login':
                url='http://localhost:8080/auth/authenticate';
                data = {uname: uname, pwd: pwd};
                break;
            case 'signup':
                url='http://localhost:8080/auth/signup';
                data = {username: uname, password: pwd};
                break;
            default:
                break;
        }
        
        axios.post(url,data,{headers:{'Content-Type':'application/json'}}).then(response => {
            console.log(response);

            dispatch(authSuccess(response.data.token, response.data.userid));
        }).catch(
            err => {
                console.log("login fail...");
                dispatch(authFail(err));
            }
        );
    }
}

export const logout = () => {
    return {
        type: 'auth_logout'
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            let authURL = 'http://localhost:8080/auth/authGetId';
            let config = {
                headers: {
                    Authorization: 'Bearer '+token
                }
            }
            axios.get(authURL, config).then(
                response => {
                    console.log(response);
                    dispatch(authSuccess(token,response.data));
                }
            ).catch(
                err => {
                    console.log(err);
                    dispatch(logout());
                }
            );
        }
    }
}