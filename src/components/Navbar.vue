<template>
    <nav>       
        <v-app-bar app color="white lighten-5">           
            <v-toolbar-title>
                <router-link to="/autenticador" id="logo"><v-img aspect-ratio="21/9" width="600" lazy-src="../assets/logo2.png"></v-img></router-link>           
            </v-toolbar-title>
              <v-spacer></v-spacer>                
                <v-tabs right >
                    <v-tab to="/">Inicio</v-tab>
                    <v-tab to="/about">¿Quienes somos?</v-tab>
                    <v-tab to="/admin" v-if="existeUser">Admin</v-tab>
                    <v-tab v-if="existeUser"><v-btn @click="cerrar" color="red darken-4 white--text">Cerrar Sesion</v-btn></v-tab>
                </v-tabs>                   
        </v-app-bar>       
    </nav>    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return{
            drawer:false
        }
    },
   methods:{
        ...mapActions(['cerrar'])
    },
    computed:{
        ...mapGetters(['existeUser'])
    } 
}
</script>

 <style >
 #logo a{
     text-decoration: none;
 }
 </style>

