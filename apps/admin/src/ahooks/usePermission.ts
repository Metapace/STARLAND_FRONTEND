import React, { useMemo } from 'react';
import { useRequestUserIndfo, useRequestUserPermissionList } from 'apis';
import permission, { findKey } from 'src/conifg/permission';

const usePermission = () => {
  const { data } = useRequestUserIndfo();
  const { data: permissionDat, isLoading: permissionLoading } = useRequestUserPermissionList();
  const allPermissionList = useMemo(() => {
    return findKey(permission);
  }, []);
  const permissionList = useMemo(() => {
    if (data?.role_id === '1') {
      return allPermissionList;
    } else {
      return permissionDat?.split(',');
    }
  }, [data, permissionDat, allPermissionList]);

  const isPermission = (permission: string) => {
    return permissionList?.includes(permission);
  };
  console.log(permissionList, '--');
  return { permissionList, isPermission, permissionLoading };
};

export default usePermission;
