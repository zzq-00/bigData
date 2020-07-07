<template>
    <div class="common-choice">
        <span class="title">类别：</span>
        <transition>
            <ul class="lists no-warp block" :style="{height: height}" key="provice">
                <li class="list" v-for="item in category" :key="item.id">
                    <input type="radio"
                        :id="'category'+item.id"
                        v-bind="$attrs"
                        v-bind:value="item.id"
                        :data-name="item.name"
                        v-on="inputListeners"
                        v-model="model"
                        name="categoryRdi">
                    <label :for="'category'+item.id" class="name">{{item.name}}</label>
                </li>
            </ul>
        </transition>
    </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: ['HEIGHT', 'defaultValue', 'id'],
  data () {
    return {
      height: this.HEIGHT,
      category: [],
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
            vm.$emit('categoryChange', value, name)
          }
        }
      )
    }
  },
  methods: {
    getDicCommons () {
      api.getProjectTypeByIndustryBelongId(this.id).then(res => {
        this.category = res.data
        this.category.unshift({ 'id': '00000', 'name': '不限' })
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
        this.$emit('categoryChange', '', '')
      }
    },
    id (newValue) {
      if (newValue) {
        this.getDicCommons()
        this.model = '00000'
      }
    }
  }
}
</script>
