<template>
  <!-- 主体建安工程价格信息取定时间： -->
  <div class="filter-list">
    <span>主体建安工程价格信息取定时间：</span>
    <div>
      <ul>
        <li>
          <el-date-picker v-model="dateStart" size="mini" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </li>
        <li class="confirm-btn" @click="handleConfirm('dateStart')">确定</li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      dateStart: []
    }
  },
  methods: {
    ...mapMutations(['setSingleItemFilterData']),
    handleConfirm() {
      let selectedDateSel = this.dateStart.length ? '主体建安工程价格信息取定时间：' + this.dateStart[0] + '至' + this.dateStart[1] : ''
      this.setSingleItemFilterData({
        dataForBack: {
          selectedDate1: this.dateStart.length ? this.dateStart[0] : '',
          selectedDate2: this.dateStart.length ? this.dateStart[1] : ''
        },
        dynamicTags: { selectedDateSel }
      })
    },
    initData() {
      this.dateStart = []
      this.handleConfirm()
    }
  },
  mounted() {
    this.$on('childMethod', res => {
      if (res === 'reset') this.initData()
    })
  }
}
</script>
<style lang="less" scoped>
@import './filter-option.less';
</style>