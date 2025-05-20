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
  data: any
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
            { name: '愤怒', max: 250, id: 14},
            { name: '平静', max: 250, id: 19},
            { name: '厌恶', max: 250, id: 16},
            { name: '害怕', max: 250, id: 17},
            { name: '开心', max: 250, id: 8},
            { name: '伤心', max: 250, id: 12},
            { name: '惊喜', max: 250, id: 18}
          ]
        },
        series: [
          {
            name: '教学分布图',
            type: 'radar',
            data: [
              {
                value: props.data,
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
  }, [props.data]); // 空依赖数组表示这个effect只在组件挂载和卸载时运行

  return (
    <div ref={chartRef} style={{ width: 'auto', height: 400 }}></div> // 使用ref属性将DOM元素与ref关联起来
  );
}

export default RadarGraph;