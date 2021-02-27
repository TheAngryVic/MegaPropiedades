import Vue from 'vue'
import Vuex from 'vuex'
import {auth, db,firebase} from '../firebase'
import router from '../router'

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
    msg:null,
    UF:null
    
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
    }
  },
  actions: {
    async getUF({commit}){
      try {
          const res = await fetch('https://mindicador.cl/api/uf')
          const db = await res.json()
          commit('setUF',db)
      } catch (error) {
        console.log(error)
      }
    },
    async getPropiedades({commit}){
      try {
        
        const res = await fetch('https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades.json')
        const db = await res.json()
        const arrayDatos=[]

        for(let id in db){
          arrayDatos.push(db[id])
        }
        // console.log(arrayDatos)
        commit('setPropiedades', arrayDatos)
      } catch (error) {
        console.log(error)
      }     
    
    },
    async getPropiedad({commit}, idProp){

      try {
        const res = await fetch(`https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades/${idProp}.json`)
        const db = await res.json()
        commit('setPropiedad',db)
      } catch (error) {
        console.log(error)
      }
      // db.collection('Propiedades').doc(idProp).get().then(
      //   doc =>{
      //     console.log(doc.id)
      //     console.log(doc.data())
      //     let propiedad = doc.data()
      //     propiedad.id = doc.id
      //     commit('setPropiedad',propiedad)
      //   }        
      // )
      
    },
    async createPropiedad({commit}, propiety,state){
      // db.collection('Propiedades').add({       
      //   Direccion: propiety.direccion,
      //   Nombre: propiety.nombre,
      //   Ubicacion: propiety.ubicacion
      // }).then(doc=>{
      //   console.log(doc.id)        
      // })
      
      try {
        const res = await fetch(`https://mega-8e8b9-default-rtdb.firebaseio.com/propiedades/${propiety.Id}.json?auth=${this.state.token}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(propiety)
        })

        const dataDB = await res.json()
        console.log(dataDB)
        commit('setMsg','Se ha agregado la propiedad con exito')

      } catch (error) {
        commit('setError',error)
      }
    },
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
