<template>
    <div>{{layout_data}}
        <grid-layout 
            :layout.sync="layout_data"
            :col-num="12"
            :row-height="30"
            :is-draggable=drag
            :is-resizable=resize
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
            :static="true"
            :maxW="10">
        <grid-item class="grid_bg" v-for ="item in layout_data"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i">
            {{item.i}}        
        </grid-item>
    </grid-layout>
    </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
export default {
    name: 'Black.vue',
    props : ['layout_data','no'],
    components: {
            GridLayout:VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
        },
    data () {
        return {
            layout : [],
        }
    },
    mounted(){
         console.log('hello')
        console.log(this.layout_data);
        // this.layout.push(this.grid_data);
        // console.log(this.layout);
    }
}
</script>
<style scoped>
 .grid_bg {
     background-color: white;
     color: black;
 }

</style>