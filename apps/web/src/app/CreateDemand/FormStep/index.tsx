import React, { useRef } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Form, Input, Button, Grid, Select, InputNumber, Tooltip, Space } from '@arco-design/web-react';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};

const Index = () => {
  const formRef = useRef(null);
  return (
    <div className={styles.container}>
      <Form style={{ width: 600 }} {...formItemLayout} scrollToFirstError ref={formRef}>
        <FormItem label="渠道类型" rules={[{ required: true }]} field="channel">
          <Select placeholder="Select city" style={{ width: 154 }}>
            <Option value={1}>Web2</Option>
            <Option value={2}>Web3</Option>
          </Select>
        </FormItem>
        <Form.Item noStyle shouldUpdate>
          {(values) => {
            return values.channel === 1 ? (
              <div>
                <Form.Item label="渠道展示">
                  <div>asd</div>
                  <div>weqwe</div>
                </Form.Item>
                <FormItem label="计费方式" rules={[{ required: true }]} field="costType">
                  <Select placeholder="Select city" style={{ width: 154 }}>
                    <Option value={1}>CPC</Option>
                    <Option value={2}>Web3</Option>
                  </Select>
                </FormItem>
                <FormItem label="支付方法" rules={[{ required: true }]} field="payWay">
                  <Select placeholder="Select city" style={{ width: 154 }}>
                    <Option value={1}>法币(USD)</Option>
                    <Option value={2}>数字资产(USDT)</Option>
                  </Select>
                </FormItem>
                <FormItem label="投放周期" rules={[{ required: true }]} field="costCycle">
                  <Select placeholder="Select city" style={{ width: 154 }}>
                    <Option value={1}>7天</Option>
                    <Option value={2}>15天</Option>
                    <Option value={3}>一个月</Option>
                    <Option value={4}>三个月</Option>
                    <Option value={5}>六个月</Option>
                  </Select>
                </FormItem>
                <FormItem label="投放国家" rules={[{ required: true }]} field="country">
                  <Select placeholder="Select city" style={{ width: 154 }} mode="multiple">
                    <Option value={1}>美国</Option>
                    <Option value={2}>英国</Option>
                    <Option value={3}>日本</Option>
                    <Option value={4}>中国</Option>
                  </Select>
                </FormItem>
                <FormItem label="语言" rules={[{ required: true }]} field="language">
                  <Select placeholder="Select city" style={{ width: 154 }}>
                    <Option value={1}>英语</Option>
                    <Option value={2}>日语</Option>
                    <Option value={3}>法语</Option>
                  </Select>
                </FormItem>
              </div>
            ) : null;
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
