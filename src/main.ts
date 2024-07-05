import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Router from './router'
import Store from './stores/Store'

import FontAwesomeIcon from './plugins/Fontawesome-icons'

import Modal from './views/common/Modal.vue'

const app = createApp(App)

app.use(createPinia())

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(Router)

app.use(Store);

app.mount('#app')
