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
      <transition name="fade">
        <div v-if="delete_info">
          <hr style="background-color : white;">
          <span>Click on a Grid you want to Delete. </span>
          <span class="note">Note - You cannot Resize and Drag Grid Layouts. To Enable click</span>
            <b-button variant="outline-danger" class="cancel_button" @click="cancel_delete">
              Cancel Delete
            </b-button>
          
        </div>
      </transition>
      <transition name="fade">
        <div v-if="size">
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
                    <transition name="fade"><span v-if="white_tick" class="white-tick">&#10003;</span></transition>
                  </span>
                  <span v-on:click="white_bg" class="white" style="color:black">
                    <transition name="fade"><span v-if="black_tick" class="black-tick">&#10003;</span></transition>
                  </span>
                </span>
              </b-col>
              <b-col cols="2">
                <b-button class="add_btn" variant="light"  size="lg" v-on:click="new_component_added()">Add</b-button>
                <b-button class="add_btn" variant="light" size="lg" v-on:click="cancel"> Cancel</b-button>
              </b-col>
            </b-row>  
          </b-container>  
        </div> 
      </transition>
      
    </div>
     <div>
       <!-- Modals  -->
    <!-- <div>
        <b-button v-b-modal.modal-1>Launch demo modal</b-button>
        <b-modal id="modal-1" title="BootstrapVue">
          <p class="my-4">Hello from modal!</p>
        </b-modal>
    </div> -->
    <!-- <div class="mb-1">
     <b-button @click="show_delete_modal_value">Confirm Delete</b-button>
     Return value: {{ String(delete_modal_value) }}
    </div> -->
    <div>
    <!-- <b-button id="show-btn" @click="showModal">Confirm Delete</b-button> -->
    <!-- <b-button id="toggle-btn" @click="toggleModal">Toggle Modal</b-button> -->

    <b-modal ref="my-modal" hide-footer title="Confirm Delete" centered: true>
      <div class="d-block text-center">
        <h3>Do you really want to Delete?</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal($event)">Delete</b-button>
      <b-button class="mt-2" variant="outline-primary" block @click="toggleModal">Cancel</b-button>
    </b-modal>
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
        
        <grid-item  v-for="item in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i"
                   @resized="resizedEvent">
             <component :is="item.comp" :grid_no=item.i v-on:delete="delete_grid"></component>
               
        </grid-item>
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
      size : 0,
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
      delete_event_enable : 0,
      delete_modal_value : '',
      selected_grid_to_delete : '',
      layout : [

      ]
    }
  },
  mounted(){
    if(this.mounte)
    alert("hello");
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
      this.size = 0;
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
      this.size = 1;
      this.background_color_info = !this.background_color_info;
      this.delete_info = 0;
      this.drag = true;
      this.resize = true;
      this.delete_event_enable = 0;
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
      this.size = 0;
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
      this.size = 0;
      this.delete_info = 1;
      this.height ='';
      this.width = '';
      this.drag = false;
      this.resize = false;
      this.delete_operation = 1;
      this.delete_event_enable = 1;
      this.open_delete_nav ='';
    },
    saveData : function () {
              
        //        const data = JSON.stringify(this.my_data)
        // window.localStorage.setItem('my_data', data);
        // console.log(JSON.parse(window.localStorage.getItem('my_data')))

    },
    delete_grid : function (input) {
      // if(this.delete_event_enable == 1)
      this.showModal(input);

      console.log("rcvd grid is"+input)
     
    },
    cancel_delete : function () {
      this.delete_info = 0;
      this.drag = true;
      this.resize = true;
      this.delete_event_enable = 0;
    },

    show_delete_modal_value() {
        this.delete_modal_value = '';
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete grid', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })       
          .then(value => {
            setTimeout(function(){ document.getElementsByClassName("show")[0].classList.remove("fade")}, 3000);
            document.getElementsByClassName("show")[0].classList.remove("fade")
            // console.log(value
            // this.delete_modal_value= value;
          })
          .catch(err => {
            console.log(err)
          })
          
          
        
      
      },
      showModal(input) {
        this.selected_grid_to_delete = input;
        setTimeout(function(){ document.getElementsByClassName("show")[0].classList.remove("fade") }, 200);
        this.$refs['my-modal'].show()
      
         
      },
      hideModal() {
        this.$refs['my-modal'].hide()
        console.log(this.selected_grid_to_delete)
        // if(this.delete_event_enable == 1){
        // console.log(input.target.innerText)
        // alert('this grid is getting deleted')
        var idx = this.layout.findIndex(item => item.i == this.selected_grid_to_delete)
        this.layout.splice(idx,1);
        // this.layout.splice(this.selected_grid_to_delete-1,1);
      // }
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
      },
     
    
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
.add_btn {
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
  color : white;
}
/* .fade {
  background-color: #d9455f;
  padding: 5px;
} */
.delete_operation {
  display: inline-block;
  height: 100%;
  width : 100%;
}
.cancel_button {
  color : white;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.modal-dialog {
   top : 30%;
   -webkit-transform: translate(-50%, -50%);
-moz-transform: translate(-50%, -50%);
-ms-transform: translate(-50%, -50%);
-o-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


</style>