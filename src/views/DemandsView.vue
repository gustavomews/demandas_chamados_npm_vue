<template>
  <div class="demands container" v-if="loaded">
    <Card col="12" title="Demandas" icon="fa-solid fa-list-ul">
      <div slot="body">
        <button class="btn btn-primary mb-2 float-right" data-bs-toggle="modal" data-bs-target="#newDemand">
          <i class="fa-solid fa-plus"></i> Nova Demanda
        </button>
        <br>
        <br>
        <Table :headers="titles" :data="demands" :buttons="buttons"></Table>
      </div>
    </Card>
    <Modal id="newDemand" title="Nova Demanda" icon="fa-regular fa-newspaper" :functionSave="create">
      <div slot="body">
        <div class="form-group mb-3">
          <label for="titleDemand" class="form-label">Título</label>
          <input type="text" aria-describedby="titleHelp" :class="errorsNew.title ? 'form-control error' : 'form-control'"
            id="titleDemand" v-model="newDemand.title">
          <div id="titleHelp" class="form-text" v-html="errorsNew.title"></div>
        </div>
        <div class="form-group">
          <label for="descriptionDemand" class="form-label">Descrição</label>
          <textarea id="descriptionDemand" aria-describedby="descriptionHelp"
            :class="errorsNew.description ? 'form-control error' : 'form-control'" name="description" maxlength="2000"
            v-model="newDemand.description"></textarea>
          <div id="descriptionHelp" class="form-text" v-html="errorsNew.description"></div>
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
      newDemand: {
        title: '',
        description: ''
      },
      errorsNew: {
        title: '',
        description: ''
      }
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
            this.newDemand = {
              title: '',
              description: ''
            }
            this.errorsNew.title = ''
            this.errorsNew.description = ''
            document.documentElement.querySelector(".modal.fade.show .btn-close").click()
          }
        })
        .catch(error => {
          if (error.response.data.errors.title) {
            this.errorsNew.title = '<i class="fa-solid fa-caret-right"></i> ' + error.response.data.errors.title
          }
          if (error.response.data.errors.description) {
            this.errorsNew.description = '<i class="fa-solid fa-caret-right"></i> ' + error.response.data.errors.description
          }
        })
    }
  },
}
</script>

<style></style>