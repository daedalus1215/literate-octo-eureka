<template>
  <TheHeader />
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
  components: {
    TheHeader
  }
}
</script>