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
                  </v-card-text>
                  <v-card-text>
                      <v-form @submit.prevent="">
                             <v-select
                          :items="Categoria"
                          v-model="Filtro.Categoria"
                          label="Categoria"
                          outlined
                      ></v-select>
                      <v-select
                          :items="TPropiedad"
                          v-model="Filtro.TPropiedad"
                          label="Tipo propiedad"
                          outlined
                      ></v-select>
                      <v-select
                          :items="TPropiedad"
                          v-model="Filtro.Comuna"
                          label="Comuna"
                          outlined
                      ></v-select>
                      <v-select
                          :items="NDormitorios"
                          v-model="Filtro.NDormitorios"
                          label="Número de dormitorios"
                          outlined
                      ></v-select>
                      <v-slider
                        label="Precio mínimo"
                        v-model="Filtro.minUF"
                        step="500"
                        min="0"
                        max="10000"
                        ticks
                        thumb-label
                        color="indigo lighten-1">
                       </v-slider>
                      <v-slider
                        label="Precio máximo"
                        v-model="Filtro.maxUF"
                        step="500"
                        min="0"
                        max="10000"
                        ticks
                        thumb-label
                        color="indigo lighten-1">
                       </v-slider>
                       <v-btn block color="indigo lighten-2 white--text">Buscar</v-btn>
                      </v-form>
                  </v-card-text>
              </v-card>
          </v-col>
          <!-- Propiedades  -->
          <v-col cols="9">
              <v-card>
                  <v-row>
                      <v-col cols="5">
                          imagen
                      </v-col>
                      <v-col cols="7">LALLA</v-col>
                  </v-row>
              </v-card>
          </v-col>
         <v-spacer></v-spacer>
      </v-row>
  </v-container>
</template>

<script>
export default {
    name:'ListadoPropiedades',
    data(){
        return{
            Filtro:{Categoria:'',
                    TPropiedad:'',
                    Comuna:'',
                    NDormitorios:'',
                    minUF:0,
                    maxUF:0
                    },
            Categoria:['Arriendo','Compra'],
            TPropiedad:['Casa','Terreno','Departamento'],
            NDormitorios:['1 dormitorio o más',
                        '2 dormitorio o más',
                        '3 dormitorio o más',
                        '4 dormitorio o más',
                        '5 dormitorio o más',
                        '6 dormitorio o más']

        }
    }
}
</script>

