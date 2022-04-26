import {apiPost} from '../api.service'

export const login =async(data)=> await apiPost('api/usermaster/login-authenticate',data)