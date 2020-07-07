<template>
    <div class="common-choice">
        <span class="title">项目行业：</span>
        <transition>
            <ul class="lists no-warp block" :style="{height: height}" key="provice">
                <li class="list" v-for="item in industry" :key="item.id">
                    <input type="radio"
                        :id="'industry'+item.id"
                        v-bind="$attrs"
                        v-bind:value="item.id"
                        :data-name="item.name"
                        v-on="inputListeners"
                        v-model="model"
                        name="industryRdi">
                    <label :for="'industry'+item.id" class="name">{{item.name}}</label>
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
      industry: [],
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
      return Object.assign({},
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
            vm.$emit('industryChange', value, name)
          }
        }
      )
    }
  },
  methods: {
    getDicCommons () {
      api.getDicCommon('DicIndustryBelong').then(res => {
        this.industry = res.data.filter(item => {
          if (item.name === '民用' || item.name === '公用') {
            return item
          }
        })
        this.industry.unshift({ 'id': '00000', 'name': '不限' })
      })
    }
  },
  mounted () {
    this.getDicCommons()
  },
  watch: {
    defaultValue (newValue) {
      if (newValue) {
        this.model = '00000'
        this.$emit('industryChange', '', '')
      }
    }
  }
}
</script>
