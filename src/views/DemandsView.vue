<template>
  <div class="demands container" v-if="loaded">
    <Card col="12" title="Demandas" icon="fa-solid fa-list-ul">
      <button slot="body" class="btn btn-primary float-right mb-2">
        <i class="fa-solid fa-plus"></i> Nova Demanda
      </button>
      <Table
        slot="body"
        :headers="titles"
        :data="demands"
        :buttons="buttons"
      ></Table>
    </Card>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Table from "../components/Table.vue";

export default {
  name: "DemandsView",
  components: {
    Card,
    Table,
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
    };
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
          (this.demands = response.data), (this.loaded = true);
        });
    },
  },
};
</script>

<style></style>