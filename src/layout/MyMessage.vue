<template>
  <div>
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span style="font-size: larger"><b>我的留言板</b></span>
      </div>

      <div class="text item">
        <el-table
          :data="listMyMessage.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          height="250"
          style="width: 100%"
          :default-sort = "{prop: 'send_time', order: 'descending'}">
          <el-table-column type="expand">
            <template slot-scope="prop">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="留言：">
                  <p style="font-size: large">{{prop.row.text}}</p>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
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
          <el-table-column
          prop="state"
          label="状态">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="prop">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(prop.row)"
                v-if="prop.row.state==='正常'">删除</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(prop.row)"
                v-else-if="prop.row.state==='已删除'"
                disabled>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listMyMessage.length">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
    import {getMessagesByUser, deleteMsg} from "../api/api";
    export default {
        name: "MyMessage",
        data(){
            return{
                listMyMessage:[],
                currentPage:1,
                pagesize:10
            }
        },
        created() {
            if(sessionStorage.username){
                let id = {id:sessionStorage.id}
                getMessagesByUser(id).then(res=>{
                    // console.log(res);
                    let { msg, status, data } = res;
                    // console.log(data)
                    if(status=='200'){
                        for(let i in data){
                            if(data[i].state===0){
                                data[i].state="已删除"
                            }else{
                                data[i].state="正常"
                            }
                        }
                        this.listMyMessage=data;
                    } else{
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
            handleDelete:function (row) {
                this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={id:row.id};
                    let that=this;
                    deleteMsg(params).then(res=>{
                        let { msg, status, data } = res;
                        if(status==='200'){
                            if(data===1){
                                this.$message({
                                    message:'删除成功' ,
                                    type: 'success',
                                    duration:1000
                                });
                                setTimeout(function () {
                                    that.$router.go(0);
                                }, 1500);
                            }
                        }else{
                            this.$message({
                                message: msg,
                                type: 'error',
                                duration:3000
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            }
        }
    }
</script>

<style scoped lang="scss">
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
