import { trim } from "lodash";
import { apiDelete, apiGet, apiPost, apiPut, MENUD_ADD, MENUD_GETBYID, MENUD_REVIEW } from "../api.service"

export const fetchAllPaper =async()=> {
    let data1=[];
        await apiGet('MenuD')
        // await apiGet('api/paper/get-all-paper');
        .then(response => {
            data1=response.data;
            // console.log("response ", data1)
        })
        return data1;
}

export const savePaper = async(data, menuId)=>{

    console.log("savePaper ", data);
    if(menuId===null || menuId===undefined || trim(menuId).length ===0)
    {
        console.log ("menud apiPost");
        let menudData=[]; 
        await apiPost(MENUD_ADD,data)
        .then(response => {
            menudData=response.data;
            console.log("menud response", menudData)
        })
        return menudData;
    }
    else{
        console.log ("menud apiPut");
        let menudData=[]; 
        await apiPut(MENUD_REVIEW,data)
        .then(response => {
            menudData=response.data;
            console.log("menud response", menudData)
        })
        return menudData; 
    }
}

export const fetchPaperByPaperId =async(id)=> {
    console.log("fetchPaperByPaperId: " + MENUD_GETBYID);
    let data1=[];
        await apiGet(MENUD_GETBYID + `/${id}`)
        .then(response => {
            data1=response.data;
            console.log("Get response ", data1)
        })
        return data1;
}

export const fetchPaperByUser =async(id)=> await apiGet(`get-all-paper-by-user/${id}`)

export const DeletePaperById =async(data)=> await apiDelete(`api/paper/delete-paper/${data}`)

//localhost:8080/api/paper/get-paper/{paperid}
//localhost:8080/api/paper/get-all-paper-by-user/{userid}
//localhost:8080/api/paper/get-all-paper
//localhost:8080/api/paper/delete-paper/{paperid}
