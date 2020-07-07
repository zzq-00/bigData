<!-- 算量指标 -->
<template>
  <div class="index-page">
    <div class="tab-control">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="土建算量指标" name="first"></el-tab-pane>
        <el-tab-pane label="钢筋算量指标" name="second"></el-tab-pane>
        <el-tab-pane label="安装算量指标" name="three"></el-tab-pane>
      </el-tabs>
      <div class="separated"></div>
      <div class="project-name" v-if="monomerInfo.name">
        <span>{{monomerInfo.name}}</span>
        <i class="icon-info" @mouseenter="maskNameEnter($event)" @mouseleave="maskNameLeave()"></i>
      </div>
    </div>
    <monomerModular :monomerInfo='monomerInfo' :style="{top: renderData.pos.y - posSreen.y + 'px',left: renderData.pos.x +'px'}" v-show="renderData.show"></monomerModular>
    <keep-alive>
      <civiltable v-if='activeName === "first"'></civiltable>
      <rebartable v-if='activeName === "second"'></rebartable>
      <installtable v-if='activeName === "three"'></installtable>
    </keep-alive>

  </div>
</template>

<script>
import api from '@/fetch/api'
import tool from '@/assets/js/useMoreTool'
import civiltable from './quantityIndex/civiltable' //土建算量指标
import rebartable from './quantityIndex/rebartable' //钢筋算量指标
import installtable from './quantityIndex/installtable' //安装算量指标
import monomerModular from '@/components/monomerInfo'
export default {
  components: {
    civiltable,
    rebartable,
    installtable,
    monomerModular
  },
  data() {
    return {
      buildingId: this.$route.params.buildingId,
      projectId: this.$route.params.projectId,
      activeName: 'first',
      renderData: {
        show: false,
        pos: {} // 弹出框位置
      },
      posSreen: {
        x: 245,
        y: 25
      },
      monomerInfo: {}
    }
  },
  computed: {},
  watch: {
    '$route.params.buildingId': {
      handler: function(val, oldVal) {
        this.getMonomerLeft()
      },
      immediate: true
    }
  },
  methods: {
    getMonomerLeft() {
      api
        .getMonomerLeft(this.$route.params.buildingId, this.projectId)
        .then(res => {
          this.monomerInfo = res.data
        })
        .catch(res => {})
    },
    changeLevel(val) {
      this.command = val
    },
    handleClick(tab, event) {},
    // 鼠标放上
    maskNameEnter(store, $event) {
      let _this = this
      _this.renderData.show = true
      _this.renderData.pos = tool.getMousePos($event) // 弹出框位置
      var screenWidth = window.screen.width
      if (tool.getMousePos($event).x + 50 > 510 && screenWidth - tool.getMousePos($event).x - 20 > 510) {
        _this.renderData.pos.x = tool.getMousePos($event).x - 510
      }
      if (tool.getMousePos($event).x + 50 > 510 && screenWidth - tool.getMousePos($event).x - 20 < 510) {
        _this.renderData.pos.x = tool.getMousePos($event).x - (1019 - (screenWidth - tool.getMousePos($event).x)) - 20
      }
      if (tool.getMousePos($event).x + 50 < 510) {
        _this.renderData.pos.x = 510 - tool.getMousePos($event).x + 50
      }
      _this.renderData.pos.y = tool.getMousePos($event).y + 50
    },
    // 鼠标离开
    maskNameLeave(store) {
      let _this = this
      _this.renderData.show = false
    }
  }
}
</script>
<style lang='less' scoped>
.index-page {
  padding: 0px 20px 20px 20px;
  .tab-control {
    position: relative;
    /deep/.el-tabs {
      .el-tabs__header {
        margin: 0 0 12px;
      }
      .el-tabs__item {
        height: 50px !important;
        line-height: 50px !important;
      }
      #tab-first {
        padding-left: 0;
      }
      .el-tabs__nav-wrap::after {
        background-color: #ced2dc;
        height: 1px !important;
      }
    }
    .separated {
      position: absolute;
      left: 370px;
      top: 17px;
      width: 1px;
      height: 16px;
      background: #ced2dc;
    }
    .project-name {
      position: absolute;
      left: 410px;
      top: 11px;
      height: 28px;
      background: #e4ebfb;
      border: 1px solid rgba(199, 209, 234, 1);
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(105, 120, 158, 1);
      line-height: 28px;
      padding: 0px 9px;
      max-width: 115px;
      span {
        float: left;
        width: 96px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .icon-info {
        margin-left: 5px;
        width: 10px;
        height: 10px;
        background: url(~@/assets/img/infos.png);
        cursor: pointer;
        display: inline-block;
      }
      .icon-info:hover {
        margin-left: 5px;
        display: inline-block;
        width: 10px;
        height: 10px;
        background: url(~@/assets/img/hoverInfos.png);
        cursor: pointer;
      }
    }
  }
}
</style>