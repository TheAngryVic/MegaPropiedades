import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from "../firebase";

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component:() => import('../views/Home.vue')
    },
    {
      path: '/about',
      name: 'About',   
      component: () => import('../views/About.vue')
      
    },
    {
      path: '/admin',
      name: 'Administracion',   
      component: () => import('../views/Administrador.vue'),
      meta: { requiresAuth: true }
      
    },
    {
      path: '/edit/:id',
      name: 'Editar',   
      component: () => import('../views/Editar.vue')
      
    },
    {
      path: '/propiedad/:id',
      name: 'Propiedad',   
      component: () => import('../views/Propiedad.vue')
      
    },
    {
      path: '/autenticador',
      name: 'Autenticar',   
      component: () => import('../views/Autenticar.vue')
      
    },
    {
      path: '/listado',
      name: 'ListadoPropiedades',   
      component: () => import('../views/ListadoPropiedades.vue')
      
    },
  
    
  ]
})

router.beforeEach((to, from, next) =>{

  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    const usuario = auth.currentUser;    

    if (!usuario) {
      next({path:'/autenticador'})
    }
    else{
      next()
    }

    next()

  } else {
    next()
  }
})


export default router;
