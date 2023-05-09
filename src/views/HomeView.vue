<template>
  <div class="home container">
    <Card
      col="12"
      :title="'Seja bem vindo(a) ' + $store.state.name"
      icon="fa-regular fa-star"
    >
      <h4 slot="body">Dashboard</h4>
    </Card>
  </div>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  name: "HomeView",
  components: {
    Card,
  },
  mounted() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
    }
  },
};
</script>
