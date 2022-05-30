import { apiDelete, apiGet, apiPost, apiPut } from "../api.service"


export const fetchCPP =async()=> await apiGet('cpp/get-all-cpp')

export const saveCPP =async(data)=> data?.Id && await apiPut('api/cpp/update-cpp',data) || await apiPost('api/cpp/add-cpp',data)

export const fetchQueryCPP =async(id)=> await apiGet(`api/cpp/get-all-cpp-by-user/${id}`)

export const DeleteCPP =async(data)=> await apiDelete(`api/cpp/delete-cpp/${data}`)