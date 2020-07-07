<template>
  <div>
    <el-form-item label="单项工程名称：" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <div style="display: flex;justify-content: space-between;">
      <el-form-item label="有无桩基工程：" prop="ifZhuangji" v-if='ruleForm.indexCode=="T004"'>
        <el-radio-group v-model="ruleForm.ifZhuangji">
          <el-radio :label="true">有</el-radio>
          <el-radio :label="false">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主体建安工程价格信息取定时间：" prop="selectedDate" id='time'>
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.selectedDate" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
    </div>
    <el-form-item label="结构类型：" prop="structureTypeId" v-if='ruleForm.indexCode=="T004"'>
      <el-radio-group v-model="ruleForm.structureTypeId" @change='structureTypeChangeFn'>
        <el-radio v-for='(item,index) in structureType' :key='index' :label="item.id">{{item.name}}<input v-if='item.id==11' type="text" v-model='ruleForm.structureTypeStr' style="border: 0;border-bottom: 1px solid #dcdfe6;width: 100px;color: #606266;padding-left: 10px;"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="占地面积：" prop="monomerArea" v-if='ruleForm.indexCode=="T004"'>
      <el-input class="short-input" v-model="ruleForm.monomerArea"></el-input>㎡
    </el-form-item>
    <div style="display: flex;justify-content: space-between;">
      <el-form-item label="建筑面积：" prop="buildArea" v-if='ruleForm.indexCode=="T004"'>
        <el-input class="short-input" v-model="ruleForm.buildArea"></el-input>㎡
      </el-form-item>
      <el-form-item label="层数：" prop="floors" v-if='ruleForm.indexCode=="T004"'>
        <el-input class="short-input" v-model="ruleForm.floors"></el-input>层
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
      secondLevelData: [],
      thirdLevelData: [],
      structureType: []
    }
  },
  mounted() {
    this.structureTypeFn()
  },
  methods: {
    structureTypeFn() {
      //框架/框架剪力墙/剪力墙/筒体/砖混/砖木/木结构/钢结构/钢排架/钢筋混凝土+钢结构/其他（手动填写）
      api.getDicCommon(9).then(res => {
        console.log(res.data, 'res.data')
        this.structureType = res.data
      })
    },
    //结构类型的change事件
    structureTypeChangeFn(val) {
      console.log(val, 'kkkk')
    }
  }
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
<style scoped>
.single-project >>> .el-radio-group .el-radio {
  line-height: 24px;
}
.single-project >>> #time label {
  width: 230px !important;
}
.single-project >>> #time .el-form-item__content {
  margin-left: 230px !important;
}
.single-project >>> #toilet > label {
  width: 150px !important;
}
.single-project >>> #toilet .el-form-item__content {
  margin-left: 150px !important;
}
</style>