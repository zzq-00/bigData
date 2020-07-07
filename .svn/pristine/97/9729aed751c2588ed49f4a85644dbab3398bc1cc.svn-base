<template>
  <div class="analysis-page">
    <headerComponent />
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="analysis-content">
      <resultsHistory v-if="type=='first'" />
      <withinProjectHistory v-if="type=='second'"></withinProjectHistory>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import resultsHistory from './resultsHistory'
import withinProjectHistory from './withinProjectHistory'

export default {
  components: {
    headerComponent,
    breadcrumb,
    resultsHistory,
      withinProjectHistory
  },
  data() {
    return {
      title:"数据比对",
      stage:['选择阶段', '选择数据对比类型', '选择单项工程', '查看对比结果'],
      projectId: (() => this.$route.params.projectId)(),
      breadcrumbs: [{ name: '我的项目', path: '/projectManage' },{ name: '数据比对' }],
      id:this.$route.params.id,
        type:this.$route.params.type
    }
  },
  methods: {},
  mounted() {

  }
}
</script>
<style lang="less" scoped>
  .analysis-page {
    .analysis-content {
      height: calc(100vh - 151px);
      background-color: #fff;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
