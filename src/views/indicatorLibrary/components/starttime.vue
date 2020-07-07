<template>
    <div class="common-choice">
        <span class="title">{{time.title}}</span>
        <ul class="lists no-warp block time-margin" :style="{height: HEIGHT}" >
            <li class="list time-list">
                <el-date-picker type="daterange" size="mini" v-model="rangetime" :placeholder="time.placeholder"  :clearable="false"
                 value-format="yyyy/MM/dd" format="yyyy/MM/dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </li>
            <!-- <li class="list time-list">
                <el-date-picker type="date" size="small" v-model="endTime" :placeholder="time.placeholder"
                :picker-options="pickerOptions2" value-format="yyyy/MM/dd"></el-date-picker>
            </li> -->
            <li class="list">
                <button class="btn"  v-on="inputListeners">确定</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  props: ['HEIGHT', 'defaultValue', 'time'],
  data () {
    return {
      rangetime: [],
      height: this.HEIGHT
      /*  pickerOptions1: {
                disabledDate: (time) => {
                    return time.getTime() > new Date(this.endTime).getTime();
                },
            },
            pickerOptions2: {
                disabledDate: (time) => {
                    return time.getTime() < new Date(this.startTime).getTime();
                },
            }, */
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
            vm.$emit('startTimeClick', vm.rangetime)
          }
        }
      )
    }
  },
  watch: {
    defaultValue (newValue) {
      if (newValue) {
        this.rangetime = []
        this.$emit('startTimeClick', [])
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
        background-color: #eee;
        margin-left: 8px;
        color: #606266;
        vertical-align: middle;
        border: 1px solid #e3e2e2;
        cursor: pointer;
    }
}
</style>
