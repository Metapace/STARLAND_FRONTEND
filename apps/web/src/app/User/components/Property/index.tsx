import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import assetsweb2logo from 'src/assets/images/usercenter-assets-web2logo.png';
import assetsweb3logo from 'src/assets/images/usercenter-assets-web3logo.png';
import copybtn from 'src/assets/images/usercenter-assets-copybtn.png';
import eth from 'src/assets/images/usercenter-assets-eth.png';
import polygon from 'src/assets/images/usercenter-assets-polygon.png';
import attention from 'src/assets/images/usercenter-assets-attention.png';
import QRcode from 'src/assets/images/usercenter-assets-QRcode.png';
import Clipboard from 'clipboard';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { useRequestCompanyInfo, useRequestDashboardInfo, useRequestMinInAmount } from 'apis';

interface CompanyBoxProps {
  title?: string;
  info?: string;
}

const CompanyBox: React.FC<CompanyBoxProps> = ({ title, info }) => {
  const { lang, i18n } = useI18n(locale);
  const [isCopied, setIsCopied] = useState(false);
  const copy = new Clipboard('.copy-btn');
  //* Handle alerts
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className={styles['companybox']}>
      <div className={styles['companybox-left']}>
        <p>{title}</p>
        <div id="foo" className={styles['companybox-info']}>
          {info}
        </div>
      </div>
      <div className={styles['companybox-right']}>
        <img
          src={copybtn}
          alt="copybtn"
          data-clipboard-text={info}
          className="copy-btn"
          onClick={() => setIsCopied(true)}
        />
        {isCopied && <div className={styles['companybox-right-status']}>{i18n[lang]['usercenter.copied']}!</div>}
      </div>
    </div>
  );
};

interface PropertyProps {
  handleOpenVoucherModal: any;
  handleCloseVoucherModal: any;
}

const index: React.FC<PropertyProps> = ({ handleOpenVoucherModal, handleCloseVoucherModal }) => {
  const { lang, i18n } = useI18n(locale);
  const { data } = useRequestCompanyInfo();
  const { data: data2 } = useRequestDashboardInfo();
  const { data: data3 } = useRequestMinInAmount();

  return (
    <div className={styles['container']}>
      <div className={styles['assets-web2']}>
        <div className={styles['assets-web2-banner']}>
          <div className={styles['assets-web2-banner-info']}>
            <img src={assetsweb2logo} alt="assetsweb2logo" />
            <div>
              <p style={{ fontSize: '14px', color: '#2B3674' }}>
                {i18n[lang]['usercenter.fiatAssets']}
                <span style={{ fontSize: '12px', color: 'rgba(43, 54, 116, 0.32)' }}>（USD）</span>
              </p>
              <p style={{ fontSize: '14px', color: '#2B3674' }}>{data2?.available_balance.toFixed(2)}</p>
            </div>
          </div>
          <button onClick={handleOpenVoucherModal}>{i18n[lang]['usercenter.uploadCertificate']}</button>
        </div>
        <div className={styles['assets-web2-companyinfo']}>
          <CompanyBox title={i18n[lang]['usercenter.bankName']} info={data?.bank_name} />
          <CompanyBox title={i18n[lang]['usercenter.bankAddress']} info={data?.bank_address} />
          <CompanyBox title={i18n[lang]['usercenter.swiftCode']} info={data?.swift} />
          <CompanyBox title={i18n[lang]['usercenter.receiptAccountNumber']} info={data?.card_no} />
          <CompanyBox title={i18n[lang]['usercenter.payeeName']} info={data?.name} />
          <CompanyBox title={i18n[lang]['usercenter.countryOfRecipient']} info={data?.country} />
        </div>
        <div style={{ color: '#F12D50' }}>
          <p>{i18n[lang]['usercenter.pleaseNote']}!</p>
          <p>{i18n[lang]['usercenter.note1']}</p>
          <p>{i18n[lang]['usercenter.note2']}</p>
          <p>
            {i18n[lang]['usercenter.note3-before']}
            {data3}
            {i18n[lang]['usercenter.note3-after']}
          </p>
        </div>
      </div>
      <div className={styles['assets-web3']}>
        <div className={styles['assets-web3-banner']}>
          <div className={styles['assets-web3-banner-info']}>
            <img src={assetsweb3logo} alt="assetsweb2logo" />
            <div>
              <p style={{ fontSize: '14px', color: '#2B3674' }}>
                {i18n[lang]['usercenter.digitalAssets']}
                <span style={{ fontSize: '12px', color: 'rgba(43, 54, 116, 0.32)' }}>（USDT）</span>
              </p>
              <p style={{ fontSize: '14px', color: '#2B3674' }}>0</p>
            </div>
          </div>
          <button>{i18n[lang]['usercenter.chainPayment']}</button>
        </div>
        <p style={{ color: '#2B3674', margin: 0 }}>{i18n[lang]['usercenter.networksThatSupportRecharge']}</p>
        <div className={styles['assets-web3-chain']}>
          <div className={styles['assets-web3-chain-info']}>
            <img src={eth} alt="eth" />
            <span>Ethereum</span>
          </div>
          <div className={styles['assets-web3-chain-info']}>
            <img src={polygon} alt="polygon" />
            <span>Polygon</span>
          </div>
        </div>
        <div className={styles['assets-web3-attention']}>
          <img src={attention} alt="attention" />
          <span>{i18n[lang]['usercenter.netNote']}</span>
        </div>
        <div className={styles['assets-web3-inner']}>
          <img src={QRcode} alt="QRcode" />
          <p>{i18n[lang]['usercenter.USDTQRCodeRecharge']}</p>
        </div>
        <CompanyBox
          title={i18n[lang]['usercenter.USDTDepositAddress']}
          // info={i18n[lang]['usercenter.USDTDepositAddress']}
          info={""}
        />
      </div>
    </div>
  );
};

export default index;
