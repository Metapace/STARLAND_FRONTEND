import React, { useMemo, useState } from 'react';
import { Modal, Input, Button, Form, Message } from '@arco-design/web-react';
import styles from './index.module.less';
import Tree from '../components/treeData';
import { useMutationAddRole } from 'apis';

const FormItem = Form.Item;
export interface FVerifyProps {
  open: boolean;
  handlCloseModal: () => void;
}

const Index: React.FC<FVerifyProps> = ({ open, handlCloseModal }) => {
  const [form] = Form.useForm();
  const { mutateAsync, isLoading } = useMutationAddRole();

  const handleSubmit = async () => {
    form.validate().then(async (res) => {
      const params = {
        name: res.name,
        menu_id: res.roles.join(','),
      };
      await mutateAsync(params);
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
      style={{ width: '800px', height: '60vh' }}
    >
      <div className={styles['modal-inner']}>
        <Form form={form}>
          <FormItem field="name" rules={[{ required: true, message: '请输入角色名称' }]} label="角色名称">
            <Input placeholder="请输入角色名称" />
          </FormItem>
          <FormItem field="roles" label="菜单权限">
            <Tree />
          </FormItem>
        </Form>

        <Button
          status="success"
          onClick={handleSubmit}
          style={{ width: '200px', marginTop: '12px' }}
          loading={isLoading}
        >
          新增
        </Button>
      </div>
    </Modal>
  );
};

export default Index;
