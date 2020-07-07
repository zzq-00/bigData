<template>
  <div class="common-choice">
    <span class="title">建筑业态：</span>
    <transition>
      <div>
        <ul class="lists no-warp block" :style="{height: height}" key="modus01">
          <li class="list" v-for="item in modus01" :key="item.id">
            <input type="radio" :id="'modus01'+item.id" v-bind="$attrs" v-bind:value="item.id" :data-name="item.name" v-on="inputModus01Listeners" v-model="model" name="modus01Rdi">
            <label :for="'modus01'+item.id" class="name">{{item.name}}</label>
          </li>
        </ul>
        <ul class="lists" key="modus02">
          <li class="list" v-for="item in modus02" :key="item.id">
            <input type="radio" :id="'modus02'+item.id" v-bind="$attrs" v-bind:value="item.id" :data-name="item.name" v-on="inputModus02Listeners" v-model="model2" name="modus02Rdi">
            <label :for="'modus02'+item.id" class="name">{{item.name}}</label>
          </li>
        </ul>

      </div>
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
      modus01: [],
      modus02: [],
      model: '00000',
      model2: '00000'
    }
  },
  beforeMount () {
    // 将常量保存
    this.height = this.HEIGHT
  },
  computed: {
    inputModus01Listeners: function () {
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
              vm.modus02 = []
            } else {
              vm.height = ''
              vm.getStructureForm2ByParentId(value)
            }
            // 清除第二级
            vm.model2 = '00000'
            vm.$emit('modus02Change', '', '')
            vm.$emit('modus01Change', value, name)
          }
        }
      )
    },
    inputModus02Listeners: function () {
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
            vm.$emit('modus02Change', value, name)
          }
        }
      )
    }
  },
  methods: {
    // 建筑业态1
    DicMonomerStructureForm1 () {
      api.getDicCommon('DicMonomerStructureForm1').then(res => {
        this.modus01 = res.data
        this.modus01.unshift({ id: '00000', name: '不限' })
      })
    },
    // 根据建筑业态1找建筑业态2
    getStructureForm2ByParentId (id) {
      api.getStructureForm2ByParentId(id).then(res => {
        this.modus02 = res.data
        this.modus02.unshift({ id: '00000', name: '不限' })
      })
    }
  },
  mounted () {
    this.DicMonomerStructureForm1()
  },
  watch: {
    defaultValue (newValue) {
      if (newValue) {
        this.model = '00000'
        this.modus02 = []
        this.$emit('modus01Change', '', '')
      }
    }
  }
}
</script>
