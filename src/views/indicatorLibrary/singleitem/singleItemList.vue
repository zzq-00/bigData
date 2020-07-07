<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container main">
      <singleItemFilterMain placeholder="搜索单项工程名称" />
      <reslists v-loading="dataWait" />
    </div>
  </div>
</template>

<script>
import singleItemFilterMain from '@/components/singleItemFilterMain/index'
import reslists from './reslists'
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'
import { mapState } from 'vuex';
export default {
  name: 'singleItemList',
  components: {
    breadcrumb,
    singleItemFilterMain,
    reslists
  },
  data() {
    return {
      breadcrumbs: [{ name: '单项工程指标库', path: this.$route.fullPath }],
      dataWait: false,
    }
  },
  methods: {
    handleSort(val, name) {
      if (name === 'price') {
        this.page_size.valueForOrder = val
      } else {
        this.page_size.valueForOrder = ''
      }
      if (name === 'starttime') {
        this.page_size.projectStartSort = val
      } else {
        this.page_size.projectStartSort = ''
      }
      if (name === 'endtime') {
        this.page_size.projectEndSort = val
      } else {
        this.page_size.projectEndSort = ''
      }
      this.page_size.page = 1
      let params = Object.assign(this.params, this.page_size)
      this.getTableList(params)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  &.main {
    padding: 15px 0;
    min-height: e('calc(100vh - 90px)');
  }
}
</style>