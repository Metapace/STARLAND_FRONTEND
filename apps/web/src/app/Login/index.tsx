import React, { useState } from 'react';
// import axios from 'axios';
import { Form, Input, Button, Tabs, Grid } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLocalStorageState, useCountDown } from 'ahooks';
import useI18n from 'src/ahooks/useI18n';
import locales from './locales';
import styles from './index.module.less';
// import LoginLeftPng from 'src/assets/images/login-left.png';
// import LoginLogPng from 'src/assets/images/login-logo.png';

const TabPane = Tabs.TabPane;

type IUserParams = {
  username: string;
  password: string;
};
const FormItem = Form.Item;

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { lang, i18n } = useI18n(locales);
  const [leftTime, setLeftTime] = useState<number>(0);
  const navigate = useNavigate();
  const [userToken, setUserToken] = useLocalStorageState('userToken');
  const [_, formattedRes] = useCountDown({ leftTime, onEnd: () => setLeftTime(0) });
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     // 判断是否登陆
  //     if (userToken) {
  //       navigate('/weclome');
  //     }
  //   }, []);

  const onSubmit = () => {
    form.validate((err, values) => {
      if (err) {
        return;
      }
      const { username, password } = values;
      login({ username, password });
    });
  };

  const login = (params: IUserParams) => {
    navigate('/weclome');
    console.log(params);
    console.log(userToken);
    setUserToken('qdasdasdasdasdasdasd');
    // setLoading(true);
    // axios
    //   .post('/api/user/login', params)
    //   .then((res) => {
    //     const {
    //       status,
    //       msg,
    //       data: { token },
    //     } = res.data;
    //     console.log(msg);
    //     if (status === 'ok') {
    //       Message.success('登录成功');
    //       navigate('/weclome');
    //       setUserToken(token);
    //     } else {
    //       Message.error(msg);
    //     }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
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
                initialValues={{
                  username: '',
                  password: '',
                }}
                onSubmit={onSubmit}
              >
                <FormItem
                  field="username"
                  rules={[{ required: true, message: `${i18n[lang]['login.username.isNotEmpty']}` }]}
                >
                  <Input type="text" placeholder="Enter Email" />
                </FormItem>
                <FormItem>
                  <Grid.Row align="center">
                    <FormItem
                      field="password"
                      noStyle={{ showErrorTip: true }}
                      rules={[{ required: true, message: `${i18n[lang]['login.password.isNotEmpty']}` }]}
                    >
                      <Input placeholder="Enter Verification Code" style={{ flex: 1 }} />
                    </FormItem>
                    <div
                      className={styles['send-code-button']}
                      onClick={() => {
                        setLeftTime(60 * 1000);
                      }}
                    >
                      {leftTime > 0 ? `${formattedRes.seconds}s` : `${i18n[lang]['login.sendCode']}`}
                    </div>
                  </Grid.Row>
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" long className={'active-button'}>
                    {i18n[lang]['login.login']}
                  </Button>
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
