<!-- 造价下的单项工程指标表 -->
<template>
  <div class="cost-index-page">
    <div class="tab-control">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="单项工程指标汇总表" name="first"></el-tab-pane>
        <el-tab-pane label="分部工程经济指标" name="second"></el-tab-pane>
        <el-tab-pane label="分部工程技术指标" name="three"></el-tab-pane>
        <el-tab-pane label="分部分项及单价措施技经指标表" name="four"></el-tab-pane>
        <el-tab-pane label="人材机汇总表" name="five"></el-tab-pane>
        <el-tab-pane label="主要人材机消耗量表" name="six"></el-tab-pane>
      </el-tabs>
      <div class="separated" v-if="activeName=='four'||monomerInfo.name"></div>
      <div class="option">
        <div class="drop-down" v-if="activeName=='four'">
          <!-- 只有分部分析 显示选择范围 -->
          <el-dropdown @command="handleCommand">
            <el-button type="primary">
              显示范围
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(i,index) in range" :key="index" :command="index+1">{{i}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="project-name" v-if="monomerInfo.name">
          <span>{{monomerInfo.name}}</span>
          <i class="icon-info" @mouseenter="maskNameEnter($event)" @mouseleave="maskNameLeave()"></i>
        </div>
      </div>
    </div>
    <monomerModular :monomerInfo='monomerInfo' :style="{top: renderData.pos.y - posSreen.y + 'px',left: renderData.pos.x +'px'}" v-show="renderData.show"></monomerModular>
    <keep-alive>
      <individual v-if='activeName === "first"'></individual>
      <economics v-if='activeName === "second"'></economics>
      <technology v-if='activeName === "three"'></technology>
      <unitPrice v-if='activeName === "four"' @changeLevel="changeLevel" :command='command'></unitPrice>
      <personnelMachine v-if='activeName === "five"'></personnelMachine>
      <consumption v-if='activeName === "six"'></consumption>
    </keep-alive>

  </div>
</template>

<script>
import tool from '@/assets/js/useMoreTool'
import individual from './CostIndex/individual'
import economics from './CostIndex/economics' //分部工程经济指标
import technology from './CostIndex/technology' //分部工程技术指标
import unitPrice from './CostIndex/unitPrice' //分部分项及单价措施技经指标表
import personnelMachine from './CostIndex/personnelMachine' //分部工程经济指标
import consumption from './CostIndex/consumption' //分部工程经济指标
import monomerModular from '@/components/monomerInfo'
import api from '@/fetch/api'
export default {
  components: {
    individual,
    economics,
    technology,
    unitPrice,
    personnelMachine,
    consumption,
    monomerModular
  },
  data() {
    return {
      activeName: 'first',
      command: 0,
      renderData: {
        show: false,
        pos: {} // 弹出框位置
      },
      posSreen: {
        x: 245,
        y: 25
      },
      range: ['第一级', '第二级', '第三级', '第四级'],
      buildingId: this.$route.params.buildingId,
      projectId: this.$route.params.projectId,
      monomerInfo: {}
    }
  },
  watch: {
    '$route.params.buildingId': {
      handler: function(val, oldVal) {
        this.getMonomerLeft()
      },
      immediate: true
    }
  },

  methods: {
    //显示范围
    handleCommand(command) {
      console.log(command)
      this.command = command
    },
    changeLevel(val) {
      this.command = val
    },
    handleClick(tab, event) {
      console.log('aaaa')
    },
    getMonomerLeft() {
      api
        .getMonomerLeft(this.$route.params.buildingId, this.projectId)
        .then(res => {
          this.monomerInfo = res.data
        })
        .catch(res => {})
    },
    // 鼠标放上
    maskNameEnter(store, $event) {
      let _this = this
      _this.renderData.show = true
      // _this.renderData.pos = tool.getMousePos($event) // 弹出框位置
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
.cost-index-page {
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
        padding: 0 6px;
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
      left: 831px;
      top: 17px;
      width: 1px;
      height: 16px;
      background: #ced2dc;
    }
    .option {
      position: absolute;
      left: 852px;
      top: 11px;
    }
    .drop-down {
      display: inline-block;
      /deep/.el-dropdown {
        /deep/.el-button {
          width: 94px;
          height: 30px;
          padding: 0 !important;
          border-radius: 0 !important;
          background-color: #44cf96;
          border-color: #44cf96;
        }
      }
    }
    .project-name {
      margin-left: 15px;
      display: inline-block;
      height: 29px;
      background: #e4ebfb;
      border: 1px solid rgba(199, 209, 234, 1);
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(105, 120, 158, 1);
      line-height: 29px;
      padding: 0px 9px;
      min-width: 110px;
      span {
        float: left;
        width: 91px;
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
  @media screen and (max-width: 1374px) {
    .tab-control {
      /deep/.el-tabs__nav-wrap {
        width: 680px;
      }
      /deep/.el-tabs__nav-next,
      /deep/.el-tabs__nav-prev {
        line-height: 50px;
      }
      /deep/.el-tabs__nav-wrap::after {
        width: 0;
      }
      /deep/.el-tabs__header::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 1;
        background-color: #ced2dc;
        height: 1px;
      }
      .separated {
        left: 697px;
      }
      .option {
        left: 716px;
      }
    }
  }
}
</style>