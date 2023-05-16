import React, { useRef } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Form, Input, Slider, Grid, Select, InputNumber, Tooltip, Space, FormInstance } from '@arco-design/web-react';
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

interface FormStepProps {
  form: FormInstance;
  handleNextStep: () => any;
}

const Index: React.FC<FormStepProps> = ({ form, handleNextStep }) => {
  return (
    <div className={styles.container}>
      <Form style={{ width: 600 }} {...formItemLayout} scrollToFirstError form={form}>
        <FormItem label="渠道类型" rules={[{ required: true }]} field="channel" requiredSymbol={{ position: 'end' }}>
          <Select placeholder="Select city" defaultValue={'1'}>
            <Option value={1}>Web2</Option>
            <Option value={2}>Web3</Option>
          </Select>
        </FormItem>
        <Form.Item noStyle shouldUpdate>
          {(values) => {
            return values.channel === 1 ? (
              <div>
                <Form.Item label="渠道展示">
                  <div className={styles['channel-list']}>
                    <div>asd</div>
                    <div>weqwe</div>
                  </div>
                </Form.Item>
                <FormItem
                  label="计费方式"
                  rules={[{ required: true }]}
                  field="costType"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select city" defaultValue={'1'}>
                    <Option value={1}>CPC</Option>
                    <Option value={2}>Web3</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="支付方法"
                  rules={[{ required: true }]}
                  field="payWay"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select city">
                    <Option value={1}>法币(USD)</Option>
                    <Option value={2}>数字资产(USDT)</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="投放周期"
                  rules={[{ required: true }]}
                  field="costCycle"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select costCycle">
                    <Option value={1}>7天</Option>
                    <Option value={2}>15天</Option>
                    <Option value={3}>一个月</Option>
                    <Option value={4}>三个月</Option>
                    <Option value={5}>六个月</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="投放国家"
                  rules={[{ required: true }]}
                  field="country"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select country" mode="multiple">
                    <Option value={1}>美国</Option>
                    <Option value={2}>英国</Option>
                    <Option value={3}>日本</Option>
                    <Option value={4}>中国</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="语言"
                  rules={[{ required: true }]}
                  field="language"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select language">
                    <Option value={1}>英语</Option>
                    <Option value={2}>日语</Option>
                    <Option value={3}>法语</Option>
                  </Select>
                </FormItem>
                <Form.Item label={'投放人群'} required requiredSymbol={{ position: 'end' }}>
                  <Grid.Row gutter={8}>
                    <Grid.Col span={12}>
                      <Form.Item field={'gender'} rules={[{ required: true }]}>
                        <Select placeholder="Select gender">
                          <Option value={1}>男生</Option>
                          <Option value={2}>女生</Option>
                          <Option value={3}>不限</Option>
                        </Select>
                      </Form.Item>
                    </Grid.Col>

                    <Grid.Col span={12}>
                      <Form.Item field={'age'} rules={[{ required: true }]}>
                        <Select placeholder="Select age">
                          <Option value={1}>10</Option>
                          <Option value={2}>20</Option>
                          <Option value={3}>30</Option>
                        </Select>
                      </Form.Item>
                    </Grid.Col>
                  </Grid.Row>
                </Form.Item>
                <FormItem
                  label="推广预算"
                  rules={[{ required: true }]}
                  field="budget"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Slider />
                </FormItem>
              </div>
            ) : (
              <div>
                <Form.Item label="渠道展示">
                  <div className={styles['channel-list']}>
                    <div>asd</div>
                    <div>weqwe</div>
                  </div>
                </Form.Item>
                <FormItem
                  label="投放类型"
                  rules={[{ required: true }]}
                  field="costType"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select city" defaultValue={'1'}>
                    <Option value={1}>CPC</Option>
                    <Option value={2}>Web3</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="投放数量"
                  rules={[{ required: true }]}
                  field="costCycle"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select costCycle">
                    <Option value={1}>7天</Option>
                    <Option value={2}>15天</Option>
                    <Option value={3}>一个月</Option>
                    <Option value={4}>三个月</Option>
                    <Option value={5}>六个月</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="支付方式"
                  rules={[{ required: true }]}
                  field="payWay"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select city">
                    <Option value={1}>法币(USD)</Option>
                    <Option value={2}>数字资产(USDT)</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label="支付费用"
                  rules={[{ required: true }]}
                  field="language"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select language">
                    <Option value={1}>英语</Option>
                    <Option value={2}>日语</Option>
                    <Option value={3}>法语</Option>
                  </Select>
                </FormItem>
              </div>
            );
          }}
        </Form.Item>
      </Form>
      <div className={classNames('common-button', styles['next-button'])} onClick={handleNextStep}>
        下一步
      </div>
    </div>
  );
};

export default Index;
