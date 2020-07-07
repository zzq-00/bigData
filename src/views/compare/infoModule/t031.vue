<template>
  <div>
    <li>
      <el-form-item label="主体建安工程价格信息取定时间:" prop="selectedDate" id='time' class="special-item">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.selectedDate" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
    </li>
    <li>
      <el-form-item label="围墙总长(m):" prop="wallLenght">
        <el-input class="short-input" v-model="ruleForm.wallLenght">
        </el-input>
      </el-form-item>
    </li>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  props: {
    ruleForm: Object
  },
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style>
</style>