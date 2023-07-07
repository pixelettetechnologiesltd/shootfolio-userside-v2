import React, {useState} from 'react'
import Chart from "react-apexcharts";

const Piechart = () => {
    const [state, setState]= useState({
        series: [44, 55, 13, 43, 22],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 288
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      
    })
    return (
            

        <div id="chart">
    <Chart options={state.options} series={state.series} type="pie" width={500} />
  </div>
            );
          }


export default Piechart