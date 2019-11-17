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

      <div >

        <div v-for="(reply, index) in listRootReplies.slice((currentPage-1)*pagesize,currentPage*pagesize)">
          <el-card class="box-card">

            <div slot="header" class="clearfix">
              <el-row class="top">

                <el-col :span="12">

                  <span style="font-size: small; color: grey"><b>#{{(currentPage-1)*pagesize+index+1}}</b></span>

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

        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listRootReplies.length">
          </el-pagination>
        </div>

        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-row>
                <el-col :span="4">
                  <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                  <span style="font-size: medium">发表回复</span>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="textarea"
                  maxlength="140"
                  show-word-limit
                  rows="5">
                </el-input>
              </el-row>
              <el-row class="emit">
                <el-button type="primary" plain size="small" @click="emitReply">提交回复</el-button>
              </el-row>
            </div>
          </el-card>
        </div>

      </div>

    </el-card>




  </div>
</template>

<script>
    import {getMsg, getRootReplies, addRootReply, updateMsgRtime} from "../api/api";
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
        name: "MessageDetails",
        data() {
            return{
              msg:{},
              listRootReplies:[],
              currentPage:1,
              pagesize:10,
              textarea: ''
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
                            console.log(res1);
                            let msg1=res1.msg;
                            let status1=res1.status;
                            let data1=res1.data;
                            if(status1 === '200'){
                                console.log(data1);
                                // this.listRootReplies=data1;
                                for(let i in data1){
                                    if(data1[i].state === 1){
                                        this.listRootReplies.push(data1[i]);
                                    }
                                }
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
        },
        methods:{
            handleSizeChange:function (size) {
                this.pagesize=size;
            },
            handleCurrentChange:function (currentPage) {
                this.currentPage = currentPage;
            },
            emitReply:function () {
                let params={
                    uid: sessionStorage.id,
                    mid: this.$route.query.id.toString(),
                    time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
                    text: this.textarea
                }
                console.log(params)
                addRootReply(params).then(res=>{
                    // console.log(res);
                    let { msg, status, data } = res;
                    if(status=='200'){
                        if(data === 1){
                            let params1={
                                id: params.mid,
                                rtime: params.time
                            }
                            updateMsgRtime(params1).then(res1=>{
                                let msg1=res1.msg;
                                let status1 = res1.status;
                                let data1 = res1.data;
                                if(status1 === '200'){
                                    if(data1 === 1){
                                        this.$message({
                                            message: '发表成功',
                                            type: 'success',
                                            duration: 1000
                                        });
                                        this.$router.go(0);
                                    }
                                } else{
                                    this.$message({
                                        message: msg1,
                                        type: 'error',
                                        duration:3000
                                    });
                                }
                            });
                        }
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
.emit{
  display: flex;
  justify-content: flex-end;
}
</style>
