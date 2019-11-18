<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm register-container">
    <h3 class="title">账号注册</h3>
    <el-form-item prop="id">
      <el-input type="text" v-model="ruleForm2.id" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="name">
      <el-input type="text" v-model="ruleForm2.name" auto-complete="off" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input type="text" v-model="ruleForm2.nickname" auto-complete="off" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input type="email" v-model="ruleForm2.email" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="gender">
      <el-input type="text" v-model="ruleForm2.gender" auto-complete="off" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item prop="birthday">
      <el-date-picker type="date" placeholder="生日" v-model="ruleForm2.birthday" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item prop="password1">
      <el-input type="password" v-model="ruleForm2.password1" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="password2">
      <el-input type="password" v-model="ruleForm2.password2" auto-complete="off" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return{
                ruleForm2: {
                    id: '',
                    name:'',
                    nickname:'',
                    email:'',
                    gender:'',
                    birthday:'',
                    password1: '',
                    password2: '',

                },
                rules2: {
                    id: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    gender: [
                        { required: true, message: '请输入性别', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    birthday: [
                        { required: true, message: '请输入生日', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    password1: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ],
                    password2: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ]
                }
            }
        },
        methods:{
            handleSubmit2:function () {

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
    width: 350px;
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
</style>
