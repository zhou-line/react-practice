import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts/core';

import {
  TitleComponent,
  TitleComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { RadarChart, RadarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | LegendComponentOption | RadarSeriesOption
>;

interface Props {
  name: string
}


const RadarGraph = (props: Props) => {
  const chartRef = useRef(null); // 使用useRef来获取DOM元素的引用

  useEffect(() => {
    const chartDom = chartRef.current; // 在useEffect中访问ref.current来获取DOM元素
    if (chartDom) {
      const myChart = echarts.init(chartDom); // 初始化ECharts图表
      const option: EChartsOption = {
        title: {
          text: props.name,
          textStyle:{
            color:'#099dff',
            fontSize: 16,
            fontWeight:'bold'
          },
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'anger', max: 500 },
            { name: 'contempt', max: 500 },
            { name: 'disgust', max: 500 },
            { name: 'fear', max: 500 },
            { name: 'happy', max: 500 },
            { name: 'sadness', max: 500 },
            { name: 'surprise', max: 500 }
          ]
        },
        series: [
          {
            name: '教学分布图',
            type: 'radar',
            data: [
              {
                value: [100, 200, 300, 400, 100, 100, 400],
                name: 'Allocated Budget'
              }
            ],
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
  }, []); // 空依赖数组表示这个effect只在组件挂载和卸载时运行

  return (
    <div ref={chartRef} style={{ width: 'auto', height: 400 }}></div> // 使用ref属性将DOM元素与ref关联起来
  );
}

export default RadarGraph;