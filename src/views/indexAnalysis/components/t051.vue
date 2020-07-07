<template>
  <div>
    <el-form-item label="单项工程名称：" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <div style="display: flex;justify-content: space-between;">
      <el-form-item label="主体建安工程价格信息取定时间：" prop="selectedDate" id='time'>
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.selectedDate" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
    </div>
    <el-form-item label="充电站等级" prop="stationClass">
      <el-radio-group v-model="ruleForm.stationClass">
        <el-radio v-for='(item,index) in stationClassData' :key='index' :label="item.id">{{item.name}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="充电桩类别" prop="chargeType">
      <el-radio-group v-model="ruleForm.chargeType">
        <el-radio v-for='(item,index) in chargeTypeData' :key='index' :label="item.id">{{item.name}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <div style="display: flex;justify-content: space-between;">
      <el-form-item label="站内充电设施数量：" prop="stationNumber" id='toilet'>
        <el-input class="short-input" v-model="ruleForm.stationNumber"></el-input>台
      </el-form-item>
      <el-form-item label="建筑面积：" prop="buildArea">
        <el-input class="short-input" v-model="ruleForm.buildArea"></el-input>㎡
      </el-form-item>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  props: {
    ruleForm: Object
  },
  data() {
    return {
      showContent: false,
      chargeTypeData: [],
      stationClassData: []
    }
  },
  mounted() {
    api.getDicCommon(18).then(res => {
      this.chargeTypeData = res.data
    })
    api.getDicCommon(19).then(res => {
      this.stationClassData = res.data
    })
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.engineering-menu {
}
.single-project {
  border: 1px solid #e0e3eb;
  &.active {
    border-color: #4474cf;
  }
  &:not(.active):hover {
    border-color: #4474cf;
    .project-name {
      color: #4474cf;
      text-decoration: underline;
    }
  }
  .single-title {
    height: 30px;
    background-color: #fafafb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 12px;
    cursor: pointer;
    > h5 {
      font-weight: normal;
    }
    .right-operate {
      > span {
        color: #69789e;
        padding: 0 8px;
        position: relative;
        & + span::before {
          content: '|';
          display: block;
          position: absolute;
          left: 0px;
          top: -1px;
          color: #69789e;
        }
        &.disabled {
          color: #cccccc;
        }
      }
    }
  }
  .single-content {
    border-top: 1px solid #e0e3eb;
    padding: 10px 20px;
  }
}
.child-radio {
  background-color: #fafafb;
  padding: 10px 20px 10px 10px;
  > div + div {
    border-top: 1px solid #e0e3eb;
  }
}
.short-input {
  width: 200px;
  margin-right: 8px;
}
</style>