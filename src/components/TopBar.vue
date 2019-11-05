<!-- 顶部导航组件 -->
<!-- 使用说明：<top-bar></top-bar> -->
<template>
  <div id="topbar-wrap" :class="{ topCollapsed: isCollapse }">
    <el-row type="flex" justify="end">

      <el-col :span="12">
        <el-row type="flex" class="row-right" justify="end" style="margin-right:-15px">
          <el-col :span="5">
            <a class="animated fadeIn" v-if="username">{{username}}</a>
            <a class="animated fadeIn" v-else href="/login">点击登录</a>
          </el-col>
          <el-col :span="2">
            <i :class="[isFullscreen ? 'fa-compress': 'fa-arrows-alt','fa']" title="全屏" @click="toggleFullscreen"></i>
          </el-col>
          <el-col :span="2" v-if="username">
            <i class="fa fa-power-off logout" title="退出" @click.prevent="logout"></i>
          </el-col>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>
<script>
import "@/assets/libs/screenfull.js";
import "../../static/css/iconfont.css";
export default {
  name: "topbar",
  data() {
    return {
      username: sessionStorage.username,
      isFullscreen: false
    };
  },
  methods: {
    toggleFullscreen() {
      if (!screenfull.enabled) {
        this.$message.warning("您的浏览器不支持全屏");
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = !screenfull.full;
    },
    logout() {
      sessionStorage.clear();
      // this.$router.push("signin");
    }
  },
  watch: {
    // $route(to, from) {
    //   this.pathName = this.$route.path.substring(1);
    //   this.nowPath = this.$route.path;
    // }
  }
};
</script>
<style scoped lang="scss">
#topbar-wrap {
  overflow: hidden;
  border-bottom: 1px solid #efefef;
  background: #fff;
  color: #353d47;
  padding: 0 15px;
  z-index: 4;
  box-sizing: border-box;
  // box-shadow: 0px 0px 20px rgba(0,0,0,0.03);
  a {
    line-height: 60px;
  }
  i {
    font-size: 20px;
    line-height: 60px;
    transition: all 0.5s;
    &:hover {
      cursor: pointer;
    }
  }
  .fa-language:hover {
    transform: rotateY(180deg);
  }
  .logout {
    text-decoration: none;
  }
}
.row-right > div {
  text-align: center;
}
</style>
