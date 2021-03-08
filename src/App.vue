<template>
  <v-app>
    <Navbar/>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
      <Footer></Footer>
    </v-main>   
  </v-app>
</template>
  <script
      src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=&v=weekly"
      async
    ></script>
<script>
import { mapActions } from 'vuex';
import  Navbar  from "./components/Navbar";
import  Footer  from "./components/Footer";

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data: () => ({
    //
  }),
  methods:{
    ...mapActions(['cerrarSesion'])
  }
};
</script>

<style scoped>
body{
  font-family: 'Roboto', sans-serif;
}
</style>
