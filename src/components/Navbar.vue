<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="@/assets/images/logo.png" height="40px"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <router-link to="/">
                        <li class="nav-item">
                            <a :class="$route.name == 'home' ? 'nav-link active' : 'nav-link'"><i
                                    class="fa-solid fa-house"></i> Início</a>
                        </li>
                    </router-link>
                    <router-link to="/demands">
                        <li class="nav-item">
                            <a :class="$route.name == 'demands' ? 'nav-link active' : 'nav-link'"><i
                                    class="fa-solid fa-list-check"></i> Demandas</a>
                        </li>
                    </router-link>
                </ul>
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                        <i class="fa-solid fa-user"></i> {{ $store.state.name }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li><a class="dropdown-item" @click="logout"><i class="fa-solid fa-door-open"></i> Sair</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    methods: {
        logout() {
            this.axios.post(this.$store.state.urlFetchApi + '/logout')
                .then(response => {
                    if (response) {
                        localStorage.removeItem('token')
                        this.$store.state.token = ''
                        this.$store.state.name = ''
                        this.$router.push('/login')
                    }
                })
        }
    },
    created() {
        if (!this.$store.state.token) {
            this.$router.push('/login')
        }
    }
}
</script>

<style></style>