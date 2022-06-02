import {apiPost,apiGet} from '../api.service'

export const login =async(data)=> await apiPost('api/usermaster/login-authenticate',data)

export const saveUserMaster =async(data)=> await apiPost('api/usermaster/add-usermaster',data)

export const fetchUser =async()=> await apiGet('api/usermaster/add-usermaster')