<template>
  <div class="analysis-page">
    <headerComponent />
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="analysis-content">
      <stepBar v-bind:ctitle="title"  v-bind:cStepList="stage"/>
      <router-view class="analysis-stage" />
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import stepBar from '@/components/stepBar'
import { getPostfix } from '@/assets/js/Utils'

export default {
  components: {
    headerComponent,
    breadcrumb,
    stepBar
  },
  data() {
    return {
      title:"数据比对",
      stage:['选择阶段', '选择数据对比类型', '选择单项工程', '查看对比结果'],
      projectId: (() => this.$route.params.projectId)(),
      breadcrumbs: [{ name: '我的项目', path: '/projectManage' },{ name: '数据比对' }]
    }
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.analysis-page {
  .analysis-content {
    height: e('calc(100vh - 90px)');
    background-color: #fff;
    margin: 0 auto;
    width: 1000px;
  }
  .analysis-stage {
    height: calc(100% - 61px);
  }
}
.analysis-stage {
  position: relative;
}
/deep/ .next-btn {
  position: absolute;
  left: 0;
  right: 0;
  box-sizing: border-box;
  height: 7.5vh;
  line-height: 7.5vh;
  text-align: center;
  border-top: 1px solid #eff2f9;
  box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.15);
  bottom: 0;
  z-index: 1;
  > button {
    cursor: pointer;
    width: 80px;
    height: 30px;
    font-size: 14px;
    font-weight: 400;
    margin: 0 10px;
    &.cancel {
      background-color: #e9edf3;
      color: #666666;
    }
    &.previous {
      color: #fff;
      background-color: #4474cf;
    }
    &.next {
      color: #fff;
      background-color: #44cf96;
    }
  }
}
</style>
