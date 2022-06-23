import { trim } from "lodash";
import { apiDelete, apiGet, apiPost, apiPut, MENUE_ADD, MENUE_GETBYID, MENUE_REVIEW } from "../api.service"


export const fetchAllPulp =async()=> {
    let data1=[];
        await apiGet('MenuE')
        // await apiGet('api/pulp/get-all-pulp');
        .then(response => {
            data1=response.data;
            // console.log("response ", data1)
        })
        return data1;
}


export const savePulp =async(data, menuId)=>{

    console.log("savePulp ", data);
    if(menuId===null || menuId===undefined || trim(menuId).length ===0)
    {
        console.log ("menue apiPost");
        let menueData=[]; 
        await apiPost(MENUE_ADD,data)
        .then(response => {
            menueData=response.data;
            console.log("menue response", menueData)
        })
        return menueData;
    }
    else{
        console.log ("menue apiPut");
        let menueData=[]; 
        await apiPut(MENUE_REVIEW,data)
        .then(response => {
            menueData=response.data;
            console.log("menue response", menueData)
        })
        return menueData; 
    }
}

export const fetchPulpById =async(id)=> {
    console.log("fetchPulpById: " + MENUE_GETBYID);
    let data1=[];
    await apiGet(MENUE_GETBYID + `/${id}`)
    .then(response => {
        data1=response.data;
        console.log("Get response ", data1)
    })
    return data1;
}

export const fetchPulpByUser =async(id)=> await apiGet(`get-all-pulp-by-user/${id}`)

export const DeletePulp =async(data)=> await apiDelete(`api/pulp/delete-pulp/${data}`)


//localhost:8080/api/pulp/add-pulp
//localhost:8080/api/paper/update-paper
//localhost:8080/api/pulp/get-pulp/{pulpid}
//localhost:8080/api/pulp/get-all-pulp-by-user/{userid}
//localhost:8080/api/pulp/get-all-pulp
//localhost:8080/api/pulp/delete-pulp/{pulpid}
