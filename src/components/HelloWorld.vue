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
                <span :class={new_component:new_component} v-b-modal.open v-on:click="new_component_add()">
                  Add New Grid Component
                </span>
              </span> 
            </b-col>
            <!-- <b-col>
              <span>Select Grid Content :</span>
              <select v-model="selected" class="radio_btn">
                <option v-for="option in options" v-bind:value="option.value">
                  {{ option.text }}
                </option>
              </select><span>Selected: {{ selected }}</span>
            </b-col>  -->
         </b-row>
       </b-container> 
      <!-- <transition name="fade">
        <div v-if="delete_info">
          <hr style="background-color : white;">
          <span>Click on a Grid you want to Delete. </span>
          <span class="note">Note - You cannot Resize and Drag Grid Layouts. To Enable click</span>
            <b-button variant="outline-danger" class="cancel_button" @click="cancel_delete">
              Cancel Delete
            </b-button>
          
        </div>
      </transition> -->
      <!-- <transition name="fade">
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
      </transition> -->
      
    </div> 
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
    <b-modal ref="my-modal" hide-footer title="Confirm Delete" centered: true>
      <div class="d-block text-center">
        <h3>Do you really want to Delete?</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal($event)">Delete</b-button>
      <b-button class="mt-2" variant="outline-primary" block @click="toggleModal">Cancel</b-button>
    </b-modal>
  </div>
  <!-- new -->
  <!-- <div>
    <b-button v-b-modal.open>Open Modal</b-button>

    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames">{{ name }}</li>
      </ul>
    </div>
  </div> -->
  <b-modal
      id="open"
      ref="modal"
      title="Select Grid height,width and content"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form inline>
        <label class="sr-only" for="inline-form-input-height">Username</label>
        <b-input
        label="yo"
      id="inline-form-input-height"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Enter Height"
      v-model="height"
    ></b-input>
    <b-input
      id="inline-form-input-width"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Enter Width"
      v-model="width"
    ></b-input>
<!-- <select v-model="selected" class="radio_btn">
                <option v-for="option in options" v-bind:value="option.value">
                  {{ option.text }}
                </option>
              </select><span>Selected: {{ selected }}</span> -->
              <b-form-select v-model="selected" :options="options" size="lg">
              </b-form-select>

      </b-form>
      </form>
      <!-- <b-form v-if="selected!==null" class="mt-3">
        <label class="url" v-if="selected=='imageContent'">Enter Image Url : </label>
        <label class="url" v-else-if="selected=='textContent'">Enter Text :</label>
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
        class="w-50 p-3"
          id="input-1"
          v-model="grid_content_input"
          type="text"
          placeholder="Enter here"
          required
        ></b-form-input>
      </b-form-group>
      </b-form> -->
      <b-form-select v-model="selected_dataset" :options="dataset_options" size="lg" class="mt-3">
              </b-form-select>
    <div v-if="modal_warning" class="text-danger" style="font-size: 14px;padding-top:3px;"> Please set all input fields!</div>
    </b-modal>
      <grid-layout
            :layout.sync="layout"
            :col-num="12"
            :row-height="20"
            :is-draggable=drag
            :is-resizable=resize
            :is-mirrored="false"
            :prevent-collision="true"
            
           
      >
        <grid-item class="grid" v-for="item in layout" ref="grid_height" :id="item.i"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i"
                   @resized="resizedEvent"
                   @container-resized="containerResizedEvent"
                   @layout-updated="layoutUpdatedEvent">
             <!-- <component :is="item.comp" :grid_no=item.i :delete_icon="show_delete_icon" v-on:delete="delete_grid" :grid_content ="selected"></component> -->
             <component :is="item.comp" :grid_no=item.i :delete_icon="show_delete_icon" v-on:delete="delete_grid" :grid_content="item.grid_content" :dataset="item.dataset" ref="charts"></component>       
        </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
// import White from '@/components/White'
// import Black from '@/components/Black'
// import imageContent from '@/components/imageContent'
// import textContent from '@/components/textContent'
import barChart from '@/components/barChart.vue'
import pieChart from '@/components/pieChart.vue'
import grid from "./grid"

