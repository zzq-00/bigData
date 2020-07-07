<template>
  <div class="common-choice">
    <span class="common-title height-lineHeight">建筑层高：</span>
    <transition-group>
        <ul class="lists height-block" key="up">
          <li class="list height-list">
            <label>地上：</label>
          </li>
          <li class="list" v-for="item in industryUp" :key="item.id">
            <input type="radio" :id="'upheight'+item.id" v-bind="$attrs" v-bind:value="item.id" v-model="upHeight"
            :data-name="item.name" :data-max-floor="item.maxFloor" :data-min-floor="item.minFloor" v-on="inputUpListeners" name="upheightRdi">
            <label :for="'upheight'+item.id" class="name">{{item.name}}</label>
          </li>
        </ul>
        <ul class="lists" key="down">
          <li class="list height-list">
            <label>地下：</label>
          </li>
          <li class="list" v-for="item in industryDown" :key="item.id">
            <input type="radio" :id="'downheight'+item.id" v-bind="$attrs" v-model="downHeight"
            v-bind:value="item.id" :data-name="item.name" :data-floor="item.floor" v-on="inputDownListeners" name="downheightRdi">
            <label :for="'downheight'+item.id" class="name">{{item.name}}</label>
          </li>
        </ul>
    </transition-group>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: ['HEIGHT', 'defaultValue'],
  data () {
    return {
      height: this.HEIGHT,
      industryUp: [],
      industryDown: [],
      upHeight: '00000',
      downHeight: '00000'
    }
  },
  beforeMount () {
    // 将常量保存
    this.height = this.HEIGHT
  },
  computed: {
    inputUpListeners: function () {
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
          click: function (event) {
            let value = event.target.value
            let name = event.target.getAttribute('data-name')
            let maxFloor = event.target.getAttribute('data-max-floor')
            let minFloor = event.target.getAttribute('data-min-floor')
            if (value === '00000') {
              value = ''
              name = ''
              vm.height = vm.HEIGHT
            } else {
              vm.height = ''
            }
            vm.$emit('heightUpChange', value, name, minFloor, maxFloor)
          }
        }
      )
    },
    inputDownListeners: function () {
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
          click: function (event) {
            let value = event.target.value
            let name = event.target.getAttribute('data-name')
            let floor = event.target.getAttribute('data-floor')
            if (value === '00000') {
              value = ''
              name = ''
              vm.height = vm.HEIGHT
            } else {
              vm.height = ''
            }
            vm.$emit('heightDownChange', value, name, floor)
          }
        }
      )
    }
  },
  methods: {
    getDicCommonsUp () {
      api.getDicCommon('DicGroundFloorCount').then(res => {
        this.industryUp = res.data
        this.industryUp.unshift({ id: '00000', name: '不限' })
      })
    },
    getDicCommonsDown () {
      api.getDicCommon('DicUnderGroundFloorCount').then(res => {
        this.industryDown = res.data
        this.industryDown.unshift({ id: '00000', name: '不限' })
      })
    }
  },
  watch: {
    defaultValue (newValue) {
      if (newValue) {
        if (newValue === 'upHeight') {
          this.upHeight = '00000'
          this.$emit('heightUpChange', '', '')
        } else if (newValue === 'downHeight') {
          this.downHeight = '00000'
          this.$emit('heightDownChange', '', '')
        }
      }
    }
  },
  mounted () {
    this.getDicCommonsUp()
    this.getDicCommonsDown()
  }
}
</script>
<style lang="less">
.common-choice {
  .height-lineHeight {
    line-height: 70px;
  }
  .height-block {
    margin-top: -70px;
  }
  .height-list{
    margin-left: 10px;
  }
}
</style>
