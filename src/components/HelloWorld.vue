<template>
  <div class="hello"> <span v-on:click="saveData()">save data</span>
    <div :class={edit:edit} v-on:click="edit_mode()">switch to Edit mode</div>
    <span :class={defaultMode:defaultMode} v-on:click="default_mode()">switch to Default</span>
    <span :class={new_component:new_component} v-on:click="new_component_add()">Add New Grid Component</span>
    <div :class={size:size}>Enter Height : <input v-model="height" placeholder="Enter Height">
      Enter Width : <input v-model="width" placeholder ="Enter Width">
      <button v-on:click="new_component_added()"> Add</button> 
      <button v-on:click="cancel"> Cancel</button>
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
            
    >
 
        <grid-item class="yo" v-for="item in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i"
                   @resized="resizedEvent">
            {{item.i}}
        </grid-item>
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
      identifier: 19,
      size : 1,
      my_data :"Learning how to write in a file." ,
      layout : [
        {"x":0,"y":0,"w":1,"h":2,"i":"0"},
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
  mounted(){
    //  var vm=this;
      // vm.w_value = 5;
      console.log(this.w_value)
      console.log(this.layout[0].w);
      this.layout[0].w = this.new_values[0];
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
    },
    new_component_added: function () {
    console.log('yo')
       this.identifier++;
       this.width = parseInt(this.width, 10);
       this.height = parseInt(this.height, 10);
       this.x={"x":0,"y":0,"w":this.width,"h":this.height,"i":this.identifier}
       this.layout.push(this.x);
       this.height ='';
       this.width = '';
    },
    cancel : function () {
      this.size = !this.size;
      this.height ='';
      this.width = '';
    },
    saveData : function () {
       alert('yo')
      //  var blob = new Blob([{"name ":"save Grid Layout data here 123456"}],
      //           { type: "text/plain;charset=utf-8" });
      //           saveAs(blob, "data.json");
              
        //        const data = JSON.stringify(this.arr)
        // window.localStorage.setItem('arr', data);
        // console.log(JSON.parse(window.localStorage.getItem('arr')))
        var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
        var jsonObj = JSON.parse(jsonData);
        console.log(jsonObj);
        var jsonContent = JSON.stringify(jsonObj);
        console.log(jsonContent);
         const users = require("./data.json");
         const users2 = require("./newData.json");
        console.log(users) 
        
        name = JSON.stringify(name);
        console.log(users2)          
        fs.writeFile("./output.json",jsonContent, 'utf8',(err) => {
                if(err)
                console.log(err) 
                else
               { 
                //  console.log(data)
                 console.log('data written successfull')
               }
        }) 

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
</style>
