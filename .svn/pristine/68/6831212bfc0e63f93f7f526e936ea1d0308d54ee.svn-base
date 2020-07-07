<template>
  <div class="search-bar">
    <input type="text" :placeholder="placeholder" v-model.lazy.trim="searchBoxKeyWord" @change="handleConfirm">
    <button @click="handleConfirm">搜索</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    placeholder: String
  },
  data() {
    return {
      searchBoxKeyWord: ''
    }
  },
  methods: {
    ...mapMutations(['setSingleItemFilterData']),
    handleConfirm() {
      this.setSingleItemFilterData({
        dataForBack: {
          search: this.searchBoxKeyWord
        },
        // dynamicTags: { searchText: this.searchBoxKeyWord } // 搜索框没有加在dynamicTag
      })
    },
    initData() {
      this.searchBoxKeyWord = ''
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
.search-bar {
  height: 30px;
  display: flex;
  align-items: center;
  input {
    font-size: 12px;
    width: 559px;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #d8e0f5;
    padding-left: 12px;
    &::placeholder {
      color: #bebebe;
    }
  }
  button {
    cursor: pointer;
    font-size: 14px;
    width: 70px;
    height: 100%;
    box-sizing: border-box;
    color: #fff;
    background: url(~@/assets/img/searchPic.png) #ffa21d no-repeat 9px center;
    margin-left: 6px;
    padding-left: 20px;
  }
}
</style>