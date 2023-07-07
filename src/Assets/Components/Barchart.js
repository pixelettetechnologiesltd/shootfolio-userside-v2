import Chart from "react-apexcharts";
import React, {useState} from 'react'
const Barchart = () => {
    const [state]= useState({
        series: [{
            data: [44, 55, 41, 64, 22, 43, 21]
          }, {
            data: [53, 32, 33, 52, 13, 44, 32]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 430
            },
            plotOptions: {
              bar: {
                // horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            },
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            tooltip: {
              shared: true,
              intersect: false
            },
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jly", "Aug", "Sep"],
            },
          },
    })
    return (
            

        <div id="chart">
    <Chart options={state.options} series={state.series} type="bar" height={430} />
  </div>
        );
    }

export default Barchart