<template>
    <div class="white_grid">
            {{grid_no}}

           <span class="delete_grid" @click="delete_grid(grid_no)">&times;</span> 
      <!-- <div class="delete">delete</div> -->
      <!-- <div>yo</div> -->
      <!-- <span id="tooltip-target-1" class="open_nav" v-b-tooltip.bottomleft.html="'<em @click=messg>hello</em>'"
  tabindex="2" variant="primary"> -->
  <!-- <span @click="messg" :id="'tooltip-target-'+grid_no" class="open_nav"  variant="primary">
        &#x2022;&#x2022;&#x2022;
        </span>
        <b-tooltip :target="'tooltip-target-'+grid_no" placement="bottomleft" triggers="hover" :id="grid_no">
            <span style="cursor:pointer; font-size:30px"  v-b-tooltip.hover.left @click="delete_grid(grid_no)">Delete</span>
        </b-tooltip> -->
      <!-- <div id="mySidenav" class="sidenav">
       <div class="closebtn" v-on:click="closeNav()">&times;</div>
        <a href="#">Delete</a>
      </div> -->
      <!-- <b-button v-b-tooltip.hover.left="'Tooltip!'" variant="primary">Left</b-button> -->
<!-- <span style="color:blue;" v-on:click="messg">{{msg}}</span> -->
<!-- {{msg}}yo -->
    </div>
            
</template>

<script>
export default {
    name: "White",
    props: ["grid_no"],
    data () {
        return {
            color_code : '',
            msg : '',
            tipData: { title: 'Tooltip <span v-on:click="messg()">Message</span>' },
        }
    },
    mounted() {
        this.color_code = this.grid_no;
        console.log(this.color_code)
        console.log("white")
        console.log(this.grid_no)
    },
    methods : {
          delete_grid : function (input) {
           this.msg= input
           console.log("i is"+input)
           this.$emit('delete',input)
      },
      // closeNav :function () {
      //   document.getElementById("mySidenav").style.width = "0";
      // },
      // messg : function () {
      //   alert('yo')
      //   this.msg = this.grid_no;
      // }
      
    }
}
</script>

<style scoped>
.white_grid {
    background-color: white;
    color: black;
    height: 100%;
}
/* .sidenav {
  height: 30%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn { 
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 26px;
  margin-left: 50px;
  cursor: pointer;
  color: #f1f1f1;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}*/
.delete_grid {
  font-size:large;
  float:right;
  cursor:pointer;
  margin-right: 10px;
} 
.delete {
  float: right;
}


</style>