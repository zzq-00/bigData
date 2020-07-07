<!--  -->
<template>
  <div>
    <li>
      <el-form-item label="主体建安工程价格信息取定时间:" prop="selectedDate" id='time' class="special-item">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.selectedDate" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
    </li>
    <li>
      <el-form-item label="小区占地面积(㎡):" prop="districtsGroundArea">
        <el-input class="short-input" v-model="ruleForm.districtsGroundArea">
        </el-input>
      </el-form-item>
    </li>
    <li>
      <el-form-item label="绿化面积(㎡):" prop="afforestedArea">
        <el-input class="short-input" v-model="ruleForm.afforestedArea">
        </el-input>
      </el-form-item>
    </li>
    <li>
      <el-form-item label="硬景面积占比(%):" prop="hardAreaRatio">
        <el-input class="short-input" v-model="ruleForm.hardAreaRatio">
        </el-input>
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
