<template>
  <div>
    <headerComponent />
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <!-- 面包屑 -->
    <div class="new-project-container">
      <div class="title">
        <h3>创建项目</h3>
        <div class="right-flow">
          <span class="flow active-flow">1</span>
          <span class="flow-title">项目信息</span>
          <span class="flow-line" :class="{'active-flow': $route.path === '/createProject/finishProject'}"></span>
          <span class="flow" :class="{'active-flow': $route.path === '/createProject/finishProject'}">2</span>
          <span class="flow-title">创建完成</span>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
export default {
  components: {
    headerComponent,
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [{ name: '项目管理', path: '/projectManage' }, { name: '创建项目', path: this.$route.fullPath }]
    }
  }
}
</script>
<style lang="less" scoped>
.new-project-container {
  width: 1000px;
  min-height: calc(100vh - 90px);
  margin: 0 auto;
  background-color: #fff;
  .title {
    overflow: hidden;
    height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid RGBA(239, 242, 249, 1);
  }
  h3 {
    font-size: 18px;
    color: #444444;
    line-height: 60px;
  }
  .right-flow {
    float: right;
    margin-top: -40px;
    color: #444444;
    font-size: 12px;
    .flow-title {
      vertical-align: middle;
    }
    .flow {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 50%;
      background-color: #f0f3f8;
      color: #666;
      text-align: center;
      margin-right: 6px;
      vertical-align: middle;
    }
    .flow-line {
      margin: 0 7px;
      display: inline-block;
      width: 60px;
      height: 4px;
      background-color: RGBA(233, 237, 243, 1);
      vertical-align: middle;
    }
    .active-flow {
      background-color: #4474cf;
      color: #fff;
    }
  }
}
</style>
