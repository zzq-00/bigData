<template>
    <div class="common-choice">
        <span class="common-title area-lineHeight">建筑面积：</span>
        <transition>
            <ul class="lists area-block">
                <li class="div-list">
                    <span class="common-title area-sub-lineHeight">地上面积：</span>
                    <label for="" class="area-label-after">
                        <input type="text" class="area-input" v-model="area.upValue1">
                    </label>
                    <label for="">
                        <input type="text" class="area-input" v-model="area.upValue2">
                    </label>
                    m<sup>2</sup>
                    <button class="btn" v-on="inputUpListeners">确定</button>
                    <span class="error-text">{{errorTip.up}}</span>
                </li>
                <li class="div-list">
                    <span class="common-title area-sub-lineHeight">地下面积：</span>
                    <label for="" class="area-label-after">
                        <input type="text" class="area-input" v-model="area.bottomValue1">
                    </label>
                    <label for="">
                        <input type="text" class="area-input" v-model="area.bottomValue2">
                    </label>
                    m<sup>2</sup>
                    <button class="btn" v-on="inputBottomListeners">确定</button>
                    <span class="error-text">{{errorTip.bottom}}</span>
                </li>
                <li class="div-list">
                    <span class="common-title area-sub-lineHeight">基础面积：</span>
                    <label for="" class="area-label-after">
                        <input type="text" class="area-input" v-model="area.baseValue1">
                    </label>
                    <label for="">
                        <input type="text" class="area-input" v-model="area.baseValue2">
                    </label>
                    m<sup>2</sup>
                    <button class="btn" v-on="inputBaseListeners">确定</button>
                    <span class="error-text">{{errorTip.base}}</span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
  props: ['defaultValue'],
  data () {
    return {
      area: {
        upValue1: '',
        upValue2: '',
        bottomValue1: '',
        bottomValue2: '',
        baseValue1: '',
        baseValue2: ''
      },
      errorTip: {
        up: '',
        bottom: '',
        base: ''
      }
    }
  },
  methods: {
    error (value, el, msg) {
      if (isNaN(value)) {
        this.errorTip[el] = '请' + msg + '填写数字'
        return true
      }
      this.errorTip[el] = ''
      return false
    }
  },
  computed: {
    inputUpListeners: function () {
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
            let value = event.target.value
            let value1 = vm.area.upValue1
            let value2 = vm.area.upValue2
            if (value === '00000') {
              value = ''
              name = ''
              vm.height = vm.HEIGHT
            } else {
              vm.height = ''
            }
            let err1 = vm.error(value1, 'up', '第一个空')
            let err2 = vm.error(value2, 'up', '第二个空')
            if (!err1 && !err2) {
              if (Number(value1) > Number(value2)) {
                vm.errorTip['up'] = '第一空必须小于等于第二空'
              } else if (Number(value2) < Number(value1)) {
                vm.errorTip['up'] = '第二空必须大于等于第一空'
              } else {
                vm.$emit('areaUpClick', value1, value2)
              }
            }
          }
        }
      )
    },
    inputBottomListeners: function () {
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
            let value = event.target.value
            let value1 = vm.area.bottomValue1
            let value2 = vm.area.bottomValue2
            if (value === '00000') {
              value = ''
              name = ''
              vm.height = vm.HEIGHT
            } else {
              vm.height = ''
            }
            let err1 = vm.error(value1, 'bottom', '第一个空')
            let err2 = vm.error(value2, 'bottom', '第二个空')
            if (!err1 && !err2) {
              if (Number(value1) > Number(value2)) {
                vm.errorTip['bottom'] = '第一空必须小于等于第二空'
              } else if (Number(value2) < Number(value1)) {
                vm.errorTip['bottom'] = '第二空必须大于等于第一空'
              } else {
                vm.$emit('areaBottomClick', vm.area.bottomValue1, vm.area.bottomValue2)
              }
            }
          }
        }
      )
    },
    inputBaseListeners: function () {
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
            let value = event.target.value
            let value1 = vm.area.baseValue1
            let value2 = vm.area.baseValue2
            if (value === '00000') {
              value = ''
              name = ''
              vm.height = vm.HEIGHT
            } else {
              vm.height = ''
            }
            let err1 = vm.error(value1, 'base', '第一个空')
            let err2 = vm.error(value2, 'base', '第二个空')
            if (!err1 && !err2) {
              if (Number(value1) > Number(value2)) {
                vm.errorTip['base'] = '第一空必须小于等于第二空'
              } else if (Number(value2) < Number(value1)) {
                vm.errorTip['base'] = '第二空必须大于等于第一空'
              } else {
                vm.$emit('areaBaseClick', vm.area.baseValue1, vm.area.baseValue2)
              }
            }
          }
        }
      )
    }
  },
  watch: {
    defaultValue (newValue) {
      if (newValue) {
        if (newValue === 'upValue') {
          this.area.upValue1 = ''
          this.area.upValue2 = ''
          this.$emit('areaUpClick', '', '')
        } else if (newValue === 'bottomValue') {
          this.area.bottomValue1 = ''
          this.area.bottomValue2 = ''
          this.$emit('areaBottomClick', '', '')
        } else if (newValue === 'baseValue') {
          this.area.baseValue1 = ''
          this.area.baseValue2 = ''
          this.$emit('areaBaseClick', '', '')
        } else {
          throw ('建筑面积传参错误')
        }
      }
    }
  }

}
</script>

<style lang="less">
.common-choice{
    .common-title{
        display: inline-block;
        // width: 60px;
        color: #BEBEBE;
        font-size: 12px;
        text-align: right;
    }
    .area-lineHeight{
        line-height: 100px;
    }
    .area-sub-lineHeight{
        line-height: 26px;
    }
    .area-block{
        margin-top: -100px;
        padding: 5px 10px;
    }
    .area-label-after{
        &:after{
            content: '';
            display: inline-block;
            width: 4px;
            height: 1px;
            background-color: #606266;
            vertical-align: middle;
            margin: 0 8px;
        }
    }
    .area-input{
        width: 80px;
        height: 26px;
        border: 1px solid #d8e0f5;
        padding: 0 10px;
    }
    .div-list + .div-list{
        margin-top: 5px;
    }
    .error-text{
        color: #f00;
        margin-left: 5px;
    }
}
</style>
