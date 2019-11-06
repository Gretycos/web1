<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span style="font-size: larger"><b>课程介绍</b></span>
      </div>
      <div class="text item">
        <h2>课程简介</h2>
        <p>&nbsp&nbsp&nbsp&nbspWeb是一种典型的分布式应用结构。Web应用中的每一次信息交换都要涉及客户端和服务端。
          因此，Web开发技术大体上也可以被分为客户端技术和服务端技术两大类。
          Web客户端的主要任务是展现信息内容。
          Web客户端设计技术主要包括：HTML语言、Java Applets、脚本程序、CSS、DHTML、插件技术以及VRML技术。
          服务端技术与Web客户端技术从静态向动态的演进过程类似，Web服务端的开发技术也是由静态向动态逐渐发展、完善起来的。
          Web服务器技术主要包括服务器、CGI、PHP、ASP、ASP.NET、Servlet和JSP技术</p>
        <p>&nbsp&nbsp&nbsp&nbsp《Web技术》是面向信息化建设的一门基础课程，是掌握网页制作的一门实践性很强的技术入门课程，兼具设计性、实操性和应用性。
          本课程的主要学习内容是学习HTML、CSS、JavaScript及动态网页制作的基本原理、基本方法和技术，以及网站的发布和维护等基本知识与应用。
          课程的主要任务是培养学生了解网页制作和网站建设所需的基本知识，培养学生设计网页、建立网站和规划网站的实际技能。</p><br>
        <h2>教学内容</h2>
        <ul>
          <li>Web前端开发技术——HTML5、CSS3、JavaScript</li>
          <li>Java Web编程技术</li>
          <li>Vue前端界面开发</li>
        </ul><br>
        <h2>参考文献</h2>
        <ol>
          <li>《Web前端开发技术-HTML，CSS，Javascript》，储久良编著，清华大学出版社</li>
          <li>《JavaWeb开发技术》，清华大学出版</li>
          <li>《Vue.js从入门到项目时间》，清华大学出版社</li>
        </ol><br>
        <h2>考核方式</h2>
        <ul>
          <li>
            <dl>
              <dt><b>实验成绩50%</b></dt>
              <dd>1）采用课程相关技术实现Web技术课程网站，网站主要实现教学大纲、课程介绍等教学内容的浏览，教学课件和视频资料的浏览下载，
                简单的留言和回复功能。（20分）
              <dl>
                <dd>（a）采用HTML5、CSS3、JavaScript技术</dd>
                <dd>（b）采用Java Web 编程技术</dd>
                <dd>（c）采用Vue前端技术</dd>
              </dl>
              </dd>
              <dd>2）选用一种与课程相关的技术开发已电子商务系统，实现商户对网上商品的管理以及客户在平台上购物等基本功能。（30分）</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt><b>期末考试50%</b></dt>
              <dd>—笔试，主要考察学生对基本概念和基本技术院里的掌握（20分）</dd>
              <dd>—上机考试，主要考察学生实际Web技术开发能力。（30分）</dd>
            </dl>
          </li>
        </ul><br>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "Introduction"
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
