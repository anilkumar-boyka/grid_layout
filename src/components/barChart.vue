<template>

    <div class="myChart">
        <Chart :chart-data="datacollection"></Chart>
    </div>
</template>

<script>
import Chart from "./barChart-config.js";
export default {
    components: {
        Chart
      },
      props: ["grid_no","delete_icon","grid_content","dataset"],
      data() {
        return {
            datacollection: null,
            mydata : null
        };
    },
    mounted(){
        this.fillData();
        console.log(this.dataset)
    },
    methods: {
        fillData : function() {
          var vm=this;
          var label_data= [];
          var x_axis_data= [];
            fetch('http://localhost:3003/'+this.dataset)
                .then(response => response.json())
                .then(data => {
                  for(var i=0;i<10;i++){
                   label_data.push(Object.keys(data.data)[i])
                   x_axis_data.push(Object.values(data.data)[i])
                  }
                  // console.log(cdata)
                  vm.datacollection = {
                  labels: 
                    label_data
                  ,
                  datasets: [
                    {
                      label: data.title,
                      // backgroundColor: "#f87979",
                      data: 
                      // [84123,432,Object.values(data.data)[2],Object.values(data.data)[3],Object.values(data.data)[4],Object.values(data.data)[5],Object.values(data.data)[6],Object.values(data.data)[6],Object.values(data.data)[8],Object.values(data.data)[9]],
                      x_axis_data,
                     borderWidth: 5,
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                
                        ],
                        borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
                          // backgroundColor: [
                            
                          // ],
                    },
                  ]
                }})
                
            
        },
        }
    }


</script>
<style scoped>
.mychart {
  background-color:azure;
}
</style>