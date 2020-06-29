<template>
 <div>
     <span>{{grid_no}}</span>
          <span v-if="delete_icon">
             <span class="delete_grid" @click="delete_grid(grid_no)">&times;</span> 
          </span>
     <div><img v-bind:src=grid_content alt="egyanam logo" width="50px" height="50px" ></div>
 </div>
    
</template>
<script>
export default {
    name : "imageContent",
    props: ["grid_no","delete_icon","grid_content"],
     methods : {
        delete_grid : function (input) {
           this.msg= input
           console.log("i is"+input)
           this.$emit('delete',input)
        },
     },
     mounted(){
      //   alert("hello")
        console.log(typeof(this.grid_content))
     }
}

</script>
<style scoped>
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