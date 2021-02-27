<template>
  <div>
      <p class="text-h3 indigo--text my-3 text-center">Autenticacion de Administrador</p>
      <v-container grid-list-xs>
          <v-form @submit.prevent="accesoUsuario({email:email,password:pass})">
              <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="12" md="4" >
                      <!-- //Email -->
                     <v-text-field
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        hint="Debe ser un email valido"
                        label="E-mail"
                     ></v-text-field>
                     <!-- //pass -->
                    <v-text-field
                        v-model="pass"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show ? 'text' : 'password'"
                        name="input-10-1"
                        label="Contraseña"
                        hint="Mínimo 6 carácteres"
                        counter
                        @click:append="show = !show"
                    ></v-text-field>                   
                    <v-btn type="submit" rounded block class="my-3" color="indigo white--text" dark>Ingresar</v-btn>
                    <v-alert type="error" :value="errorMensaje">
                    {{error}}
                    </v-alert>               
                  </v-col>
                    
                  <v-spacer></v-spacer>
              </v-row>
          </v-form>     
      </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name:'Autenticar',
    data(){
        return{
            email:'vguerra06537@gmail.com',
            pass:'123123',
            show: false,
            rules:{
                requeried: value => !!value || 'Requerido',
                min: v => v.length >= 6 || 'Minimo 6 carácteres',               
                email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'E-mail invalido' }
            
            }
        }        
    },    
    computed:{
         errorMensaje: function(){
            return this.error != null ? true : false
        },
        ...mapState(['error']),
       

    }
    ,methods:{
        ...mapActions(['accesoUsuario'])
    }   
   
}
</script>

