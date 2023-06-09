/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { Upload } from '@arco-design/web-react';
import UploadFile from 'src/assets/images/upload-file.png';
import downloadIcon from 'src/assets/images/download-icon.png';
import fileIcon from 'src/assets/images/file-icon.png';
import uploadAws from 'src/utils/uploadAws';
import useI18n from 'src/ahooks/useI18n';
import locales from '../locales';
import Sbutton from 'src/components/Sbutton';

interface DownloadItemProps {
  name: string;
  url: string;
  hasBottomBorder?: boolean;
  disable?: boolean;
}

const DownloadItem: React.FC<DownloadItemProps> = ({ name, url, hasBottomBorder = false, disable = false }) => {
  const aStyle: CSSProperties = disable
    ? { textDecoration: 'none', pointerEvents: 'none' }
    : { textDecoration: 'none' };
  return (
    <a href={url} download style={aStyle}>
      <div
        className={classNames(
          styles['download-item'],
          hasBottomBorder && styles['download-item-border'],
          disable && styles['disable-download-item'],
        )}
      >
        <div className={styles['download-left']}>
          <img src={fileIcon} alt="" />
          <div>{name}</div>
        </div>
        <div className={styles['download-right']}>
          <img src={downloadIcon} alt="" />
        </div>
      </div>
    </a>
  );
};

const Index = ({
  fileList,
  setFileList,
  handleSubmit,
  isLoading,
  isEdit = false,
  isDisable = false,
  handlePreviousStep,
}: any) => {
  const { lang, i18n } = useI18n(locales);
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
        {!isEdit && (
          <div className={styles.left}>
            <div className={styles.title}> {i18n[lang]['r.step1']}</div>
            <div className={styles['sub-title']}>{i18n[lang]['web2.channel.doc']}</div>
            <DownloadItem
              name={i18n[lang]['web2.launch.doc']}
              url="https://starlands3.s3.ap-southeast-1.amazonaws.com/starland/1685944206494-Web2%E6%B8%A0%E9%81%93%E6%8A%95%E6%94%BE%E6%89%80%E9%9C%80%E7%89%A9%E6%96%99%E6%98%8E%E7%BB%86.xlsx"
              hasBottomBorder
            />
            <DownloadItem
              name={i18n[lang]['web2.launch.info']}
              url="https://starlands3.s3.ap-southeast-1.amazonaws.com/starland/1685944170875-web2%E6%B8%A0%E9%81%93%E6%8A%95%E6%94%BE%E5%BC%80%E6%88%B7%E4%BF%A1%E6%81%AF%E8%A1%A8.xlsx"
            />
            <div className={classNames(styles['sub-title'], styles['margin-top'])}>
              {i18n[lang]['web3.channel.doc']}
            </div>
            <DownloadItem
              name={i18n[lang]['project.docking']}
              url="https://starlands3.s3.ap-southeast-1.amazonaws.com/starland/1684749236622-favicon.ico"
              hasBottomBorder
              disable
            />
            <DownloadItem
              name={i18n[lang]['common.indicators']}
              url="https://starlands3.s3.ap-southeast-1.amazonaws.com/starland/1684749236622-favicon.ico"
              disable
            />
          </div>
        )}
        {!isEdit && <div className={styles.middle}></div>}

        <div className={styles.right}>
          {!isEdit && <div className={styles.title}>{i18n[lang]['r.step2']}</div>}

          <div className={classNames(styles.uploadContent, isEdit && styles['edit-upload-content'])}>
            <Upload
              drag
              multiple
              customRequest={handleUpload}
              fileList={fileList}
              disabled={isDisable}
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
                  {i18n[lang]['r.upload.tip.1']} <span>{i18n[lang]['r.upload.tip.2']}</span>
                </div>
                <div className={styles['action-type']}>{i18n[lang]['material.display.tip']}</div>
              </div>
            </Upload>
          </div>
        </div>
      </div>
      {handleSubmit && (
        <div className={styles['button-wrrap']}>
          <Sbutton
            className={styles['next-step']}
            onClick={handlePreviousStep}
            text={i18n[lang]['previous.step']}
            style={{ color: '#2d70f1' }}
          />
          <Sbutton
            loading={isLoading}
            className={styles['next-step']}
            onClick={handleSubmit}
            text={i18n[lang]['next.step']}
            style={{ color: '#2d70f1' }}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
