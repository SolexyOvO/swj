<template>
  <div id="app">
    <el-container>
      <el-header class="app-header">
        <el-menu
          class="menu-index"
            default-active="1"
          mode="horizontal"
          background-color="#29b7cb"
          text-color="#fff"
          active-text-color="#d2d97a"
        >
          <el-menu-item index="1">处理中心</el-menu-item>
        </el-menu>
      </el-header>
      <el-container class="body1">
        <el-aside width="65px">
          <el-menu
            default-active="1"
            class="left-nav-sub"
            collapse
          >
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">绘制</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">日志（开发中）</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">（配置，等待后续升级）</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
};
</script>

<style>
.app-header {
  position: fixed;
  left: 0%;
  top: 0;
  width: 100%;
  padding: 0 0 !important;
}

.body1 {
  position: fixed;
  left: 0;
  top: 60px;
  width: 100%;
  min-height: 1800px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
</style>
