import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Form, Slider, Grid, Select, FormInstance } from '@arco-design/web-react';
const FormItem = Form.Item;
import useI18n from 'src/ahooks/useI18n';
import locales from '../locales';
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
  handleNextStep: () => void;
}

const Index: React.FC<FormStepProps> = ({ form, handleNextStep }) => {
  const { lang, i18n } = useI18n(locales);
  return (
    <div className={styles.container}>
      <Form style={{ width: 600 }} {...formItemLayout} scrollToFirstError form={form}>
        <FormItem
          label={i18n[lang]['channel.type']}
          rules={[{ required: true }]}
          field="channel"
          requiredSymbol={{ position: 'end' }}
        >
          <Select placeholder="Select" defaultValue={'1'}>
            <Option value={1}>Web2</Option>
            <Option value={2}>Web3</Option>
          </Select>
        </FormItem>
        <Form.Item noStyle shouldUpdate>
          {(values) => {
            return values.channel === 1 ? (
              <div>
                <Form.Item label={i18n[lang]['channel.display']}>
                  <div className={styles['channel-list']}>
                    <div>asd</div>
                    <div>weqwe</div>
                  </div>
                </Form.Item>
                <FormItem
                  label={i18n[lang]['cost.type']}
                  rules={[{ required: true }]}
                  field="costType"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder={`${i18n[lang]['cost.type']}`} defaultValue={'1'}>
                    <Option value={1}>CPC</Option>
                    <Option value={2}>Web3</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['pay.way']}
                  rules={[{ required: true }]}
                  field="payWay"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select city">
                    <Option value={1}>{i18n[lang]['fiate.Currenc']}(USD)</Option>
                    <Option value={2}>{i18n[lang]['digital.Currency']}(USDT)</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['launch.cirlce']}
                  rules={[{ required: true }]}
                  field="costCycle"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select costCycle">
                    <Option value={1}>{i18n[lang]['one.week']}</Option>
                    <Option value={2}>{i18n[lang]['half.month']}</Option>
                    <Option value={3}>{i18n[lang]['one.month']}</Option>
                    <Option value={4}>{i18n[lang]['three.month']}</Option>
                    <Option value={5}>{i18n[lang]['half.year']}</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['launch.country']}
                  rules={[{ required: true }]}
                  field="country"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder={i18n[lang]['country.chose.place']} mode="multiple">
                    <Option value={1}>美国</Option>
                    <Option value={2}>英国</Option>
                    <Option value={3}>日本</Option>
                    <Option value={4}>中国</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['r.launguage']}
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
                <Form.Item label={i18n[lang]['launch.person']} required requiredSymbol={{ position: 'end' }}>
                  <Grid.Row gutter={8}>
                    <Grid.Col span={12}>
                      <Form.Item field={'gender'} rules={[{ required: true }]}>
                        <Select placeholder="Select gender">
                          <Option value={1}>{i18n[lang]['r.male']}</Option>
                          <Option value={2}>{i18n[lang]['r.female']}</Option>
                          {/* <Option value={3}>不限</Option> */}
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
                  label={i18n[lang]['promte.budget']}
                  rules={[{ required: true }]}
                  field="budget"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Slider />
                </FormItem>
              </div>
            ) : (
              <div>
                <Form.Item label={i18n[lang]['channel.display']}>
                  <div className={styles['channel-list']}>
                    <div>asd</div>
                    <div>weqwe</div>
                  </div>
                </Form.Item>
                <FormItem
                  label={i18n[lang]['channel.display']}
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
                  label={i18n[lang]['lanuch.amount']}
                  rules={[{ required: true }]}
                  field="costCycle"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Please Select">
                    <Option value={1}>{i18n[lang]['one.week']}</Option>
                    <Option value={2}>{i18n[lang]['half.month']}</Option>
                    <Option value={3}>{i18n[lang]['one.month']}</Option>
                    <Option value={4}>{i18n[lang]['three.month']}</Option>
                    <Option value={5}>{i18n[lang]['half.year']}</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['pay.way']}
                  rules={[{ required: true }]}
                  field="payWay"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Please Select">
                    <Option value={1}>{i18n[lang]['fiate.Currenc']}(USD)</Option>
                    <Option value={2}>{i18n[lang]['digital.Currency']}(USDT)</Option>
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['pay.number']}
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
