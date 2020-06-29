<template>
    <div>
        <span>{{grid_no}}</span>
        <span v-if="delete_icon">
             <span class="delete_grid" @click="delete_grid(grid_no)">&times;</span> 
          </span>
          <div>{{grid_content}}</div>
    </div>
</template>
<script>
export default {
    name : "textContent",
    props: ["grid_no","delete_icon","grid_content"],
     methods : {
        delete_grid : function (input) {
           this.msg= input
           console.log("i is"+input)
           this.$emit('delete',input)
        },
        
    },
    
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