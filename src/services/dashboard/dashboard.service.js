import {apiGet, apiPost} from '../api.service'
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
        //await apiPost('getDashByDate', data)
        await apiGet('dashboard')
        .then(response => {
            dashdata=response.data;
            console.log("response ", dashdata)
        })
        return dashdata;
}