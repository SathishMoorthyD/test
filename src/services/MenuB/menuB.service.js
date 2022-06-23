import { times, trim } from "lodash";
import { apiDelete, apiGet, apiPost, apiPut, MENUB_ADD, MENUB_GETBYID, MENUB_REVIEW } from "../api.service"

export const fetchAllFinishing =async()=> {
    let data1=[];
        await apiGet('MenuB')
        // await apiGet('api/finishing/get-all-finishing');
        .then(response => {
            data1=response.data;
            console.log("response ", data1)
        })
        return data1;
}

//export const saveFinishing =async(data)=> data?.Id && await apiPost('api/finishing/add-finishing',data) || await apiPut('api/finishing/update-finishing',data)
export const saveFinishing =async(data, menuId)=>{

    console.log("saveFinishing ", data);
    if(menuId===null || menuId===undefined || trim(menuId).length ===0)
    {
        console.log ("menub apiPost");
        let menubData=[]; 
        await apiPost(MENUB_ADD,data)
        .then(response => {
            menubData=response.data;
            console.log("menub response", menubData)
        })
        return menubData;
    }
    else{
        console.log ("menub apiPut");
        let menubData=[]; 
        await apiPut(MENUB_REVIEW,data)
        .then(response => {
            menubData=response.data;
            console.log("menub response", menubData)
        })
        return menubData; 
    }
}

// export const updateMenuB =async(data)=> data?.Id && await apiPut('api/finishing/add-finishing',data) || await apiPost('api/finishing/add-finishing',data)

export const fetchFinishingById =async(id)=> {
    console.log("fetchFinishingById: " + MENUB_GETBYID);
    let data1=[];
        await apiGet(MENUB_GETBYID + `/${id}`)
        //await apiGet('MenuB')
        // await apiGet(`api/finishing/get-finishing/${id}`)
        .then(response => {
            data1=response.data;
            console.log("Get response ", data1)
        })
        return data1;
}

// export const fetchFinishingById =async(id)=> await apiGet(`api//////finishing/get-finishing/${id}`)

export const fetchFinishingByUser =async(id)=> await apiGet(`api/finishing/get-all-finishing-by-user/${id}`)

export const DeleteFinishingById =async(data)=> await apiDelete(`api/finishing/delete-finishing/${data}`)

// /api/finishing/add-finishing
// /api/finishing/update-finishing
// /api/finishing/get-finishing/{finishingid}
// /api/finishing/get-all-finishing-by-user/{userid}
// /api/finishing/get-all-finishing
// /api/finishing/delete-finishing/{finishingid}

