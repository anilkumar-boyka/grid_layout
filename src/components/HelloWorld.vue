<template>
  <div class="hello">
    <div class="head">
      <div :class={edit:edit} v-on:click="edit_mode()"><b-badge class="badge" variant="dark">Switch to Edit mode</b-badge></div>
      <div class="to_default">
        <span :class={defaultMode:defaultMode} v-on:click="default_mode()"><b-badge class="badge" variant="dark">Switch to Default mode</b-badge></span>
        </div>
       <b-container>
         <b-row>
           <b-col>
              <span class="add">
                <span :class={new_component:new_component} v-on:click="new_component_add()">
                  Add New Grid Component
                </span>
              </span> 
            </b-col>
            <b-col>
             <span v-if="delete_icon" v-on:click="delete_mode"><i class="fa fa-trash" aria-hidden="true"></i></span>
            </b-col> 
         </b-row>
       </b-container> 
      <div v-if="delete_info">
          Click on a Grid You Want to delete. Note - You cannot Resize and Drag Grid Layouts. To Enable click 
          <span class="cancel_delete" @click="cancel_delete">Cancel Delete</span>
      </div>
      <div :class={size:size}>
        <hr style="background-color : white;">
        <b-container>
          <b-row >
            <b-col cols="6">
             <b-form inline>
               <label for="inline-form-input-name">Enter Height :</label>
                <span class="input_values"><b-input v-model="height" placeholder="Enter Height"></b-input></span>
                <label for="inline-form-input-name">Enter Width :</label>
                <span class="input_values"><b-input v-model="width" placeholder ="Enter Width"></b-input></span>
             </b-form>  
            </b-col>
            <b-col>
              <span class="select_bg">Select Background Color:
                <span v-on:click="black_bg" class="black">
                  <span v-if="white_tick" class="white-tick">&#10003;</span>
                </span>
                <span v-on:click="white_bg" class="white" style="color:black">
                  <span v-if="black_tick" class="black-tick">&#10003;</span>
                </span>
              </span>
            </b-col>
            <b-col cols="2">
              <b-button variant="light"  size="lg" v-on:click="new_component_added()">Add</b-button>
              <b-button variant="light" size="lg" v-on:click="cancel"> Cancel</b-button>
            </b-col>
          </b-row>  
        </b-container>  
     </div> 
      
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
        <span class="delete_opeartion"  @click="delete_grid($event)">
        <grid-item  v-for="item in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i"
                   @resized="resizedEvent">
               <component :is="item.comp" :grid_no=item.i  />
               
        </grid-item></span>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import White from '@/components/White'
import Black from '@/components/Black'
export default {
  name: 'HelloWorld',
  components: {
            // ResponsiveGridLayout,
            GridLayout:VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            White : White,
            Black : Black
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
      drag : false,
      resize : false,
      black_code: '#000000',
      white_code : '#FFFFFF',
      delete_icon : 0,
      delete_info : 0,
      delete_operation : 0,
      delete_message: '',
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
      this.defaultMode = 0;
      this.edit = 1;
      this.new_component = 0;
      this.delete_icon = 1;
    },
    default_mode : function () {
      alert('You Switched to Default')
      this.drag = false;
      this.resize = false;
      this.defaultMode = 1;
      this.edit = 0;
      this.new_component = 1;
      this.delete_icon = 0;
      this.size = 1;
      this.height ='';
      this.width = '';
      this.delete_info = 0;
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
        this.new_values[0]=newW;
        console.log('new w resize i'+this.new_values)
        this.layout[0].w=this.new_values;
    },
    new_component_add : function () {
      this.size = 0;
      this.background_color_info = !this.background_color_info;
      this.delete_info = 0;
      this.drag = true;
      this.resize = true;
    },
    new_component_added: function () {
       if((this.height && this.width)&&(this.black_tick || this.white_tick )){
       this.identifier++;
       this.width = parseInt(this.width, 10);
       this.height = parseInt(this.height, 10);
       if(this.black_tick)
        this.x={"x":this.x_coordinate,"y":this.y_coordinate,"w":this.width,"h":this.height,"i":this.identifier,"comp":White}
       else
        this.x={"x":this.x_coordinate,"y":this.y_coordinate,"w":this.width,"h":this.height,"i":this.identifier,"comp":Black}
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
              
               this.x_coordinate = this.x_coordinate+2;
          }
          this.white_tick = 0;
          this.black_tick = 0;
        console.log(this.layout)
       
    },
    cancel : function () {
      this.size = !this.size;
      this.height ='';
      this.width = '';
      this.background_color_info = !this.background_color_info;
    },
    black_bg :function () {
      this.white_tick = 1;
      this.black_tick = 0; 
     
    },
    white_bg :function () {
      
      this.black_tick = 1;
      this.white_tick = 0;
    },
    delete_mode  :function () {
      this.size = 1;
      this.delete_info = 1;
      this.height ='';
      this.width = '';
      this.drag = false;
      this.resize = false;
      this.delete_operation = 1;
    },
    saveData : function () {
              
        //        const data = JSON.stringify(this.my_data)
        // window.localStorage.setItem('my_data', data);
        // console.log(JSON.parse(window.localStorage.getItem('my_data')))

    },
    delete_grid : function (input) {
      console.log(input)
      console.log(input.target.innerText)
      alert('this grid is getting deleted')
      this.layout.splice(input.target.innerText-1,1);
     
    },
    cancel_delete : function () {
      this.delete_info = 0;
      this.drag = true;
      this.resize = true;
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background-color: #dbdbdb;
}
.head {
  background-color:#888888;
  border-bottom: 1px solid #30475e;
  padding-bottom: 3px;
  color  :#f0f0f0;
  
}
.badge {
  font-size: 20px;
  cursor: pointer;
}
.edit_mode {
  color:white;
}
.defaultMode {
  display: none;
}
.to_default {
  text-align: right;
  padding: 0 15px;
}
.edit{
  display: none;
}
.add {
  display: inline-block;
  padding-bottom: 5px;
  font-weight: 900;
  cursor : pointer;
}
.select_bg {
  font-weight: 700;
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

.form-control {
  font-size: 13px;
  width : 100px;
  height : 30px;
}
.btn {
  font-size: large;
}
.input_values,label{
  margin-left: 3px;
}
.fa-trash {
  color : #f0f0f0;
  font-size: 40px;
  cursor: pointer;
}
.cancel_delete {
  cursor: pointer;
  background-color: #d9455f;
}
.delete_operation {
  display: inline-block;
  height: 100%;
  width : 100%;
}
</style>
