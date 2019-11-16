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
          @row-click="openDetails">
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

  </div>
</template>

<script>
    import {getAllMsg,updateMsgClickCount} from "../api/api";
    export default {
        name: "Message",
        data(){
            return{
                listMessage:[],
                currentPage:1,
                pagesize:10
            }
        },
        created() {
            if(sessionStorage.username){
                getAllMsg().then(res=>{
                    // console.log(res);
                    let { msg, status, data } = res;
                    if(status=='200'){
                        for(let i in data){
                            if(data[i].state!=0){
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
</style>
