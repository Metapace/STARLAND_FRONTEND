import React, { useState } from 'react';
import styles from './index.module.less';
import ReactECharts from 'echarts-for-react';
import { Select } from '@arco-design/web-react';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { useRequestreportGetClick } from 'apis';
import nodata from 'src/assets/images/datainfo-nodata.png';
import * as echarts from 'echarts/core';
const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const [days, setDays] = useState(2);
  const { data: dataClick, isLoading: dataClick_loading } = useRequestreportGetClick(days);

  const Option = Select.Option;

  const launchPeriod: Array<{ label: string; value: number }> = [
    { label: 'datainfo.yesterday', value: 2 },
    { label: 'datainfo.lastThreeDays', value: 3 },
    { label: 'datainfo.lastWeek', value: 4 },
    { label: 'datainfo.lastMonth', value: 5 },
    { label: 'datainfo.lastSixMonths', value: 6 },
  ];

  const getOption = () => {
    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '30px',
        right: '30px',
        bottom: '20px',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: dataClick && dataClick.map((item) => item.name),
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'linear-gradient(180deg, rgba(239, 132, 50, 0.11) 0%, rgba(217, 217, 217, 0) 100%)',
          },
        },
      },
      series: [
        {
          data: dataClick && dataClick.map((item) => item.click),
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
      
          showBackground: false,
          // itemStyle: {
          //   color: 'rgba(234, 9, 9, 1)',
          //   borderRadius: [0, 11, 11, 0],
          // },
          barWidth: 22,
          itemStyle: {
            borderRadius:[0, 10, 10, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                 { offset: 0, color: '#C7D6F1' },   
                 { offset: 1, color: '#2366E9' }
             ]),
          }
          
        },
      ],
    };
    return options;
  };
  return (
    <div className={styles['container']}>
      <div className={styles['dataclick-top']}>
        <p className={styles['dataclick-top-title']}>{i18n[lang]['datainfo.clickStats']}</p>
        <Select
          placeholder="Please select"
          defaultValue={i18n[lang]['datainfo.yesterday']}
          style={{ width: 154, backgroundColor: '#E5E9F2' }}
          onChange={(value) => {
            setDays(value);
          }}
        >
          {launchPeriod.map((item) => (
            <Option value={item.value} key={item.value}>
              {i18n[lang][item.label]}
            </Option>
          ))}
        </Select>
        <p className={styles['dataclick-top-note']}>{i18n[lang]['datainfo.dailyUpdate']}</p>
      </div>
      <div className={styles['chart-container']}>
        {dataClick_loading ? (
          <div className={styles['chart-container-nodata']}>
            <div className={styles['chart-container-nodata-right']}>
              <div>Tiktok</div>
              <div>Google</div>
              <div>Facebook</div>
              <div>bigo</div>
              <div>kwai</div>
            </div>
            <div className={styles['chart-container-nodata-left']}>
              <div>0</div>
              <div>0.2k</div>
              <div>0.4k</div>
              <div>0.6k</div>
              <div>0.8k</div>
              <div>1.0k</div>
              <div>1.2k</div>
              <div>1.4k</div>
              <div>1.6k</div>
              <div>1.8k</div>
              <div>2.0k</div>
            </div>
            <div className={styles['chart-container-nodata-box']}>
              <img src={nodata} alt="nodata" className={styles['chart-container-nodata-box-img']} />
              <div className={styles['chart-container-nodata-box-note']}>加载中...</div>
            </div>
            {/* <div className={styles['chart-container-nodata-bbox']}>
              <div>0000-00-00</div>
              <div className={styles['chart-container-nodata-bbox-box']}>
                <div className={styles['chart-container-nodata-bbox-box-1']}></div>
                <div className={styles['chart-container-nodata-bbox-box-2']}>内容曝光量</div>
                <div className={styles['chart-container-nodata-bbox-box-3']}>0</div>
              </div>
              <div className={styles['chart-container-nodata-bbox-box']}>
                <div className={styles['chart-container-nodata-bbox-box-1']} style={{ background: '#E88B40' }}></div>
                <div className={styles['chart-container-nodata-bbox-box-2']}>内容点击量</div>
                <div className={styles['chart-container-nodata-bbox-box-3']}>0</div>
              </div>
            </div> */}
          </div>
        ) : dataClick ? (
          <ReactECharts option={getOption()} />
        ) : (
          <div className={styles['chart-container-nodata']}>
            <div className={styles['chart-container-nodata-right']}>
              <div>Tiktok</div>
              <div>Google</div>
              <div>Facebook</div>
              <div>bigo</div>
              <div>kwai</div>
            </div>
            <div className={styles['chart-container-nodata-left']}>
              <div>0</div>
              <div>0.2k</div>
              <div>0.4k</div>
              <div>0.6k</div>
              <div>0.8k</div>
              <div>1.0k</div>
              <div>1.2k</div>
              <div>1.4k</div>
              <div>1.6k</div>
              <div>1.8k</div>
              <div>2.0k</div>
            </div>
            <div className={styles['chart-container-nodata-box']}>
              <img src={nodata} alt="nodata" className={styles['chart-container-nodata-box-img']} />
              <div className={styles['chart-container-nodata-box-note']}>无数据...</div>
            </div>
            {/* <div className={styles['chart-container-nodata-bbox']}>
              <div>0000-00-00</div>
              <div className={styles['chart-container-nodata-bbox-box']}>
                <div className={styles['chart-container-nodata-bbox-box-1']}></div>
                <div className={styles['chart-container-nodata-bbox-box-2']}>内容曝光量</div>
                <div className={styles['chart-container-nodata-bbox-box-3']}>0</div>
              </div>
              <div className={styles['chart-container-nodata-bbox-box']}>
                <div className={styles['chart-container-nodata-bbox-box-1']} style={{ background: '#E88B40' }}></div>
                <div className={styles['chart-container-nodata-bbox-box-2']}>内容点击量</div>
                <div className={styles['chart-container-nodata-bbox-box-3']}>0</div>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
