import React, { useMemo } from 'react';
import { Modal, Input, Button, Form, Message, Select } from '@arco-design/web-react';
import styles from './index.module.less';
import { useMutationAddUser, useRequestRoleList, AdminRole } from 'apis';

const FormItem = Form.Item;
export interface FVerifyProps {
  open: boolean;
  handlCloseModal: () => void;
}

const Index: React.FC<FVerifyProps> = ({ open, handlCloseModal }) => {
  const [form] = Form.useForm();
  const { mutateAsync, isLoading } = useMutationAddUser();
  const { data: roleList } = useRequestRoleList();
  const roleSelectList = useMemo(() => {
    if (roleList) {
      return roleList.map((v: AdminRole) => ({ value: v.id, label: v.name }));
    }
    return [];
  }, [roleList]);
  const handleSubmit = async () => {
    form.validate().then(async (res) => {
      res['role_id'] = res['role_id'].toString();
      await mutateAsync(res);
      Message.success('操作成功！');
      form.resetFields();
      handlCloseModal();
    });
  };
  return (
    <Modal
      visible={open}
      title="新增角色"
      footer={null}
      onCancel={handlCloseModal}
      style={{ width: '600px', height: '440px' }}
    >
      <div className={styles['modal-inner']}>
        <Form form={form} autoComplete="off">
          <FormItem field="account" rules={[{ required: true, message: '请输入账号' }]} label="账号">
            <Input placeholder="请输入账号" />
          </FormItem>
          <FormItem field="name" rules={[{ required: true, message: '请输入名称' }]} label="名称">
            <Input placeholder="请输入名称" />
          </FormItem>
          <FormItem field="password" rules={[{ required: true, message: '请密码' }]} label="密码">
            <Input placeholder="请输入密码" autoComplete="off" />
          </FormItem>
          <FormItem field="password_confirm" rules={[{ required: true, message: '请再次输入密码' }]} label="密码确认">
            <Input placeholder="请再次输入密码" autoComplete="off" />
          </FormItem>
          <FormItem field="role_id" rules={[{ required: true, message: '请选择角色' }]} label="角色">
            <Select placeholder="请选择角色" options={roleSelectList} allowClear />
          </FormItem>
        </Form>

        <Button onClick={handleSubmit} style={{ width: '200px', marginTop: '12px' }} loading={isLoading} type="primary">
          新增
        </Button>
      </div>
    </Modal>
  );
};

export default Index;
