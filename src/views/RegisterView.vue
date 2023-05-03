<template>
    <div>
        <form method="POST" action="" @submit.prevent="register">
            <div class="mb-2">
                <label for="nameRegister" class="form-label"><i class="fa-solid fa-signature"></i>
                    Nome</label>
                <input type="text" class="form-control" id="nameRegister" aria-describedby="nameHelp" v-model="user.name">
                <div id="nameHelp" class="form-text" v-html="registerErrors.name"></div>
            </div>
            <div class="mb-2">
                <label for="emailRegister" class="form-label"><i class="fa-solid fa-envelope"></i>
                    Email</label>
                <input type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp"
                    v-model="user.email">
                <div id="emailHelp" class="form-text" v-html="registerErrors.email"></div>
            </div>
            <div class="mb-2">
                <label for="passwordRegister" class="form-label"><i class="fa-solid fa-key"></i>
                    Senha</label>
                <input type="password" class="form-control" id="passwordRegister" aria-describedby="passwordHelp"
                    v-model="user.password">
                <div id="passwordHelp" class="form-text" v-html="registerErrors.password"></div>
            </div>
            <div class="mb-4">
                <label for="confirmPasswordRegister" class="form-label">
                    <i class="fa-solid fa-check-double"></i> Confirme a senha
                </label>
                <input type="password" class="form-control" id="confirmPasswordRegister"
                    v-model="user.password_confirmation">
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-secondary"><i class="fa-solid fa-share"></i>
                    Registrar</button>
            </div>
        </form>

        <h6 :class="msgReturn ? 'mt-4 text-center' : ''">{{ msgReturn }}</h6>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            msgReturn: '',
            registerErrors: {
                'name': '',
                'email': '',
                'password': ''
            },
        }
    },
    methods: {
        register() {
            let data = new URLSearchParams({
                'name': this.user.name,
                'email': this.user.email,
                'password': this.user.password,
                'password_confirmation': this.user.password_confirmation
            })

            this.axios.post(this.$store.state.urlAccessApi + '/register', data)
                .then((response) => {
                    if (response) {
                        this.registerErrors = {
                            'name': '',
                            'email': '',
                            'password': ''
                        }
                        this.msgReturnRegister = "Registro efetuado com sucesso!"


                        /// Login
                        let data = new URLSearchParams({
                            'email': this.user.email,
                            'password': this.user.password
                        })

                        this.axios.post(this.$store.state.urlAccessApi + '/login', data, this.$store.state.configApi)
                            .then((response) => {
                                if (response.data.token) {
                                    localStorage.token = response.data.token
                                    this.$store.state.token = response.data.token
                                    this.msgReturn = "Login efetuado com sucesso!"
                                    this.$router.push('/')
                                }
                            })
                    }
                })
                .catch((errors) => {
                    if (errors.response) {
                        this.registerErrors.name = errors.response.data.errors.name ? '<i class="fa-solid fa-caret-right"></i> ' + errors.response.data.errors.name[0] : ''
                        this.registerErrors.email = errors.response.data.errors.email ? '<i class="fa-solid fa-caret-right"></i> ' + errors.response.data.errors.email[0] : ''
                        this.registerErrors.password = errors.response.data.errors.password ? '<i class="fa-solid fa-caret-right"></i> ' + errors.response.data.errors.password[0] : ''
                        this.msgReturnRegister = ''
                    } else {
                        this.msgReturnRegister = "Falha na conexão!"
                    }
                })
        }
    }
}
</script>

<style></style>