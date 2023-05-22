import React, { useState } from 'react';
import styles from './index.module.less';

import click from 'src/assets/images/datainfo-click.png';
import consume from 'src/assets/images/datainfo-consume.png';
import press from 'src/assets/images/datainfo-press.png';
import pressweb3 from 'src/assets/images/datainfo-press-web3.png';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { Select } from '@arco-design/web-react';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const Option = Select.Option;
  const options = [
    `${i18n[lang]['datainfo.yesterday']}`,
    `${i18n[lang]['datainfo.lastThreeDays']}`,
    `${i18n[lang]['datainfo.lastWeek']}`,
    `${i18n[lang]['datainfo.lastMonth']}`,
    `${i18n[lang]['datainfo.lastSixMonths']}`,
  ];
  const getOption = () => {
    const options = {
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
        data: [
          `${i18n[lang]['datainfo.Tiktok']}`,
          `${i18n[lang]['datainfo.Google']}`,
          `${i18n[lang]['datainfo.Twitter']}`,
        ],
      },
      series: [
        {
          data: [120, 200, 150],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 10,0, 0)',
          },
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
          style={{ width: 154 }}
          // onChange={(value) =>
          //   Message.info({
          //     content: `You select ${value}.`,
          //     showIcon: true,
          //   })
          // }
        >
          {options.map((option, index) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <p className={styles['dataclick-top-note']}>{i18n[lang]['datainfo.dailyUpdate']}</p>
      </div>
      <div className={styles['chart-container']}>
        <ReactECharts option={getOption()} />
      </div>
    </div>
  );
};

export default Index;
