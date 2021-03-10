<template>
 <v-container grid-list-xs>
   <p class="text-h3 text-center indigo--text lighten-4" >Agregar propiedad</p>    
        <form class="mt-3" @submit.prevent="procesarFormulario(propiedad)">
          <v-alert  outlined :type="this.msg.tipo"   text :value="alert">
            {{this.msg.mensaje}}
          </v-alert> 
          <div>

          </div>
          <Formulario botonText="Agregar Propiedad" :propiedad="propiedad" />         
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="12" md="4" class="my-5" >
              <v-card text-xs-center>
                <v-card-text>
                  <v-file-input
                    multiple
                    truncate-length="15"
                    filled
                    prepend-icon="mdi-camera"
                    label="Fotografias de la propiedad"
                    @change="buscarImagenes"
                    ></v-file-input>            
                  <v-btn color="blue lighten-2" block @click="subirImagenes" :loading="loading" :disabled="file === null">Subir imagen</v-btn>                 
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
          </v-row>
        </form>  
 </v-container>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import {firebase, auth,storage} from "../firebase";
import Formulario from "../components/Form";
import Swal from 'vue-sweetalert2'

const shortid = require('shortid');

export default {
  name:'Administracion',
  computed:{
    ...mapState(['usuario','token','error','msg','ubi']),
    bloquear(){
      if (this.files) {
        return false
      }
      return true
    }
  },
  data(){
    return{
      propiedad:{
        Id:'',    
        Direccion: '',
        Nombre: '',
        Ubicacion: '',
        Categoria: null,
        nrooms:null,
        nbano:null,
        m2:null,
        timestamp: null,        
        descripcion:null,
        comuna:null,
        Tpropiedad:null,
        fotos:[],
      },
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
  methods:{
    ...mapActions(['createPropiedad','geoloc']),
    async procesarFormulario(){
      //validaciones y tal
      // console.log(this.usuario.uid)

      //Se genera una id con shortid
      this.propiedad.Id = shortid.generate()

      //Se genera el timestamp
      let d  = new Date(Date.now());
      d.toString();
      this.propiedad.timestamp = d;

      //Se llama a la accion de la Store pasandole propiedad
      // console.log(this.propiedad)
      try {
        await this.geoloc(this.propiedad.Direccion);
        this.propiedad.Ubicacion = this.ubi
        
      } catch (error) {
        console.log(error)
      }
      // console.log(this.propiedad)
      try {
        await this.createPropiedad(this.propiedad);     
      } catch (error) {
        
      }

      this.alert= true
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
    async subirImagenes(){
      try {
        this.loading = true
        for (let i = 0; i < this.file.length; i++) {
          const refImg = storage.ref().child(this.propiedad.Id).child('Fotografias de propiedad').child(this.file[i].name)
          const res = await refImg.put(this.file[i])
          console.log(res)
          
          const urlDescarga = await refImg.getDownloadURL()
          
          this.propiedad.fotos.push(urlDescarga)
          try {
            const res = await  fetch(`https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades/${this.propiedad.Id}.json?auth=${this.token}`,{
              method:'PATCH',
              body: JSON.stringify(this.propiedad)
            })
            
          } catch (error) {
            console.log(error)
          }
        }   
        this.msF = 'Fotos subidas correctamente '
        this.alert2 = true
        this.clean()  
      } catch (error) {
        console.log(error)
      }
      finally{
        this.loading = false;
      }
    },   
    clean(){
        this.propiedad= {
     Id:'',    
        Direccion: '',
        Nombre: '',
        Ubicacion: '',
        Categoria: null,
        nrooms:null,
        nbano:null,
        m2:null,
        timestamp: null,        
        descripcion:null,
        fotos:[],
      }, 
      this.file=null,
      this.alert=false,
      this.alert2=false,
      this.msF= null
    },    

  },
 
}
</script>


