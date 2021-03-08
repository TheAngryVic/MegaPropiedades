<template>
  <v-container grid-list-xs>
      <p class="indigo--text text-h4">{{propiedad.Nombre}}</p>
      <v-card>
        <v-row>
            <v-col cols="12" sm="12" md="4">
              <v-card-text class="text-left">
                <p class="indigo--text text-h5">{{propiedad.Categoria}}</p>
                <p class="indigo--text text-h5">{{propiedad.comuna}}</p>
                <p class="indigo--text text-h6">UF {{propiedad.precio}}</p>
                <p class="red--text  lighten-1 subtitle-1">${{(propiedad.precio)*this.UF}}</p>
                <p class="indigo--text subtitle-1"><v-icon color="indigo darken-2">mdi-map-marker</v-icon>{{propiedad.Direccion}}</p>
                <p class="indigo--text subtitle-1">{{propiedad.m2}} m2 sup. terreno</p>                
                <p class="indigo--text subtitle-1"><v-icon color="indigo darken-2">mdi-bed</v-icon> {{propiedad.nrooms}} Dormitorios</p>                
                <p class="indigo--text subtitle-1"><v-icon color="indigo darken-2">mdi-paper-roll</v-icon> {{propiedad.nbano}} Baños</p>                
                <p class="indigo--text subtitle-1">Código: {{propiedad.Id}}</p>                            
          </v-card-text>    
            </v-col>
            <v-col cols="12" sm="12" md="8">              
                <!-- Galeria de imagenes -->
                <div class="d-flex align-center flex-row justify-star flex-wrap" >
                <v-img class="img" v-for="(foto, i) in propiedad.fotos" :key="i" :src="foto" @click="onClick(i)"></v-img>
                <vue-gallery-slideshow :images="propiedad.fotos" :index="index" @close="index = null"></vue-gallery-slideshow>
                </div>
            </v-col>
        </v-row>
          <v-card-text class="text-center">
              <p class="black--text ">{{propiedad.descripcion}}</p>
          </v-card-text>
          <v-card-text>
              <MapaHere ref="hereMap" :center="propiedad.Ubicacion"></MapaHere>
              <!-- <Mapa ref="map" :latitude="propiedad.Ubicacion.lat" :longitude="propiedad.Ubicacion.lng"></Mapa> -->
          </v-card-text>
      </v-card>
  </v-container>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import MapaHere from "../components/mapHere";
import Mapa from "../components/map";
// import Mapa from "../components/map";
import VueGallerySlideshow from 'vue-gallery-slideshow'
export default {
    name:'Propiedad',     
    data(){
        return{
            id: this.$route.params.id,
            index: null
        }
    },
    components:{
        MapaHere,
        VueGallerySlideshow,
        Mapa
    },
    computed:{
        ...mapState(['propiedad','UF'])
    },
    methods:{
        ...mapActions(['getPropiedad','getUF','clearPropiedad']),
         onClick(i) {
        this.index = i;
        },       
    },
    async created(){
        // await this.clearPropiedad();
        this.getPropiedad(this.id);
        this.getUF();
    }
    ,
    mounted(){       
        
        let map = this.$refs.hereMap;        
        map.dropMarker(this.propiedad.Ubicacion)

    },
         
}
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
.img{
    width: 200px;
    height: 200px;
    /* background-size: contain; */
    cursor: pointer;
    margin: 10px;
    border-radius: 3px;
}
p{
font-family: 'Open Sans', sans-serif;
}
</style>