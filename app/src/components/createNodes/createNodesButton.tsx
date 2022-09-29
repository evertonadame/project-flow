import { useFlowContext } from "../flow/context";
import { useState } from "react";
import { Button, Drawer, Form, Input, Select, Row, Col } from "antd";
import { selectOptions, selectOptionsType } from "./createNodesHelpers";
import { useCreateNodeMutation } from "../../redux/service/nodes";
import { useAppSelector } from "../../redux/app/hooks";
import { makeStringNumbersToPosition } from "../flow/flowHelpers";
import { parseCookies } from "nookies";
import { NodeCreateDto } from "../../shared/types/node.dto";

const Option = Select.Option;

const CreateNodeButton = () => {
  const [, dispatch] = useFlowContext();
  const [visible, setVisible] = useState(false);
  const [flowName, setFlowName] = useState("");
  const [form] = Form.useForm();
  const [createNode] = useCreateNodeMutation();
  const { id } = parseCookies();
  const { userId } = useAppSelector((state) => state.user);

  const onFinish = async (values: NodeCreateDto) => {
    if (values.title && values.type !== undefined) {
      const node = {
        type: values.type,
        userId: userId ? userId : id,
        label: values.title,
        position: "x: 150, y: 170",
      };
      await createNode(node).then(() => {
        dispatch({
          type: "createFlow",
          payload: {
            data: [
              {
                id: "integer",
                type: values.type,
                userId: userId ? userId : id,
                data: { label: values.title },
                position: makeStringNumbersToPosition("x: 150, y: 170"),
              },
            ],
          },
        });
        form.resetFields();
        setVisible(false);
      });
    }
  };

  return (
    <>
      <Button
        style={{ position: "absolute", left: "50%", top: 10, zIndex: 4 }}
        onClick={() => setVisible(true)}
      >
        +
      </Button>
      <Drawer
        title={flowName ? flowName : "Título"}
        placement="top"
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Form form={form} name="basic" onFinish={onFinish}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="title">
                <Input
                  type="text"
                  size="large"
                  placeholder="Título"
                  value={flowName}
                  onChange={(event) => setFlowName(event.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="edges">
                <Select mode="tags" size="large" placeholder="Edges">
                  {selectOptions.map((option) => {
                    return (
                      <Option key={option.id} value={option.value}>
                        {option.label}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type">
                <Select size="large" placeholder="Tipo">
                  {selectOptionsType.map((option) => {
                    return (
                      <Option key={option.id} value={option.value}>
                        {option.label}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button
          onClick={() => {
            form.submit();
          }}
          type="primary"
        >
          Salvar
        </Button>
      </Drawer>
    </>
  );
};

export default CreateNodeButton;
