import React, { useEffect, useMemo } from 'react';
import styles from './index.module.less';
import useI18n from 'src/ahooks/useI18n';
import locales from '../../locales';
import classNames from 'classnames';
import downGreenImage from 'src/assets/images/dashbord/down-green.png';
import upRedImage from 'src/assets/images/dashbord/up-red.png';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { LineChart, BarChart } from 'echarts/charts';
import { DatasetComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
echarts.use([LineChart, DatasetComponent, BarChart, CanvasRenderer, GridComponent]);
export enum ChartType {
  Bar = 'bar',
  Line = 'line',
}

interface DataItemProps {
  title: string;
  dataList: Array<number | string>;
  chartType?: ChartType;
}

const Index: React.FC<DataItemProps> = (props) => {
  const { lang, i18n } = useI18n(locales);
  const { title, dataList, chartType = ChartType.Line } = props;
  const lastData = useMemo(() => {
    if (dataList[6]) {
      return parseFloat((+dataList[6]).toFixed(2));
    }
    return 0;
  }, [dataList]);

  const comparaData = useMemo(() => {
    if (dataList[6] && dataList[5]) {
      return +dataList[6] - +dataList[5];
    }
    return 0;
  }, [dataList]);
  const itemStyle = useMemo(() => {
    if (chartType === ChartType.Bar) {
      return {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.056, color: '#4318FF' },
          { offset: 1, color: 'rgba(67, 24, 255, 0.28)' },
        ]),
        borderRadius: [12, 12, 0, 0],
      };
    }
    return {};
  }, [chartType]);
  const lineStyle = useMemo(() => {
    if (chartType === ChartType.Line) {
      if (comparaData > 0) {
        return { color: '#2D70F1' };
      } else {
        return { color: '#11BF42' };
      }
    }
    return {};
  }, [chartType, comparaData]);
  const getOption = () => {
    const options = {
      grid: { top: 0, right: 2, bottom: 2, left: 0 },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      yAxis: {
        show: false,
        min: 'dataMin',
      },
      series: [
        {
          data: dataList,
          type: chartType,
          smooth: true,
          showSymbol: false,
          lineStyle,
          itemStyle,
          barWidth: '40%',
          barCategoryGap: '10%',
        },
      ],
    };
    return options;
  };

  return (
    <div className={styles.container}>
      <div className={styles['left-area']}>
        <div className={styles.title}>{title}</div>
        <div className={styles['last-data']}>{lastData.toLocaleString()}</div>
        <div className={styles['compara-data']}>
          <div className={styles['compara-last-day']}>{`${i18n[lang]['dashbord.comparaLastDay']}`}</div>
          <div
            className={classNames(
              styles['compara-last-day-data'],
              comparaData >= 0 && styles.red,
              comparaData < 0 && styles.green,
            )}
          >
            {parseFloat(comparaData.toFixed(2)).toLocaleString()}
          </div>
          {comparaData >= 0 ? (
            <img src={upRedImage} className={styles['trend-image']} />
          ) : (
            <img src={downGreenImage} className={classNames(styles['up-image'], styles['trend-image'])} />
          )}
        </div>
      </div>
      <div className={styles['right-area']}>
        <ReactEChartsCore option={getOption()} style={{ height: '72px' }} echarts={echarts} />
      </div>
    </div>
  );
};

export default Index;
