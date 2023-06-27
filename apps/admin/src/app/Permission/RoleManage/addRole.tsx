import React, { useMemo, useState } from 'react';
import { Modal, List, Tree, Input, Button, Form, Popconfirm, Message } from '@arco-design/web-react';
import { IconCheckCircle } from '@arco-design/web-react/icon';
import permissionData from 'src/conifg/permission';
import styles from './index.module.less';
import { useMutationReviewFinance } from 'apis';

const FormItem = Form.Item;
export interface FVerifyProps {
  open: boolean;
  handlCloseModal: () => void;
}

const Index: React.FC<FVerifyProps> = ({ open, handlCloseModal }) => {
  const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState(['0-0-1']);
  const [checkedStrategy, setCheckedStrategy] = useState(Tree.SHOW_ALL);
  const { mutateAsync, isLoading } = useMutationReviewFinance();

  const handleSubmit = async () => {
    form.validate().then(async (res) => {
      await mutateAsync(res);
      Message.success('操作成功！');
      handlCloseModal();
    });
  };
  return (
    <Modal visible={open} title="新增角色" footer={null} onCancel={handlCloseModal} style={{ width: '800px' }}>
      <div className={styles['modal-inner']}>
        <Form form={form}>
          <FormItem field="name" rules={[{ required: true, message: '请输入角色名称' }]} label="角色名称">
            <Input placeholder="请输入角色名称" />
          </FormItem>
        </Form>
        <Tree
          checkedStrategy={checkedStrategy}
          checkable
          checkedKeys={checkedKeys}
          onCheck={(value, extra) => {
            setCheckedKeys(value);
          }}
          treeData={permissionData}
        ></Tree>
        <Button status="success" onClick={handleSubmit} style={{ width: '200px', marginTop: '12px' }}>
          新增
        </Button>
      </div>
    </Modal>
  );
};

export default Index;
