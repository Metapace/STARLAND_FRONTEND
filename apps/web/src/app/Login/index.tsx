import React, { useState, useEffect } from 'react';
import { Form, Input, Tabs, Grid, Message } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLocalStorageState, useCountDown } from 'ahooks';
import { TokenName } from 'src/utils/localSet';
import Sbutton from 'src/components/Sbutton';
import useI18n from 'src/ahooks/useI18n';
import locales from './locales';
import styles from './index.module.less';
import { useMutation } from '@tanstack/react-query';
import { sendCodeRequest, loginRequest } from 'apis';
const TabPane = Tabs.TabPane;

type IUserParams = {
  email: string;
  code: string;
};
const FormItem = Form.Item;

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { lang, i18n } = useI18n(locales);
  const [leftTime, setLeftTime] = useState<number>(0);
  const navigate = useNavigate();
  const [userToken, setUserToken] = useLocalStorageState(TokenName);
  const [, formattedRes] = useCountDown({ leftTime, onEnd: () => setLeftTime(0) });
  //   const [loading, setLoading] = useState(false);
  const navigateTo = () => navigate('/dashboard/workplace');

  useEffect(() => {
    // 判断是否登陆
    if (userToken) {
      navigateTo();
    }
  }, []);

  const handleSendCode = async () => {
    await form.validate(['email']);
    const email = form.getFieldValue('email');
    await sendCodeRequest(email);
    Message.success('Code has been send');
    setLeftTime(60 * 1000);
  };

  const login = async (params: IUserParams) => {
    const res = await loginRequest(params);
    if (res?.token) {
      setUserToken(res.token);
      navigateTo();
    }
  };

  const mutation = useMutation({
    mutationFn: handleSendCode,
  });
  const mutationlogin = useMutation({
    mutationFn: login,
  });

  const onSubmit = () => {
    form.validate((err, values) => {
      if (err) {
        return;
      }
      mutationlogin.mutate(values);
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <video muted loop className={styles['back-video']} autoPlay>
          <source src="src/assets/video/login-back.mp4" type="video/mp4" />
        </video>
        {/* <LazyLoadImage alt={'pan'} effect="blur" src={LoginLeftPng} /> */}
        {/* <img src={LoginLeftPng} className={styles['background-imgae']} /> */}
        {/* <div className={styles['background-content']}>
          <div className={styles['background-content-inner']}>
            <div className={styles['login-png-container']}>
              <img src={LoginLogPng} alt="" />
            </div>

            <div className={styles['background-content-inner-text']}>{`${i18n[lang]['login.slogan']}`}</div>
            <div className={styles['slogan-bottom-line']}></div>
          </div>
        </div> */}
      </div>
      <div className={styles.right}>
        <div className={styles['right-inner']}>
          <div className={styles.title}>{`${i18n[lang]['login.login']}`}</div>
          <Tabs defaultActiveTab="1" className={styles['login-tab']}>
            <TabPane key="1" title={`${i18n[lang]['login.email']}`}>
              <div className={styles['email-label']}>{`${i18n[lang]['login.email.text']}`}</div>
              <Form
                form={form}
                style={{ width: 410 }}
                wrapperCol={{
                  span: 24,
                }}
                onSubmit={onSubmit}
              >
                <FormItem
                  field="email"
                  rules={[
                    { required: true, message: `${i18n[lang]['login.username.isNotEmpty']}` },
                    {
                      type: 'email',
                      validateLevel: 'error',
                      message: 'please enter right email',
                    },
                  ]}
                >
                  <Input type="text" placeholder="Enter Email" />
                </FormItem>
                <FormItem>
                  <Grid.Row align="center">
                    <FormItem
                      field="code"
                      noStyle={{ showErrorTip: true }}
                      rules={[{ required: true, message: `${i18n[lang]['login.password.isNotEmpty']}` }]}
                    >
                      <Input placeholder="Enter Verification Code" style={{ flex: 1 }} />
                    </FormItem>
                    <Sbutton
                      loading={mutation.isLoading}
                      className={styles['send-code-button']}
                      onClick={mutation.mutateAsync}
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
                  />
                </FormItem>
              </Form>
            </TabPane>
            <TabPane key="3" title={`${i18n[lang]['login.wallet']}`}>
              <div className={styles['coming-soon']}>coming soon...</div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
