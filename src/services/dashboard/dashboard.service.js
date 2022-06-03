import {apiGet, apiPost} from '../api.service'
export const fetchAllData =async()=> {
    let dashdata=[];
        await apiPost('api/dashboard/getDashByDate')
       
        .then(response => {
            dashdata=response.data;
            console.log("response ", dashdata)
        })
        return dashdata;
}

export const getDashByDate =async(data)=> {
    let dashdata=[];
        //await apiPost('getDashByDate', data)
        await apiPost('api/dashboard/getDashByDate',data)
        .then(response => {
            dashdata=response.data;
            console.log("response ", dashdata)
        })
        return dashdata;
}