<template>
    <div>{{grid_data}}
        <grid-layout 
            :layout.sync="grid_data"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
            :static="true"
            :maxW="10"
           
            @layout-before-update="layoutbeforeupdate"
            >
        <grid-item class="grid_bg" v-for ="item in grid_data"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i">
            <div class="grid_identifier">{{item.i}}</div>       
        </grid-item>
    </grid-layout>
    </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
export default {
    name: 'Black.vue',
    props : ['grid_data','no'],
    components: {
            GridLayout:VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
        },
    data () {
        return {
            layout : [],
        }
    },
    updated(){
        //  console.log('hello')
        console.log(this.grid_data[0].w);
        console.log(this.grid_data[0].h);
        // this.layout.push(this.grid_data);
        // console.log(this.layout);
    },
    methods : {
    //     layoutCreatedEvent: function(newLayout){
    //   console.log("Created layout: ", newLayout)
    // },
    // layoutBeforeMountEvent: function(newLayout){
    //   console.log("beforeMount layout: ", newLayout)
    // },
    // layoutMountedEvent: function(newLayout){
    //   console.log("Mounted layout: ", newLayout)
    // },
    // layoutReadyEvent: function(newLayout){
    //   console.log("Ready layout: ", newLayout)
    // },
    layoutbeforeupdate: function(newLayout){
      console.log("before Updated layout: ", newLayout)
    }
         
    }
}
</script>
<style scoped>
 .grid_bg {
     background-color: black;
 }

 .grid_identifier {
     background-color: blue;
     height : 100%;
 }

</style>