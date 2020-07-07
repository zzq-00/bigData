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
    <div style="display: flex;justify-content: space-between;">
      <el-form-item label="占地面积：" prop="monomerArea">
        <el-input class="short-input" v-model="ruleForm.monomerArea"></el-input>㎡
      </el-form-item>
      <el-form-item label="地面做法：" prop='groundPractice'>
        <el-input class="short-input" v-model="ruleForm.groundPractice"></el-input>
      </el-form-item>
    </div>
    <el-form-item label="体育场用途：" prop='stadiumUse'>
      <el-checkbox-group v-model="ruleForm.stadiumUse">
        <el-checkbox name="type" v-for='(item,index) in stadiumUseData' :key='index' :label="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
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
      stadiumUseData: []
    }
  },
  mounted() {
    api.getDicCommon(20).then(res => {
      this.stadiumUseData = res.data
    })
    if (!this.ruleForm.stadiumUse) {
      this.ruleForm.stadiumUse = []
    }
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