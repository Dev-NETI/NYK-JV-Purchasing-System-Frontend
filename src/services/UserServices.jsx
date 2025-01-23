import axios from "@/lib/axios";

//INDEX
const getUserList = async (pagination, searchParams) => {
  const { data } = await axios.get(`/api/user-management`, {
    params: {
      page: pagination.page,
      f_name: searchParams.f_name,
      l_name: searchParams.l_name,
    },
  });
  return data;
};

//STORE
const storeUser = async (data) => {
  const response = await axios.post(`/api/user-management`, data);

  return response;
};

//UPDATE
const updateUser = async (id, params) => {
  const { data } = await axios.put(`/api/user-management/${id}`, params);

  return data;
};

//DELETE
const deleteUser = async (id) => {
  const { data } = await axios.delete(`/api/user-management/${id}`);

  return data;
};

export { getUserList, storeUser, updateUser, deleteUser };
