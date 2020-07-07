<template>
    <div class="common-choice">
        <span class="title">竣工日期：</span>
        <ul class="lists no-warp block time-margin" :style="{height: HEIGHT}" >
            <li class="list time-list time-after">
                <el-date-picker type="date" size="small" v-model="startTime" placeholder="请选择结束时间范围"
                :picker-options="pickerOptions1" value-format="yyyy/MM/dd"></el-date-picker>
            </li>
            <li class="list time-list">
                <el-date-picker type="date" size="small" v-model="endTime" placeholder="请选择结束时间范围"
                 :picker-options="pickerOptions2" value-format="yyyy/MM/dd"></el-date-picker>
            </li>
            <li class="list">
                <button class="btn"  v-on="inputListeners">确定</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  props: ['HEIGHT', 'defaultValue'],
  data () {
    return {
      startTime: '',
      endTime: '',
      height: this.HEIGHT,
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() > new Date(this.endTime).getTime()
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.startTime).getTime()
        }
      }
    }
  },
  beforeMount () {
    // 将常量保存
    this.height = this.HEIGHT
  },
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          click: function (event) {
            vm.$emit('endTimeClick', vm.startTime, vm.endTime)
          }
        }
      )
    }
  },
  watch: {
    defaultValue (newValue) {
      if (newValue) {
        this.startTime = ''
        this.endTime = ''
        this.$emit('endTimeClick', '', '')
      }
    }
  }
}
</script>
<style lang="less">
.common-choice{
    .time-list{
        margin-top: 6px;
    }
    .time-margin{
        padding-left: 10px;
    }
    .time-after{
        &:after{
            content: '';
            display: inline-block;
            width: 14px;
            height: 1px;
            background-color: #666666;
            margin: 0 10px;
            vertical-align: middle;
        }
    }
    .btn{
        width: 40px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        background-color: #E3E2E2;
        margin-left: 8px;
        color: #606266;
        vertical-align: middle;
    }
    .el-input--small .el-input__inner{
        height: 26px;
        line-height: 26px;
        font-size: 12px;
    }
    .el-input--small .el-input__icon{line-height: 26px;}
}
</style>
