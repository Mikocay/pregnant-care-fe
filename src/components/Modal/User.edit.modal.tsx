import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { useEffect, useState } from "react";
import { Button, Input, Modal, Form, Select, Spin, notification } from "antd"
import { editUserPending } from "@/redux/features/user/slice";
import { IUser } from "@/redux/features/types/userType";
const { Option } = Select;

interface UserEditProps {
    isOpenUpdateModal: boolean;
    setIsOpenUpdateModal: (value: boolean) => void;
    dataUser: IUser;
}

const UserEditModal = (props: UserEditProps) => {
    const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser } = props;
    const [id, setId] = useState<string>("");
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    const isEditing = useAppSelector(state => state.users.isEditing);
    const isEditSuccess = useAppSelector(state => state.users.isEditSuccess);
    const errors = useAppSelector(state => state.users.errors);
    const message = useAppSelector(state => state.users.message);

    const handleCancel = () => {
        setIsOpenUpdateModal(false);
    };

    useEffect(() => {
        if (dataUser?.id) {
            setId(dataUser?.id);
        }
    }, [dataUser])

    useEffect(() => {
        if (isEditSuccess) {
            setIsOpenUpdateModal(false)
            api.success({
                message: "Success",
            })
        } else {
            if (errors) {
                api.error({
                    message: "Failed",
                    description: message,
                })
            }
        }
    }, [api, errors, isEditSuccess, message, setIsOpenUpdateModal])

    const handleSubmit = (values: Partial<IUser>) => {
        console.log("Values", values)
        if (id) {
            dispatch(editUserPending({ id, body: values }))
        }
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Edit User"
                open={isOpenUpdateModal}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={dataUser} // Điền giá trị mặc định từ user được chọn
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: "Please input first name!" }]}
                    >
                        <Input placeholder="Enter first name" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: "Please input last name!" }]}
                    >
                        <Input placeholder="Enter last name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please input email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="Enter email" disabled />
                    </Form.Item>

                    <Form.Item label="Blood Type" name="bloodType">
                        <Input placeholder="Enter blood type" />
                    </Form.Item>

                    <Form.Item label="Phone Number" name="phoneNumber">
                        <Input placeholder="Enter phone number" />
                    </Form.Item>

                    <Form.Item label="Role" name="role">
                        <Select placeholder="Select role">
                            <Option value="admin">Admin</Option>
                            <Option value="basic">Basic</Option>
                            <Option value="premium">Premium</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Status" name="status">
                        <Select placeholder="Select status">
                            <Option value="registered">Register</Option>
                            <Option value="active">Active</Option>
                            <Option value="banned">Banned</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                            <Button onClick={handleCancel}>Cancel</Button>
                            {!isEditing ? (
                                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#EA6666" }}>
                                    Update
                                </Button>
                            ) : (
                                <Button type="primary" disabled>
                                    <Spin size="small" /> Loading...
                                </Button>
                            )}
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )
}

export default UserEditModal;