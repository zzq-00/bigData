<template>
  <div class="content">
    <div>
      <div class="title">
        <h5>项目贡献榜</h5>
        <div>
          <el-radio v-model="xmRadio" label="1">当月</el-radio>
          <el-radio v-model="xmRadio" label="2">累计</el-radio>
        </div>
      </div>
      <div class="inner-table">
        <div>
          <h6>大区TOP5</h6>
          <el-table :data="xmDeptShow" size="mini" header-row-class-name="cloud-table-headerBGC" style="width: 99%;">
            <el-table-column label="排名" align="center" type="index" width="50">
            </el-table-column>
            <el-table-column prop="name" label="大区" align="center">
            </el-table-column>
            <el-table-column prop="count" label="项目数量" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div>
          <h6>员工TOP5</h6>
          <el-table :data="xmUserShow" size="mini" header-row-class-name="cloud-table-headerBGC" style="width: 99%;">
            <el-table-column label="排名" align="center" type="index" width="50">
            </el-table-column>
            <el-table-column prop="name" label="员工" align="center">
            </el-table-column>
            <el-table-column prop="count" label="项目数量" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div>
      <div class="title">
        <h5>单项工程贡献榜</h5>
        <div>
          <el-radio v-model="dxRadio" label="3">当月</el-radio>
          <el-radio v-model="dxRadio" label="4">累计</el-radio>
        </div>
      </div>
      <div class="inner-table">
        <div>
          <h6>大区TOP5</h6>
          <el-table :data="dxDeptShow" size="mini" header-row-class-name="cloud-table-headerBGC" style="width: 99%;">
            <el-table-column label="排名" align="center" type="index" width="50">
            </el-table-column>
            <el-table-column prop="name" label="大区" align="center">
            </el-table-column>
            <el-table-column prop="count" label="工程数量" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div>
          <h6>员工TOP5</h6>
          <el-table :data="dxUserShow" size="mini" header-row-class-name="cloud-table-headerBGC" style="width: 99%;">
            <el-table-column label="排名" align="center" type="index" width="50">
            </el-table-column>
            <el-table-column prop="name" label="员工" align="center">
            </el-table-column>
            <el-table-column prop="count" label="工程数量" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
  props: {
    xmMonthDeptShow: {
      type: Array,
      required: true
    },
    xmMonthUserShow: {
      type: Array,
      required: true
    },
    dxMonthDeptShow: {
      type: Array,
      required: true
    },
    dxMonthUserShow: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      xmRadio: '1',
      dxRadio: '3',
      xmDeptShow: [],
      xmUserShow: [],
      dxDeptShow: [],
      dxUserShow: []
    }
  },
  watch: {
    xmMonthDeptShow: function (val) {
      this.xmDeptShow = val
    },
    xmMonthUserShow: function (val) {
      this.xmUserShow = val
    },
    dxMonthDeptShow: function (val) {
      this.dxDeptShow = val
    },
    dxMonthUserShow: function (val) {
      this.dxUserShow = val
    },
    xmRadio: function (val) {
      this.getProjectOrMonomerTop5(val)
    },
    dxRadio: function (val) {
      this.getProjectOrMonomerTop5(val)
    }
  },
  methods: {
    getProjectOrMonomerTop5 (val) {
      api.getProjectOrMonomerTop5(val).then(res => {
        if (val == 1 || val == 2) {
          this.xmDeptShow = res.data.deptShow || []
          this.xmUserShow = res.data.userShow || []
        } else {
          this.dxDeptShow = res.data.deptShow || []
          this.dxUserShow = res.data.userShow || []
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  display: flex;
  justify-content: space-between;
  height: 350px;
  margin-top: 10px;
  > div {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 18px 21px;
    & + div {
      margin-left: 10px;
    }
    .title {
      display: flex;
      align-items: center;
      > h5 {
        font-size: 14px;
        color: #333;
        &::after {
          content: '';
          display: inline-block;
          width: 1px;
          height: 14px;
          background-color: #dedede;
          position: relative;
          top: 2px;
          margin-left: 32px;
        }
      }
      > div {
        padding-left: 32px;
      }
    }
    .inner-table {
      margin-top: 15px;
      display: flex;
      > div {
        flex: 1;
        & + div {
          margin-left: 40px;
        }
        > h6 {
          font-size: 12px;
          font-weight: normal;
          color: #7d8699;
          margin-bottom: 10px;
          &::before {
            content: '';
            display: inline-block;
            width: 3px;
            height: 11px;
            background-color: #4474cf;
            position: relative;
            top: 1px;
            margin-right: 6px;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
.inner-table >>> .cloud-table-headerBGC {
  color: #7d8699;
}
.inner-table >>> .cloud-table-headerBGC th {
  background-color: #f1f3f7;
  font-weight: normal;
}
.title >>> .el-radio__label {
  font-size: 12px;
}
.title >>> .el-radio__inner {
  width: 12px;
  height: 12px;
}
</style>
