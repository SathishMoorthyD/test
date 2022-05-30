import {apiGet} from '../api.service'
export const fetchAllData =async()=> {
    let dashdata=[];
        await apiGet('dashboard')
       
        .then(response => {
            dashdata=response.data;
            console.log("response ", dashdata)
        })
        return dashdata;
}