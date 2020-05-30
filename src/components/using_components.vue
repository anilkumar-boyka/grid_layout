<template>
  <div class="hello">
    <div class="head">
      <div :class={edit:edit} v-on:click="edit_mode()"><b-badge class="badge" variant="dark">Switch to Edit mode</b-badge></div>
      <div class="to_default">
        <span :class={defaultMode:defaultMode} v-on:click="default_mode()"><b-badge class="badge" variant="dark">Switch to Default mode</b-badge></span>
        </div>
      <span class="add">
        <span :class={new_component:new_component} v-on:click="new_component_add()">Add New Grid Component</span>
        </span> 
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
              <span class="select_bg" v-if=background_color_info>Select Background Color:
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
    <Black :grid_data=black_data></Black>
    <!-- <White :layout_data=white_data></White> -->
     
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import Black from '@/components/Black.vue'
import White from '@/components/White.vue'
export default {
  name: 'HelloWorld',
  components: {
            // ResponsiveGridLayout,
            GridLayout:VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            Black : Black,
            White : White
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
      black_data :[],
      white_data : [],
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

      this.size = !this.size;
      this.height ='';
      this.width = '';
      this.background_color_info = !this.background_color_info;
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
      //  if(this.height && this.bg_color_b || this.bg_color_w ){
      //  this.identifier++;
      //  this.width = parseInt(this.width, 10);
      //  this.height = parseInt(this.height, 10);
      //  this.x={"x":this.x_coordinate,"y":this.y_coordinate,"w":this.width,"h":this.height,"i":this.identifier}
      //  this.layout.push(this.x);
      //  this.height ='';
      //  this.width = '';
      //  }
      //  else {
      //    alert('Set Height,Width and Background Color')
      //  }
      //  if(this.x_coordinate/5>0 && this.x_coordinate%5==0)
      //     {
      //       this.y_coordinate = this.y_coordinate+3;
      //       this.x_coordinate = 0;
      //     }
      //     else{
              
      //          this.x_coordinate = this.x_coordinate+2;
      //     }
         if((this.height && this.width ) &&(this.bg_color_b || this.bg_color_w )){ 
            this.identifier++;
             this.width = parseInt(this.width, 10);
             this.height = parseInt(this.height, 10);
            if(this.white_tick == true) {
              console.log(typeof(this.height))
              this.black_data.push({"x":0,"y":0,"h":this.height,"w":this.width,"i":this.identifier});
              this.height ='';
              this.width = '';
            }
            else if(this.black_tick == true)
            {
            console.log('selected color is white')
            this.white_data.push({"x":0,"y":0,"h":this.height,"w":this.width,"i":this.identifier})
            this.height ='';
            this.width = '';
            }
         }
         else {
           alert("Set Height,Width and Background Color")
         }
       
     
      
      
       
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
      //  if(this.white_tick == true) 
      //     console.log('selected color is black')
        
      // else if(this.black_tick == true)
      
       
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
  },
  yo : function () {
    alert('hello')
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
  cursor: pointer;
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
.bg_color_black {
  background-color: black;
}
.bg_color_white {
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
.fa {
 
}
</style>
