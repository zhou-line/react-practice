import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);


const BarGraph = () => {
  const chartRef = useRef(null); // 使用useRef来获取DOM元素的引用

  useEffect(() => {
    const chartDom = chartRef.current; // 在useEffect中访问ref.current来获取DOM元素
    if (chartDom) {
      const myChart = echarts.init(chartDom); // 初始化ECharts图表
      const option = {
        title:{
          text:'一周情况',
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
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
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
  }, []); // 空依赖数组表示这个effect只在组件挂载和卸载时运行

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%'}}></div> // 使用ref属性将DOM元素与ref关联起来
  );
}

export default BarGraph;