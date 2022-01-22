import {httpGet, httpPost} from '@/utils/request'

export const userLogin = data => httpPost('/user/doLogin',data);

export const userLogout = () => httpGet('/user/logout')
