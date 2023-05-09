<template>
  <div class="demands container" v-if="loaded">
    <Card col="12" title="Demandas" icon="fa-solid fa-list-ul">
      <button slot="body" class="btn btn-primary float-right mb-2" data-bs-toggle="modal" data-bs-target="#newDemand">
        <i class="fa-solid fa-plus"></i> Nova Demanda
      </button>
      <Table slot="body" :headers="titles" :data="demands" :buttons="buttons"></Table>
    </Card>
    <Modal id="newDemand" title="Nova Demanda" icon="fa-regular fa-newspaper" :functionSave="create">
      <div slot="body">
        <div class="form-group mb-3">
          <label for="titleDemand" class="form-label">Título</label>
          <input type="text" class="form-control" id="titleDemand" v-model="newDemand.title">
        </div>
        <div class="form-group">
          <label for="descriptionDemand" class="form-label">Descrição</label>
          <textarea id="descriptionDemand" class="form-control" name="description" maxlength="2000"
            v-model="newDemand.description"></textarea>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Card from "../components/Card.vue"
import Table from "../components/Table.vue"
import Modal from '../components/Modal.vue'

export default {
  name: "DemandsView",
  components: {
    Card, Table, Modal
  },
  data() {
    return {
      loaded: false,
      demands: [],
      titles: {
        id: { title: "Número", type: "text" },
        title: { title: "Título", type: "text" },
        datetime_open: { title: "Abertura", type: "datetime" },
        user: { title: "Usuário", type: "text" },
        status: { title: "Status", type: "badge" },
      },
      buttons: {
        view: { title: "Visualizar", url: "/demand/", col: "id" },
      },
      newDemand: {}
    }
  },
  mounted() {
    if (!this.$store.state.token) {
      this.$router.push("/login")
    } else {
      this.list()
    }
  },
  methods: {
    list() {
      this.axios
        .get(this.$store.state.urlFetchApi + "/demand")
        .then((response) => {
          (this.demands = response.data), (this.loaded = true)
        })
    },
    create() {
      let demand = new URLSearchParams({
        'title': this.newDemand.title,
        'description': this.newDemand.description
      })
      this.axios.post(this.$store.state.urlFetchApi + '/demand', demand)
        .then(response => {
          if (response.data) {
            this.list()
            this.newDemand = {}
            document.documentElement.querySelector(".modal.fade.show .btn-close").click()
          }
        })
    }
  },
}
</script>

<style></style>