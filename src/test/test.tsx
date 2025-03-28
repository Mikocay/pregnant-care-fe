import { axiosClient } from '../config/axios';

const fetchUsers = async () => {
  try {
    const response = await axiosClient.get('/users');
    console.log('Danh sách users:', response.data);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách users:', error);
  }
};

fetchUsers();
