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

export const getCourseWare = ()=> {
  return axios.post('http://127.0.0.1:8080/getCourseWare',{},{
    withCredentials : true
  }).then(res=>res.data)
}

export const getVideo = ()=> {
  return axios.post('http://127.0.0.1:8080/getVideo',{},{
    withCredentials : true
  }).then(res=>res.data)
}

export const getAllMsg = ()=>{
  return axios.post('http://127.0.0.1:8080/message/find/all',{},{
    withCredentials : true
  }).then(res=>res.data)
}

export const getMsg = (params) =>{
  return axios.post('http://127.0.0.1:8080/message/find', Qs.stringify(params),
    {
    withCredentials : true
  }).then(res=>res.data)
}

export const addMessage = params=>{
  return  axios.post("http://127.0.0.1:8080/message/add", Qs.stringify(params),
    {
      withCredentials : true
    }).then(res=>res.data);
}

export const updateMsgClickCount = params=>{
  return  axios.post("http://127.0.0.1:8080/message/update/clickcount", Qs.stringify(params),
    {
      withCredentials : true
    }).then(res=>res.data);
}

export const updateMsgRtime = params=>{
  return  axios.post("http://127.0.0.1:8080/message/update/uidandrtime", Qs.stringify(params),
    {
      withCredentials : true
    }).then(res=>res.data);
}

export const getRootReplies = params=>{
  return  axios.post("http://127.0.0.1:8080/message/find/rootReply", Qs.stringify(params),
    {
      withCredentials : true
    }).then(res=>res.data);
}

export const addRootReply = params=>{
  return  axios.post("http://127.0.0.1:8080/rootReply/add", Qs.stringify(params),
    {
      withCredentials : true
    }).then(res=>res.data);
}

export const deleteRootReply = params=>{
  return  axios.post("http://127.0.0.1:8080/message/delete", Qs.stringify(params),
    {
      withCredentials : true
    }).then(res=>res.data);
}
