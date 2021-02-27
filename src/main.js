import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import { auth } from "./firebase";

auth.onAuthStateChanged(
  user =>{
    if (user) {
      const observer = {
        email: user.email,
        uid: user.uid,
      }
      //
      store.dispatch('detectarUser',observer)
    } else {
      // console.log(user)
      store.dispatch('detectarUser',user)
    }

    new Vue({
      router,
      store,
      vuetify,
      render: function (h) { return h(App) }
    }).$mount('#app')
    
  })

