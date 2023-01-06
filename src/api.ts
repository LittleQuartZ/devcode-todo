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

export const TodoPriorities = [
  'very-high',
  'high',
  'normal',
  'low',
  'very-low',
] as const;

export type TodoPriority = typeof TodoPriorities[number];

export type Todo = {
  activity_group_id: Activity['id'];
  id: number;
  is_active: 1 | 0 | true | false;
  priority: TodoPriority;
  title: string;
};

export type ActivityDetail = Activity & {
  todo_items: Todo[];
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

export const getActivityDetail = async (id: Activity['id'] | string) => {
  const response = await axios.get<ActivityDetail>(
    `${BASE_URL}/activity-groups/${id}`
  );

  if (response.status !== 200) {
    throw new Error(
      `Failed fetching activity detail ${id}: ${response.statusText}`
    );
  }

  return response.data;
};

export const createTodo = async (
  id: Todo['id'] | string,
  todo: {
    title: Todo['title'];
    priority: Todo['priority'];
  }
) => {
  const response = await axios.post<Todo>(`${BASE_URL}/todo-items`, {
    activity_group_id: id,
    title: todo.title,
    priority: todo.priority,
  });

  if (response.status !== 201) {
    throw new Error(`Failed creating new todo: ${response.statusText}`);
  }

  return response.data;
};

export const deleteTodo = async (id: Todo['id']) => {
  const response = await axios.delete(`${BASE_URL}/todo-items/${id}`);

  if (response.status !== 200) {
    throw new Error(`Failed deleting ${id} todo: ${response.statusText}`);
  }
};

export type TodoUpdate = Partial<{
  title: Todo['title'];
  priority: Todo['priority'];
  is_active: Todo['is_active'];
}>;

export const updateTodo = async (
  id: Todo['id'] | string,
  update: TodoUpdate
) => {
  const response = await axios.patch<Todo>(
    `${BASE_URL}/todo-items/${id}`,
    update
  );

  if (response.status !== 200) {
    throw new Error(`Failed deleting ${id} todo: ${response.statusText}`);
  }

  return response.data;
};
