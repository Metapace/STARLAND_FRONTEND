import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Form, Slider, Grid, Select, FormInstance } from '@arco-design/web-react';
const FormItem = Form.Item;
import { useRequestCountry, useRequestLanguage, useRequestChanne } from 'src/api/activityHooks';
import useI18n from 'src/ahooks/useI18n';
import { gendarRange, ageRange, launchPeriod } from 'src/conifg/selectConfig';
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

const marks = {
  100: '$100',
  5000: '$5000',
};

const Index: React.FC<FormStepProps> = ({ form, handleNextStep }) => {
  const { lang, i18n } = useI18n(locales);
  const ty = lang === 'zh-CN' ? 1 : 2;
  const { data: countryList } = useRequestCountry(ty);
  const { data: languageList } = useRequestLanguage(ty);
  const { data: ChannelList } = useRequestChanne();
  return (
    <div className={styles.container}>
      <Form
        style={{ width: 600 }}
        {...formItemLayout}
        scrollToFirstError
        form={form}
        initialValues={{ chan: 1, billing: 1, pay: 1 }}
      >
        <FormItem
          label={i18n[lang]['channel.type']}
          rules={[{ required: true }]}
          field="chan"
          requiredSymbol={{ position: 'end' }}
        >
          <Select placeholder="Select">
            <Option value={1}>Web2</Option>
            <Option value={2} disabled>
              Web3
            </Option>
          </Select>
        </FormItem>
        <Form.Item noStyle shouldUpdate>
          {(values) => {
            return values.chan === 1 ? (
              <div>
                <Form.Item label={i18n[lang]['channel.display']}>
                  <div className={styles['channel-list']}>
                    {ChannelList?.map((item) => (
                      <img src={item.image_url} key={item.id}></img>
                    ))}
                  </div>
                </Form.Item>
                <FormItem
                  label={i18n[lang]['cost.type']}
                  rules={[{ required: true }]}
                  field="billing"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder={`${i18n[lang]['cost.type']}`} defaultValue={'1'}>
                    <Option value={1}>CPC</Option>
                    <Option value={2} disabled>
                      Web3
                    </Option>
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['pay.way']}
                  rules={[{ required: true }]}
                  field="pay"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select Payment method">
                    <Option value={1}>{i18n[lang]['fiate.Currency']}(USD)</Option>
                    <Option value={2} disabled>
                      {i18n[lang]['digital.Currency']}(USDT)
                    </Option>
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['launch.cirlce']}
                  rules={[{ required: true }]}
                  field="days"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select Launch period">
                    {launchPeriod.map((item) => (
                      <Option value={item.value} key={item.value}>
                        {i18n[lang][item.label]}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['launch.country']}
                  rules={[{ required: true }]}
                  field="country"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder={i18n[lang]['country.chose.place']} mode="multiple">
                    {countryList?.map((item: string) => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['r.launguage']}
                  rules={[{ required: true }]}
                  field="language"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select language">
                    {languageList?.map((item: string) => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
                <Form.Item label={i18n[lang]['launch.person']} required requiredSymbol={{ position: 'end' }}>
                  <Grid.Row gutter={8}>
                    <Grid.Col span={12}>
                      <Form.Item field={'crowd'} rules={[{ required: true }]}>
                        <Select placeholder="Select gender">
                          {gendarRange.map((item) => (
                            <Option value={item.value} key={item.value}>
                              {i18n[lang][item.label]}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Grid.Col>

                    <Grid.Col span={12}>
                      <Form.Item field={'age'} rules={[{ required: true }]}>
                        <Select placeholder="Select age">
                          {ageRange.map((item) => (
                            <Option value={item.value} key={item.value}>
                              {i18n[lang][item.label] || item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Grid.Col>
                  </Grid.Row>
                </Form.Item>
                <FormItem
                  label={i18n[lang]['promte.budget']}
                  rules={[{ required: true }]}
                  field="price"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Slider
                    marks={marks}
                    min={100}
                    max={5000}
                    step={1}
                    style={{ transform: 'translate(-20px, 10px)', width: '98%' }}
                  />
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
                    {languageList?.map((item: string) => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
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
