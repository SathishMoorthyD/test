import { apiDelete, apiGet, apiPost, apiPut } from "../api.service"

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

export const savePaper =async(data)=> data?.Id && await apiPost('api/jrmaster/add-jrmaster',data) || await apiPost('api/jrmaster/add-jrmaster',data)

// export const updateMenuB =async(data)=> data?.Id && await apiPut('api/finishing/add-finishing',data) || await apiPost('api/finishing/add-finishing',data)

export const fetchPaperByPaperId =async(id)=> await apiGet(`api/paper/get-paper/${id}`)

export const fetchPaperByUser =async(id)=> await apiGet(`get-all-paper-by-user/${id}`)

export const DeletePaperById =async(data)=> await apiDelete(`api/paper/delete-paper/${data}`)

//localhost:8080/api/paper/get-paper/{paperid}
//localhost:8080/api/paper/get-all-paper-by-user/{userid}
//localhost:8080/api/paper/get-all-paper
//localhost:8080/api/paper/delete-paper/{paperid}
