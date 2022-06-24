import axios from 'axios'
import {Subject} from 'rxjs'
import {showToasterSubject} from './toastr/toaster.service'

const apiUrl = process.env.REACT_APP_URL_BASE_API
//const apiUrl="//localhost:3002/"
console.log(apiUrl,"apiUrl")

let showLoaderCount = 0;
const showLoaderCounterSubject = new Subject()
export const showLoaderCountState = showLoaderCounterSubject.asObservable()

axios.interceptors.request.use(function (config){
    showLoaderCount++;
    showLoaderCounterSubject.next(showLoaderCount)
    config.headers.Accept= 'application/json';
    config.headers.Role=localStorage.getItem('Role');
    if(localStorage.getItem('AccessToken'))
        config.headers.Authorization= `Bearer ${localStorage.getItem('AccessToken')}`;

    return config;
},function (error){
    showLoaderCount--;
    showLoaderCounterSubject.next(showLoaderCount)
    showToasterSubject.next({type:'error',value:JSON.stringify(error.response.data)})
    return Promise.reject(error)
})

axios.interceptors.request.use(function (response){
    showLoaderCount--;
    showLoaderCounterSubject.next(showLoaderCount)
    return response;
},function (error){
    showLoaderCount--;
    showLoaderCounterSubject.next(showLoaderCount)
    showToasterSubject.next({type:'error',value:JSON.stringify(error.response.data)})
    if(error.response.status === 401){
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/'
    }
    return Promise.reject(error)
})

export const apiGet=(url)=>axios({
    method:'get',
    url:apiUrl + url
})

export const apiPost=(url,data)=>axios({
    method:'post',
    url:apiUrl + url,data,
    headers: {'Content-Type': 'application/json'}
})
export const apiPut=(url,data)=>axios({
    method:'put',
    url:apiUrl + url,data,
    headers: {'Content-Type': 'application/json'}
})
export const apiDelete=(url,data)=>axios({
    method:'delete',
    url:apiUrl + url,data
})

export const USER_LOGIN = Boolean(process.env.REACT_APP_URL_CHECK)?"api/usermaster/login-authenticate": "login/1";
export const USER_LOGOUT = Boolean(process.env.REACT_APP_URL_CHECK)?"api/usermaster/logout-success":"logout/1";

export const HOME_DASHBOARD_GETBYDATE = Boolean(process.env.REACT_APP_URL_CHECK)?"api/dashboard/getDashByDate":"dashboard";

export const MENUA_GETBYID = Boolean(process.env.REACT_APP_URL_CHECK)?"api/cpp/get-cpp": "MenuA";
export const MENUA_ADD = Boolean(process.env.REACT_APP_URL_CHECK)?"api/cpp/add-cpp":"MenuA";
export const MENUA_REVIEW = Boolean(process.env.REACT_APP_URL_CHECK)?"api/cpp/update-cpp":"MenuA";

console.log("api.service " + Boolean(process.env.REACT_APP_URL_CHECK));
export const MENUB_GETBYID = Boolean(process.env.REACT_APP_URL_CHECK)?"api/finishing/get-finishing":"MenuB";
export const MENUB_ADD = Boolean(process.env.REACT_APP_URL_CHECK)?"api/finishing/add-finishing":"MenuB";
export const MENUB_REVIEW = Boolean(process.env.REACT_APP_URL_CHECK)?"api/finishing/update-finishing":"MenuB";

export const MENUC_GETBYID = Boolean(process.env.REACT_APP_URL_CHECK)?"api/jrmaster/get-jrmaster":"MenuC";
export const MENUC_ADD = Boolean(process.env.REACT_APP_URL_CHECK)?"api/jrmaster/add-jrmaster":"MenuC";
export const MENUC_REVIEW = Boolean(process.env.REACT_APP_URL_CHECK)?"api/jrmaster/update-jrmaster":"MenuC";

export const MENUD_GETBYID = Boolean(process.env.REACT_APP_URL_CHECK)?"api/paper/get-paper":"MenuD";
export const MENUD_ADD = Boolean(process.env.REACT_APP_URL_CHECK)?"api/paper/add-paper":"MenuD";
export const MENUD_REVIEW = Boolean(process.env.REACT_APP_URL_CHECK)?"api/paper/update-paper":"MenuD";

export const MENUE_GETBYID = Boolean(process.env.REACT_APP_URL_CHECK)?"api/pulp/get-pulp":"MenuE";
export const MENUE_ADD = Boolean(process.env.REACT_APP_URL_CHECK)?"api/pulp/add-pulp":"MenuE";
export const MENUE_REVIEW = Boolean(process.env.REACT_APP_URL_CHECK)?"api/pulp/update-pulp":"MenuE";

export const USER_MASTER_GET = Boolean(process.env.REACT_APP_URL_CHECK)?"api/usermaster/get-all-user":"getusermaster";
export const USER_MASTER_ADD = Boolean(process.env.REACT_APP_URL_CHECK)?"api/usermaster/add-usermaster":"usermaster/1";
export const USER_MASTER_DEL = Boolean(process.env.REACT_APP_URL_CHECK)?"api/usermaster/delete-user":"deleteuser/1";
export const USER_MASTER_CPASS = Boolean(process.env.REACT_APP_URL_CHECK)?"api/usermaster/change-password":"changepass/1";