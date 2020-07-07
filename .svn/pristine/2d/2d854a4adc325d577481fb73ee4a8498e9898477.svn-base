<!--  -->
<template>
  <div>
    <li>
      <el-form-item label="主体建安工程价格信息取定时间:" class="special-item">
        <el-date-picker v-model="ruleForm.selectedDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </li>
    <li>
      <el-form-item label="占地面积(㎡):">
        <el-col :span="11">
          <el-form-item>
            <el-input class="short-input" v-model="ruleForm.monomerArea1">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-input class="short-input" v-model="ruleForm.monomerArea2">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
    </li>
    <li>
      <el-form-item label="站内充电设施数量(台):">
        <el-col :span="11">
          <el-form-item prop="stationNumber1">
            <el-input class="short-input" v-model="ruleForm.stationNumber1">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="stationNumber2">
            <el-input class="short-input" v-model="ruleForm.stationNumber2">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
    </li>
    <li>
      <el-form-item label="建筑面积(㎡):">
        <el-col :span="11">
          <el-form-item prop="buildArea1">
            <el-input class="short-input" v-model="ruleForm.buildArea1">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="buildArea2">
            <el-input class="short-input" v-model="ruleForm.buildArea2">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

    </li>
  </div>
</template>

<script>
export default {
  props: {
    ruleForm: Object
  },
  watch: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="less" scoped>
</style>
