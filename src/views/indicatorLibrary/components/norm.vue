<template>
  <div class="common-choice">
    <span class="title">指标类型：</span>
    <transition>
      <ul class="lists no-warp block" :style="{height: height}" key="provice">
        <li class="list" v-for="item in norm" :key="item.id">
          <input type="radio" :id="'norm'+item.id" v-bind="$attrs" v-bind:value="item.id" :data-name="item.name" v-on="inputListeners" v-model="model" name="normRdi">
          <label :for="'norm'+item.id" class="name">{{item.name}}</label>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: ['HEIGHT', 'defaultValue'],
  data () {
    return {
      height: this.HEIGHT,
      norm: [],
      model: '00000'
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
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          change: function (event) {
            let value = event.target.value
            let name = event.target.getAttribute('data-name')
            if (value === '00000') {
              value = ''
              name = ''
              vm.height = vm.HEIGHT
            } else {
              vm.height = ''
            }
            if (value === '2f41c015f43f409f9778e5183da8416c' || value === 'e4ecf980659c4025bebc8823b519f854') {
              value = [value, 'e4ecf980659c4025bebc8823b519f111']
            } else if (value) {
              value = [value]
            } else {
              value = []
            }
            vm.$emit('normChange', value, name)
          }
        }
      )
    }
  },
  methods: {
    getDicCommons () {
      api.getDicCommon('DicIndicatorName').then(res => {
        // 给用户显示只能是四种类型，其实有五种
        this.norm = res.data.filter(item => {
          if (item.name === '安装算量&造价指标') {
            return ''
          } else {
            return item
          }
        })
        this.norm.unshift({ id: '00000', name: '不限' })
        // this.norm = res.data
      })
    }
  },
  mounted () {
    this.getDicCommons()
  },
  watch: {
    defaultValue (newValue) {
      if (newValue === 'true') {
        // true
        this.model = '00000'
        this.$emit('normChange', [], '')
      } else if (newValue) {
        this.model = newValue
      }
    }
  }
}
</script>
