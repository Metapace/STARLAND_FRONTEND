import React from 'react';
import { Tree } from '@arco-design/web-react';
import permissionData from 'src/conifg/permission';

interface TreeProps {
  value?: Array<string>;
  onChange?: (params: any) => void;
}

const Index: React.FC<TreeProps> = (props) => {
  const value = props.value || [];
  return (
    <div style={{ height: '38vh', overflow: 'scroll' }}>
      <Tree
        checkedStrategy={Tree.SHOW_ALL}
        checkable
        checkedKeys={value.filter((v) => v.startsWith('/api'))}
        selectedKeys={value}
        onCheck={(value, extra) => {
          props.onChange && props.onChange([...value, ...extra.halfCheckedKeys]);
        }}
        treeData={permissionData}
      ></Tree>
    </div>
  );
};

export default Index;
