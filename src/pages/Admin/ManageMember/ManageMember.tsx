import UserCreateModal from "@/components/Modal/User.create.modal";
import UserDeleteModal from "@/components/Modal/User.delete.modal";
import UserEditModal from "@/components/Modal/User.edit.modal";
import { User } from "@/redux/features/types/userType";
// import { IUser } from "@/redux/features/types/userType";
import { fetchUserPending } from "@/redux/features/user/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button,  Table, TableColumnsType, Tag } from "antd"
import { Content } from "antd/es/layout/layout"
import { useEffect, useState } from "react";

function ManageMember() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<User>({} as User);

  const limit = 2;
  const isPending = useAppSelector(state => state.users.isPending);
  const userData = useAppSelector(state => state.users.data);
  console.log("userData", userData);
  const users = Array.isArray(userData.data) ? userData.data : [];
  console.log("users", users);

  const total = userData.total;

  useEffect(() => {
    dispatch(fetchUserPending({ page, limit }));
  }, [page, dispatch]);

  const handleEditUser = (user: User) => {
    setDataUser(user);
    setIsOpenUpdateModal(true);
  }

  const handleDelete = (user: User) => {
    setDataUser(user);
    setIsOpenDeleteModal(true);
  }
  const columns: TableColumnsType<User> = [
    {
      title: 'No',
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      width: '10%',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '10%',
    },
    {
      title: 'Blood Type',
      dataIndex: 'bloodType',
      key: 'bloodType'
    },

    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (_, record) => (
        <Tag color={
          record.role === 'basic' ? 'blue' :
            record.role === 'premium' ? 'gold' :
              record.role === 'admin' ? 'red' : ''
        }>
          {record.role}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => (
        <Tag color={
          record.status === 'active' ? 'green' :
            record.status === 'registered' ? 'orange' :
              record.status === 'banned' ? 'red' : ''
        }>
          {record.status}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (user: User) => (
        <>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(user)}
            className="edit-button"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="delete-button"
          onClick={() => handleDelete(user)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Content className="content">
        <Table
          columns={columns}
          dataSource={users}
          pagination={{
            current: page,
            total: total,
            pageSize: limit,
            showSizeChanger: false,
            onChange: (page) => setPage(page),
          }}
          className="data-table"
          loading={isPending}
        />
      </Content>

      <UserCreateModal
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      />

      <UserEditModal
        dataUser={dataUser}
        isOpenUpdateModal={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
      />

      <UserDeleteModal
        dataUser={dataUser}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
    </>
  )
}

export default ManageMember