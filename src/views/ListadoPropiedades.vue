<template>
  <v-container >
      <v-row>
          <!-- Buscador y filtrado -->         
          <v-col cols="3">
              <v-card>
                  <v-card-text>
                      <p class="py-3 text-h6 text-center indigo darken-2 white--text">
                          <v-icon color="white" class="mb-1">mdi-magnify</v-icon>
                           Buscador</p>
                           <v-btn block color="indigo lighten-2 white--text" @click.prevent="limpiar()">Limpiar</v-btn>
                  </v-card-text>
                  <v-card-text>
                      <v-form @submit.prevent="">
                            <v-select  :items="Categoria"    v-model="Filtro.Categoria"      label="Categoria" outlined></v-select>
                            <v-select :items="TPropiedad"    v-model="Filtro.TPropiedad"     label="Tipo propiedad" outlined></v-select>
                            <v-autocomplete :items="comunas"  v-model="Filtro.Comuna" label="Comuna" outlined ></v-autocomplete>
                            <v-select :items="NDormitorios"  v-model="Filtro.NDormitorios" label="Número de dormitorios" outlined></v-select>
                      <v-slider
                        label="Precio mínimo"
                        v-model="Filtro.minUF"
                        step="500"
                        min="0"
                        max="100000"
                        ticks
                        thumb-label
                        color="indigo lighten-1">
                       </v-slider>
                      <v-slider
                        label="Precio máximo"
                        v-model="Filtro.maxUF"
                        step="500"
                        min="0"
                        max="100000"
                        ticks
                        thumb-label
                        color="indigo lighten-1">
                       </v-slider>
                       <v-btn block color="indigo lighten-2 white--text" @click.prevent="filtros()">Buscar</v-btn>
                      </v-form>
                  </v-card-text>
              </v-card>
          </v-col>
          <!-- Propiedades  -->
          <v-col cols="9">
              <v-card v-for="(i,index) in filtrado" :key="index">
                  <v-row>
                      <v-col cols="5">
                          <img :src="i.fotos[0]" height="200px" width="60%" class="ml-10">
                      </v-col>
                      <v-col cols="7">
                          <v-card-text>
                              <p class="text-h5 ma-0">{{i.Nombre}}</p>
                              <p class="text-h6  ma-0 red--text darken-4" >{{i.precio}} UF</p>
                              <p class="text-h6 ma-0 grey--text darken-1">{{i.comuna}}</p>
                              <v-btn :to="{name:'Propiedad', params:{id:i.Id}}" class="mt-3" color="indigo darken-2 white--text">Ficha</v-btn>
                          </v-card-text>
                      </v-col>
                  </v-row>
              </v-card>
          </v-col>
         <v-spacer></v-spacer>
      </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import datos from "../../public/apiRegion.json";
