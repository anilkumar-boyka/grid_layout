<template>
    <div class="black_grid">
            {{grid_no}}
        <span v-if="delete_icon">
          <span class="delete_grid" @click="delete_grid(grid_no)">&times;</span>
        </span>
        <span v-for="content in contents">
          <component :is="content"></component>
        </span>
  </div>
            
</template>

<script>
import imageContent from '@/components/imageContent'
import textContent from '@/components/textContent'
export default {
  components : {
        imageContent:imageContent,
        textContent:textContent,
    },
    name: "Black",
    props: ["grid_no","delete_icon","grid_content"],
    data (){
        return {
          msg : '',
          contents : []
        }
    },
     methods : {
      delete_grid: function (input) {
        this.$emit('delete',input)
      },
    },
    mounted(){
        console.log(this.grid_content);
        console.log('black')
        this.contents.push(this.grid_content)
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