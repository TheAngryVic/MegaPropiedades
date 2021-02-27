<template>
  <div class="home" >
    <Carr/>
    <v-container>
        <!-- <h2 class=" text-center">Propiedades Destacadas</h2> -->
       <v-row>
         <v-col cols="12">
            <p class="text-center text-sm-h2 text-md-h3 text-lg-h4 my-3 indigo--text" >Propiedades Destacadas</p>
            <v-divider></v-divider>
         </v-col>
       </v-row>
        <v-row>
          <v-col my-3 cols="12" sm="6" md="3" lg="3" xl="3" v-for="p in propiedades.slice(0,4)" :key="p.id">
            <v-card class="text-left">                           
               <v-img  :src="p.fotos[0]"
                height="200px"></v-img>
            <v-card-title class="pa-0">
              {{p.Nombre}}
            </v-card-title>
           <v-card-text>
            <v-row>
              <v-col cols="6">
                <p class="black--text subtitle-4 ma-0 pa-0">UF {{p.precio}} </p>               
                
              </v-col>
              <v-col cols="6">
                <p class="indigo white--text text-center"><v-icon color="white"  small>mdi-tag</v-icon> {{p.Categoria}}</p>
              </v-col>
            </v-row>
             <v-row>
               <v-col cols="6"> <p class="indigo--text subtitle-1"><v-icon color="indigo darken-2">mdi-bed</v-icon> {{p.nrooms}} Dor.</p></v-col>
               <v-col cols="6"><p class="indigo--text subtitle-1"><v-icon color="indigo darken-2">mdi-paper-roll</v-icon> {{p.nbano}} Ba.</p></v-col>
             </v-row>
           </v-card-text>
            <router-link :to="{name:'Propiedad', params:{id:p.Id}}"><v-btn color="indigo darken-2 white--text" block>Ver</v-btn> </router-link> 
          </v-card>
          </v-col>
        </v-row>
        <v-row>
         <v-col cols="12">
            <p class="text-center text-sm-h2 text-md-h3 text-lg-h4 my-5 indigo--text" >Servicios</p>
            <v-divider></v-divider>
         </v-col>       
       </v-row>
         <v-row class="mb-2">
           <v-col cols="12" sm="12" md="3">
             <v-card  class="d-flex flex-column align-center" shaped outlined>              
               <v-img src="../../public/img/arriendo.svg" width="90px" class="my-2" alt="foto"></v-img>             
               <p class="text-center text-h4 ">Arriendo</p>
               <p class="text-center text-body-1 font-weight-medium">Nos encargamos de gestionar el arriendo de sus propiedades</p>
             </v-card>
           </v-col>
            <v-col cols="12" sm="12" md="3">
             <v-card  class="d-flex flex-column align-center" shaped outlined>              
               <v-img src="../../public/img/compraventa.svg" width="90px" class="my-2" alt="foto"></v-img>             
               <p class="text-center text-h4 ">Compraventa</p>
               <p class="text-center text-body-1 font-weight-medium">Te damos asistencia en el proceso de Compraventa de tu propiedad</p>
             </v-card>
           </v-col>
            <v-col cols="12" sm="12" md="3">
             <v-card  class="d-flex flex-column align-center" shaped outlined>              
               <v-img src="../../public/img/arreglo.svg" width="90px" class="my-2" alt="foto"></v-img>             
               <p class="text-center text-h4 ">Remodelacion</p>
               <p class="text-center text-body-1 font-weight-medium">Nos encargamos del proceso de remodelación de la vivienda</p>
             </v-card>
           </v-col>
              <v-col cols="12" sm="12" md="3">
             <v-card  class="d-flex flex-column align-center" shaped outlined>              
               <v-img src="../../public/img/integral.svg" width="90px" class="my-2" alt="foto"></v-img>             
               <p class="text-center text-h4 ">Limpieza integral</p>
               <p class="text-center text-body-1 font-weight-medium">Se realiza limpieza integral para su posterior venta o arriendo</p>
             </v-card>
           </v-col>
         </v-row>
         
    </v-container>
  </div>
  
</template>

<script>
// @ is an alias to /src
import Carr from "../components/Carrusel";
import {mapActions, mapState} from "vuex";

export default {
  name: 'Home',
  components: {
    Carr
  },
  async created(){    
    await this.getPropiedades();
    await this.getUF();
    console.log()
    
  },
  methods:{
     ...mapActions(['getPropiedades','getUF'])
  },
  computed:{
     ...mapState(['propiedades','UF'])
  }

}
</script>
