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
    url:apiUrl + url,data
})
export const apiPut=(url,data)=>axios({
    method:'put',
    url:apiUrl + url,data
})
export const apiDelete=(url,data)=>axios({
    method:'delete',
    url:apiUrl + url,data
})