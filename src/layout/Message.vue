<template>
  <div>
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span style="font-size: larger"><b>留言板</b></span>
      </div>

      <div class="text item">
        <el-table
          :data="listMessage.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          height="250"
          style="width: 100%"
          @row-click="openDetails"
          :default-sort = "{prop: 'send_time', order: 'descending'}">
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="user.nickname"
            label="作者">
          </el-table-column>
          <el-table-column
            prop="send_time"
            label="发表时间">
          </el-table-column>
          <el-table-column
            prop="click_count"
            label="点击量">
          </el-table-column>
          <el-table-column
            prop="reply_count"
            label="回复量">
          </el-table-column>
          <el-table-column
            prop="last_rtime"
            label="最新回复时间">
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listMessage.length">
        </el-pagination>
      </div>

    </el-card>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="4">
              <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
              <span style="font-size: medium">发表留言</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-input
              type="textarea"
              placeholder="请输入标题"
              v-model="textarea_title"
              maxlength="30"
              show-word-limit
              rows="1">
            </el-input>
          </el-row>
          <el-row>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea_text"
              maxlength="140"
              show-word-limit
              rows="5">
            </el-input>
          </el-row>
          <el-row class="emit">
            <el-button type="primary" plain size="small" @click="emitMessage">提交留言</el-button>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
    import {getAllMsg, updateMsgClickCount, addMessage} from "../api/api";
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
        name: "Message",
        data(){
            return{
                listMessage:[],
                currentPage:1,
                pagesize:10,
                textarea_title:'',
                textarea_text: '',

            }
        },
        created() {
            if(sessionStorage.username){
                getAllMsg().then(res=>{
                    // console.log(res);
                    let { msg, status, data } = res;
                    // console.log(data)
                    if(status=='200'){
                        for(let i in data){
                            if(data[i].state === 1){
                                this.listMessage.push(data[i]);
                            }
                        }
                    }else{
                        this.$message({
                            message: msg,
                            type: 'error',
                            duration:3000
                        });
                        sessionStorage.clear();
                        this.$router.push("/login");
                    }
                });
            }else{
                this.$router.push("/login")
            }

        },
        methods:{
            handleSizeChange:function (size) {
                this.pagesize=size;
            },
            handleCurrentChange:function (currentPage) {
                this.currentPage = currentPage;
            },
            openDetails (row) {
                let id = {id: row.id};
                updateMsgClickCount(id).then(res1=>{
                    let msg1=res1.msg;
                    let status1=res1.status;
                    // let data1=res1.data;
                    if(status1=='200'){
                        this.$router.push({
                            path: '/messageDetails',
                            query: {
                                id: row.id
                            }
                        });
                    }else{
                        this.$message({
                            message: msg1,
                            type: 'error'
                        });
                    }
                });

            },
            emitMessage: function () {
                let params={
                    id: sessionStorage.id,
                    send_time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
                    title: this.textarea_title,
                    text: this.textarea_text
                }
                addMessage(params).then(res=>{
                    let { msg, status, data } = res;
                    if(status=='200'){
                        if(data===1){
                            this.$message({
                                message: '发表成功',
                                type: 'success',
                                duration: 1000
                            });
                            this.$router.go(0);
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
  a{
    font-size: medium;
    text-decoration: none;
    color: #353d47;
    position: absolute;
    text-align: center;
    top: 25%;
    left: 0;
    bottom: 0;
    margin: auto;
  }
  .title{
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 20%;
    margin: auto;
  }
  .info{
    position: absolute;
    text-align: center;
    top: 0;
    right: 0;
    margin: auto;
  }
  .emit{
    display: flex;
    justify-content: flex-end;
  }
</style>
