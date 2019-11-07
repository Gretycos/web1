import axios from 'axios';
import Qs from 'qs'

export const requestLogin = params =>{
  return  axios.post("http://127.0.0.1:8080/login", Qs.stringify(params),
  {
    withCredentials : true
  }).then(res=>res.data);
}

export const getUser = id =>{
  return axios.post("http://127.0.0.1:8080/user/find",Qs.stringify(id),{
    withCredentials : true
  }).then(res=>res.data)
}

export const logout = ()=>{
  return axios.post("http://127.0.0.1:8080/logout",{},{
    withCredentials : true
  }).then(res=>res.data)
}

export function getCourseWare(){
  axios.post('http://127.0.0.1:8080/getCourseWare',{},{
    withCredentials : true
  }).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err);
  })
}

