import React, { useState, ReactNode, useMemo } from 'react';
import styles from './index.module.less';
import { IconLeft } from '@arco-design/web-react/icon';
import { Tabs, Select, DatePicker, Pagination } from '@arco-design/web-react';
import Sbutton from 'src/components/Sbutton';
import locale from './locales';
import useI18n from 'src/ahooks/useI18n';
import dayjs, { Dayjs } from 'dayjs';
import MessageItem from './components/MessageItem';
import { useRequestAlertList } from 'apis';
import { useNavigate } from 'react-router-dom';
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;

const timeOptions = [
  { value: '1', label: 'r.today' },
  { value: '2', label: 'r.yesterday' },
  { value: '3', label: 'last.seven.days' },
  { value: '4', label: 'last.thirty.days' },
];

const page_size = 8;

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState('1');
  const navigate = useNavigate();
  const paramsStatus = activeTab === '0' ? undefined : +activeTab;
  const [timeRange, setTimeRange] = useState<Array<Dayjs>>([dayjs().subtract(7, 'day'), dayjs()]);
  const [searchTimeRange, setSearchTimeRange] = useState<Array<Dayjs>>(timeRange);
  const requestParams = useMemo(() => {
    let start = searchTimeRange[0].unix();
    let end = searchTimeRange[1].unix();
    return { page, page_size, status: paramsStatus, start, end };
  }, [page, page_size, paramsStatus, searchTimeRange]);
  const { data } = useRequestAlertList(requestParams);
  const totalPage = useMemo(() => {
    if (data?.count) {
      return Math.ceil(data.count / page_size);
    }
    return 0;
  }, [page_size, data?.count]);
  const handleSelectChange = (value: string) => {
    if (value === '1') {
      setTimeRange([dayjs().subtract(1, 'day'), dayjs()]);
      return;
    }
    if (value === '2') {
      setTimeRange([dayjs().subtract(2, 'day'), dayjs().subtract(1, 'day')]);
      return;
    }
    if (value === '3') {
      setTimeRange([dayjs().subtract(7, 'day'), dayjs()]);
      return;
    }
    if (value === '4') {
      setTimeRange([dayjs().subtract(1, 'month'), dayjs()]);
    }
  };
  const handelRangeChange = (value: Array<string>) => {
    if ((value[0], value[1])) {
      setTimeRange([dayjs(value[0]), dayjs(value[1])]);
    }
  };

  function itemRender(renderPage: number, type: 'page' | 'more' | 'prev' | 'next', originElement: ReactNode) {
    if (type === 'prev') {
      return <div className={styles['click-button']}>上一页</div>;
    }
    if (type === 'page') {
      if (page === renderPage) {
        return (
          <div className={styles['pagination-page']}>
            <span>{renderPage}</span>/{totalPage}
          </div>
        );
      } else {
        return null;
      }
    }
    if (type === 'next') {
      return <div className={styles['click-button']}>下一页</div>;
    }
  }
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <IconLeft onClick={() => navigate(-1)} /> {i18n[lang]['message.center']}
      </div>
      <div className={styles['navigate-item']}>
        <div className={styles['nav-left']}>
          <Tabs activeTab={activeTab} onChange={(value) => setActiveTab(value)}>
            <TabPane key="0" title={i18n[lang]['r.all']}></TabPane>
            <TabPane key="2" title={i18n[lang]['r.readed']}></TabPane>
            <TabPane key="1" title={i18n[lang]['r.unread']}></TabPane>
          </Tabs>
        </div>
        <div className={styles['nav-right']}>
          <div className={styles['nav-right-title']}>{i18n[lang]['r.time']}:</div>
          <div className={styles['nav-select']}>
            <Select placeholder="Please select" style={{ width: 154 }} onChange={handleSelectChange}>
              {timeOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {i18n[lang][option.label]}
                </Select.Option>
              ))}
            </Select>
          </div>

          <RangePicker style={{ width: 252 }} value={timeRange} onChange={handelRangeChange} />
          <Sbutton
            text={i18n[lang]['r.search']}
            style={{
              height: '34px',
              lineHeight: '34px',
              color: '#2D70F1',
              marginLeft: '8px',
              padding: '0 42px',
              minWidth: '118px',
            }}
            onClick={() => {
              setSearchTimeRange(timeRange);
            }}
          ></Sbutton>
        </div>
      </div>
      <div className={styles['show-content']}>
        <div className={styles['show-content-title']}>
          <div className={styles['show-content-title-title']}>{i18n[lang]['title.content']}</div>
          <div>{i18n[lang]['r.time']}</div>
          <div>{i18n[lang]['r.type']}</div>
        </div>
        <div className={styles['show-content-list']}>
          {data?.messages.map((item) => (
            <MessageItem {...item} key={item.id}></MessageItem>
          ))}
          {data?.messages.length === 0 && (
            <div className={styles['show-content-list-empyty']}>{i18n[lang]['empyty.tip']}</div>
          )}
        </div>
      </div>
      <div className={styles['pagination']}>
        <Pagination itemRender={itemRender} total={data?.count} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Index;
