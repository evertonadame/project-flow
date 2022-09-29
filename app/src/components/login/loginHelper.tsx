import { WarningOutlined } from "@ant-design/icons";
import { notification } from "antd";

export const emailAredlyExistNotification = () => {
  notification.info({
    icon: <WarningOutlined />,
    message: `Email já existe`,
    description: "Vimos que esse email já existe em nosso banco de dados",
    placement: "bottomRight",
  });
};

export const invalidCredentials = (error: any) => {
  const { data } = error;

  const message =
    data.error === 400
      ? "Ops, senha errada"
      : data.error === 404
      ? "Usuário não encontrado"
      : "";

  return notification.info({
    icon: <WarningOutlined />,
    message: message,
    placement: "bottomRight",
  });
};
