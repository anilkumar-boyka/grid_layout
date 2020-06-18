<template>
    <div class="black_grid">
            {{grid_no}}
        <span v-if="delete_icon">
          <span class="delete_grid" @click="delete_grid(grid_no)">&times;</span>
        </span>
  </div>
            
</template>

<script>
export default {
    name: "White",
    props: ["grid_no","delete_icon"],
    data (){
        return {
          msg : ''
        }
    },
     methods : {
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
.delete_grid {
  font-size:large;
  float:right;
  cursor:pointer;
  margin-right: 5px;
}

</style>