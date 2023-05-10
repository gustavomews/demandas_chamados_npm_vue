<template>
  <div class="container" v-if="loaded">
    <div class="row">
      <Card :title="'Demanda: ' + $route.params.id" icon="fa-solid fa-bars-staggered" col="7">
        <div slot="body">
          <h5 v-if="data.status">
            {{ data.title }}
            <span :class="'badge bg-' + data.status.codename + ' align-top'">
              {{ data.status.title }}
            </span>
          </h5>

          <h6 class="card-subtitle mb-2" v-if="data.user">
            Criado por <b>{{ data.user.name }}</b> às
            <b>{{ data.datetime_open | formatDateTime }}</b>
          </h6>

          <p class="card-text" v-if="data.description">
            <b>Descrição:</b> {{ data.description }}
          </p>
        </div>

        <div slot="footer" v-if="data.status_id == 1 || data.status_id == 2">
          {{/* Pendente > Permite editar e abrir */ }}
          <template v-if="data.status_id == 1">
            <button type="button" class="btn btn-secondary" @click="loadEdit" data-bs-toggle="modal"
              data-bs-target="#editDemand">Editar</button>
            <button type="button" class="btn btn-primary ms-2" @click="changeStatus('open')">Abrir</button>
          </template>
          {{/* Em andamento > Permite concluir e cancelar */ }}
          <template v-if="data.status_id == 2">
            <button type="button" class="btn btn-danger" @click="changeStatus('cancel')">Cancelar</button>
            <button type="button" class="btn btn-success ms-2" @click="changeStatus('conclude')">Concluir</button>
          </template>
        </div>
      </Card>

      <Card title="Interações realizadas" icon="fa-solid fa-ellipsis-vertical" col="5">
        <div slot="body">
          <ul class="timeline">
            <li class="timeline-item bg-transparent rounded ml-3 p-4" v-for="interaction in data.interactions"
              :key="interaction.id">
              <div class="timeline-arrow"></div>
              <h5 class="card-title">{{ interaction.description }}</h5>
              <h6 class="card-subtitle mb-2">
                Realizada por <b>{{ interaction.user.name }}</b> às
                <b>{{ interaction.datetime_interaction | formatDateTime }}</b>
              </h6>
            </li>
          </ul>
        </div>
      </Card>
    </div>
    <Modal id="editDemand" title="Editar Demanda" icon="fa-solid fa-newspaper" :functionSave="edit">
      <div slot="body">
        <div class="form-group mb-3">
          <label for="titleDemand" class="form-label">Título</label>
          <input type="text" aria-describedby="titleHelp"
            :class="errorsEdit.title ? 'form-control error' : 'form-control'" id="titleDemand" v-model="editDemand.title">
          <div id="titleHelp" class="form-text" v-html="errorsEdit.title"></div>
        </div>
        <div class="form-group">
          <label for="descriptionDemand" class="form-label">Descrição</label>
          <textarea id="descriptionDemand" aria-describedby="descriptionHelp"
            :class="errorsEdit.description ? 'form-control error' : 'form-control'" name="description" maxlength="2000"
            v-model="editDemand.description"></textarea>
          <div id="descriptionHelp" class="form-text" v-html="errorsEdit.description"></div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Card from "../components/Card.vue"
import Modal from "../components/Modal.vue"

export default {
  components: {
    Card, Modal
  },
  data() {
    return {
      loaded: false,
      data: [],
      editDemand: {
        title: '',
        description: ''
      },
      errorsEdit: {
        title: ''
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
      this.axios.get(this.$store.state.urlFetchApi + "/demand/" + this.$route.params.id)
        .then((response) => {
          this.data = response.data
          this.loaded = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadEdit() {
      this.editDemand.title = this.data.title
      this.editDemand.description = this.data.description ? this.data.description : ''
      this.errorsEdit.title = ''
      this.errorsEdit.description = ''
    },
    edit() {
      let demand = new URLSearchParams({
        'title': this.editDemand.title,
        'description': this.editDemand.description,
        '_method': 'PATCH'
      })
      this.axios.post(this.$store.state.urlFetchApi + '/demand/' + this.$route.params.id, demand)
        .then(response => {
          if (response.data) {
            this.list()
            this.editDemand = {
              title: '',
              description: ''
            }
            this.errorsEdit.title = ''
            this.errorsEdit.description = ''
            document.documentElement.querySelector(".modal.fade.show .btn-close").click()
          }
        })
        .catch(error => {
          if (error.response.data.errors.title) {
            this.errorsEdit.title = '<i class="fa-solid fa-caret-right"></i> ' + error.response.data.errors.title
          }
          if (error.response.data.errors.description) {
            this.errorsEdit.description = '<i class="fa-solid fa-caret-right"></i> ' + error.response.data.errors.description
          }
        })
    },
    changeStatus(status) {
      this.axios.post(this.$store.state.urlFetchApi + '/demand/' + status + '/' + this.data.id)
        .then(response => {
          if (response) {
            this.list()
          }
        })
    }
  }
}
</script>

<style></style>