import axios from 'axios';
import Qs from 'qs'

let baseUrl =  'http://127.0.0.1:8080'
let token=''
// axios.defaults.headers.common['token'] = token;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true
// axios.interceptors.request.use((config)=>{
//   let user = localStorage.getItem("user");
//   if(user){
//     token=user.authentication;
//   }
//   config.headers.common['token']=token;
// });
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded' // 设置很关键
    }
    return config
  },
  err => {
    return Promise.reject(err)
  });

export const requestLogin = params =>{
  return  axios.post(baseUrl+"/login", Qs.stringify(params)).then(res=>res.data);
}

export const register= params =>{
  return  axios.post(baseUrl+"/register", Qs.stringify(params)).then(res=>res.data);
}

export const getUser = id =>{
  return axios.post(baseUrl+"/user/find",Qs.stringify(id)).then(res=>res.data)
}

export const logout = ()=>{
  return axios.post(baseUrl+"/logout",{}).then(res=>res.data)
}

export const getCourseWare = ()=> {
  return axios.post(baseUrl+'/getCourseWare',{}).then(res=>res.data)
}

export const getVideo = ()=> {
  return axios.post(baseUrl+'/getVideo',{}).then(res=>res.data)
}

export const getAllMsg = ()=>{
  return axios.post(baseUrl+'/message/find/all',{}).then(res=>res.data)
}

export const getMessagesByUser = (params)=>{
  return axios.post(baseUrl+'/user/getMessages', Qs.stringify(params)).then(res=>res.data)
}

export const getMsg = (params) =>{
  return axios.post(baseUrl+'/message/find', Qs.stringify(params)).then(res=>res.data)
}

export const addMessage = params=>{
  return  axios.post(baseUrl+"/message/add", Qs.stringify(params)).then(res=>res.data);
}

export const deleteMsg = params=>{
  return  axios.post(baseUrl+"/message/delete", Qs.stringify(params)).then(res=>res.data);
}

export const updateMsgClickCount = params=>{
  return  axios.post(baseUrl+"/message/update/clickcount", Qs.stringify(params)).then(res=>res.data);
}

export const updateMsgRtime = params=>{
  return  axios.post(baseUrl+"/message/update/rtime", Qs.stringify(params)).then(res=>res.data);
}

export const getRootReplies = params=>{
  return  axios.post(baseUrl+"/message/find/rootReply", Qs.stringify(params)).then(res=>res.data);
}

export const addRootReply = params=>{
  return  axios.post(baseUrl+"/rootReply/add", Qs.stringify(params)).then(res=>res.data);
}

export const deleteRootReply = params=>{
  return  axios.post(baseUrl+"/message/delete", Qs.stringify(params)).then(res=>res.data);
}

export const downloadVideo = params=>{
  axios.get('http://127.0.0.1:8080/video/'+params.fileName+'.mp4',{
    // params:params,
    responseType: "blob"
  })
    .then((res)=>{
      let url = window.URL.createObjectURL(new Blob([res.data]));
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', params.fileName+'.mp4');
      document.body.appendChild(link);
      link.click();
      //释放URL对象所占资源
      window.URL.revokeObjectURL(url);
      //用完即删
      document.body.removeChild(link);
    });
}
