import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from "vue2-google-maps";
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

//Alertas bonitas
// https://github.com/avil13/vue-sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

//google maps
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB5hXaH1iPR7fAmdu4klLMwjavty5vBauU",
  },
  installComponents: true
});

//AXIOS


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

