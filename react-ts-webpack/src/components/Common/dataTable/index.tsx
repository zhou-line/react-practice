import React from 'react';
import type { PaginationProps } from 'antd';
import { Button, Col, List, Row } from 'antd';
import './index.scss'
import {AnalysisLabel } from '@/constants/list';
import { NavLink } from 'react-router-dom';
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { checkImage, deleteImages } from '@/api/app';
// import { imageUrl } from '@/constants/annotationn';


interface Props {
  type: any,
  data: any,
  setCurrent: any,
  current: number,
  loading: boolean,
  setLoading: any
}

const DataTable = (props: Props) => {

  const type: boolean = (props.type === AnalysisLabel ? true : false);
  const is_superuser = useSelector((state: RootState) => state.admin.superuser)
  const messageApi = useSelector((state: RootState) => state.phote.messageApi)
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
    props.setCurrent(page)
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
          loading={props.loading}
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
            current: props.current > 0 ? props.current : 1,
            onChange: onChange,
            itemRender: itemRender,
            showSizeChanger: false,
          }}
          dataSource={props.data}
          renderItem={(item: any) => (
            <List.Item
              style={
                is_superuser || item.is_confirm ?
                { margin: '10px 0', color: '#ffffff' }
                : { margin: '10px 0', color: '#ffffff', cursor:'not-allowed'}
              }
              key={1}
              onClick={() => {
                console.log(item)
              }}
            >
              <Row gutter={type ? 24 : 23}>
                <Col span={7}>
                  { type ? 
                  <NavLink to={`/analysis/annotation/${item.id}`} style={is_superuser || item.is_confirm ? {color: '#1677FF'} : {pointerEvents:'none'}}>{item.name}</NavLink> :
                  <div>{item.name}</div>
                  }
                </Col>
                <Col span={6}>{item.study_group}</Col>
                <Col span={6}>{item.user}</Col>
                <Col span={2} title={type ? props.type.num : props.type.emo} className='col-item'>{item.annotation_num}</Col>
                <Col span={3} className='center-item'>{
                  is_superuser && <div>
                    {!item.is_confirm && <CheckOutlined title='确认' onClick={async () => {
                       props.setLoading(true)
                       const res = await checkImage(item) as any
                       if (res.code === 200) {
                         props.setLoading(false)
                         messageApi.success(res.message)
                       }
                    }}></CheckOutlined>}
                    &nbsp;&nbsp;
                    <CloseOutlined title='删除' onClick={async () => {
                      props.setLoading(true)
                      const res = await deleteImages(item) as any
                      if (res.code === 200) {
                        props.setLoading(false)
                        messageApi.success(res.message)
                      }
                    }}></CloseOutlined>
                  </div>
                }</Col>
              </Row>
            </List.Item>
          )}
        />
      </Row>
    </div>    
  );
};

export default DataTable;