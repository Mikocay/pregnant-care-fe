import { createUserPending } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { Button, Input, Modal, Form, Spin, notification } from "antd"
import { useEffect } from "react";

interface UserCreateProps {
  isOpenCreateModal: boolean;
  setIsOpenCreateModal: (value: boolean) => void;
}

function UserCreateModal(props: UserCreateProps) {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;
  const [api, contextHolder] = notification.useNotification();


  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(state => state.users.isCreating);
  const isCreateSuccess = useAppSelector(state => state.users.isCreateSuccess);
  const errors = useAppSelector(state => state.users.errors);
  const message = useAppSelector(state => state.users.message);

  const handleCancel = () => {
    form.resetFields();
    setIsOpenCreateModal(false);

  };

  useEffect(() => {
    if (isCreateSuccess) {
      setIsOpenCreateModal(false);
      api.success({
        message: "Success",
      });
    } else {
      if (errors) {
        api.error({
          message: "Failed",
          description: message,
        });
      }
    }
  }, [api, errors, isCreateSuccess, message, setIsOpenCreateModal])


  const handleSubmit = (values: { email: string; password: string }) => {
    form.resetFields();
    dispatch(createUserPending({ email: values.email, password: values.password }));
  }
  return (
    <>
      {contextHolder}
      <Modal
        title="Create New Member"
        open={isOpenCreateModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              {!isCreating ? (
                <>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button type="primary" htmlType="submit" style={{ backgroundColor: "#EA6666" }}>
                    Create
                  </Button>
                </>
              ) : (
                <Button key="loading" type="primary" disabled>
                  <Spin size="small" style={{ color: "#EA6666" }} /> Loading...
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}

export default UserCreateModal