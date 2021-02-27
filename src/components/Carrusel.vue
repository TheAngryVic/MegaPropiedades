<template>
  <v-carousel >
    <v-carousel-item
      v-for="(foto, i) in Fotos"
      :key="i"
      :src="foto"
    > 
    <v-img :src="foto[i]">
      </v-img>    
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    props:{
      Fotos:Array
    },
    data: () => ({
      // model: 0,
      // colors: [
      //   'primary',
      //   'secondary',
      //   'yellow darken-2',
      //   'red',
      //   'orange',
      // ],
      
    }),
  }
</script>
