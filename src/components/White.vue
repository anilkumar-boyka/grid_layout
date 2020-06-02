<template>
    <div class="white_grid">
            {{grid_no}}
    </div>
            
</template>

<script>
export default {
    name: "White",
    props: ["grid_no"],
    data () {
        return {
            color_code : '',
        }
    },
    mounted() {
        this.color_code = this.grid_no;
        console.log(this.color_code)
        console.log("white")
    }
}
</script>

<style scoped>
.white_grid {
    background-color: white;
    color: black;
    height: 100%;
}

</style>