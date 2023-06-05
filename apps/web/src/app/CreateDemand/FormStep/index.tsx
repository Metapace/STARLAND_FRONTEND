import React, { useEffect } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Form, Slider, Grid, Select, FormInstance } from '@arco-design/web-react';
const FormItem = Form.Item;
import { useRequestCountry, useRequestLanguage, useRequestChanne, ReturnRemandItem } from 'apis';
import useI18n from 'src/ahooks/useI18n';
import { gendarRange, ageRange, launchPeriod } from 'src/conifg/selectConfig';
import HorizontalScroll from 'src/components/HorizontalScroll';
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
  handleNextStep?: () => void;
  initialValues?: Partial<ReturnRemandItem>;
  isDisable?: boolean;
}

const marks = {
  100: '$100',
  5000: '$5000',
};

const daysMap = {
  '7': 1,
  '15': 2,
  '30': 3,
  '90': 4,
  '180': 5,
};

const Index: React.FC<FormStepProps> = ({
  form,
  handleNextStep,
  initialValues = { chan: 1, billing: 1, pay: 1 } as Partial<ReturnRemandItem>,
  isDisable = false,
}) => {
  const { lang, i18n } = useI18n(locales);
  const ty = lang === 'zh-CN' ? 1 : 2;
  const { data: countryList } = useRequestCountry(ty);
  const { data: languageList } = useRequestLanguage(ty);
  const { data: ChannelList } = useRequestChanne();
  useEffect(() => {
    const aa = { ...initialValues } as any;
    if (aa?.country) {
      aa.country = aa.country.split(',');
    }
    if (aa?.price) {
      aa.price = +aa.price;
    }
    if (aa?.days) {
      const index = aa.days as unknown;
      aa.days = daysMap[index as keyof typeof daysMap];
    }
    form.setFieldsValue(aa);
  }, [initialValues]);
  return (
    <div className={styles.container}>
      <Form
        style={{ width: 640, position: 'relative' }}
        {...formItemLayout}
        scrollToFirstError
        form={form}
        initialValues={initialValues}
        labelAlign="left"
      >
        {' '}
        <Form.Item noStyle shouldUpdate>
          {(value) => {
            return <div className={styles['slider-input-text']}>{`$${value.price || 100}(Daily)`}</div>;
          }}
        </Form.Item>
        <FormItem
          label={i18n[lang]['channel.type']}
          rules={[{ required: true }]}
          field="chan"
          requiredSymbol={{ position: 'end' }}
        >
          <Select placeholder="Select" disabled={isDisable}>
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
                  <HorizontalScroll>
                    <div className={styles['channel-list']}>
                      {ChannelList?.map((item) => (
                        <div key={item.id} className={styles['chan-icon-wrrap']}>
                          <img src={item.image_url}></img>
                        </div>
                      ))}
                    </div>
                  </HorizontalScroll>
                </Form.Item>
                <FormItem
                  label={i18n[lang]['cost.type']}
                  rules={[{ required: true }]}
                  field="billing"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder={`${i18n[lang]['cost.type']}`} defaultValue={'1'} disabled={isDisable}>
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
                  <Select placeholder="Select Payment method" disabled={isDisable}>
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
                  <Select placeholder="Select Launch period" disabled={isDisable}>
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
                  <Select placeholder={i18n[lang]['country.chose.place']} mode="multiple" disabled={isDisable}>
                    {countryList?.map((item: string) => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
                <FormItem
                  label={i18n[lang]['lanuage.chose']}
                  rules={[{ required: true }]}
                  field="lauguage"
                  requiredSymbol={{ position: 'end' }}
                >
                  <Select placeholder="Select language" disabled={isDisable}>
                    {languageList?.map((item: string) => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
                <Form.Item
                  label={i18n[lang]['launch.person']}
                  required
                  requiredSymbol={{ position: 'end' }}
                  style={{ marginBottom: '0px' }}
                >
                  <Grid.Row gutter={8}>
                    <Grid.Col span={12}>
                      <Form.Item field={'crowd'} rules={[{ required: true }]}>
                        <Select placeholder="Select gender" disabled={isDisable}>
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
                        <Select placeholder="Select age" disabled={isDisable}>
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
                    tooltipPosition="bottom"
                    disabled={isDisable}
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
                  <Select placeholder="Select city" defaultValue={'1'} disabled={isDisable}>
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
                  <Select placeholder="Please Select" disabled={isDisable}>
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
                  <Select placeholder="Please Select" disabled={isDisable}>
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
                  <Select placeholder="Select language" disabled={isDisable}>
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
      {handleNextStep && (
        <div className={classNames('common-button', styles['next-button'])} onClick={handleNextStep}>
          下一步
        </div>
      )}
    </div>
  );
};

export default Index;
