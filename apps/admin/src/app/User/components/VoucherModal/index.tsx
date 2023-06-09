import React, { useState } from 'react';
import styles from './index.module.less';
import { Form, Input, Radio, Message, Upload, Modal } from '@arco-design/web-react';
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
}
const index: React.FC<VoucherModalProps> = ({ open, handleCloseVoucherModal }) => {
  const { lang, i18n } = useI18n(locale);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { mutateAsync: uploadVoucherAsync, isLoading } = useMutationUploadVoucher();

  const [delegateIsCompany, setDelegateIsCompany] = useState(true);
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
      console.log('表单的数据', res);
      setConfirmLoading(true);
      let data: IVoucherInterface;
      if (res.represent === undefined || res.represent === 1) {
        data = {
          amount: res.inValue,
          certificate: res.voucher[0].response,
          represent: 1,
          name: res.name,
          country: res.country,
          address: res.address,
          email: res.email,
          reg_num: res.represent || res.represent == 1 ? res.companyNumber : '',
          license: res.license[0].response,
          chan: 2,
          type: 1,
        };
      } else {
        data = {
          amount: res.inValue,
          certificate: res.voucher[0].response,
          represent: 2,
          name: res.name,
          country: res.country,
          address: res.address,
          email: res.email,
          license: res.license[0].response,
          chan: 2,
          type: 1,
        };
      }
      console.log('data', data);
      const result = await uploadVoucherAsync(data);
      console.log(result);
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
      // footer="您的详细信息将用于发票和收据中的计费目的。"
    >
      <Form form={form}>
        <FormItem
          label={i18n[lang]['usercenter.rechargeamount']}
          field="inValue"
          rules={[{ required: true }]}
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 18, offset: 0 }}
          requiredSymbol={{ position: 'end' }}
        >
          <Input />
        </FormItem>

        <Form.Item
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 18, offset: 0 }}
          requiredSymbol={{ position: 'end' }}
          label={i18n[lang]['usercenter.uploadPaymentVoucher']}
          field="voucher"
          triggerPropName="fileList"
          rules={[{ required: true }]}
        >
          {/* <Upload limit={1} listType="picture-card" customRequest={handleUpload} drag>
            <div className={styles['trigger']}>
              <div className={styles['trigger-box']}>
                <img src={upload} alt="upload" />
              </div>

              <div className={styles['trigger-text']}>
                Drag the file here or
                <span style={{ color: '#3370FF', padding: '0 4px' }}>Click to upload</span>
              </div>
            </div>
          </Upload> */}
          <Upload
            listType="picture-card"
            multiple
            // name="files"
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
          // rules={[{ required: true }]}
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 18, offset: 0 }}
          requiredSymbol={{ position: 'end' }}
        >
          <RadioGroup
            defaultValue={1}
            onChange={(res) => {
              console.log(res);
              if (res !== 1) {
                setDelegateIsCompany(false);
              } else {
                setDelegateIsCompany(true);
              }
            }}
          >
            <Radio value={1}>{i18n[lang]['usercenter.company']}</Radio>
            <Radio value={2}>{i18n[lang]['usercenter.individual']}</Radio>
          </RadioGroup>
        </FormItem>
        {delegateIsCompany ? (
          <>
            <FormItem
              label={i18n[lang]['usercenter.companyName']}
              field="name"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label={i18n[lang]['usercenter.countryOfIncorporation']}
              field="country"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label={i18n[lang]['usercenter.companyAddress']}
              field="address"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label={i18n[lang]['usercenter.companyEmail']}
              field="email"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label={i18n[lang]['usercenter.companyRegistrationNumber']}
              field="companyNumber"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <Form.Item
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
              label={i18n[lang]['usercenter.uploadBusinessLicense']}
              field="license"
              triggerPropName="fileList"
              rules={[{ required: true }]}
            >
              <Upload
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
          </>
        ) : (
          <>
            <FormItem
              label={i18n[lang]['usercenter.name']}
              field="name"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label={i18n[lang]['usercenter.countryOfUser']}
              field="country"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label={i18n[lang]['usercenter.addressOfUser']}
              field="address"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label={i18n[lang]['usercenter.emailOfUser']}
              field="email"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <Form.Item
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
              label={i18n[lang]['usercenter.uploadPassport']}
              field="license"
              triggerPropName="fileList"
              rules={[{ required: true }]}
            >
              {/* <Upload limit={1} listType="picture-card" customRequest={handleUpload} drag>
            <div className={styles['trigger']}>
              <div className={styles['trigger-box']}>
                <img src={upload} alt="upload" />
              </div>

              <div className={styles['trigger-text']}>
                Drag the file here or
                <span style={{ color: '#3370FF', padding: '0 4px' }}>Click to upload</span>
              </div>
            </div>
          </Upload> */}
              <Upload
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
          </>
        )}
      </Form>
    </Modal>
  );
};
export default index;
