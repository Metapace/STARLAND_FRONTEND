import React, { useMemo } from 'react';
import { Modal, List, Input, Button, Form, Popconfirm, Message } from '@arco-design/web-react';
import { IconCheckCircle } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import {
  MaterialListItem,
  useMutationDeliverReviewMaterial,
  useMutationDesignReviewMaterial,
  AgeEnum,
  GenderEnum,
  useRequestAdminCountryList,
  useRequestAdminLanuageList,
} from 'apis';

import dayjs from 'dayjs';
const TextArea = Input.TextArea;

const FormItem = Form.Item;
export interface FVerifyProps {
  open: boolean;
  handlCloseModal: () => void;
  item?: MaterialListItem;
  isPermission: (params: string) => boolean | undefined;
}

const ageMap = {
  [AgeEnum.Ten]: '13-17',
  [AgeEnum.Tweenty]: '18-24',
  [AgeEnum.Thirty]: '25-34',
  [AgeEnum.Fourty]: '35-44',
  [AgeEnum.Fifty]: '45-54',
  [AgeEnum.PlusFifty]: '55+',
  [AgeEnum.NotLimited]: '不限',
};

const AgendarMap = {
  [GenderEnum.Female]: '女性',
  [GenderEnum.Male]: '男性',
  [GenderEnum.NotLimited]: '不限',
};

enum FormItemType {
  Delivery = 1,
  Design = 2,
}

interface FromItemProps {
  item: MaterialListItem;
  handlCloseModal: () => void;
  type: FormItemType;
  isPermission: (params: string) => boolean | undefined;
}

const FromItem: React.FC<FromItemProps> = ({ item, handlCloseModal, type, isPermission }) => {
  const [form] = Form.useForm();
  const { mutateAsync: mutateDeliverAsync, isLoading: isDeliverLoading } = useMutationDeliverReviewMaterial();
  const { mutateAsync: mutateDesignAsync, isLoading: isDesignLoading } = useMutationDesignReviewMaterial();
  const isDisable = useMemo(() => {
    if (type === FormItemType.Delivery) {
      console.log(type, '00000000', isPermission('/api/admin/activity/deliver/verify'));
      if (isPermission('/api/admin/activity/deliver/verify')) {
        return false;
      }
      return true;
    }
    if (type === FormItemType.Design) {
      if (isPermission('/api/admin/activity/design/verify')) {
        return false;
      }
      return true;
    }
    return true;
  }, [isPermission]);
  const innerStatus = useMemo(() => {
    if (type === FormItemType.Delivery) return item.deliver;
    if (type === FormItemType.Design) return item.design;
  }, [item]);
  const handleReject = async () => {
    form.validate().then(async (res) => {
      if (item) {
        const mutateAsync = type === FormItemType.Delivery ? mutateDeliverAsync : mutateDesignAsync;
        await mutateAsync({ id: item?.id, status: 1, reason: res.reason });
        Message.success('操作成功！');
        handlCloseModal();
      }
    });
  };

  const handlePass = async () => {
    if (item?.id) {
      if (item) {
        const mutateAsync = type === FormItemType.Delivery ? mutateDeliverAsync : mutateDesignAsync;
        await mutateAsync({ id: item?.id, status: 2 });
        Message.success('操作成功！');
        handlCloseModal();
      }
    }
  };
  const isDelivery = type === FormItemType.Delivery;
  console.log(isDisable, 'isDisable');
  return (
    <>
      <div className={styles['opreate-title']}>{isDelivery ? '投放部审核意见' : '设计部审核意见'}</div>
      {innerStatus === 0 && (
        <div className={styles['opreate-area']}>
          <div className={styles['red-alert']}>若不通过，请输入驳回理由:</div>
          <Form wrapperCol={{ span: 24 }} form={form}>
            <FormItem field="reason" rules={[{ required: true, message: '驳回操作请填入驳回理由' }]}>
              <TextArea placeholder="请输入驳回的理由" style={{ width: '400px' }} disabled={isDisable} />
            </FormItem>
          </Form>

          <div className={styles['verify-button']}>
            <Button
              style={{ width: '140px' }}
              status="danger"
              onClick={handleReject}
              loading={isDelivery ? isDeliverLoading : isDesignLoading}
              disabled={isDisable}
            >
              驳回
            </Button>
            <Popconfirm
              focusLock
              title="提醒"
              content={`请进行${item?.name}相关物料素材的二次确认。`}
              onOk={handlePass}
              okText="确认通过"
              disabled={isDisable}
            >
              <Button
                type="secondary"
                status="success"
                style={{ width: '140px' }}
                loading={isDelivery ? isDeliverLoading : isDesignLoading}
                disabled={isDisable}
              >
                通过
              </Button>
            </Popconfirm>
          </div>
        </div>
      )}
      {innerStatus === 2 && (
        <Button
          icon={<IconCheckCircle />}
          type="secondary"
          status="success"
          style={{ width: '200px', marginTop: '12px' }}
          disabled
        >
          已通过
        </Button>
      )}
      {innerStatus === 1 && (
        <div className={styles['reject-area']}>
          <div className={styles['red-alert']}>驳回理由</div>
          <TextArea value={isDelivery ? item.deliver_reason : item.design_reason} disabled></TextArea>
        </div>
      )}
    </>
  );
};

