import {apiGet, apiPost, HOME_DASHBOARD_GETBYDATE} from '../api.service'
export const fetchAllData =async()=> {
    let dashdata=[];
        await apiGet('dashboard')
        .then(response => {
            dashdata=response.data;
            console.log("response ", dashdata)
        })
        return dashdata;
}

export const getDashByDate =async(data)=> {
    let dashdata=[];
        await apiPost(HOME_DASHBOARD_GETBYDATE, data)
        //await apiGet(HOME_DASHBOARD_GETBYDATE)
        .then(response => {
            dashdata=response.data;
            console.log("response ", dashdata)
        })
        return dashdata;
}