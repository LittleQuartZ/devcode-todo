import axios from 'axios';

const BASE_URL = 'https://todo.api.devcode.gethired.id';

type Activity = {
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
    `${BASE_URL}/activity-groups`
  );

  if (response.status !== 200) {
    throw new Error(`Failed fetching activity groups: ${response.statusText}`);
  }

  return response.data.data;
};
