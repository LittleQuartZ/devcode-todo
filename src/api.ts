import axios from 'axios';

const BASE_URL = 'https://todo.api.devcode.gethired.id';
const EMAIL = 'syahdanhafizzz@gmail.com';

export type Activity = {
  created_at: string;
  id: number;
  title: string;
};

type Response<T> = {
  limit: number;
  skip: number;
  total: number;
  data: T;
};

export const getAllActivity = async () => {
  const response = await axios.get<Response<Activity[]>>(
    `${BASE_URL}/activity-groups?email=${EMAIL}`
  );

  if (response.status !== 200) {
    throw new Error(`Failed fetching activity groups: ${response.statusText}`);
  }

  return response.data.data;
};

export const createActivity = async () => {
  const response = await axios.post<
    Response<Activity & { email: string; updated_at: string }>
  >(`${BASE_URL}/activity-groups`, { email: EMAIL, title: 'New Activity' });

  if (response.status !== 201) {
    throw new Error(
      `Failed creating new activity groups: ${response.statusText}`
    );
  }

  return response.data.data;
};

export const deleteActivity = async (id: Activity['id']) => {
  const response = await axios.delete(`${BASE_URL}/activity-groups/${id}`);

  if (response.status !== 200) {
    throw new Error(`Failed deleting activity group: ${response.statusText}`);
  }
};
