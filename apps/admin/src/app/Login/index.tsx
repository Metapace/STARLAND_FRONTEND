import React, { useEffect } from 'react';
import { Form, Input, Grid } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLocalStorageState } from 'ahooks';
import { TokenName } from 'utils';
import Sbutton from 'src/components/Sbutton';
import styles from './index.module.less';
import { useMutations, loginRequestBypassword } from 'apis';

type IUserParams = {
  email: string;
  password: string;
};
const FormItem = Form.Item;

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [userToken, setUserToken] = useLocalStorageState(TokenName);
  const navigateTo = () => navigate('/dashboard/workplace');

  useEffect(() => {
    // 判断是否登陆
    if (userToken) {
      navigateTo();
    }
  }, []);

  const login = async (params: IUserParams) => {
    const res = await loginRequestBypassword(params);
    if (res) {
      setUserToken(res);
      navigateTo();
    }
  };

  const mutationlogin = useMutations({
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
      <div className={styles['login-title']}>Starland 管理后台</div>
      <div className={styles['login-form']}>
        <Form
          form={form}
          style={{ width: 380 }}
          wrapperCol={{
            span: 24,
          }}
          onSubmit={onSubmit}
        >
          <FormItem
            field="email"
            rules={[
              { required: true, message: '请输入邮箱' },
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
                field="password"
                noStyle={{ showErrorTip: true }}
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input placeholder="Enter Password" style={{ flex: 1 }} type="password" />
              </FormItem>
            </Grid.Row>
          </FormItem>
          <FormItem>
            <Sbutton
              onClick={onSubmit}
              loading={mutationlogin.isLoading}
              text="登录"
              style={{ color: '#ffffff' }}
              className={styles['submit-button']}
            />
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
