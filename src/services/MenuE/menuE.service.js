import { apiDelete, apiGet, apiPost, apiPut } from "../api.service"


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


export const savePulp =async(data)=> data?.Id && await apiPut('api/pulp/add-pulp',data) || await apiPut('api/paper/update-paper',data)

export const fetchPulpById =async(id)=> await apiGet(`api/pulp/get-pulp/${id}`)

export const fetchPulpByUser =async(id)=> await apiGet(`get-all-pulp-by-user/${id}`)

export const DeletePulp =async(data)=> await apiDelete(`api/pulp/delete-pulp/${data}`)


//localhost:8080/api/pulp/add-pulp
//localhost:8080/api/paper/update-paper
//localhost:8080/api/pulp/get-pulp/{pulpid}
//localhost:8080/api/pulp/get-all-pulp-by-user/{userid}
//localhost:8080/api/pulp/get-all-pulp
//localhost:8080/api/pulp/delete-pulp/{pulpid}
