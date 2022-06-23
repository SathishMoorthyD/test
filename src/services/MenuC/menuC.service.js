import { trim } from "lodash";
import { apiDelete, apiGet, apiPost, apiPut, MENUC_ADD, MENUC_GETBYID, MENUC_REVIEW } from "../api.service"

export const fetchAllJrmaster =async()=> {
    let data1=[];
        await apiGet('MenuC')
        // await apiGet('api/jrmaster/get-all-jrmaster');
        .then(response => {
            data1=response.data;
            // console.log("response ", data1)
        })
        return data1;
}

export const saveJrmaster =async(data, menuId)=>{

    console.log("saveJrmaster ", data);
    if(menuId===null || menuId===undefined || trim(menuId).length ===0)
    {
        console.log ("menuc apiPost");
        let menucData=[]; 
        await apiPost(MENUC_ADD,data)
        .then(response => {
            menucData=response.data;
            console.log("menuc response", menucData)
        })
        return menucData;
    }
    else{
        console.log ("menuc apiPut");
        let menucData=[]; 
        await apiPut(MENUC_REVIEW,data)
        .then(response => {
            menucData=response.data;
            console.log("menuc response", menucData)
        })
        return menucData; 
    }
}

export const fetchJrmasterById =async(id)=> {
    console.log("fetchJrmasterById: " + MENUC_GETBYID);
    let data1=[];
        await apiGet(MENUC_GETBYID + `/${id}`)
        .then(response => {
            data1=response.data;
            console.log("Get response ", data1)
        })
        return data1;
}

// export const fetchJrmasterById =async(id)=> await apiGet(`api/jrmaster/get-jrmaster/${id}`)

export const fetchJrmasterByUser =async(id)=> await apiGet(`api/jrmaster/get-all-jrmaster-by-user/${id}`)

export const DeleteJrmasterById =async(data)=> await apiDelete(`api/jrmaster/delete-jrmaster/${data}`)

//localhost:8080/api/jrmaster/add-jrmaster
//localhost:8080/api/jrmaster/update-jrmaster
//localhost:8080/api/jrmaster/get-jrmaster/{jrmasterid}
//localhost:8080/api/jrmaster/get-all-jrmaster-by-user/{userid}
//localhost:8080/api/jrmaster/get-all-jrmaster
//localhost:8080/api/jrmaster/delete-jrmaster/{jrmasterid}


