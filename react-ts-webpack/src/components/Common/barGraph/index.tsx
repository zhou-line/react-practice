import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

interface Props {
  name: string
  data: any
}

const BarGraph = (props: Props) => {
  const chartRef = useRef(null); // 使用useRef来获取DOM元素的引用

  useEffect(() => {
    const chartDom = chartRef.current; // 在useEffect中访问ref.current来获取DOM元素
    if (chartDom) {
      const myChart = echarts.init(chartDom); // 初始化ECharts图表
      const option = {
        title:{
          text: props.name,
          left:'center',
          textStyle:{
            color:'#099dff',
            fontSize:16,
            fontWeight:'bold'
          },
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: 60,
          right: 60,
          top: 30,
          bottom: 50,
        },
        series: [
          {
            data: props.data,
            type: 'bar',
            label:{
              show:true,
              position:'top',
              formatter:function(data: any){
                return data.value
              }
            }
          }
        ]
      };
      
      
      myChart.setOption(option); // 设置图表选项

      const contenTSize = function () {
        myChart.resize();
      };

      window.addEventListener('resize', contenTSize, false);

      myChart.setOption(option); // 设置图表选项

      // 清理函数，用于在组件卸载时销毁图表实例
      return () => {
        myChart.dispose();
        window.removeEventListener('resize', contenTSize, false);
      };
    }
  }, [props.data]); // 空依赖数组表示这个effect只在组件挂载和卸载时运行

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%'}}></div> // 使用ref属性将DOM元素与ref关联起来
  );
}

export default BarGraph;