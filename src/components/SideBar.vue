<!-- 左侧导航组件 -->
<!-- 使用说明：<side-bar></side-bar> -->
<template>
  <div id="sidebar-wrap">
    <!-- 顶部图标 -->
    <h3 class="logo">
      <a class="twist1" href="/introduction">web技术</a>
    </h3>

    <!-- 循环生成侧栏菜单 -->
    <el-menu background-color="#3f4d67" text-color="#fff" :default-active="$route.path" :unique-opened="true" :router="true" mode="vertical">

      <!-- 多级菜单外壳 -->
      <el-submenu index="/">

        <!-- 一级菜单包裹层 -->
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">教学大纲</span>
        </template>

        <!-- 二级菜单选项 -->
        <el-menu-item index="/introduction">
          <i class="fa fa-long-arrow-right"></i>
          <span slot="title">课程介绍</span>
        </el-menu-item>

        <!-- 二级菜单选项 -->
        <el-menu-item index="/details">
          <i class="fa fa-long-arrow-right"></i>
          <span slot="title">课程详情</span>
        </el-menu-item>

      </el-submenu>

      <!-- 单级菜单 -->
      <el-menu-item index="/courseware">
        <i class="el-icon-document"></i>
        <span slot="title">教学课件</span>
      </el-menu-item>

      <!-- 单级菜单 -->
      <el-menu-item index="/video">
        <i class="el-icon-document"></i>
        <span slot="title">视频资料</span>
      </el-menu-item>

<!--      &lt;!&ndash; 单级菜单 &ndash;&gt;-->
<!--      <el-menu-item index="/message">-->
<!--        <i class="el-icon-document"></i>-->
<!--        <span slot="title">留言板</span>-->
<!--      </el-menu-item>-->

      <!-- 多级菜单外壳 -->
      <el-submenu index="/">

        <!-- 一级菜单包裹层 -->
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">留言</span>
        </template>

        <!-- 二级菜单选项 -->
        <el-menu-item index="/message">
          <i class="fa fa-long-arrow-right"></i>
          <span slot="title">留言板</span>
        </el-menu-item>

        <!-- 二级菜单选项 -->
        <el-menu-item index="/myMessage">
          <i class="fa fa-long-arrow-right"></i>
          <span slot="title">我的留言</span>
        </el-menu-item>

      </el-submenu>

<!--      <template v-for="item in menu">-->

<!--        &lt;!&ndash; 多级菜单外壳 &ndash;&gt;-->
<!--        <el-submenu v-if="item.children.length !== 0" :index="item.router" :key="item.router">-->

<!--          &lt;!&ndash; 一级菜单包裹层 &ndash;&gt;-->
<!--          <template slot="title">-->
<!--            <i :class="item.icon"></i>-->
<!--            <span slot="title">{{item.name}}</span>-->
<!--          </template>-->

<!--          &lt;!&ndash; 二级菜单选项 &ndash;&gt;-->
<!--          <el-menu-item v-for="child in item.children" :index="child.router" :key="child.router">-->
<!--            <i class="fa fa-long-arrow-right"></i>-->
<!--            <span slot="title">{{item.name}}</span>-->
<!--          </el-menu-item>-->
<!--        </el-submenu>-->

<!--        &lt;!&ndash; 单级菜单 &ndash;&gt;-->
<!--        <el-menu-item v-else :index="item.router" :key="item.router">-->
<!--          <i :class="item.icon"></i>-->
<!--          <span slot="title">{{item.name}}</span>-->
<!--        </el-menu-item>-->
<!--      </template>-->
    </el-menu>

  </div>
</template>
<script>

export default {
  name: "sidebar",
  data() {
    return {
      // menu: localStorage.menu ? JSON.parse(localStorage.menu) : []
    };
  },
  computed: {
    toggSiderBar() {
      // return this.$store.state.common.isCollapse;
    }
  },
  methods: {

  }
};
</script>
<style scoped lang="scss">
#sidebar-wrap {
  width: 180px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
  transition: all 0.3s;
  background: #3f4d67;
  &.collapsed {
    width: 64px;
    transition: all 0.3s;
  }

  /* 图标动画 */
  .imgWrap {
    text-align: center;
    position: absolute;
    bottom: 30px;
    width: 100%;
    .gif {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .logo {
    color: #fff;
    text-align: center;
    padding: 18px 0;
    margin: 0;
    height: 60px;
    box-sizing: border-box;
  }
}

.el-menu {
  height: 100%;
  box-shadow: 0px 15px 15px rgba(0,0,0,0.6);
}

// 美化左侧导航的留白
.el-submenu .el-menu-item {
  padding: 0 20px;
  min-width: 160px;
  padding-left: 26px !important;
  i {
    padding-right: 10px;
  }
}

// 改变元素属性，要不动画效果不管用，是不是很厉害啊？哈哈哈
.twist1 {
  display: block;
}
a {
  text-decoration: none;
  color:white;
}
</style>
