<template>
  <div class="choice-contents">
    <div class="stage">
      <p class="stage-title">1.选择编制阶段</p>
      <div class="stage-name">
        <el-radio-group v-model="radio" @change="changeStage">
          <el-radio :label="item.folderId" v-for="(item,index) in compilationStage" :key="index">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="outcome-document">
      <p class="stage-title">2.成果文件</p>
      <el-table ref="checkTable" :data="outcomeDocumentsFiles" style="width: 100%" height="calc(100vh - 350px - 7.5vh)" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :selectable="checkSelectable" width="44">
        </el-table-column>
        <el-table-column fixed prop="date" label="文件名称" width="" show-overflow-tooltip>
          <template slot-scope="scope">
            <img class="type-icon" src="@/assets/img/GBQ5.png" alt="" v-if="getFileType(scope.row.suffixName)=='GBQ5'">
            <img class="type-icon" src="@/assets/img/GBQ4.png" alt="" v-if="getFileType(scope.row.suffixName)=='GBQ4'">
            <img class="type-icon" src="@/assets/img/GBQ3.png" alt="" v-if="getFileType(scope.row.suffixName)=='GBQ3'">
            <img class="type-icon" src="@/assets/img/GGJ.png" alt="" v-if="getFileType(scope.row.suffixName)=='GGJ'">
            <img class="type-icon" src="@/assets/img/GCL.png" alt="" v-if="getFileType(scope.row.suffixName)=='GCL'">
            <img class="type-icon" src="@/assets/img/GTJ.png" alt="" v-if="getFileType(scope.row.suffixName)=='GTJ'">
            <span class="file-name" :class="{'non-optional':scope.row.analytical=='1'||scope.row.analytical=='-1'||scope.row.analytical=='0','optional':scope.row.analytical=='2'||scope.row.analytical=='3'||scope.row.analytical=='4'}">{{scope.row.originalName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="analyticalInfo" label="文件状态" width="324">
          <template slot-scope="scope">
            <span class="file-name" :class="{'non-optional':scope.row.analytical=='1'||scope.row.analytical=='-1'||scope.row.analytical=='0','optional':scope.row.analytical=='2'||scope.row.analytical=='3'||scope.row.analytical=='4'}">{{scope.row.analyticalInfo}}</span>
          </template>
        </el-table-column>
      </el-table>
      <p class="tips">
        <span>i</span>
        请选择最终版成果文件，否则可能导致指标重复计算
      </p>
    </div>
    <div class="next-btn">
      <button class="cancel" @click="closePage">取消</button>
      <button class="next" @click="nextPage">下一步</button>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  components: {},
  data() {
    return {
      projectId: this.$route.params.projectId,
      radio: '', //编制阶段
      outcomeDocumentsFiles: [], //成果文件列表
      multipleSelection: [],
      compilationStage: []
    }
  },
  methods: {
    getFileType(val) {
      if (val.indexOf('GBQ5') > -1) return 'GBQ5'
      if (val.indexOf('GBQ4') > -1) return 'GBQ4'
      if (val.indexOf('GBQ3') > -1) return 'GBQ3'
      if (val.indexOf('GGJ') > -1) return 'GGJ'
      if (val.indexOf('GCL') > -1) return 'GCL'
      if (val.indexOf('GTJ') > -1) return 'GTJ'
    },
    changeStage() {
      this.getAnalyticalInitFolder()
    },
    getProjectDocumentsAnalyzableStage() {
      return new Promise((resolve, relect) => {
        api
          .getProjectDocumentsAnalyzableStage(this.projectId)
          .then(res => {
            this.compilationStage = res.data
            this.radio = this.compilationStage[0].folderId
            resolve(this.radio)
          })
          .catch(res => {})
      })
    },
    checkSelectable(row) {
      return (
        row.analyticalInfo == '指标已分析' ||
        row.analyticalInfo == '指标准备就绪/部分已分析' ||
        row.analyticalInfo == '指标准备就绪'
      )
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(data => data.id)
    },
    // 获取可分析的初始文件
    getAnalyticalInitFolder() {
      let data = {
        folderId: this.radio, //项目阶段id
        commonId: this.projectId //项目id
      }
      api
        .getAnalyticalInitFolder(data)
        .then(res => {
          this.outcomeDocumentsFiles = res.data
          if (this.$route.query.fromFile) {
            let data = res.data.find(item => item.id === this.$route.query.fromFile / 1)
            if (data.analytical <= 1) return
            this.$nextTick(() => {
              this.$refs.checkTable.toggleRowSelection(data, true)
            })
          }
        })
        .catch(res => {})
    },
    closePage() {
      if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1) {
        window.location.href = 'about:blank'
        window.close()
      } else {
        window.opener = null
        window.open('', '_self')
        window.close()
      }
    },
    nextPage() {
      if (this.multipleSelection.length > 0) {
        let stateIndex = this.compilationStage.filter(data => data.folderId == this.radio)
        this.$router.push({
          path: `/indexAnalysis/index/matching/${this.projectId}/${this.radio}/${stateIndex[0].stageId}`,
          query: { fid: JSON.stringify(this.multipleSelection) }
        })
      }
    }
  },
  mounted() {
    this.$store.dispatch('nextStepFUN', 1)
    this.getProjectDocumentsAnalyzableStage().then(res => {
      this.getAnalyticalInitFolder()
    })
  }
}
</script>
<style lang="less" scoped>
.choice-contents {
  .stage-title {
    padding: 19px 0 21px 0;
    height: 15px;
    line-height: 15px;
    font-size: 14px;
    font-weight: 400;
    color: #444444;
  }
  .stage {
    padding: 0px 80px;
    .stage-name {
      margin-left: 14px;
      /deep/.el-radio {
        .el-radio__inner {
          width: 12px !important;
          height: 12px !important;
          border: 1px solid #aaacb7;
        }
        .el-radio__label {
          font-size: 12px;
        }
        .el-radio__input.is-checked .el-radio__inner {
          background: #fff;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #666666;
        }
        .el-radio__inner::after {
          background-color: #888a8b;
        }
      }
    }
  }
  .outcome-document {
    padding: 0px 80px;
    /deep/.el-table {
      border: 1px solid #e0e3eb;
      border-bottom: 0px !important;
      th {
        background-color: #fafafb;
        color: #999999;
        font-size: 12px;
        font-weight: 400;
        .el-checkbox {
          display: none;
        }
      }
      .el-checkbox__inner {
        width: 11px;
        height: 11px;
      }
      .el-checkbox__inner::after {
        height: 5px;
        width: 2px;
        left: 3px;
        top: 1px;
      }
    }
    .type-icon {
      margin-right: 5px;
      margin-top: -2px;
    }
    .file-name {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      font-weight: 400;
    }
    .non-optional {
      color: #bebebe;
    }
    .optional {
      color: #666666;
    }
    .tips {
      span {
        width: 12px;
        height: 12px;
        line-height: 12px;
        display: inline-block;
        border: 1px solid #dd4444;
        border-radius: 50%;
        text-align: center;
      }
      margin: 6px 0 72px 12px;
      height: 15px;
      line-height: 15px;
      font-size: 10px;
      font-weight: 400;
      color: rgba(221, 68, 68, 1);
    }
  }
}
</style>
