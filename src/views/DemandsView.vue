<template>
  <div class="demands">
    <Navbar />
    <Card col="12" title="Demandas" icon="fa-solid fa-list-ul">
      <div slot="body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'

export default {
  name: 'DemandsView',
  components: {
    Navbar, Card
  }
}
</script>

<style></style>