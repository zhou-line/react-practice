import React from 'react';
import type { PaginationProps } from 'antd';
import { Button, Col, List, Row } from 'antd';
import './index.scss'
import {AnalysisLabel } from '@/constants/list';
import { NavLink } from 'react-router-dom';
import {DeleteFilled} from "@ant-design/icons";
import { imageUrl } from '@/constants/annotationn';


interface Props {
  type: any,
  data: any
}

const DataTable = (props: Props) => {

  const type: boolean = (props.type === AnalysisLabel ? true : false);

  // 自定义翻页组件样式
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <Button  type='primary' size={'middle'}>
          上一页
        </Button>
      );
    }
    if (type === 'next') {
      return (
        <Button type='primary' size={'middle'}>
          下一页
        </Button>
      );
    }
    return originalElement;
  };
  

  // 翻页
  const onChange: PaginationProps['onChange'] = (page: number) => {
    console.log(props.data)
    console.log(page)
  };


  return (
    <div className='list-container'>
      <Row className='list-header' gutter={24}>
        <Col span={7}>{props.type.name}</Col>
        <Col span={6}>{props.type.group}</Col>
        <Col span={6}>{props.type.resource}</Col>
        {type && <Col span={2} title={props.type.num} className='col-item'>{props.type.num}</Col>}
        {!type && <Col span={2} title={props.type.emo} className='col-item'>{props.type?.emo}</Col>}
        <Col span={3} className='center-item'>操作</Col>
      </Row>
      <Row>
        <List
          className='list-content'
          grid={{
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 1,
          }}
          pagination={{
            pageSize: 14,
            total: 20,
            position: 'bottom',
            align: 'center',
            size: 'small',
            onChange: onChange,
            itemRender: itemRender,
            showSizeChanger: false,
          }}
          dataSource={props.data}
          renderItem={(item: any) => (
            <List.Item
              style={{ margin: '10px 0', color: '#ffffff' }}
              key={1}
              onClick={() => {
                console.log(item)
              }}
            >
              <Row gutter={type ? 24 : 23}>
                <Col span={7}>
                  { type ? 
                  <NavLink to={{pathname:'annotation'}} style={{color: '#1677FF'}}>{item.title}</NavLink> :
                  <div>{item.title}</div>
                  }
                </Col>
                <Col span={6}>{imageUrl}</Col>
                <Col span={6}>{item.resource}</Col>
                <Col span={2} title={type ? props.type.num : props.type.emo} className='col-item'>{item.annotation_num}</Col>
                <Col span={3} title='删除' className='center-item'><DeleteFilled></DeleteFilled></Col>
              </Row>
            </List.Item>
          )}
        />
      </Row>
    </div>    
  );
};

export default DataTable;