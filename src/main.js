import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/css/style.css'

// INTERCEPTORS FROM AXIOS
import axios from 'axios'
axios.interceptors.request.use(
  config => {
    config.headers['Accept'] = 'application/json'
    config.headers.Authorization = "Bearer " + localStorage.token
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
    if (error.response) {
      if (error.response.status == 401 && error.response.data.message == 'Token has expired') {
        //console.log('Fazer uma nova req para refresh')

        axios.post('http://127.0.0.1:8000/api/refresh')
          .then(response => {
            //console.log('Refresh com sucesso: ', response)

            localStorage.token = response.data.token
            store.state.token = response.data.token
            window.location.reload()
          })
          .catch(() => {
            localStorage.removeItem('token')
            store.state.token = ''
            store.state.name = ''
            router.push('/login')
          })
      }
      return Promise.reject(error)
    } else {
      localStorage.removeItem('token')
      store.state.token = ''
      store.state.name = ''
      router.push('/')
    }
  }
)

//
Vue.prototype.axios = axios
Vue.config.productionTip = false

//
Vue.filter('formatDateTime', (d) => {
  if (!d) return ''

  d = d.split(' ')

  let data = d[0]
  data = data.split('-')
  data = data[2] + '/' + data[1] + '/' + data[0]

  let tempo = d[1]
  tempo = tempo.split('.')
  tempo = tempo[0]

  return data + ' ' + tempo
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

