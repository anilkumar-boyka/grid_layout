<template>
  <div class="hello">
     <!-- <span v-on:click="saveData()">save data</span> -->
    <div :class={edit:edit} v-on:click="edit_mode()">switch to Edit mode</div>
    <span :class={defaultMode:defaultMode} v-on:click="default_mode()">switch to Default</span>
    <span :class={new_component:new_component} v-on:click="new_component_add()">Add New Grid Component</span>
    <div :class={size:size}>Enter Height : <input v-model="height" placeholder="Enter Height">
      Enter Width : <input v-model="width" placeholder ="Enter Width">
      <button v-on:click="new_component_added()"> Add</button> 
      <button v-on:click="cancel"> Cancel</button>
      <span v-if=background_color_info>Select Background Color
        <span v-on:click="black_bg" class="black"><span v-if="white_tick" class="white-tick">&#10003;</span></span>
        <span v-on:click="white_bg" class="white" style="color:black"><span v-if="black_tick" class="black-tick">&#10003;</span></span>
      </span>
    </div>
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
            :prevent-collision="true"
            
    >
        <span v-on:click="grid_click($event)">
        <grid-item :class={bg_color_black:bg_color_b,bg_color_white:bg_color_w} v-for="item in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i"
                   @resized="resizedEvent">
            <span style="color:#888888">{{item.i}}</span>
            <div class="popup" v-on:click="myFunction()">
              <span class="popuptext" id="myPopup">Delete selected Grid</span>
            </div>
        </grid-item></span>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import { saveAs } from 'file-saver';  
import fs from 'browserify-fs';
// const writeJsonFile = require('write-json-file');
// import {write} from 'write-json-file'
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
      w_value : null,
      new_values : [2],
      new_component: 1,
      x : '',
      height : null,
      width : null,
      x_coordinate : 0,
      y_coordinate : 0,
      identifier: 0,
      size : 1,
      my_data :{name:"Anil",age : 23},
      background_color_info : 0,
      black_tick : 0,
      white_tick : 0,
      bg_color_b : 0,
      bg_color_w : 0,
      layout : [

      ]
    }
  },
  mounted(){
    //  var vm=this;
      // vm.w_value = 5;
      // console.log(this.w_value)
      // console.log(this.layout[0].w);
      // this.layout[0].w = this.new_values[0];
  },
  methods : {
    edit_mode : function () {
      alert('You Switched to edit Mode')
      this.drag = true;
      this.resize = true;
      this.defaultMode = !this.defaultMode;
      this.edit = !this.edit;
      this.new_component = !this.new_component;
    },
    default_mode : function () {
      alert('You Switched to Default')
      this.drag = false;
      this.resize = false;
      this.defaultMode = !this.defaultMode;
      this.edit = !this.edit;
      this.new_component = !this.new_component;
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
        this.new_values[0]=newW;
        console.log('new w resize i'+this.new_values)
        this.layout[0].w=this.new_values;
    },
    new_component_add : function () {
    console.log('yo')
      this.size = !this.size;
      this.background_color_info = !this.background_color_info;
    },
    new_component_added: function () {
       if(this.height && this.bg_color_b || this.bg_color_w ){
       this.identifier++;
       this.width = parseInt(this.width, 10);
       this.height = parseInt(this.height, 10);
       this.x={"x":this.x_coordinate,"y":this.y_coordinate,"w":this.width,"h":this.height,"i":this.identifier}
       this.layout.push(this.x);
       this.height ='';
       this.width = '';
       }
       else {
         alert('Set Height,Width and Background Color')
       }
       if(this.x_coordinate/5>0 && this.x_coordinate%5==0)
          {
            this.y_coordinate = this.y_coordinate+3;
            this.x_coordinate = 0;
          }
          else{
              //  alert('hello')
               this.x_coordinate = this.x_coordinate+2;
          }
          // this.x_coordinate = this.x_coordinate+2;
       
    },
    cancel : function () {
      this.size = !this.size;
      this.height ='';
      this.width = '';
      this.background_color_info = !this.background_color_info;
    },
    black_bg :function () {
     if(!this.black_tick && !this.white_tick){
       this.white_tick = !this.white_tick;
     }
    //  else if(!this.black_tick && this.white_tick) {
    //    this.black_tick = !this.black_tick;
    //    this.white_tick = !this.white_tick;
    //  }
     else if(this.black_tick && !this.white_tick){
       this.black_tick = !this.black_tick;
       this.white_tick = !this.white_tick;
     } 
     console.log('white tick'+this.white_tick)
       console.log('black tick'+this.black_tick)
       console.log('next')
       if(this.bg_color_w)
       this.bg_color_w = !this.bg_color_w;
       this.bg_color_b = this.white_tick;
       
     
    },
    white_bg :function () {
      if(!this.black_tick && !this.white_tick){
       this.black_tick = !this.black_tick;
     }
     else if(!this.black_tick && this.white_tick) {
       this.black_tick = !this.black_tick;
       this.white_tick = !this.white_tick;
     }
       console.log('white tick'+this.white_tick)
       console.log('black tick'+this.black_tick)
       
       this.bg_color_w = this.black_tick;
    },
    grid_click : function (input) {
         console.log(input.target.innerText)
         var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    },
    saveData : function () {
              
        //        const data = JSON.stringify(this.my_data)
        // window.localStorage.setItem('my_data', data);
        console.log(JSON.parse(window.localStorage.getItem('my_data')))

    },
    // myFunction : function () {
    //   var popup = document.getElementById("myPopup");
    //     popup.classList.toggle("show");
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background-color: #888888;
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
.new_component {
  margin-left : 20px;
  display: none;
}
.size {
  position: relative;
  z-index : 1;
  display: none;
}
input {
  width: 130px;
  color : grey;
}
button {
  margin-left: 10px;
  color: grey;
}
.black {
  height: 20px;
  width : 20px;
  display: inline-block;
  background-color: black;
}
.white {
  height: 20px;
  width : 20px;
  display: inline-block;
  background-color: white;
}
.bg_color_black {
  background-color: black;
}
.bg_color_white {
  background-color: white;
}
.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual popup */
.popup .popuptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {opacity: 0;} 
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}
</style>
