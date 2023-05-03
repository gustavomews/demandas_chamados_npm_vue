<template>
    <div>
        <form method="POST" action="" @submit.prevent="login">
            <div class="mb-3">
                <label for="emailLogin" class="form-label"><i class="fa-solid fa-envelope"></i> Email</label>
                <input type="email" class="form-control" id="emailLogin" v-model="user.email">
            </div>
            <div class="mb-4">
                <label for="passwordLogin" class="form-label"><i class="fa-solid fa-key"></i>
                    Senha</label>
                <input type="password" class="form-control" id="passwordLogin" v-model="user.password">
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">
                    <i class="fa-solid fa-share"></i> Acessar
                </button>
            </div>
        </form>

        <h6 :class="msgReturn ? 'text-center mt-4' : ''">{{ msgReturn }}</h6>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            user: {},
            msgReturn: '',
            token: ''
        }
    },
    methods: {
        login() {

            let data = new URLSearchParams({
                'email': this.user.email,
                'password': this.user.password
            })

            axios.post(this.$store.state.urlAccessApi + '/login', data, this.$store.state.configApi)
                .then((response) => {
                    if (response.data.token) {
                        this.token = response.data.token
                        this.msgReturn = "Login efetuado com sucesso!"
                        this.$router.push('/')
                    } else {
                        this.msgReturn = response.data.error + '!'
                        document.getElementById('passwordLogin').focus()
                    }
                })
                .catch((errors) => {
                    if (errors.response) {
                        this.msgReturn = errors.response.data.error
                    } else {
                        this.msgReturn = "Falha na conexão!"
                    }
                })
        },
    },
    watch: {
        token(newToken) {
            localStorage.token = newToken
            this.$store.state.token = newToken
        }
    }
}
</script>

<style></style>