export default {
    name:'ListadoPropiedades',
    data(){
        return{
            respaldo:[],
            filtrado:[],
            Filtro:{Categoria:'',
                    TPropiedad:'',
                    Comuna:'',
                    NDormitorios:'',
                    minUF:0,
                    maxUF:100000
                    },
            comunas:[],
            Categoria:['Arriendo','Venta'],
            TPropiedad:['Casa','Terreno','Departamento'],
            NDormitorios:[1,2,3,4,5,6]

        }
    },
    computed:{
        ...mapState(['propiedades'])
    },
    methods:{
        ...mapActions(['getPropiedades']),
        filtros(){
            // let array = this.respaldo
            // let filt = array.filter(
            //     (obj)=>{
            //         if (obj.comuna === this.Filtro.Comuna || obj.Categoria === this.Filtro.Categoria) {
            //             return obj
            //         }                                 
            //     }
            // )
            // this.filtrado = filt;
            let array = this.respaldo
            let filt = array.filter(
                (obj) =>{
                    switch(true){
                        case this.Filtro.Categoria==='' && this.Filtro.TPropiedad==='' && this.Filtro.Comuna==='' && this.Filtro.NDormitorios==='':
                            console.log('1')
                             if (obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria!='' && this.Filtro.TPropiedad==='' && this.Filtro.Comuna==='' && this.Filtro.NDormitorios==='':
                            console.log('2')
                             if (obj.Categoria === this.Filtro.Categoria && obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria==='' && this.Filtro.TPropiedad !='' && this.Filtro.Comuna==='' && this.Filtro.NDormitorios==='':
                            console.log('3')
                             if (obj.Tpropiedad === this.Filtro.TPropiedad && obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria==='' && this.Filtro.TPropiedad==='' && this.Filtro.Comuna!='' && this.Filtro.NDormitorios==='':
                            console.log('4')
                            if (obj.comuna === this.Filtro.Comuna && obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria==='' && this.Filtro.TPropiedad==='' && this.Filtro.Comuna==='' && this.Filtro.NDormitorios !='':
                            console.log('5')
                             if (obj.nrooms >= this.Filtro.NDormitorios && obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria==='' && this.Filtro.TPropiedad!='' && this.Filtro.Comuna!='' && this.Filtro.NDormitorios==='':
                            console.log('6')
                            if (obj.comuna === this.Filtro.Comuna && obj.Tpropiedad === this.Filtro.TPropiedad &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria==='' && this.Filtro.TPropiedad!='' && this.Filtro.Comuna==='' && this.Filtro.NDormitorios!='':
                            console.log('7')
                             if (obj.nrooms >= this.Filtro.NDormitorios && obj.Tpropiedad === this.Filtro.TPropiedad &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria==='' && this.Filtro.TPropiedad==='' && this.Filtro.Comuna!='' && this.Filtro.NDormitorios!='':
                            console.log('8')
                             if (obj.comuna === this.Filtro.Comuna && obj.nrooms >= this.Filtro.NDormitorios  &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria!='' && this.Filtro.TPropiedad==='' && this.Filtro.Comuna!='' && this.Filtro.NDormitorios==='':
                            console.log('9')
                            if (obj.comuna === this.Filtro.Comuna && obj.Categoria === this.Filtro.Categoria  &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria!='' && this.Filtro.TPropiedad!='' && this.Filtro.Comuna==='' && this.Filtro.NDormitorios==='':
                            console.log('10')
                             if (obj.Tpropiedad === this.Filtro.TPropiedad && obj.Categoria === this.Filtro.Categoria  &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria!='' && this.Filtro.TPropiedad==='' && this.Filtro.Comuna==='' && this.Filtro.NDormitorios!='':
                            console.log('11')
                            if (obj.nrooms >= this.Filtro.NDormitorios && obj.Categoria === this.Filtro.Categoria  &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria!='' && this.Filtro.TPropiedad!='' && this.Filtro.Comuna!='' && this.Filtro.NDormitorios==='':
                            console.log('12')
                             if (obj.Tpropiedad === this.Filtro.TPropiedad && obj.comuna === this.Filtro.Comuna &&obj.Categoria === this.Filtro.Categoria  &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria!='' && this.Filtro.TPropiedad==='' && this.Filtro.Comuna!='' && this.Filtro.NDormitorios!='':
                            console.log('13')
                             if (obj.nrooms >= this.Filtro.NDormitorios && obj.comuna === this.Filtro.Comuna && obj.Categoria === this.Filtro.Categoria  &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria!='' && this.Filtro.TPropiedad!='' && this.Filtro.Comuna==='' && this.Filtro.NDormitorios!='':
                            console.log('14')
                            if (obj.nrooms >= this.Filtro.NDormitorios && obj.Tpropiedad === this.Filtro.TPropiedad && obj.Categoria === this.Filtro.Categoria  &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria==='' && this.Filtro.TPropiedad!='' && this.Filtro.Comuna!='' && this.Filtro.NDormitorios!='':
                            console.log('15')
                             if (obj.nrooms >= this.Filtro.NDormitorios && obj.Tpropiedad === this.Filtro.TPropiedad && obj.comuna === this.Filtro.Comuna  &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }
                            break;
                        case this.Filtro.Categoria!='' && this.Filtro.TPropiedad!='' && this.Filtro.Comuna!='' && this.Filtro.NDormitorios!='':
                            console.log('16')  
                             if (obj.nrooms >= this.Filtro.NDormitorios && obj.Categoria === this.Filtro.Categoria && obj.Tpropiedad === this.Filtro.TPropiedad && obj.comuna === this.Filtro.Comuna  &&  obj.precio >= this.Filtro.minUF && obj.precio <= this.Filtro.maxUF) {
                                return obj
                            }  
                            break;

                    }              
                   
                }

            )
            this.filtrado = filt;
        },
        limpiar(){
            this.filtrado = this.respaldo;
            this.Filtro= {Categoria:'',
                    TPropiedad:'',
                    Comuna:'',
                    NDormitorios:'',
                    minUF:0,
                    maxUF:100000
                    }
        },
        cargarComunas(){
            let data = datos.comunas

            data.forEach(element =>{
                this.comunas.push(element.name)
            });
        }
    },
    created(){
        this.cargarComunas();
        this.getPropiedades();
        this.respaldo= this.propiedades; 
        this.filtrado= this.propiedades;
    }
}
</script>

<style scoped>
img{
    width:"100%";
    max-height:"200px";
}
</style>