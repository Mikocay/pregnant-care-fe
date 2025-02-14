import { IUser } from "@/redux/features/types/userType";
import { deleteUserPending } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { Button, Modal, notification, Spin } from "antd";
import { useEffect } from "react";

interface UserDeleteProps {
    dataUser: IUser;
    isOpenDeleteModal: boolean;
    setIsOpenDeleteModal: (value: boolean) => void;
}

const UserDeleteModal = (props: UserDeleteProps) => {
    const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useAppDispatch();
    const isDeleting = useAppSelector(state => state.users.isDeleting);
    const isDeleteSuccess = useAppSelector(state => state.users.isDeleteSuccess);
    const errors = useAppSelector(state => state.users.errors);
    const message = useAppSelector(state => state.users.message);


    const handleSubmit = () => {
        if (dataUser.id) {
            dispatch(deleteUserPending({ id: dataUser.id }))
        }
    }
    useEffect(() => {
        if (isDeleteSuccess) {
            setIsOpenDeleteModal(false)
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
    }, [api, errors, isDeleteSuccess, message, setIsOpenDeleteModal])
    return (
        <>
            {contextHolder}
            <Modal
                title="Delete A User"
                open={isOpenDeleteModal}
                onCancel={() => setIsOpenDeleteModal(false)}
                footer={[
                    !isDeleting ? (
                        <>
                            <Button key="cancel" onClick={() => setIsOpenDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button key="confirm" type="primary" danger onClick={handleSubmit}>
                                Confirm
                            </Button>
                        </>
                    ) : (
                        <Button key="loading" type="primary" disabled>
                            <Spin size="small" /> Loading...
                        </Button>
                    ),
                ]}
            >
                Delete the user: {dataUser?.email ?? ""}
            </Modal>
        </>

    )
}

export default UserDeleteModal;