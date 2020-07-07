<template>
  <div>
    <homeHeaderComponent/>
    <router-view/>
    <footerComponent/>
  </div>
</template>
<script>
import homeHeaderComponent from '@/components/homeHeaderComponent'
import footerComponent from '@/components/footerComponent'
export default {
  components: {
    homeHeaderComponent,
    footerComponent
  }
}
</script>
