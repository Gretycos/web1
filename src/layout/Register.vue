<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="80px" class="demo-ruleForm register-container">
    <h3 class="title">账号注册</h3>
    <el-form-item prop="id" label="学号">
      <el-input type="text" v-model="ruleForm2.id" auto-complete="off" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item prop="password1" label="密码">
      <el-input type="password" v-model="ruleForm2.password1" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="password2" label="确认密码">
      <el-input type="password" v-model="ruleForm2.password2" auto-complete="off" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item prop="name" label="姓名">
      <el-input type="text" v-model="ruleForm2.name" auto-complete="off" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item prop="nickname" label="昵称">
      <el-input type="text" v-model="ruleForm2.nickname" auto-complete="off" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input type="text" v-model="ruleForm2.email" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="gender" label="性别">
      <el-radio-group v-model="ruleForm2.gender">
        <el-radio :label="'男'"></el-radio>
        <el-radio :label="'女'"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="birthday" label="生日">
      <el-date-picker type="date" placeholder="生日" v-model="ruleForm2.birthday" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:50%;" @click.native.prevent="handleSubmit2">注册</el-button>
      <p class="login" @click="toLogin">已有账号？立即登录</p>
    </el-form-item>
  </el-form>
</template>

<script>
  import {register} from "../api/api";
  Date.prototype.Format = function (fmt) {
      var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  }
  export default {
        name: "Register",
        data(){
            return{
                ruleForm2: {
                    id: '',
                    name: '',
                    nickname: '',
                    email: '',
                    gender: '',
                    birthday: '',
                    password1: '',
                    password2: '',

                },
                rules2: {
                    id: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                        { max: 12, message: '学号长度为12', trigger: 'blur' },
                        { min: 12, message: '学号长度为12', trigger: 'blur' },
                        { validator: (rule,value,callback)=>{
                                let re = /^[0-9]+$/;
                                if (!re.test(value)) {
                                    callback(new Error("学号必须是数字!"));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    password1: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { max: 18, message: '密码长度须小于等于18', trigger: 'blur' },
                        { min: 6, message: '密码长度须大于等于6', trigger: 'blur' },
                        { validator: (rule,value,callback)=>{
                                let re = /^\w/
                                if(!re.test(value)){
                                    callback(new Error("密码必须仅由数字、英文字母或者下划线组成"))
                                }else{
                                    callback();
                                }
                            }
                        }
                    ],
                    password2: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        { validator: (rule,value,callback)=>{
                                if (value !== this.ruleForm2.password1) {
                                    callback(new Error("两次输入密码不一致!"));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { max: 10, message: '名字长度须小于等于10', trigger: 'blur' },
                        { min: 2, message: '名字长度须大于等于2', trigger: 'blur' },
                        { validator: (rule,value,callback)=>{
                                let re = /^[\u4e00-\u9fa5]/
                                if(!re.test(value)){
                                    callback(new Error("姓名必须是汉字"))
                                }else{
                                    callback()
                                }
                            }
                        }
                    ],
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { max: 10, message: '昵称长度须小于等于10', trigger: 'blur' },
                        { min: 2, message: '昵称长度须大于等于2', trigger: 'blur' },
                        { validator: (rule,value,callback)=>{
                                let re = /^[\u4E00-\u9FA5A-Za-z0-9_]/
                                if(!re.test(value)){
                                    callback(new Error("昵称必须是中文、英文、数字可包括下划线"))
                                }else{
                                    callback()
                                }
                            }
                        }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'blur' },
                        { validator: (rule,value,callback)=>{
                                if(value===""){
                                    callback(new Error("请选择性别"))
                                }else{
                                    callback()
                                }
                            }
                        }
                    ],
                    birthday: [
                        { required: true, message: '请选择生日', trigger: 'blur' },
                        { type: 'date', message: '请输入正确年月日', trigger: ['blur', 'change'] }
                    ],

                }
            }
        },
        methods:{
            handleSubmit2:function () {
                let that=this;
                this.$refs.ruleForm2.validate(valid=>{
                    if(valid){
                        let info={
                            id: this.ruleForm2.id,
                            name: this.ruleForm2.name,
                            nickname: this.ruleForm2.nickname,
                            email: this.ruleForm2.email,
                            gender: this.ruleForm2.gender==='男'? 1 : 0,
                            birthday: this.ruleForm2.birthday.Format("yyyy-MM-dd"),
                            password: this.ruleForm2.password1
                        };
                        console.log(info);
                        // console.log("验证成功")
                        register(info).then(res=>{
                            let { msg, status, data } = res;
                            if(status=='200'){
                                if(data === 1){
                                    that.$message({
                                        message: msg,
                                        type: 'success',
                                        duration:1000
                                    });
                                    setTimeout(function () {
                                        that.$router.push('/login');
                                    }, 1500);
                                }
                            }else{
                                that.$message({
                                    message: msg,
                                    type: 'error',
                                    duration:1000
                                });
                            }
                        });
                    }else {
                        alert("未正确填写信息");
                    }
                });
            },
            toLogin:function () {
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="scss">
  .register-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 550px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
  }
  .login {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: left;
    text-indent: 8px;
    width: 160px;
  }
</style>
