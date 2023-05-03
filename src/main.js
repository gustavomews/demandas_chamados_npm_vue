import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/style.css'

// INTERCEPTORS FROM AXIOS
import axios from 'axios'
axios.interceptors.request.use(
  config => {
      config.headers['Accept'] = 'application/json'
      config.headers['Authorization'] = "Bearer " + localStorage.token
      //console.log('Interceptando o request antes do envio', config)
      return config
  },
  error => {
      //console.log('Falha na requisição', error)
      return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
      return response
  },
  error => {
      //console.log('Falha na resposta', error.response)
      if(error.response.status == 401 && error.response.data.message == 'Token has expired') {
          //console.log('Fazer uma nova req para refresh')

          axios.post(this.$store.state.urlAccessApi+'/refresh')
              .then(response => {
                  //console.log('Refresh com sucesso: ', response)

                  localStorage.token = response.data.token
                  this.$store.state.token = response.data.token
                  window.location.reload()
              })
      }
      return Promise.reject(error)
  }
)

//
Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

