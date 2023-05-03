<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {

  },
  created() {
    if (!this.$store.state.token) {
      this.$router.push('/login')
    }
  }
}
</script>
