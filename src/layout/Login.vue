<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="isLogged">登录</el-button>
      <p class="register" @click="toRegister">没有账号？立即注册</p>
<!--      <el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
    import { requestLogin,getUser } from '../api/api';
    export default {
        name: "Login",
        data() {
            return {
                isLogged: false,
                ruleForm2: {
                    account: '201700000001',
                    checkPass: '1'
                },
                rules2: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {
            // handleReset2() {
            //     this.$refs.ruleForm2.resetFields();
            // },
            handleSubmit2(ev) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.isLogged = true;
                        let loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
                        requestLogin(loginParams).then(res => {
                            this.isLogged = false;
                            // console.log(res);
                            let { msg, status, data } = res;
                            if (status == '200') {
                                let id = {id: this.ruleForm2.account};
                                getUser(id).then(res1=>{
                                    // console.log(res1);
                                    let msg1=res1.msg;
                                    let status1=res1.status;
                                    let data1=res1.data;
                                    if(status1 == '200'){
                                        sessionStorage.setItem('id', data1.username);
                                        sessionStorage.setItem('nickname', data1.nickname);
                                        sessionStorage.setItem('gender', data1.gender);
                                        sessionStorage.setItem('email', data1.email);
                                        sessionStorage.setItem('birthday', data1.birthday);
                                        sessionStorage.setItem('username', data1.name);
                                        sessionStorage.setItem('auth', data.authorities[0].authority);
                                        this.$router.push({ path: '/introduction' });
                                    }else{
                                        this.$message({
                                            message: msg1,
                                            type: 'error'
                                        });
                                    }
                                });
                            } else {
                                this.$message({
                                    message: msg,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            toRegister:function () {
                this.$router.push('/register');
            }
        }

    }
</script>

<style scoped lang="scss">
  .login-container {
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
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .register {
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
