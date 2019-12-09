<template>
  <div>
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span style="font-size: larger"><b>教学课件</b></span>
      </div>

      <div class="text item">
        <el-table :data="listCourseWare.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%">
          <el-table-column label="课件下载">
            <template slot-scope="scope">
              <el-row :gutter="10">
                <el-col :span="2">
                  <el-image
                    style="width: 50px; height: 50px"
                    :src="img">
                  </el-image>
                </el-col>
                <el-col :span="6" class="title">
                  <a :href="'http://'+scope.row.src">{{scope.row.name}}.pptx</a>
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
          :total="listCourseWare.length">
        </el-pagination>
      </div>

    </el-card>

  </div>
</template>

<script>
  import {getCourseWare} from "../api/api";

  "../api/api"
    export default {
        name: "Courseware",
        data(){
            return{
                listCourseWare:[],
                img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573040852637&di=a9d8bd059e84061c9a9aaa27fa4ea16e&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F16%2F30%2F59aee80e94c44_610.jpg",
                currentPage:1,
                pagesize:10
            }
        },
        created() {
            if(sessionStorage.username){
                getCourseWare().then(res=>{
                    console.log(res);
                    let { msg, status, data } = res;
                    if(status=='200'){
                        this.listCourseWare=data;
                    }else{
                        this.$message({
                            message: msg,
                            type: 'error',
                            duration:3000
                        });
                        sessionStorage.clear();
                        this.$router.push("/login")
                    }
                });
            }else{
                this.$router.push("/login");
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
