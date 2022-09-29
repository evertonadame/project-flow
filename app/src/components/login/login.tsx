import { Button, Col, Form, Input, Modal, Row, Drawer } from "antd";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useUserLoginMutation } from "../../redux/service/user";
import Register from "./register";
import { useAppDispatch } from "../../redux/app/hooks";
import { setUserId } from "../../redux/service/slices/user-controller";
import { invalidCredentials } from "./loginHelper";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [userLogin, { isSuccess, isLoading, error, isError }] =
    useUserLoginMutation();
  const dispatch = useAppDispatch();
  const { userToken, id } = parseCookies();

  useEffect(() => {
    if (!userToken) {
      setOpen(true);
    }
  }, []);

  const onFinish = async (values: any) => {
    await userLogin({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserId(id));
      form.resetFields();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      invalidCredentials(error);
    }
  }, [isError]);

  return (
    <>
      <Modal
        title="Seja bem vindo"
        open={isSuccess ? !open : open}
        centered
        maskClosable={false}
        footer={
          <Row gutter={12}>
            <Col>
              <Button
                loading={isLoading}
                onClick={() => form.submit()}
                size="large"
                type="primary"
              >
                Entrar
              </Button>
            </Col>

            <Col>
              <Button size="large" onClick={() => setVisible(true)}>
                Registrar
              </Button>
            </Col>
          </Row>
        }
        onCancel={() => setOpen(false)}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Digite um e-mail valido",
                required: true,
              },
            ]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="password" placeholder="Senha" />
          </Form.Item>
        </Form>
        <Row>Não tem um cadastro ainda? Cadastre-se</Row>
      </Modal>
      <Drawer
        title="Registrar"
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Register setVisible={setVisible} />
      </Drawer>
    </>
  );
};

export default Login;
