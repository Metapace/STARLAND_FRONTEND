import React, { FC, useState } from 'react';
import styles from './index.module.less';
import { Form, Input, Radio, Upload, Modal } from '@arco-design/web-react';
import upload from 'src/assets/images/usercenter-assets-upload.png';
import uploadAws from 'src/utils/uploadAws';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { useMutationUploadVoucher, IVoucherInterface } from 'apis';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
interface VoucherModalProps {
  open: boolean;
  handleCloseVoucherModal: any;
  refresh: boolean;
  setrefresh: any;
}

const index: React.FC<VoucherModalProps> = ({ open, handleCloseVoucherModal, refresh, setrefresh }) => {
  const { lang, i18n } = useI18n(locale);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { mutateAsync: uploadVoucherAsync, isLoading: uploadVoucherLoading } = useMutationUploadVoucher();
  const [loading, setLoading] = useState(false);
  const handleUpload = async (info: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await uploadAws(info.file);
      info.onSuccess(res.Location);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  };
  function onOk() {
    form.validate().then(async (res) => {
      // console.log('res', res);
      setConfirmLoading(true);
      let data: IVoucherInterface;
      if (res.represent === undefined || res.represent === 1) {
        data = {
          amount: +res.inValue,
          certificate: res.voucher[0].response,
          represent: 1,
          name: res.name,
          country: res.country,
          address: res.address,
          email: res.email,
          reg_num: res.companyNumber,
          license: res.license[0].response,
          chan: 1,
          type: 1,
        };
      } else {
        data = {
          amount: +res.inValue,
          certificate: res.voucher[0].response,
          represent: 2,
          name: res.username,
          country: res.usercountry,
          address: res.useraddress,
          email: res.useremail,
          license: res.passPort[0].response,
          chan: 1,
          type: 1,
        };
      }
      await uploadVoucherAsync(data);
      setrefresh(!refresh);
      handleCloseVoucherModal();
      form.resetFields();
      setConfirmLoading(false);
    });
  }
  return (
    <Modal
      wrapClassName={styles.moadlwrap}
      title={i18n[lang]['usercenter.uploadVoucher']}
      visible={open}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={() => handleCloseVoucherModal()}
      maskClosable={false}
      style={{
        background: '#e9ecf4',
        border: '1px solid rgba(0, 0, 0, 0.15)',
        borderRadius: '23px',
        width: '685px',
        boxSizing: 'border-box',
        paddingInline: '62px',
        paddingTop: '10px',
      }}
      okText={i18n[lang]['usercenter.submit']}
    >
      <Form form={form}>
        <FormItem
          label={i18n[lang]['usercenter.rechargeamount']}
          field="inValue"
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 18, offset: 0 }}
          requiredSymbol={{ position: 'end' }}
          rules={[
            {
              match: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
              message: `${i18n[lang]['usercenter.numberNote']}`,
            },
            { required: true, message: `${i18n[lang]['usercenter.rechargeamountIsReq']}` },
          ]}
        >
          <Input />
        </FormItem>
        <Form.Item
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 9, offset: 0 }}
          requiredSymbol={{ position: 'end' }}
          label={i18n[lang]['usercenter.uploadPaymentVoucher']}
          field="voucher"
          triggerPropName="fileList"
          rules={[
            { required: true, message: `${i18n[lang]['usercenter.uploadPaymentVoucherIsReq']}` },
            {
              validator: (value, callback) => {
                if (value[0].response === undefined) {
                  callback(`${i18n[lang]['usercenter.uploadPaymentVoucherIsReq']}`);
                }
              },
            },
          ]}
        >
          <Upload
            listType="picture-card"
            multiple
            accept="image/*"
            customRequest={handleUpload}
            limit={1}
            drag
            onPreview={(file: any) => {
              Modal.info({
                title: 'Preview',
                content: (
                  <img
                    src={file.url || URL.createObjectURL(file.originFile as Blob | MediaSource)}
                    style={{
                      maxWidth: '100%',
                    }}
                  ></img>
                ),
              });
            }}
          >
            <div className={styles['trigger']}>
              <div className={styles['trigger-box']}>
                <img src={upload} alt="upload" />
              </div>

              <div className={styles['trigger-text']}>
                Drag the file here or
                <span style={{ color: '#3370FF', padding: '0 4px' }}>Click to upload</span>
              </div>
            </div>
          </Upload>
        </Form.Item>
        <FormItem
          label={i18n[lang]['usercenter.representative']}
          field="represent"
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 18, offset: 0 }}
          requiredSymbol={{ position: 'end' }}
          // rules={[{ required: true, message: `${i18n[lang]['usercenter.representativeIsReq']}` }]}
        >
          <RadioGroup defaultValue={1}>
            <Radio value={1}>{i18n[lang]['usercenter.company']}</Radio>
            <Radio value={2}>{i18n[lang]['usercenter.individual']}</Radio>
          </RadioGroup>
        </FormItem>
        <Form.Item shouldUpdate noStyle>
          {(values) => {
            return values.represent === 1 || values.represent === undefined ? (
              <>
                <FormItem
                  label={i18n[lang]['usercenter.companyName']}
                  field="name"
                  labelCol={{ span: 6, offset: 0 }}
                  wrapperCol={{ span: 18, offset: 0 }}
                  requiredSymbol={{ position: 'end' }}
                  rules={[{ required: true, message: `${i18n[lang]['usercenter.companyNameIsReq']}` }]}
                >
                  <Input maxLength={30} showWordLimit />
                </FormItem>
                <FormItem
                  label={i18n[lang]['usercenter.countryOfIncorporation']}
                  field="country"
                  labelCol={{ span: 6, offset: 0 }}
                  wrapperCol={{ span: 18, offset: 0 }}
                  requiredSymbol={{ position: 'end' }}
                  rules={[{ required: true, message: `${i18n[lang]['usercenter.countryOfIncorporationIsReq']}` }]}
                >
                  <Input maxLength={30} showWordLimit />
                </FormItem>
                <FormItem
                  label={i18n[lang]['usercenter.companyAddress']}
                  field="address"
                  labelCol={{ span: 6, offset: 0 }}
                  wrapperCol={{ span: 18, offset: 0 }}
                  requiredSymbol={{ position: 'end' }}
                  rules={[{ required: true, message: `${i18n[lang]['usercenter.companyAddressIsReq']}` }]}
                >
                  <Input maxLength={30} showWordLimit />
                </FormItem>
                <FormItem
                  label={i18n[lang]['usercenter.companyEmail']}
                  field="email"
                  labelCol={{ span: 6, offset: 0 }}
                  wrapperCol={{ span: 18, offset: 0 }}
                  requiredSymbol={{ position: 'end' }}
                  rules={[
                    {
                      match: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                      message: `${i18n[lang]['usercenter.emailEnter']}`,
                    },
                    { required: true, message: `${i18n[lang]['usercenter.companyEmailIsReq']}` },
                  ]}
                >
                  <Input />
                </FormItem>
                <FormItem
                  label={i18n[lang]['usercenter.companyRegistrationNumber']}
                  field="companyNumber"
                  labelCol={{ span: 6, offset: 0 }}
                  wrapperCol={{ span: 18, offset: 0 }}
                  requiredSymbol={{ position: 'end' }}
                  rules={[{ required: true, message: `${i18n[lang]['usercenter.companyRegistrationNumberIsReq']}` }]}
                >
                  <Input />
                </FormItem>

                <Form.Item
                  labelCol={{ span: 6, offset: 0 }}
                  wrapperCol={{ span: 9, offset: 0 }}
                  requiredSymbol={{ position: 'end' }}
                  label={i18n[lang]['usercenter.uploadBusinessLicense']}
                  field="license"
                  triggerPropName="fileList"
                  rules={[
                    { required: true, message: `${i18n[lang]['usercenter.uploadBusinessLicenseIsReq']}` },
                    {
                      validator: (value, callback) => {
                        if (value[0].response === undefined) {
                          callback(`${i18n[lang]['usercenter.uploadBusinessLicenseIsReq']}`);
                        }
                      },
                    },
                  ]}
                >
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    multiple
                    customRequest={handleUpload}
                    limit={1}
                    drag
                    onPreview={(file: any) => {
                      Modal.info({
                        title: 'Preview',
                        content: (
                          <img
                            src={file.url || URL.createObjectURL(file.originFile as Blob | MediaSource)}
                            style={{
                              maxWidth: '100%',
                            }}
                          ></img>
                        ),
                      });
                    }}
                  >
                    <div className={styles['trigger']}>
                      <div className={styles['trigger-box']}>
                        <img src={upload} alt="upload" />
                      </div>

                      <div className={styles['trigger-text']}>
                        Drag the file here or
                        <span style={{ color: '#3370FF', padding: '0 4px' }}>Click to upload</span>
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
                <div className={styles['footernote']}>
                  <div className={styles['footernote1']}>{i18n[lang]['usercenter.modalNote']}</div>
                </div>
              </>
            ) : (
              values.represent === 2 && (
                <>
                  <FormItem
                    label={i18n[lang]['usercenter.name']}
                    field="username"
                    labelCol={{ span: 6, offset: 0 }}
                    wrapperCol={{ span: 18, offset: 0 }}
                    requiredSymbol={{ position: 'end' }}
                    rules={[{ required: true, message: `${i18n[lang]['usercenter.nameIsReq']}` }]}
                  >
                    <Input />
                  </FormItem>
                  <FormItem
                    label={i18n[lang]['usercenter.countryOfUser']}
                    field="usercountry"
                    labelCol={{ span: 6, offset: 0 }}
                    wrapperCol={{ span: 18, offset: 0 }}
                    requiredSymbol={{ position: 'end' }}
                    rules={[{ required: true, message: `${i18n[lang]['usercenter.countryOfUserIsReq']}` }]}
                  >
                    <Input />
                  </FormItem>
                  <FormItem
                    label={i18n[lang]['usercenter.addressOfUser']}
                    field="useraddress"
                    labelCol={{ span: 6, offset: 0 }}
                    wrapperCol={{ span: 18, offset: 0 }}
                    requiredSymbol={{ position: 'end' }}
                    rules={[{ required: true, message: `${i18n[lang]['usercenter.addressOfUserIsReq']}` }]}
                  >
                    <Input />
                  </FormItem>
                  <FormItem
                    label={i18n[lang]['usercenter.emailOfUser']}
                    field="useremail"
                    labelCol={{ span: 6, offset: 0 }}
                    wrapperCol={{ span: 18, offset: 0 }}
                    requiredSymbol={{ position: 'end' }}
                    rules={[
                      {
                        match: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        message: `${i18n[lang]['usercenter.emailEnter']}`,
                      },
                      { required: true, message: `${i18n[lang]['usercenter.emailOfUserIsReq']}` },
                    ]}
                  >
                    <Input />
                  </FormItem>
                  <Form.Item
                    labelCol={{ span: 6, offset: 0 }}
                    wrapperCol={{ span: 9, offset: 0 }}
                    requiredSymbol={{ position: 'end' }}
                    label={i18n[lang]['usercenter.uploadPassport']}
                    field="passPort"
                    triggerPropName="fileList"
                    rules={[
                      { required: true, message: `${i18n[lang]['usercenter.uploadPassportIsReq']}` },
                      {
                        validator: (value, callback) => {
                          if (value[0].response === undefined) {
                            callback(`${i18n[lang]['usercenter.uploadPassportIsReq']}`);
                          }
                        },
                      },
                    ]}
                  >
                    <Upload
                      listType="picture-card"
                      multiple
                      accept="image/*"
                      customRequest={handleUpload}
                      limit={1}
                      drag
                      onPreview={(file: any) => {
                        Modal.info({
                          title: 'Preview',
                          content: (
                            <img
                              src={file.url || URL.createObjectURL(file.originFile as Blob | MediaSource)}
                              style={{
                                maxWidth: '100%',
                              }}
                            ></img>
                          ),
                        });
                      }}
                    >
                      <div className={styles['trigger']}>
                        <div className={styles['trigger-box']}>
                          <img src={upload} alt="upload" />
                        </div>

                        <div className={styles['trigger-text']}>
                          Drag the file here or
                          <span style={{ color: '#3370FF', padding: '0 4px' }}>Click to upload</span>
                        </div>
                      </div>
                    </Upload>
                  </Form.Item>
                </>
              )
            );
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default index;
