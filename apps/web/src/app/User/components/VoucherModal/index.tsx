import React, { useRef, useEffect, useState } from 'react';
import styles from './index.module.less';
import { useForm, Controller, set } from 'react-hook-form';
import {
  Form,
  AutoComplete,
  Input,
  Select,
  TreeSelect,
  Button,
  Checkbox,
  Switch,
  Radio,
  Cascader,
  Message,
  InputNumber,
  Rate,
  Slider,
  Upload,
  DatePicker,
  Modal,
} from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import userlogo from 'src/assets/images/usercenter-userlogo.png';
import closemodal from 'src/assets/images/usercenter-assets-closemodal.png';
import upload from 'src/assets/images/usercenter-assets-upload.png';
import uploadAws from 'src/utils/uploadAws';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const index = ({ open, handleCloseVoucherModal }: any) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

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
    form.validate().then((res) => {
      console.log('表单的数据', res);
      setConfirmLoading(true);
      setTimeout(() => {
        Message.success('Success !');
        handleCloseVoucherModal(false);
        setConfirmLoading(false);
      }, 1500);
    });
  }
  return (
    <Modal
      wrapClassName={styles.moadlwrap}
      title="上传凭证及相关信息"
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
      okText="提交"
      // footer="您的详细信息将用于发票和收据中的计费目的。"
    >
      <Form form={form}>
        <FormItem
          label="充值金额( USD )"
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
          label="上传支付凭证"
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
            onPreview={(file) => {
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
          label="代表"
          field="represent"
          rules={[{ required: true }]}
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 18, offset: 0 }}
          requiredSymbol={{ position: 'end' }}
        >
          <RadioGroup
            defaultValue="company"
            onChange={(res) => {
              if (res === 'personal') {
                setDelegateIsCompany(false);
              } else {
                setDelegateIsCompany(true);
              }
            }}
          >
            <Radio value="company">公司</Radio>
            <Radio value="personal">个人</Radio>
          </RadioGroup>
        </FormItem>
        {delegateIsCompany ? (
          <>
            <FormItem
              label="公司名称"
              field="companyName"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="公司成立国家"
              field="companyCountry"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="公司地址"
              field="companyAddress"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="公司邮箱"
              field="companyEmail"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="公司注册号码"
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
              label="上传营业执照"
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
                onPreview={(file) => {
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
              label="姓名"
              field="userName"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="所在国家"
              field="userCountry"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="个人地址"
              field="userAddress"
              rules={[{ required: true }]}
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 18, offset: 0 }}
              requiredSymbol={{ position: 'end' }}
            >
              <Input />
            </FormItem>
            <FormItem
              label="个人邮箱"
              field="userEmail"
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
              label="上传护照"
              field="passport"
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
                onPreview={(file) => {
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