const Index: React.FC<FVerifyProps> = ({ open, item, handlCloseModal, isPermission }) => {
  const { data: countryObject } = useRequestAdminCountryList();
  const { data: languageObject } = useRequestAdminLanuageList();
  const dataSource = useMemo(() => {
    if (item && countryObject && languageObject) {
      const ages = item?.age
        .split(',')
        .map((key: any) => ageMap[key])
        .join(',');

      const showCountry = item.country
        .split(',')
        .map((key: any) => countryObject[key])
        .join(',');
      const showLang = languageObject[item.lauguage];
      return [
        { title: '项目名称', description: `${item.name}` },
        {
          title: '投放时间',
          description: `${dayjs.unix(item.start).format('YYYY-MM-DD')} 至 ${dayjs.unix(item.end).format('YYYY-MM-DD')}`,
        },
        { title: '投放国家', description: showCountry },
        { title: '投放语言', description: showLang },
        { title: '投放人群', description: `${AgendarMap[item.crowd]} | ${ages}` },
        { title: '每日预算', description: `$${item.price}` },
        { title: '活动名称前缀', description: `${item.user_id}-${item.id}-` },
      ];
    }
    return [];
  }, [item, countryObject, languageObject]);

  const linkList = useMemo(() => {
    if (item) {
      const lists = item.materials_url.split(',');
      return lists.map((item) => {
        const itemlist = item.split('/');
        const showIytem = itemlist[itemlist.length - 1];
        const showItemList = showIytem.split('-');
        showItemList.splice(0, 1);
        return { label: showItemList.join(''), value: item };
      });
    }
    return [];
  }, [item]);
  return (
    <Modal visible={open} title="投放订单信息表" footer={null} onCancel={handlCloseModal} style={{ width: '800px' }}>
      <div className={styles['modal-inner']}>
        <List
          style={{ width: 600 }}
          dataSource={dataSource}
          render={(item, index) => (
            <List.Item key={index}>
              <div className={styles['list-item-inner']}>
                <div>{item.title}</div>
                <div>{item.description}</div>
              </div>
            </List.Item>
          )}
        />
        <div className={styles['bottom-content']}>
          <div className={styles['bottom-left']}>
            <div className={styles['left-title']}>投放订单附件下载</div>
            {linkList.map((item) => (
              <div className={styles['download-item']} key={item.value}>
                <a href={item.value} download>
                  {decodeURI(item.label)}
                </a>
              </div>
            ))}
          </div>
          <div className={styles['bottom-right']}>
            <FromItem
              item={item!}
              type={FormItemType.Delivery}
              handlCloseModal={handlCloseModal}
              isPermission={isPermission}
            />
            <FromItem
              item={item!}
              type={FormItemType.Design}
              handlCloseModal={handlCloseModal}
              isPermission={isPermission}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Index;
