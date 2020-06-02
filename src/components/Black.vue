<template>
    <div class="black_grid">
            {{grid_no}}
    </div>
            
</template>

<script>
export default {
    name: "White",
    props: ["grid_no"],
    data (){
        return {

        }
    },
     mounted() {
        // this.color_code = this.grid_no;
        console.log(this.grid_no)
        console.log("black")
    }
}
</script>

<style scoped>
.black_grid {
    background-color: black;
    color: white;
    height: 100%;
}

</style>