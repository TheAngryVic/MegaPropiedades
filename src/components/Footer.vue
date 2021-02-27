<template>
  <v-footer padless>
      <v-card flat width="100%" tile class="indigo lighten-1 white--text text-center" >
          <v-card-text>             
                  <v-btn v-for="(i,index) in icons" :key="index" icon class="mx-3">
                  <!-- v-for="l in links" :key="l" -->
                  <a :href="links[index]" ><v-icon x-large color="white" >{{i}}</v-icon></a>
              </v-btn>             
          </v-card-text>
          <v-card-text class="white--text">
              Licencias: Los vectores utilizados en esta página son de libre uso comercial, pero requiere atribución al creador. <br>
              Vectores creador por makyzz <span> <a href="https://www.freepik.es/makyzz" ><v-icon large color="white" >mdi-vector-square</v-icon></a></span>
          </v-card-text>
          <v-divider class="white"></v-divider>
          <v-card-text class="white--text">
              {{new Date().getFullYear()}}
          </v-card-text>
      </v-card>
  </v-footer>
</template>

<script>
export default {
    name:'Footer',
    data(){
        return{          
            icons:[                
                'mdi-facebook',                
                'mdi-instagram',
                'mdi-whatsapp'],
            links:[
                'https://www.facebook.com/megapropiedades.cl',
                'https://www.instagram.com/megapropiedades.cl/',
                'https://wa.link/0rkxmc'
            ]         
            
        }
    }

}
</script>

