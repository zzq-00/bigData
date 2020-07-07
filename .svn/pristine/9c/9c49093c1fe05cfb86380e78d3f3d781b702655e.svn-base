<template>
  <div style="min-width: 1300px;">
    <headerComponent/>
    <div class="content">
      <div class="img-404"></div>
      <div class="deal-box">
        <p>
          <span style="font-size:14px">你可以：</span>
          <a href="javascript:window.history.go(-1)" class="blue">返回上一页</a>
        </p>
        <router-link class="blue text" to="/">返回网站首页</router-link>
        <!-- <router-link class="blue text" to="/entryInterface/login">返回登录界面</router-link> -->
      </div>
    </div>
    <div class="footer">
      <!-- <p class="copyright font-14">Copyright(©)2017上海青矩互联网科技有限公司 版权所有 沪ICP备16015426号-1</p> -->
    </div>
  </div>
</template>
<script>
import headerComponent from '@/components/headerComponent'
export default {
  data () {
    return {}
  },
  components: {
    headerComponent
  }
}
</script>
<style lang="less" scoped>
.entry-header {
  border-bottom: 1px solid #d9d9d9;
  .container {
    height: 80px;
    line-height: 80px;
    .logo {
      display: inline-block;
      width: 120px;
      height: 80px;
      // background: url("../assets/img/logo.png") no-repeat center;
      background-size: contain;
    }
    > h3 {
      font-size: 24px;
      font-weight: 700;
      color: #666;
      margin-left: 30px;
    }
    .home {
      &:hover {
        color: rgb(16, 140, 238);
      }
    }
  }
}
.footer {
  margin: 30px 0;
  .copyright {
    color: #333;
    text-align: center;
  }
}

.container {
  width: 1200px;
  margin: 0 auto;
}
.content {
  overflow: hidden;
  width: 1180px;
  margin: auto;
  margin-top: 10px;
  background-color: #fff;
  position: relative;
  .img-404{
    width: 1280px;
    height: 720px;
    margin: 0 auto;
    background: url('../assets/img/images-404.jpg') no-repeat;
  }
  .deal-box{
    position: absolute;
    right: 280px;
    bottom: 30px;
    .text{
      margin-top: 10px;
      padding-left: 60px;
      display: block;
    }
  }
}

</style>
