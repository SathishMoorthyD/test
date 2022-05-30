import { apiDelete, apiGet, apiPost, apiPut } from "../api.service"

export const fetchAllFinishing =async()=> {
    let data1=[];
        await apiGet('MenuB')
        // await apiGet('api/finishing/get-all-finishing');
        .then(response => {
            data1=response.data;
            // console.log("response ", data1)
        })
        return data1;
}

export const saveFinishing =async(data)=> data?.Id && await apiPost('api/finishing/add-finishing',data) || await apiPut('api/finishing/update-finishing',data)

// export const updateMenuB =async(data)=> data?.Id && await apiPut('api/finishing/add-finishing',data) || await apiPost('api/finishing/add-finishing',data)

export const fetchFinishingById =async(id)=> await apiGet(`api/finishing/get-finishing/${id}`)

export const fetchFinishingByUser =async(id)=> await apiGet(`api/finishing/get-all-finishing-by-user/${id}`)

export const DeleteFinishingById =async(data)=> await apiDelete(`api/finishing/delete-finishing/${data}`)

// /api/finishing/add-finishing
// /api/finishing/update-finishing
// /api/finishing/get-finishing/{finishingid}
// /api/finishing/get-all-finishing-by-user/{userid}
// /api/finishing/get-all-finishing
// /api/finishing/delete-finishing/{finishingid}

