import axios from 'axios';

export const getAllUsers = ()=>{

    let token = localStorage.getItem('token');
    let url = 'http://localhost:8080/user/getAll';
    let config = {
        headers: {
            Authorization: 'Bearer '+token,
        }
    }
    
    axios.get(url,config).then(
        response => console.log(response)
    ).catch(
        err => console.log(err)
    );
}

export const getUserInfo = () => {
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
            console.log(response.data);
        }
    ).catch(
        err => console.log(err)
    );
}