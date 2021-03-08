import Vue from 'vue'
import Vuex from 'vuex'
import {auth, db,firebase} from '../firebase'
import router from '../router'
import Axios from "axios";


Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    usuario:null,
    token:null,
    propiedades:[],
    propiedad:{
      Id:'',
      Direccion: '',
      Nombre: '',
      Ubicacion: '',
      Categoria: null,
      nrooms:null,
      nbano:null,
      m2:null,
      precio:null,
      fotos:[],
      timestamp: null
      
    },
    error:null,
    msg:{
      tipo:'',
      mensaje:''
    },
    UF:null,
    ubi:null,    
    
  },
  mutations: {
    setPropiedades(state, payload){
      state.propiedades = payload
    },
    setPropiedad(state,payload){
      state.propiedad= payload
    },
    setError(state, payload){
      state.error = payload
    },
    setUser(state,payload){
      state.usuario = payload
    },
    setToken(state,payload){
      state.token = payload
    },
    setMsg(state,payload){
      state.msg = payload
    },
    setUF(state,payload){
      state.UF = payload
    },
    setUbi(state,payload){
      state.ubi = payload
    }
  },
  actions: {
    async getUF({commit}){
      try {
          // const res = await fetch('https://mindicador.cl/api/uf')
          // const db = await res.json()
          // commit('setUF',db)
          let res = await Axios.get('https://mindicador.cl/api/uf');          
          let db = await res.data.serie[0].valor
          commit('setUF',db)
      } catch (error) {
        console.log(error)
      }
    },
    async getPropiedades({commit}){
      try {
        
        // const res = await fetch('https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades.json')
        // const db = await res.json()
        const res = await  Axios.get('https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades.json')
        const db = (res.data)
      
        const arrayDatos=[]

        for(let id in db){
          arrayDatos.push(db[id])
         }
        console.log(arrayDatos)
        commit('setPropiedades', arrayDatos)
      } catch (error) {
        console.log(error)
      }     
    
    },
    async getPropiedad({commit}, idProp){

      try {
        // const res = await fetch(`https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades/${idProp}.json`)
        // const db = await res.json()       
        // commit('setPropiedad',db)
        const res = await Axios.get(`https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades/${idProp}.json`);
        const db = await res.data;
        commit('setPropiedad',db)
      } catch (error) {
        console.log(error)
      }
            
    },
    async createPropiedad({commit}, propiety,state){   
      try {    
        let res = await Axios.put(`https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades/${propiety.Id}.json?auth=${this.state.token}`,{
          headers:{
                 'Content-Type':'application/json'
               },
          body: JSON.stringify(propiety)
        }).then(
          response=>{
            let status = response.status
            if (status===200) {
              commit('setMsg',{
                tipo:'success',
                mensaje:'Se ha agregado la propiedad con exito!'
              })
            }
          }
        ).catch(error => {
          alert("error")
          let errorStatus = error.response.status
        
          if (errorStatus === 401) {
            commit('setMsg',{
              tipo:'error',
              mensaje:'No se ha podido leer el Token, por favor vuelva a Autenticarse'
            })
          }
        }
          )        
        // commit('setMsg','Se ha agregado la propiedad con exito')

      } catch (error) {
        console.log('El error es' + error)
      }
    },
    async updatePropiedad({commit},propiety){
      try {
        const res = await Axios.patch(`https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades/${propiety.Id}.json?auth=${this.state.token}`,
          JSON.stringify(propiety)
        ).then(
          response=>{
            let status = response.status
            if (status===200) {
              commit('setMsg',{
                tipo:'success',
                mensaje:'Se ha modificado la propiedad con exito!'
              })
            }
          }
        ).catch(error => {
          let errorStatus = error.response.status
        
          if (errorStatus === 401) {
            commit('setMsg',{
              tipo:'error',
              mensaje:'No se ha podido leer el Token, por favor vuelva a Autenticarse'
            })
          }
        }
          ) 
      } catch (error) {
        console.log(error)
      }
    } 
    ,
    async accesoUsuario({commit},usuario){
      auth.signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(res=>{
        // console.log('Usuario logueado: ',res)
        const userLogeado ={
          email:res.user.email,
          uid: res.user.uid,          
        }
        
        firebase.auth().currentUser.getIdToken(true).then(
          function(idToken){
            const tk = String( idToken)
            // console.log(tk)
            commit('setToken',tk)
          }
        )        
        commit('setUser',userLogeado)
        router.push('/admin')
      }).catch(error => 
        {
          commit('setError', error)
        })

      // try {
      //   const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRK8Mon5N5sq8wjKwWWBYqIHFMBalGY0E',{
      //     method:'POST',
      //     body: JSON.stringify({
      //       email: usuario.email,
      //       password: usuario.password,
      //       returnSecureToken: true
      //     })
      //   })
      //   const data = await res.json()
      //   console.log(data)
      //   if (data.error) {
      //     return console.log(data.error)
      //   }
      //   commit('setUser',data)
      //   router.push('/admin')

      // } catch (error) {
      //   console.log(error)
      // }

    },
    cerrar(){
      auth.signOut().then(
        ()=>{
          router.push('/autenticador')
        }
      )
    },
    detectarUser({commit},usuario){
      commit('setUser',usuario)
    },
    async geoloc({commit}, param ){
      try {
        // const direccion = param
        // const direccionClean = direccion.replace(/\s/g,'+')
        // const res = await fetch('https://geocode.search.hereapi.com/v1/geocode?q='+direccionClean+'&apiKey=b0DUqFdYILt9iecy7LHmb24tbQYYSeP3kLYS4nkHjLE')
        // const json = await res.json()
        // const db=json.items[0].position

        let direccion = param;
        let direccionClean = direccion.replace(/\s/g,'+')
        let res = await Axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+direccionClean+'&apiKey=b0DUqFdYILt9iecy7LHmb24tbQYYSeP3kLYS4nkHjLE')
        let db=res.data.items[0].position;

        commit('setUbi',db)
      } catch (error) {
        console.log(error)
      }
    },
    clearPropiedad({commit}){
      try {
        let propiedadClean = {     Id:'',
        Direccion: '',
        Nombre: '',
        Ubicacion: '',
        Categoria: null,
        nrooms:null,
        nbano:null,
        m2:null,
        precio:null,
        fotos:[],
        timestamp: null}
        commit('setPropiedad',propiedadClean)
      } catch (error) {
        console.log(error)
      }
    },
    

  },
  getters:{
    existeUser(state){
      if (state.usuario != null) {
        return true
      }else{
        return false
      }
    },
  },
  modules: {

  }
})
