<template>
  <div>
      <h1 class="text-center">Editar {{propiedad.Direccion}}</h1>
     <Formulario :propiedad="propiedad" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Formulario from "../components/Form";

export default {
    name:'Editar',
    data(){
        return{
            id: this.$route.params.id
        }
    },
    components:{
        Formulario
    },
    created(){
        this.getPropiedad(this.id)
    },
    methods:{
        ...mapActions(['getPropiedad'])
    },
    computed:{
        ...mapState(['propiedad'])
    }
}
</script>

