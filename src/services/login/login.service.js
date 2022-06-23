import {apiPost,apiGet, USER_MASTER_GET, USER_MASTER_CPASS, USER_LOGOUT, USER_MASTER_DEL, USER_LOGIN} from '../api.service'

//export const login =async(data)=> await apiPost('api/usermaster/login-authenticate',data)
export const login =async(data)=> {
    let resData = [];
    await apiPost(USER_LOGIN,data)
    //await apiGet(USER_LOGIN,data)
    .then (response => {resData = response.data})
    return resData;
}

export const logout =async(id)=> {
    let responseDataObj = {status:200, data:''};
    await apiGet(USER_LOGOUT+ `/${id}`)
    //await apiGet(USER_LOGOUT)
    .then (response => {
        responseDataObj = response.data;
        if (response.status !== 200) responseDataObj.status=response.status;
    })
    //console.log(responseDataObj);
    return responseDataObj;
}

export const saveUserMaster =async(data)=> await apiPost('api/usermaster/add-usermaster',data)

export const fetchUser =async()=> {
    let usermasterdata = [];
    console.log("fetchUser...");
    await apiGet(USER_MASTER_GET)
    .then(response => {
        usermasterdata=response.data;
        console.log("fetchUser response", response.status);
    })
    return usermasterdata;
}

export const deleteUser =async(id)=> {
    let responseDataObj = {status:200, data:''};
    await apiGet(USER_MASTER_DEL + `/${id}`)
    //await apiGet(USER_MASTER_DEL)
    .then (response => {
        responseDataObj = response.data;
        if (response.status !== 200) responseDataObj.status=response.status;
    })
    //console.log(responseDataObj);
    return responseDataObj;
}

export const changePass =async(userData)=> {
    let responseDataObj = {status:200, data:''};
    await apiGet(USER_MASTER_CPASS + `/${userData.id}/${userData.password}`)
    //await apiGet(USER_MASTER_CPASS)
    .then (response => {
        responseDataObj = response.data;
        if (response.status !== 200) responseDataObj.status=response.status;
    })
    //console.log(responseDataObj);
    return responseDataObj;
}
