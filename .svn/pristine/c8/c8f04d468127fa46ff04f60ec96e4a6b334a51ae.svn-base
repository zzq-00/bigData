<template>
  <div class="step-bar">
    <div class="step-title">
      <span class="titlel" >{{title}}</span>
    </div>
    <ul>
      <li v-for="(item,index) in stepList" :key="index">
        <span class="decorate" :class="{active: isActive>=index+1}" v-if="index!=0"></span>
        <span class="step-move" :class="{active: isActive>=index+1}">{{index+1}}</span>
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props:['ctitle','cStepList'],
  data() {
    return {
      title:this.ctitle,
      stepList: this.cStepList

    }
  },
  computed: {
    ...mapState({
      isActive: state => state.AnalysisSteps
    })
  }
}
</script>
<style lang="less" scoped>
.step-bar {
  height: 60px;
  border-bottom: 1px solid #eff2f9;
  .step-title {
    height: 61px;
    line-height: 61px;
    float: left;
    .titlel {
      margin-left: 20px;
      font-size: 18px;
      font-weight: bold;
      color: rgba(68, 68, 68, 1);
    }
  }
  ul {
    float: right;
    margin-right: 21px;
    height: 61px;
    line-height: 61px;
    li {
      float: left;
      height: 61px;
      line-height: 61px;
      .decorate {
        display: inline-block;
        margin: 0 11px;
        width: 60px;
        height: 4px;
        background-color: #e9edf3;
        vertical-align: middle;
      }
      .step-move {
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 50%;
        background-color: #e2e8f7;
        color: #333;
      }
      .active {
        background-color: #4474cf;
        color: #fff;
      }
      span:last-child {
        margin-left: 6px;
        display: inline-block;
        height: 13px;
        line-height: 13px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(68, 68, 68, 1);
      }
    }
  }
}
</style>
