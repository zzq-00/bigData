<template>
  <el-breadcrumb separator="/">
    <img src="@/assets/img/icons.png" alt class="imgs fl">
    <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name:'breadcrumb',
  props: {
    breadcrumbs: {
      type: Array
    }
  },
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
.imgs {
  margin: 8px 7px 8px 21px;
  margin-left: 21px;
  margin-top: 8px;
}
.el-breadcrumb {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #505768;
  line-height: 30px;
  font-size: 12px;
}
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner,
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #afbad4 !important;
}
/deep/ .el-breadcrumb__inner a,
/deep/ .el-breadcrumb__inner.is-link {
  color: #afbad4;
}
</style>
