<template>
  <div class="container" v-if="loaded">
    <div class="row">
      <Card
        :title="'Demanda: ' + $route.params.id"
        icon="fa-solid fa-bars-staggered"
        col="7"
      >
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
            <a href="#">
              <button type="button" class="btn btn-secondary">Editar</button>
            </a>
            <a href="#">
              <button type="button" class="btn btn-primary">Abrir</button>
            </a>
          </template>
          {{/* Em andamento > Permite concluir e cancelar */ }}
          <template v-if="data.status_id == 2">
            <a href="#">
              <button type="button" class="btn btn-danger">Cancelar</button>
            </a>
            <a href="#">
              <button type="button" class="btn btn-success">Concluir</button>
            </a>
          </template>
        </div>
      </Card>

      <Card
        title="Interações realizadas"
        icon="fa-solid fa-ellipsis-vertical"
        col="5"
      >
        <div slot="body">
          <ul class="timeline">
            <li
              class="timeline-item bg-transparent rounded ml-3 p-4"
              v-for="interaction in data.interactions"
              :key="interaction.id"
            >
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
  </div>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  components: {
    Card,
  },
  data() {
    return {
      loaded: false,
      data: [],
    };
  },
  mounted() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
    } else {
      this.axios
        .get(this.$store.state.urlFetchApi + "/demand/" + this.$route.params.id)
        .then((response) => {
          this.data = response.data;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style></style>