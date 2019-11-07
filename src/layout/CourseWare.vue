<template>
  <div>
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span style="font-size: larger"><b>教学课件</b></span>
      </div>

      <div class="text item">
        <el-table :data="listCourseWare" stripe style="width: 100%">
          <el-table-column label="课件">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="img"
                :fit="cover"></el-image>
              <a href="scope.row.src">{{scope.row.name}}</a>
            </template>
          </el-table-column>
        </el-table>
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
                img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573040852637&di=a9d8bd059e84061c9a9aaa27fa4ea16e&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F16%2F30%2F59aee80e94c44_610.jpg"
            }
        },
        created() {
            if(sessionStorage.username){
                getCourseWare();
            }else{
                this.$router.push("/login")
            }

        }
    }
</script>

<style scoped>

</style>
