import React, { useState } from 'react';
import styles from './index.module.less';
import { useRequestreportGet } from 'src/api/requestHooks';

import click from 'src/assets/images/datainfo-click.png';
import consume from 'src/assets/images/datainfo-consume.png';
import press from 'src/assets/images/datainfo-press.png';
import pressweb3 from 'src/assets/images/datainfo-press-web3.png';
import nodata from 'src/assets/images/datainfo-nodata.png';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const { data: dataOverview } = useRequestreportGet(10);
  // console.log("总览",dataOverview)
  const { data: dataOverview_7 } = useRequestreportGet(4);
  // console.log('dataOverview_7', dataOverview_7 && dataOverview_7[0]);
  const getOption = () => {
    const options = {
      color: ['#EC7F41', '#7B47B2'],
      // 悬浮的面板
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(223, 235, 242, 0.01)',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#000000',
          },
        },
      },
      // 筛选器
      legend: {
        data: [
          `${i18n[lang]['datainfo.contentExposure']}`,
          `${i18n[lang]['datainfo.contentClicks']}`,
          // `${i18n[lang]['datainfo.productDownloads']}`,
        ],
      },
      grid: {
        left: '30px',
        right: '30px',
        bottom: '20px',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['12.11', '12.12', '12.13', '12.14', '12.15', '12.16', '12.17'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        // {
        //   name: `${i18n[lang]['datainfo.productDownloads']}`,
        //   type: 'line',
        //   stack: 'Total',
        //   smooth: true,
        //   lineStyle: {
        //     width: 3,
        //   },
        //   showSymbol: false,
        //   areaStyle: {
        //     opacity: 0.2,
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: 'rgb(82,219,219)',
        //       },
        //       {
        //         offset: 1,
        //         color: 'rgb(255,255,255)',
        //       },
        //     ]),
        //   },
        //   emphasis: {
        //     focus: 'series',
        //   },
        //   data: [3392, 4392, 5392, 6392, 5392, 4392, 3392],
        // },
        {
          name: `${i18n[lang]['datainfo.contentClicks']}`,
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 3,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.2,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(236,127,65)',
              },
              {
                offset: 1,
                color: 'rgb(255,255,255)',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: [
            dataOverview_7 && dataOverview_7[0].click,
            dataOverview_7 && dataOverview_7[1].click,
            dataOverview_7 && dataOverview_7[2].click,
            dataOverview_7 && dataOverview_7[3].click,
            dataOverview_7 && dataOverview_7[4].click,
            dataOverview_7 && dataOverview_7[5].click,
            dataOverview_7 && dataOverview_7[6].click,
          ],
        },
        {
          name: `${i18n[lang]['datainfo.contentExposure']}`,
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 3,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.2,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(123,71,178)',
              },
              {
                offset: 1,
                color: 'rgb(255,255,255)',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: [
            dataOverview_7 && dataOverview_7[0].impression,
            dataOverview_7 && dataOverview_7[1].impression,
            dataOverview_7 && dataOverview_7[2].impression,
            dataOverview_7 && dataOverview_7[3].impression,
            dataOverview_7 && dataOverview_7[4].impression,
            dataOverview_7 && dataOverview_7[5].impression,
            dataOverview_7 && dataOverview_7[6].impression,
          ],
        },
      ],
      textStyle: {
        color: '#A2A3A5',
      },
    };
    return options;
  };
  return (
    <div>
      <div className={styles['container']}>
        <div className={styles['dataovervie-left']}>
          <p className={styles['dataovervie-left-title']}>{i18n[lang]['datainfo.dataOverview']}</p>
          <div className={styles['dataovervie-left-content']}>
            <div className={styles['dataovervie-box1']}>
              <p>{i18n[lang]['datainfo.totalClicks']}</p>
              <div className={styles['dataovervie-box1-inner']}>
                <img src={click} alt="click" />
                <p style={{ color: '#00CD83' }}>{dataOverview == null ? '0' : dataOverview && dataOverview[0].click}</p>
              </div>
            </div>
            <div className={styles['dataovervie-left-content-middle']}>{/* <img src={middle} alt="middle" /> */}</div>
            <div className={styles['dataovervie-box1']}>
              <p>{i18n[lang]['datainfo.totalFees']}</p>
              <div className={styles['dataovervie-box1-inner']}>
                <img src={consume} alt="consume" />
                <p style={{ color: '#E8A31F' }}>
                  {dataOverview == null ? '0' : dataOverview && dataOverview[0].cost.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['dataovervie-right']}>
          <div className={styles['dataovervie-right-content']}>
            <div className={styles['dataovervie-box2']}>
              <p>{i18n[lang]['datainfo.web2Hits']}</p>
              <div className={styles['dataovervie-box2-inner']}>
                <img src={press} alt="press" />
                <p>{dataOverview == null ? '0' : dataOverview && dataOverview[0].click}</p>
              </div>
            </div>
            <div className={styles['dataovervie-box3']}>
              <p>{i18n[lang]['datainfo.click-throughRate']}</p>
              <p style={{ color: '#6B0EDD', fontSize: '20px', fontWeight: '600' }}>
                {dataOverview == null ? '0' : dataOverview && dataOverview[0].ctr.toFixed(2)}%
              </p>
            </div>
            <div>
              <p>{i18n[lang]['datainfo.cost']}</p>
              <p style={{ color: '#6B0EDD', fontSize: '20px', fontWeight: '600' }}>
                ${dataOverview == null ? '0' : dataOverview && dataOverview[0].cost.toFixed(2)}
              </p>
            </div>
          </div>
          <div className={styles['dataovervie-right-content-middle']}> </div>
          <div className={styles['dataovervie-right-content']}>
            <div className={styles['dataovervie-box2']}>
              <p>{i18n[lang]['datainfo.web3Hits']}</p>
              <div className={styles['dataovervie-box2-inner']}>
                <img src={pressweb3} alt="press" />
                <p style={{ color: '#F17D1F' }}>0</p>
              </div>
            </div>
            <div className={styles['dataovervie-box3']}>
              <p>{i18n[lang]['datainfo.click-throughRate']}</p>
              <p style={{ color: '#F17D1F', fontSize: '20px', fontWeight: '600' }}>0.00%</p>
            </div>
            <div>
              <p>{i18n[lang]['datainfo.cost']}</p>
              <p style={{ color: '#F17D1F', fontSize: '20px', fontWeight: '600' }}>$0</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['chart-container']}>
        {dataOverview_7 ? (
          <ReactECharts option={getOption()} />
        ) : (
          <div className={styles['chart-container-nodata']}>
            <div className={styles['chart-container-nodata-right']}>
              <div>260M</div>
              <div>220M</div>
              <div>180M</div>
              <div>140M</div>
            </div>
            <div className={styles['chart-container-nodata-left']}>
              <div>12.11</div>
              <div>12.12</div>
              <div>12.13</div>
              <div>12.14</div>
              <div>12.15</div>
              <div>12.16</div>
              <div>12.17</div>
            </div>
            <div className={styles['chart-container-nodata-box']}>
              <img src={nodata} alt="nodata" className={styles['chart-container-nodata-box-img']} />
              <div className={styles['chart-container-nodata-box-note']}>无数据...</div>
            </div>
            <div className={styles['chart-container-nodata-bbox']}>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
