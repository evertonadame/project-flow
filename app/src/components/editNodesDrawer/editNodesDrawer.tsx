import { useFlowContext } from "../flow/context";
import { Button, Drawer, Form, Input } from "antd";
import { Node } from "react-flow-renderer";

type Props = {
  data: Node;
  open: boolean;
  setOpen: React.Dispatch<boolean>;
};
const EditNodesDrawer = (props: Props) => {
  const { open, data, setOpen } = props;
  const label = data?.id || "";
  const [form] = Form.useForm();
  const [, dispatch] = useFlowContext();

  const onFinish = (values: { title: string }) => {
    if (values !== undefined) {
      const node = {
        id: data.id,
        type: data.type,
        position: data.position,
        data: { label: values.title },
      };

      dispatch({
        type: "updateFlow",
        payload: {
          data: node,
        },
      });

      setTimeout(() => {
        form.resetFields();
        setOpen(false);
      }, 200);
    }
  };
  return (
    <>
      <Drawer
        title="Editar"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={() => setOpen(false)} type="text">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                form.submit();
              }}
              type="primary"
            >
              Salvar
            </Button>
          </div>
        }
      >
        <Form onFinish={onFinish} form={form} name="basic">
          <Form.Item name="title">
            <Input type="text" placeholder={label} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default EditNodesDrawer;
