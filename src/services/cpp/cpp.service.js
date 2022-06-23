import { trim } from "lodash";
import { apiDelete, apiGet, apiPost, apiPut, MENUA_ADD, MENUA_GETBYID, MENUA_REVIEW } from "../api.service"

export const saveCPP =async(data, menuId)=>{

    console.log("saveCPP ", data);
    if(menuId===null || menuId===undefined || trim(menuId).length ===0)
    {
        console.log ("menua apiPost");
        let menuaData=[]; 
        await apiPost(MENUA_ADD,data)
        .then(response => {
            menuaData=response.data;
            console.log("menua response", menuaData)
        })
        return menuaData;
    }
    else{
        console.log ("menua apiPut");
        let menuaData=[]; 
        await apiPut(MENUA_REVIEW,data)
        .then(response => {
            menuaData=response.data;
            console.log("menua response", menuaData)
        })
        return menuaData; 
    }
}

export const fetchCPPById =async(id)=> {
    console.log("fetchCPPById: " + MENUA_GETBYID);
    let data1=[];
        await apiGet(MENUA_GETBYID + `/${id}`)
        //await apiGet('menua')
        // await apiGet(`api/finishing/get-finishing/${id}`)
        .then(response => {
            data1=response.data;
            console.log("Get response ", data1)
        })
        return data1;
}

//export const fetchCPP =async()=> await apiGet('cpp/get-all-cpp')
//export const saveCPP =async(data)=> data?.Id &&  await apiPost('api/cpp/add-cpp',data) || await apiPut('api/cpp/update-cpp',data) 
//export const fetchQueryCPP =async(id)=> await apiGet(`api/cpp/get-all-cpp-by-user/${id}`)
//export const DeleteCPP =async(data)=> await apiDelete(`api/cpp/delete-cpp/${data}`)