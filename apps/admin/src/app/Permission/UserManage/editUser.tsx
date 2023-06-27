import React, { useMemo, useEffect } from 'react';
import { Modal, Input, Button, Form, Message, Select } from '@arco-design/web-react';
import styles from './index.module.less';
import { useMutationEditUserRole, useRequestRoleList, UserListItem, AdminRole } from 'apis';

const FormItem = Form.Item;
export interface FVerifyProps {
  open: boolean;
  handlCloseModal: () => void;
  selectItem: UserListItem;
}

const Index: React.FC<FVerifyProps> = ({ open, handlCloseModal, selectItem }) => {
  const [form] = Form.useForm();
  const { mutateAsync, isLoading } = useMutationEditUserRole();
  const { data: roleList } = useRequestRoleList();
  const roleSelectList = useMemo(() => {
    if (roleList) {
      return roleList.map((v: AdminRole) => ({ value: v.id.toString(), label: v.name }));
    }
    return [];
  }, [roleList]);
  const handleSubmit = async () => {
    form.validate().then(async (res) => {
      const params = {
        user_id: selectItem.user_id,
        role_id: res.role_id,
      };
      await mutateAsync(params);
      Message.success('操作成功！');
      form.resetFields();
      handlCloseModal();
    });
  };
  useEffect(() => {
    if (selectItem) {
      form.setFieldsValue({
        account: selectItem.account,
        name: selectItem.name,
      });
      form.setFieldValue('role_id', selectItem.role_id[0].toString());
    }
  }, [selectItem]);
  return (
    <Modal
      visible={open}
      title="编辑用户"
      footer={null}
      onCancel={handlCloseModal}
      style={{ width: '600px', height: '400px' }}
    >
      <div className={styles['modal-inner']}>
        <Form form={form} autoComplete="off">
          <FormItem field="account" rules={[{ required: true, message: '请输入账号' }]} label="账号">
            <Input placeholder="请输入账号" disabled />
          </FormItem>
          <FormItem field="name" rules={[{ required: true, message: '请输入名称' }]} label="名称">
            <Input placeholder="请输入名称" disabled />
          </FormItem>
          <FormItem field="role_id" rules={[{ required: true, message: '请选择角色' }]} label="角色">
            <Select placeholder="请选择角色" options={roleSelectList} allowClear />
          </FormItem>
        </Form>

        <Button onClick={handleSubmit} style={{ width: '200px', marginTop: '12px' }} loading={isLoading} type="primary">
          提交
        </Button>
      </div>
    </Modal>
  );
};

export default Index;
