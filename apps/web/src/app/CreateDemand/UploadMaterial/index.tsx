/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Upload, Message } from '@arco-design/web-react';
import UploadFile from 'src/assets/images/upload-file.png';
import downloadIcon from 'src/assets/images/download-icon.png';
import fileIcon from 'src/assets/images/file-icon.png';
import uploadAws from 'src/utils/uploadAws';

interface DownloadItemProps {
  name: string;
  url: string;
  hasBottomBorder?: boolean;
}

const DownloadItem: React.FC<DownloadItemProps> = ({ name, url, hasBottomBorder = false }) => {
  return (
    <div className={classNames(styles['download-item'], hasBottomBorder && styles['download-item-border'])}>
      <div className={styles['download-left']}>
        <img src={fileIcon} alt="" />
        <div>{name}</div>
      </div>
      <div className={styles['download-right']}>
        <img src={downloadIcon} alt="" />
      </div>
    </div>
  );
};

const Index = () => {
  const [fileList, setFileList] = useState([]);
  const handleUpload = async (option: any) => {
    const { onProgress, onError, onSuccess, file } = option;
    try {
      const res = await uploadAws(file, (progress) => {
        onProgress(parseInt(progress.toString(), 10));
      });
      onSuccess(res);
    } catch (error) {
      onError(error);
      console.log(error);
    }
  };
  return (
    <div className={styles['out-container']}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.title}>Step1</div>
          <div className={styles['sub-title']}>Web2渠道需求明细文档</div>
          <DownloadItem name="Web2投放所需物料明细" url="sad" hasBottomBorder />
          <DownloadItem name="Web2投放开户信息表" url="sad" />
          <div className={classNames(styles['sub-title'], styles['margin-top'])}>Web3渠道需求明细文档</div>
          <DownloadItem name="项目对接（PC类）" url="sad" hasBottomBorder />
          <DownloadItem name="游戏数据分析常用指标（广告业务方向）" url="sad" />
        </div>
        <div className={styles.middle}></div>
        <div className={styles.right}>
          <div className={styles.title}>Step2</div>
          <div className={styles.uploadContent}>
            <Upload
              drag
              multiple
              customRequest={handleUpload}
              fileList={fileList}
              onChange={setFileList as any}
              progressProps={{
                size: 'small',
                type: 'line',
                showText: true,
                width: '50%',
              }}
              onProgress={(file) => {
                setFileList((v: any) => {
                  return v.map((x: any) => {
                    return x.uid === file.uid ? file : x;
                  });
                });
              }}
            >
              <div className={styles['inner-upload']}>
                <img src={UploadFile} alt="" className={styles['upload-icon']} />
                <div className={styles['action-type']}>
                  Drag file here，or <span>click upload</span>
                </div>
                <div className={styles['action-type']}>物料展示【不限于文档/视频/图片/PSD/AI等】</div>
              </div>
            </Upload>
          </div>
        </div>
      </div>
      <div className={styles['button-wrrap']}>
        <div className={classNames('common-button', styles['next-step'])}>下一步</div>
      </div>
    </div>
  );
};

export default Index;
