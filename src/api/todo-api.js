import { endpoint } from "../utils/constants";

export async function addTodoRequest(userId, todo) {
  const res = await fetch(`${endpoint}${userId}.json`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error(data.error.message || "Could not login!.");
  }

  const secondRes = await fetch(`${endpoint}${userId}/${data.name}.json`, {
    method: "PATCH",
    body: JSON.stringify({
      id: data.name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const secondData = await secondRes.json();

  if (!secondRes.ok) {
    console.log(secondData);
    throw new Error(secondData.error.message || "Could not login!.");
  }
  return { ...todo, id: data.name };
}

export async function initUserTodoCollection(userId, userName) {
  const res = await fetch(`${endpoint}${userId}.json`, {
    method: "POST",
    body: JSON.stringify({
      userName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error(data.error.message || "Could not login!.");
  }

  return data;
}

export async function getTodoRequest(userId) {
  const res = await fetch(`${endpoint}${userId}.json`);

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error(data.error.message || "Could not login!.");
  }

  return Object.values(data).slice(1);
}

export const updateTodoRequest = async (userId, todo) => {
  const res = await fetch(`${endpoint}${userId}/${todo.id}.json`, {
    method: "PATCH",
    body: JSON.stringify({
      status: todo.status,
      title: todo.title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error(data.error.message || "Could not login!.");
  }

  return data;
};

export const deleteTodoRequest = async (userId, todoId) => {
  const res = await fetch(`${endpoint}${userId}/${todoId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error(data.error.message || "Could not login!.");
  }

  return data;
};
