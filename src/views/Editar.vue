<template>
 <v-container grid-list-xs>
     <p class="text-h4 text-center indigo--text lighten-4">Editar {{propiedad.Direccion}}</p>
     <form class="mt-3" @submit.prevent="procesarForm()">
         <!-- Alertas -->
         <v-alert  outlined :type="this.msg.tipo"   text :value="alert">
            {{this.msg.mensaje}}
          </v-alert> 
         <!-- Formulario -->
         <Formulario botonText="Modificar Propiedad" :propiedad="propiedad" />

        <!-- Eliminar fotos y subir nuevas -->
          <!-- <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="12" md="4" class="my-5" >
              <v-card text-xs-center class="mt-10">
                <v-card-text>
                    <p class="text-h4 text-center indigo--text lighten-4">Fotos</p>
                    <v-btn block color="red white--text" @click="borrarImagenes" dark>Eliminar fotografias</v-btn>
                </v-card-text>
                <v-card-text>
                <v-file-input
                    multiple
                    truncate-length="15"
                    filled
                    prepend-icon="mdi-camera"
                    label="Fotografias de la propiedad"
                    @change="buscarImagenes"
                 ></v-file-input>            
                 <v-btn color="blue lighten-2" block  :loading="loading" :disabled="file === null">Subir imagen</v-btn>                 
                </v-card-text>
                <v-alert type="success"  :value="alert2">
                  {{msF}}
                </v-alert>
                <v-card-text v-if="file">
                  <h4 v-for="(f,index) in this.file" :key="index">
                    {{file[index].name}}
                    </h4>                
                </v-card-text>
              </v-card>
            </v-col>
            <v-spacer></v-spacer>
          </v-row> -->

     </form>
 </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Formulario from "../components/Form";
import {firebase, auth,storage} from "../firebase";

export default {
    name:'Editar',
    data(){
        return{
            id: this.$route.params.id,          
            file:null,
            alert:false,
            alert2:false,
            msF:null,
            loading:null,
            comunasSantiago:[]   

        }
    },
    components:{
        Formulario
    },
    created(){
        this.getPropiedad(this.id)
    },
    methods:{
        ...mapActions(['getPropiedad','updatePropiedad']),
    procesarForm(){
        try {
        this.updatePropiedad(this.propiedad)        
        } catch (error) {
            console.log(erorr)
        }
        finally{
            this.alert = true
        }
    },
    buscarImagenes(files){

      this.file=[];
      console.log(files[0]);
      files.forEach(element => {
        this.file.push(element)
      });
      const reader = new FileReader();        
     

        // reader.readAsDataURL(this.file[0]);
        // reader.onload=(e)=>{
        //   console.log(e.target.result)
        // }
    },
    // async subirImagenes(){
    //   try {
    //     this.loading = true
    //     for (let i = 0; i < this.file.length; i++) {
    //       const refImg = storage.ref().child(this.propiedad.Id).child('Fotografias de propiedad').child(this.file[i].name)
    //       const res = await refImg.put(this.file[i])
    //       console.log(res)
          
    //       const urlDescarga = await refImg.getDownloadURL()
          
    //       this.propiedad.fotos.push(urlDescarga)
    //       try {
    //         const res = await  fetch(`https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades/${this.propiedad.Id}.json?auth=${this.token}`,{
    //           method:'PATCH',
    //           body: JSON.stringify(this.propiedad)
    //         })
            
    //       } catch (error) {
    //         console.log(error)
    //       }
    //     }   
    //     this.msF = 'Fotos subidas correctamente '
    //     this.alert2 = true
    //     this.clean()  
    //   } catch (error) {
    //     console.log(error)
    //   }
    //   finally{
    //     this.loading = false;
    //   }
    // }, 
    // async borrarImagenes(){
    //     try {
    //         const refImg = storage.ref().child(this.propiedad.Id);
    //         const res = await refImg.delete().then(
    //             response=>{
    //                 console.log(response)
    //             }
    //         )
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    },
    computed:{
        ...mapState(['propiedad','msg'])
    }
}
</script>

