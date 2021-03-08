<template>
  <div>
      <div ref="map"  style="height:600px;width:100%"></div>
  </div>
</template>

<script>
export default {
    name:'map',
    data(){
        return{
            platform:{},
            map:{},
                        
        }
    },
    props:{
        latitude:Number,
        longitude:Number
    }
    ,created(){
        this.platform = new H.service.Platform({
            "apikey": "zEzni2iEQelZdNgxjBjIAEivxNVcPQEUlKQLUYWhf5s"
        });
    },
    mounted(){
        this.map = new H.Map(
            this.$refs.map,
            this.platform.createDefaultLayers().vector.normal.map,{
                zoom: 17,
                center: {lat: this.latitude, lng:this.longitude}
            }
        );
    },
    methods:{
        dropMarker(center){
            let marker = new H.Map.Marker({lat:center.lat, lng:center.lng});
            this.map.addObject(marker);
        }
    }
}
</script>

<style>

</style>