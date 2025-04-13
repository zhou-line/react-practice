import React from 'react';
import type { PaginationProps } from 'antd';
import { Button, Col, List, Row } from 'antd';
import './index.scss'
import { ListLabel } from '@/constants/list';


// interface DataType {
//   name: {
//     first: string;
//     last: string;
//   };
//   gender: string;
//   email: string;
//   login: {
//     uuid: string;
//   };
// }

const DataTable: React.FC = () => {

  // 自定义翻页组件样式
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <Button  type='primary' size={'small'}>
          上一页
        </Button>
      );
    }
    if (type === 'next') {
      return (
        <Button type='primary' size={'small'}>
          下一页
        </Button>
      );
    }
    return originalElement;
  };

  // 翻页
  const onChange: PaginationProps['onChange'] = (page: number) => {
    
    console.log(page)
  };


  return (
    <div className='list-container'>
      <Row className='list-header'>
        <Col flex={6}>{ListLabel.name}</Col>
        <Col flex={3}>{ListLabel.group}</Col>
        <Col flex={3}>{ListLabel.lens}</Col>
        <Col flex={6}>{ListLabel.resource}</Col>
        <Col flex={1}>{ListLabel.num}</Col>
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
          // style={{width: '100%'}}
          pagination={{
            pageSize: 15,
            total: 16,
            
            position: 'bottom',
            align: 'center',
            size: 'small',
            onChange: onChange,
            itemRender: itemRender,
            showSizeChanger: false,
          }}
          dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17,18,19,20]}
          renderItem={() => (
            <List.Item
              style={{ margin: '10px 0', color: '#ffffff' }}
              key={1}
              onClick={() => {
              
              }}
            >
              <Row>
                <Col flex={6}>{ListLabel.name}</Col>
                <Col flex={3}>{ListLabel.group}</Col>
                <Col flex={3}>{ListLabel.lens}</Col>
                <Col flex={6}>{ListLabel.resource}</Col>
                <Col flex={1}>{ListLabel.num}</Col>
              </Row>
            </List.Item>
          )}
        />
      </Row>
    </div>    
  );
};

export default DataTable;