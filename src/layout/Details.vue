<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span style="font-size: larger"><b>课程详情</b></span>
      </div>
      <div class="text item">
        <h2>第一部分：Web前端开发技术</h2>
        <ul>
          <li>第一章&nbsp&nbspWeb前端开发技术综述</li>
          <li>
            HTML
            <ul>
              <li>第二章&nbsp&nbspHTML基础</li>
              <li>第三章&nbsp&nbsp格式化文字与段落</li>
              <li>第四章&nbsp&nbsp列表</li>
              <li>第五章&nbsp&nbsp超链接</li>
              <li>第六章&nbsp&nbsp图像与多媒体文件</li>
            </ul>
          </li>
          <li>
            CSS
            <ul>
              <li>第七章&nbsp&nbspCSS基础</li>
              <li>第八章&nbsp&nbspDIV与SPAN</li>
              <li>第九章&nbsp&nbspCSS样式属性</li>
              <li>第十章&nbsp&nbspCSS+DIV页面布局</li>
              <li>第十一章&nbsp&nbsp表格</li>
              <li>第十二章&nbsp&nbsp表单</li>
              <li>第十三章&nbsp&nbspHTML5基础与CSS3应用</li>
            </ul>
          </li>
          <li>
            JavaScript
            <ul>
              <li>第十四章&nbsp&nbspJavaScript基础</li>
              <li>第十五章&nbsp&nbspJavaScript事件分析</li>
              <li>第十六章&nbsp&nbspDOM和BOM</li>
              <li>第十七章&nbsp&nbspHTML5高级应用</li>
            </ul>
          </li>
        </ul><br>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "Outline"
    }
</script>

<style scoped lang="scss">
  h2{
    text-align: center;
  }
  li{
    font-size: large;
  }
</style>
