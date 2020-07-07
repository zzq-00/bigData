<template>
  <div class="compare-contents">
    <div class="title">
      <p class="stage-title">{{vm.projectName}}</p>
    </div>
    <div class="content">
      <div class="item" v-for="(item,index) in vm.itemList " :key="index">
        <div class="top">
          <img :src="item.image" />
        </div>
        <div class="bottom">
          <p class="row1"> {{item.name}}</p>
          <p class="row2"> 可对比单项工程个数:</p>
          <p class="row3"> {{item.number}}</p>
          <div class="button" @click="nextPage(item)">选择</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  components: {},
  data() {
    return {
      config: {
        投资估算: { image: require('@/assets/img/compare/pic1.png') },
        设计概算: { image: require('@/assets/img/compare/pic2.png') },
        施工图预算: { image: require('@/assets/img/compare/pic3.png') },
        招标控制价: { image: require('@/assets/img/compare/pic4.png') },
        中标合同价: { image: require('@/assets/img/compare/pic5.png') },
        重计量: { image: require('@/assets/img/compare/pic6.png') },
        结算价: { image: require('@/assets/img/compare/pic7.png') }
      },
      vm: { projectName: (() => this.$route.params.projectName)(), itemList: [] },
      projectId: (() => this.$route.params.projectId)()
    }
  },
  methods: {
    changeStage() {
      this.getAnalyticalInitFolder()
    },
    nextPage(item) {
      if (item.number != 0) {
        this.$router.push({
          path: `/compare/index/selectDataType/${this.projectId}` + '/' + item.id,
          query: { fid: this.multipleSelection }
        })
      } else {
        this.$message.error('可对比个数为0')
      }
    }
  },
  mounted() {
    // this.projectId=38
    api.getCompareMonomerByProjectId(this.projectId).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.vm.itemList = res.data
        //获取项目阶段内单项个数
        this.vm.itemList.map(item => {
          item.image = this.config[item.name].image
        })
      }
    })
  }
}
</script>
<style lang="less" scoped>
.compare-contents {
  .title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    .stage-title {
      font-size: 18px;

      font-weight: 400;
      color: rgba(68, 68, 68, 1);
    }
  }
  .content {
    padding-left: 67px;
    display: inline-flex;
    flex-flow: row wrap;
    .item {
      border: 1px solid #e0e3eb;
      width: 200px;
      height: 300px;
      margin-right: 22px;
      margin-bottom: 22px;
      border-radius: 5px;
      .top {
        border-radius: 5px 5px 0px 0px;
        height: 120px;
        text-align: center;
        background-color: #f0f0f3;
        img {
          margin-top: 23px;
          margin-bottom: 17px;
          margin-right: 62px;
          margin-left: 58px;
          width: 80px;
          height: 80px;
        }
      }
      .bottom {
        padding-top: 22px;
        text-align: center;
        padding-bottom: 10px;
        height: 158px;
        position: relative;
        .row1 {
          font-size: 18px;
          font-weight: bold;
        }
        .row2 {
          font-size: 12px;
          font-weight: bold;
          color: rgba(153, 153, 153, 1);
        }
        .row3 {
          font-size: 24px;
          color: #4474cf;
        }
        .button {
          cursor: pointer;
          width: 120px;
          height: 40px;
          line-height: 40px;
          border: 1px solid rgba(68, 116, 207, 1);
          border-radius: 10px;
          position: absolute;
          text-align: center;
          left: 0;
          right: 0;
          margin: 0 auto;
          bottom: 21px;
          font-size: 14px;
          font-weight: bold;
          color: rgba(68, 116, 207, 1);
          &:hover {
            background-color: #4474cf;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
