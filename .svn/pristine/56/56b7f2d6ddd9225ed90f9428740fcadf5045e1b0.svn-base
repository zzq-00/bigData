<template>
  <div class="finish-page">
    <p>
      <img :src="require('@/assets/img/complate_ico.png')" alt="">
      <span class="success-title">创建成功</span>
    </p>
    <p class="info">
      项目创建成功！立即进行文件<router-link class="blue" :to="'/projectManage/detail/fileInfo/'+$route.query.id">上传</router-link> 。
    </p>
    <div class="btn">
      <router-link class="again-btn" to="/createProject/create">继续创建项目</router-link>
      <router-link class="details-btn" :to="'/projectManage/detail/projectInfo/'+$route.query.id">查看项目</router-link>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="less" scoped>
.finish-page {
  margin-top: 60px;
  text-align: center;
  .success-title {
    font-size: 20px;
    color: RGBA(68, 68, 68, 1);
    vertical-align: middle;
    margin-left: 18px;
    margin-top: 10px;
  }
  .info {
    color: RGBA(190, 190, 190, 1);
    font-size: 12px;
    margin-top: 10px;
    .blue {
      color: RGBA(68, 116, 207, 1);
      text-decoration: underline;
    }
  }
  .btn {
    margin-top: 48px;
  }
  .btn-common(@bg) {
    display: inline-block;
    padding: 0 20px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    background-color: @bg;
  }
  .again-btn {
    .btn-common(RGBA(68, 207, 150, 1));
    margin-right: 30px;
  }
  .details-btn {
    .btn-common(RGBA(68, 116, 207, 1));
  }
}
</style>
