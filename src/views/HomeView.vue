<template>
  <div class="home">
    <Navbar />
    <Card col="12" :title="'Seja bem vindo(a) ' + $store.state.name" icon="fa-regular fa-star">
      <h4 slot="body">Dashboard</h4>
    </Card>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'

export default {
  name: 'HomeView',
  components: {
    Navbar, Card
  }
}
</script>
