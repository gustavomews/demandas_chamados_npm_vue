<template>
  <div class="demands">
    <Navbar />
    <Card col="12" title="Demandas" icon="fa-solid fa-list-ul">
      <Table slot="body" :headers="titles" :data="demands" :buttons="buttons"></Table>
    </Card>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'
import Table from '../components/Table.vue'

export default {
  name: 'DemandsView',
  components: {
    Navbar, Card, Table
  },
  data() {
    return {
      demands: [],
      titles: {
        id: { title: 'Número', type: 'text' },
        title: { title: 'Título', type: 'text' },
        datetime_open: { title: 'Abertura', type: 'datetime' },
        user: { title: 'Usuário', type: 'text' },
        status: { title: 'Status', type: 'text' },
      },
      buttons: {
        view: { title: 'Visualizar', url: '/demand/', col: 'id' },
      }
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      this.axios.get(this.$store.state.urlFetchApi + '/demand')
        .then(response => {
          this.demands = response.data
        })
    }
  }
}
</script>

<style></style>