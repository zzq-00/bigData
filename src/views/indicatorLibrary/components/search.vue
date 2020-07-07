<template>
  <div class="common-search clearfix">
    <label for=""></label>
    <input type="text" v-bind="$attrs" :placeholder="placeholder" v-model="searchInput" v-on="inputListeners" class="search-input">
    <button class="btn" @click="btnClick"><i class="icon"></i>搜索</button>
  </div>
</template>
<script>
export default {
  props: ['placeholder'],
  data () {
    return {
      searchInput: ''
    }
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
          /* input: function (event) {
                        debugger
                        vm.$emit('input', event.target.value)
                    }, */
          keypress: function (event) {
            if (event.keyCode === 13) {
              event.target.value = event.target.value.trim()
              vm.$emit('searchClick', event.target.value)
            }
          }
        }
      )
    }
  },
  methods: {
    btnClick (event) {
      this.searchInput = this.searchInput.trim()
      this.$emit('searchClick', this.searchInput)
    }
  }
}
</script>
<style lang="less" scoped>
.search-input {
  float: left;
  width: 525px;
  height: 28px;
  line-height: 24px;
  padding-left: 12px;
  padding-right: 20px;
  border: 1px solid #d8e0f5;
  &::placeholder {
    color: #bebebe;
    font-size: 12px;
  }
}
.btn {
  cursor: pointer;
  font-size: 14px;
  height: 30px;
  width: 70px;
  box-sizing: border-box;
  color: #fff;
  background-color: #FFA21D;
  margin-left: 6px;
  padding: 0 12px 0 30px;
  background-image: url(~@/assets/img/searchPic.png);
  background-repeat: no-repeat;
  background-position: 9px center;
}
</style>
