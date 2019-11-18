<template>
  <div>
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span style="font-size: larger"><b>视频资料</b></span>
      </div>

      <div class="text item">
        <el-table :data="listVideo.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%">
          <el-table-column label="视频下载">
            <template slot-scope="scope">
              <el-row :gutter="10">
                <el-col :span="2">
                  <el-image
                    style="width: 50px; height: 50px"
                    :src="img">
                  </el-image>
                </el-col>
                <el-col :span="6" class="title">
                  <a :href="'http://'+scope.row.src+'.zip'">{{scope.row.name}}.mp4</a>
                </el-col>
                <el-col :span="6" class="info" style="left:40%;">
                  <p>大小: {{scope.row.scale}}</p>
                </el-col>
                <el-col :span="6" class="info">
                  <p>上传时间: {{scope.row.time}}</p>
                </el-col>
              </el-row>
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
          :total="listVideo.length">
        </el-pagination>
      </div>

    </el-card>

  </div>
</template>

<script>
    import {getVideo} from "../api/api";
    export default {
        name: "Video",
        data(){
            return{
                listVideo:[],
                img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573530125336&di=589cf3bb110673e1fb4a7d34dd867542&imgtype=0&src=http%3A%2F%2Fd.lanrentuku.com%2Fdown%2Fpng%2F0904%2FM-v-Player%2FM-v-Player_11.png",
                currentPage:1,
                pagesize:10
            }
        },
        created() {
            if(sessionStorage.username){
                getVideo().then(res=>{
                    // console.log(res);
                    let { msg, status, data } = res;
                    if(status=='200'){
                        this.listVideo=data;
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
</style>