export default {
  name: 'HelloWorld',
  components: {
            // ResponsiveGridLayout,
            GridLayout:VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            // White : White,
            // Black : Black,
            // imageContent:imageContent,
            // textContent:textContent,
            pieChart : pieChart,
            barChart : barChart
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
      show_delete_icon : 1,
      grid_content : 1,
      layout : [

      ],
      selected: null,
      options: [
        { value: null, text: 'Select Chart Component' },
        { text: 'Bar Chart', value: 'barChart' },
        { text: 'Pie Chart', value: 'pieChart' },
      ],
      selected_dataset : null,
      dataset_options: [
        { text: 'Select Dataset',value: null, },
        { text: 'Dataset 1', value: 'sen' },
        { text: 'Dataset 2', value: 'ten' },
      ],
      name: '',
        nameState: null,
        submittedNames: [],
        modal_warning : 0,
        grid_content_input :'',
        resized_height : '',
        windowHeight: null,
        windowWidth: null,
        g_height : 1,
        set_grid_width : null,
        idi :1,
        min_h:10,
        min_w : 6
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
      this.show_delete_icon = 1;
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
      this.show_delete_icon = 0;
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
        // this.resized_height = newHPx;
        // console.log(this.resized_height);
        // this.$emit('resize', 7);
        // console.log(this.$refs.imageContent.yo);
        // if(newH < 6 || newW  <4)
        // {
        //   newHPx = 470;
        //   newW = 4; 
        // }
          //  console.log(this.$refs.charts[0].yo);
           this.$refs.charts[i-1].yo(newWPx,newHPx);
          //  this.g_height=newWPx/10-6;
           console.log("gh is"+this.g_height)
           console.log("i is"+i)
           //set vue grid-item height according to width
           document.getElementById("1").style.height ="300px";
          //  x=newW+"px"
          //  console.log(x)
           document.getElementById("1").style.backgroundColor ="blue"; 

    },
    new_component_add : function () {
      setTimeout(function(){ document.getElementsByClassName("show")[0].classList.remove("fade") }, 200);
      this.size = 1;
      this.background_color_info = !this.background_color_info;
      this.delete_info = 0;
      this.drag = true;
      this.resize = true;
      this.delete_event_enable = 0;
    },
    // new_component_added: function () {
    //    if((this.height && this.width)&&(this.black_tick || this.white_tick )){
    //    this.identifier++;
    //    this.width = parseInt(this.width, 10);
    //    this.height = parseInt(this.height, 10);
    //    if(this.black_tick)
    //     this.x={"x":this.x_coordinate,"y":this.y_coordinate,"w":this.width,"h":this.height,"i":this.identifier,"content":White,}
    //    else
    //     this.x={"x":this.x_coordinate,"y":this.y_coordinate,"w":this.width,"h":this.height,"i":this.identifier,"comp":Black}
    //   this.layout.push(this.x);
    //    this.height ='';
    //    this.width = '';
    //    }
    //    else {
    //      alert('Set Height,Width and Background Color')
    //    }
    //    if(this.x_coordinate/5>0 && this.x_coordinate%5==0)
    //       {
    //         this.y_coordinate = this.y_coordinate+3;
    //         this.x_coordinate = 0;
    //       }
    //       else{
              
    //            this.x_coordinate = this.x_coordinate+2;
    //       }
    //       this.white_tick = 0;
    //       this.black_tick = 0;
    //     console.log(this.layout)
       
    // },
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
              alert("yo")
        //        const data = JSON.stringify(this.my_data)
        // window.localStorage.setItem('my_data', data);
        // console.log(JSON.parse(window.localStorage.getItem('my_data')))

    },
    delete_grid : function (input) {
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
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        // alert('reset modal')
      },
      handleOk(bvModalEvt) {
      if(this.height && this.width && this.selected &&this.selected_dataset)  
      {
        //to set initialize height and width value
          
        // if(this.height < 10 || this.width  <6)
        // {
        //   this.height = 10;
        //   this.width = 6; 
        // } 
        // else{
        //   this.height=this.height+1;
        // }
    
        this.identifier++;
        this.width = parseInt(this.width, 10);
        this.height = parseInt(this.height, 10);
        if(this.selected =='barChart')
        this.x={"x":this.x_coordinate,"y":this.y_coordinate,"w":this.width,"h":this.height,"i":this.identifier,"comp":barChart,"grid_content":this.grid_content_input,"dataset":this.selected_dataset,"resize" : this.resized_height}
        else if(this.selected =='pieChart')
        this.x={"x":this.x_coordinate,"y":this.y_coordinate,"w":this.width,"h":this.height,"i":this.identifier,"comp":pieChart,"grid_content":this.grid_content_input,"dataset":this.selected_dataset}
        this.layout.push(this.x);
        this.height ='';
        this.width = '';
        if(this.x_coordinate/5>0 && this.x_coordinate%5==0)
            {
              this.y_coordinate = this.y_coordinate+3;
              this.x_coordinate = 0;
            }
            else{
                
                this.x_coordinate = this.x_coordinate+2;
            }
            this.modal_warning = 0;
            this.grid_content_input ='';
            // console.log(this.$refs.grid_height[0].$el.clientWidth)
      }
      // this.handleSubmit()
      else {
        this.modal_warning =1;
        // if(this.modal_warning)
        bvModalEvt.preventDefault()
      }
      },
      containerResizedEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("CONTAINER RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
          // this.g_height=newW+3;
      },
      layoutUpdatedEvent: function(newLayout){
      console.log("Updated layout: ", newLayout)
    },
      myEventHandler(e) {
        // console.log(e.currentTarget.innerHeight)
        // console.log(e.currentTarget.innerWidth)
        // this.windowHeight = e.currentTarget.innerHeight-65;
        // this.windowWidth = e.currentTarget.innerWidth;
        console.log(this.$refs.grid_height[0].$el.clientWidth)
        console.log(this.$refs.grid_height)
  }
     
    
  },
  created() {
    // console.log(window.innerHeight);
    // console.log(this.ref.grid_height)
    // this.windowHeight = window.innerHeight-65;
    // this.windowWidth = window.innerWidth;
  window.addEventListener("resize", this.myEventHandler);
  // alert('hello')
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  // computed: {
  //           rowHeight() {
  //               return ((this.windowHeight-this.numberOfRows*10-10) / this.numberOfRows); 
  //           },
          
  //       },
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
.grid {
 background-color: black;
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
.radio_btn {
  background-color: black;
  color:blanchedalmond
}
.btn-primary{
  font-size: 20px;
}
.url {
  font-size: larger;
}

</style>





//  :vertical-compact="true"
//             :margin="[10, 10]"
//             :use-css-transforms="true"
//             :static="true"
//             :maxW="10"
//             :is-responsive ="true"
//             :cols="{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }"