<template>
 <div id="image" @click="resize">
     <span>{{grid_no}}</span>
          <span v-if="delete_icon">
             <span class="delete_grid" @click="delete_grid(grid_no)">&times;</span> 
          </span>
     <div><img  v-bind:src=grid_content alt="egyanam logo" ></div> 
 </div>
    
</template>
<script>
export default {
    name : "imageContent",
    props: ["grid_no","delete_icon","grid_content","height"],
     methods : {
        delete_grid : function (input) {
           this.msg= input
           console.log("i is"+input)
           this.$emit('delete',input)
        },
      yo: function(value) {
      //   this.value = value;
      alert("hello")
    },
     resize : function() {
        console.log(document.getElementById('image').clientHeight)
     }
     },
     mounted(){
      //   alert("hello")
        console.log('resizing'+this.height)
     },
   //   updated() {
   //      alert('hello')
   //   }
   //   created: {
   //     setValue: function() {
   //       alert("hello")
   //       }
   //   }
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
img{
   height : auto;
   width : 100%;
   object-fit:contain;
   
}

</style>