<template>
  <div class="hello">
    <div :class={edit:edit} v-on:click="edit_mode()">switch to Edit mode</div>
    <div :class={defaultMode:defaultMode} v-on:click="default_mode()">switch to Default</div>
     <grid-layout
            :layout.sync="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable=drag
            :is-resizable=resize
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
            :static="true"
            :maxW="10"
    >
 
        <grid-item class="yo" v-for="item in layout"
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
  name: 'HelloWorld',
  components: {
            // ResponsiveGridLayout,
            GridLayout:VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem
        },
  data () {
    return {
      drag:false,
      resize:false,
      defaultMode : 1,
      edit : 0,
      layout : [
        {"x":0,"y":0,"w":2,"h":2,"i":"0"},
        {"x":2,"y":0,"w":2,"h":4,"i":"1"},
        {"x":4,"y":0,"w":2,"h":5,"i":"2"},
        {"x":6,"y":0,"w":2,"h":3,"i":"3"},
        {"x":8,"y":0,"w":2,"h":3,"i":"4"},
        {"x":10,"y":0,"w":2,"h":3,"i":"5"},
        {"x":0,"y":5,"w":2,"h":5,"i":"6"},
        {"x":2,"y":5,"w":2,"h":5,"i":"7"},
        {"x":4,"y":5,"w":2,"h":5,"i":"8"},
        {"x":6,"y":3,"w":2,"h":4,"i":"9"},
        {"x":8,"y":4,"w":2,"h":4,"i":"10"},
        {"x":10,"y":4,"w":2,"h":4,"i":"11"},
        {"x":0,"y":10,"w":2,"h":5,"i":"12"},
        {"x":2,"y":10,"w":2,"h":5,"i":"13"},
        {"x":4,"y":8,"w":2,"h":4,"i":"14"},
        {"x":6,"y":8,"w":2,"h":4,"i":"15"},
        {"x":8,"y":10,"w":2,"h":5,"i":"16"},
        {"x":10,"y":4,"w":2,"h":2,"i":"17"},
        {"x":0,"y":9,"w":2,"h":3,"i":"18"},
        {"x":2,"y":6,"w":2,"h":2,"i":"19"}
      ]
    }
  },
  methods : {
    edit_mode : function () {
      this.drag = true;
      this.resize = true;
      this.defaultMode = !this.defaultMode;
      this.edit = !this.edit;
    },
    default_mode : function () {
      this.drag = false;
      this.resize = false;
      this.defaultMode = !this.defaultMode;
      this.edit = !this.edit;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background-color: black;
}
.yo {
  background-color: white;
}
.edit_mode {
  color:white;
}
.defaultMode {
  display: none;
}
.edit{
  display: none;
}
</style>
