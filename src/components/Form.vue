<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="4" class="mt-10" >
        <v-text-field         
          label="Dirección" outlined
          v-model="propiedad.Direccion" > </v-text-field>
        <v-text-field         
          label="Nombre de Propiedad" outlined
          v-model="propiedad.Nombre" ></v-text-field>
        <v-radio-group row v-model="propiedad.Categoria" >        
          <v-radio label="Arriendo" color="deep-purple  lighten-2" value="Arriendo"></v-radio>
          <v-radio label="Venta" color="deep-purple  lighten-2" value="Venta"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" sm="12" md="4" >     
        <v-text-field
          name="Numero de Dormitorios"
          label="Numero de Dormitorios"
          type="number"
          min="0"
          v-model.number="propiedad.nrooms"        
        ></v-text-field>
        <v-text-field
          name="Numero de Baños"
          label="Numero de Baños"
          type="number"
          min="0"
          v-model.number="propiedad.nbano"        
        ></v-text-field>
        <v-text-field
          name="Metros cuadrados"
          label="Metros cuadrados"
          type="number"
          min="0"
          suffix="m2"
          v-model.number="propiedad.m2"        
        ></v-text-field>
        <v-text-field
        name="Precio"
        label="Precio"
        type="number"
        min="0"
        suffix="UF"
        v-model.number="propiedad.precio"        
        ></v-text-field>      
          
      </v-col>
      <v-col cols="12" sm="12" md="4" > 
        <v-textarea class="mt-10"
        label="Descripcion"
        auto-grow
        outlined
        rows="3"
        row-height="15"
        v-model="propiedad.descripcion">

        </v-textarea>
      </v-col>
      <v-btn type="submit" :disabled="bloquear" block color="success">Agregar</v-btn>  
    </v-row>
  </v-container>
</template>

<script>
export default {
  props:{
    propiedad:Object,
  },
  computed:{
    bloquear(){
      if(!this.propiedad.Direccion){
        return true
      }
      if(!this.propiedad.Nombre){
        return true
      }
      if(!this.propiedad.Categoria){
        return true
      }
      if(!this.propiedad.nrooms){
        return true
      }
      if(!this.propiedad.nbano){
        return true
      }
      if(!this.propiedad.m2){
        return true
      }
      if(!this.propiedad.precio){
        return true
      }
      if(!this.propiedad.descripcion){
        return true
      }
      return false
    }
  },
 
  
}
</script>
