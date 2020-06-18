<template>
    <div class="white_grid">
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
    data () {
        return {
            color_code : '',
            msg : '',
            tipData: { title: 'Tooltip <span v-on:click="messg()">Message</span>' },
        }
    },
    methods : {
        delete_grid : function (input) {
           this.msg= input
           console.log("i is"+input)
           this.$emit('delete',input)
        },
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