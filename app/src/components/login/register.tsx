import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useCreateUserMutation } from "../../redux/service/user";
import { emailAredlyExistNotification } from "./loginHelper";

type Props = {
  setVisible: React.Dispatch<boolean>;
};

const Register = (props: Props) => {
  const { setVisible } = props;
  const [form] = Form.useForm();
  const [createUser, { isSuccess, isError, error, isLoading }] =
    useCreateUserMutation();

  const onFinish = async (values: any) => {
    await createUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (isError) {
      const {
        data: { error: userError },
      } = error ?? ({} as any);
      if (userError === 400) {
        emailAredlyExistNotification();
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
      form.resetFields();
    }
  }, [isSuccess]);

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="name"
        hasFeedback
        rules={[
          { type: "string", message: "Nome Obrigatório", required: true },
        ]}
      >
        <Input placeholder="Nome" />
      </Form.Item>
      <Form.Item
        hasFeedback
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
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Insira uma senha!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Digite uma senha!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("As senhas não são iguais!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button loading={isLoading} type="primary" onClick={() => form.submit()}>
        Registrar
      </Button>
    </Form>
  );
};

export default Register;
