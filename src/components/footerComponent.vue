<template>
  <div class="footer">
    <div class="container">
      <div class="footerleft">
        <h3>TZECC</h3>
        <p>
          <a href="javascript:;">产品介绍</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">关于我们</a>
        </p>
        <h6>北京市海淀区车公庄西路19号外文文化创意园12A</h6>
        <h6>010 - 88540855 （周一至周五：08:30 - 17:30）</h6>
        <h6>Copyright @ 2018 青矩技术股份有限公司 版权所有 l 京ICP备16007407号-1</h6>
      </div>
      <div class="footeright">
        <div class="footrBorder">
          <p>
            <img src="../assets/img/index/wx1.jpg" alt="">
            <span>官方微信</span>
          </p>
          <p>
            <img src="../assets/img/index/wx2.jpg" alt="">
            <span>微信小程序</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.footer {
  height: 280px;
  color: #b5b5b6;
  background-color: #3e3f42;
  .container {
    width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footerleft {
      > h3 {
        font-size: 24px;
        color: #fff;
      }
      > p {
        padding-top: 26px;
        padding-bottom: 20px;
        > a {
          font-size: 16px;
          color: #b5b5b6;
          padding-right: 43px;
        }
      }
      > h6 {
        font-weight: normal;
        padding-bottom: 3px;
        font-size: 12px;
      }
    }
    .footeright {
      border-left: 1px solid #242527;
    }
    .footrBorder {
      border-left: 1px solid #54565a;
      padding-left: 68px;
      box-sizing: border-box;
      > p {
        display: inline-block;
        & + p {
          padding-left: 42px;
        }
        > img {
          width: 95px;
          height: 95px;
          & + span {
            display: block;
            padding-top: 15px;
            text-align: center;
            color: #b5b5b6;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
