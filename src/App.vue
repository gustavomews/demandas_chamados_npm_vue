<template>
  <div id="app">
    <div
      :class="$route.name == 'login' || $route.name == 'register' ? 'd-flex align-items-center justify-content-center vh-100' : ''">
      <div :class="$route.name == 'login' || $route.name == 'register' ? 'app-box' : ''">
        {{ /* ////////////////////////////// LOGIN / REGISTER ////////////////////////////// */ }}
        <template v-if="!$store.state.token || $route.name == 'register'">
          <h5 class="mt-3"><i class="fa-solid fa-paperclip"></i> DEMANDAS & CHAMADOS</h5>
          <h6 class="mb-4 text-center">Gestão de Demandas e Chamados</h6>
          <hr class="mb-4">
        </template>

        <nav class="mb-4" v-if="!$store.state.token">
          <ul class="nav justify-content-center">
            <router-link to="/login">
              <button :class="$route.name == 'login' ? 'nav-link btn nav-login active' : 'nav-link btn'">
                <i class="fa-solid fa-arrow-right-to-bracket"></i> Acessar
              </button>
            </router-link>
            <router-link to="/register">
              <button :class="$route.name == 'register' ? 'nav-link btn nav-register active' : 'nav-link btn'">
                <i class="fa-regular fa-id-card"></i> Registrar
              </button>
            </router-link>
          </ul>
        </nav>

        {{ /* ////////////////////////////// APPLICATION ////////////////////////////// */ }}

        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.token) {
      this.axios.post(this.$store.state.urlFetchApi + '/me')
        .then(response => {
          this.$store.state.name = response.data.name
        })
    }
  }
}
</script>