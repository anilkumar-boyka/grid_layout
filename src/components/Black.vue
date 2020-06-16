<template>
    <div class="black_grid">
            {{grid_no}}
    <!-- <span @click="messg" id="tooltip-target-1" class="open_nav"  variant="primary">
        &#x2022;&#x2022;&#x2022;
        </span>
        <b-tooltip target="tooltip-target-1" placement="bottomleft" triggers="hover">
            <span style="cursor:pointer; font-size:30px; color:black; background-color:white" v-b-tooltip.hover.left @click="openNav(grid_no)">Delete</span>
        </b-tooltip>              -->
        <span class="open_nav" @click="openNav(grid_no)">&#9776;</span>

      <div :id="grid_no" class="sidenav"> 
        <div class="closebtn" v-on:click="closeNav(grid_no)">&times;</div>
        <span @click="delete_grid(grid_no)">Delete</span>
      </div> 

    </div>
            
</template>

<script>
export default {
    name: "White",
    props: ["grid_no"],
    data (){
        return {
          msg : ''
        }
    },
     mounted() {
        // this.color_code = this.grid_no;
        console.log(this.grid_no)
        console.log("black")
    },
     methods : {
         openNav : function (grid_no) {
           console.log(typeof(grid_no))
        //    this.msg = input
        // this.$emit('delete',input)
        document.getElementById(grid_no).style.width = "150px";
      },
      closeNav :function (grid_no) {
        document.getElementById(grid_no).style.width = "0";
      },
      delete_grid: function (input) {
        this.$emit('delete',input)
      }
      
    }
}
</script>

<style scoped>
.black_grid {
    background-color: black;
    color: white;
    height: 100%;
}
.sidenav {
  height: 40%;
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
}
.open_nav {
  font-size:large;
  float:right;
  cursor:pointer;
  margin-right: 5px;
}

</style>