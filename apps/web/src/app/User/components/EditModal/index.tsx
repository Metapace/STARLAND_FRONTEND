import React, { useState, useEffect } from 'react';
import styles from './index.module.less';
import { Form, Input, Upload, Modal } from '@arco-design/web-react';
import upload from 'src/assets/images/usercenter-assets-upload.png';
import uploadAws from 'src/utils/uploadAws';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import dayjs from 'dayjs';
import { useUpdateUser, UpdateParams, useRequestUserIndfo } from 'apis';
const FormItem = Form.Item;
interface VoucherModalProps {
  open: boolean;
  handleCloseEditModal: () => void;
}

const index: React.FC<VoucherModalProps> = ({ open, handleCloseEditModal }) => {
  const { lang, i18n } = useI18n(locale);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data, refetch } = useRequestUserIndfo();
  const [form] = Form.useForm();
  const { mutateAsync } = useUpdateUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (data) {
      const formdata = {
        email: data.email,
        registerTime: dayjs.unix(data?.create_time).format('YYYY-MM-DD'),
        project_name: data.name,
        avatar_uri: [{ name: 'img', url: data.avatar_uri, status: 'done', uid: 12312323 }],
      };
      form.setFieldsValue(formdata);
    }
  }, [data]);
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
      setConfirmLoading(true);
      let data: UpdateParams = {
        project_name: res.project_name,
        avatar_uri: res.avatar_uri[0].response,
      };
      await mutateAsync(data);
      await refetch();
      handleCloseEditModal();
      setConfirmLoading(false);
    });
  }
  return (
    <Modal
      wrapClassName={styles.moadlwrap}
      title={i18n[lang]['usercenter.Settings']}
      visible={open}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={() => handleCloseEditModal()}
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
          label={i18n[lang]['usercenter.setting.usernames']}
          field="email"
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 18, offset: 0 }}
          disabled
        >
          <Input />
        </FormItem>
        <FormItem
          label={i18n[lang]['usercenter.setting.Registration']}
          field="registerTime"
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 18, offset: 0 }}
          disabled
        >
          <Input />
        </FormItem>
        <FormItem
          label={i18n[lang]['usercenter.setting.Projectname']}
          field="project_name"
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 18, offset: 0 }}
          requiredSymbol={{ position: 'end' }}
          rules={[{ required: true, message: `${i18n[lang]['usercenter.setting.Projectname.requered']}` }]}
        >
          <Input />
        </FormItem>
        <Form.Item
          labelCol={{ span: 6, offset: 0 }}
          wrapperCol={{ span: 9, offset: 0 }}
          requiredSymbol={{ position: 'end' }}
          label={i18n[lang]['usercenter.setting.Projectlogo']}
          field="avatar_uri"
          triggerPropName="fileList"
        >
          <Upload
            listType="picture-card"
            multiple
            accept="image/*"
            customRequest={handleUpload}
            limit={1}
            drag
            showUploadList={{
              cancelIcon: null,
            }}
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
              <div className={styles['trigger-text']}>{i18n[lang]['usercenter.setting.Projectlogo.tip']}</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default index;
