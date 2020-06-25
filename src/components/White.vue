<template>
    <div >
          <div>{{grid_no}}</div>
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
    name: "White",
    props: ["grid_no","delete_icon","grid_content"],
    data () {
        return {
            color_code : '',
            msg : '',
            contents : []
        }
    },
    methods : {
        delete_grid : function (input) {
           this.msg= input
           console.log("i is"+input)
           this.$emit('delete',input)
        },
    },
    mounted(){
        console.log(this.grid_content);
        this.contents.push(this.grid_content)
    }
}
</script>

<style scoped>
.white_grid {
    background-color: white;
    color: black;
    height: 100%;
}
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