import { EditOutlined } from "@ant-design/icons";
import { Table } from "antd";

const ManageBlogs = () => {
    const columns = [
        {
            title: 'Tittle',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Is Active',
            dataIndex: 'is_active',
            key: 'is_active',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: () => <EditOutlined />,
        }

    ]
    return (
        <>
            <Table columns={columns} />
        </>
    );

};

export default ManageBlogs;