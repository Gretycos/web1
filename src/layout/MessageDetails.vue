<template>
  <div>
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="16">
            <i class="el-icon-edit"></i>&nbsp;&nbsp;
            <span style="font-size: larger"><b>{{msg.title}}</b></span>
          </el-col>
        </el-row>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix">

          <el-row class="top">

            <el-col :span="12">

              <span style="font-size: small; color: grey">楼主</span>

            </el-col>

            <el-col :span="16">

              <el-row class="intop">
                <el-col :span="6">
                  <span style="font-size: small; color: grey">作者：{{msg.user.nickname}}</span>
                </el-col>

                <el-col :span="8">
                  <span style="font-size: small; color: grey">发表时间：{{msg.send_time}}</span>
                </el-col>
              </el-row>

            </el-col>

          </el-row>

        </div>

        <div class="text item">
          <el-row>
            <p style="font-size: large">&nbsp&nbsp&nbsp&nbsp{{msg.text}}</p>
          </el-row>
        </div>

      </el-card>

      <div v-for="(reply, index) in listRootReplies">
        <el-card class="box-card">

          <div slot="header" class="clearfix">
            <el-row class="top">

              <el-col :span="12">

                <span style="font-size: small; color: grey"><b>#{{index+1}}</b></span>

              </el-col>

              <el-col :span="16">

                <el-row class="intop">
                  <el-col :span="6">
                    <span style="font-size: small; color: grey">作者：{{reply.user.nickname}}</span>
                  </el-col>
                  <el-col :span="8">
                    <span style="font-size: small; color: grey">发表时间：{{reply.time}}</span>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>
          </div>

          <div class="text item">
            <el-row>
              <p style="font-size: large">&nbsp&nbsp&nbsp&nbsp{{reply.text}}</p>
            </el-row>
          </div>

        </el-card>
      </div>

    </el-card>




  </div>
</template>

<script>
    import {getMsg, getRootReplies} from "../api/api";
    export default {
        name: "MessageDetails",
        data() {
            return{
              msg:{},
              listRootReplies:[]
            }
        },
        created() {
            // console.log(this.$route.params)
            let id = this.$route.query.id;
            let param={ id:id };
            if(id != null){
                getMsg(param).then(res=>{
                    let { msg, status, data } = res;
                    if(status === '200'){
                        this.msg=data;
                        // console.log(data);
                        getRootReplies(param).then(res1=>{
                            let msg1=res1.msg;
                            let status1=res1.status;
                            let data1=res1.data;
                            if(status1 === '200'){
                                this.listRootReplies=data1;
                            }else{
                                this.$message({
                                    message: msg1,
                                    type: 'error',
                                    duration:3000
                                });
                            }
                        });
                    }else{
                        this.$message({
                            message: msg,
                            type: 'error',
                            duration:3000
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
.top{
  display: flex;
  justify-content: space-between;
}
.intop{
  display: flex;
  justify-content: flex-end;
}
</style>
