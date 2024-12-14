import db from "../Database/index.js";

let { users } = db;

export const createUser = (user) => (
  users = [...users, { ...user, _id: Date.now().toString() }]);

export const findUserByUsername = (username) => 
  users.find((user) => user.username === username);

export const findAllUsers = () => users;

export const findUserById = (userId) => 
  users.find((user) => user._id === userId);

// export const findUserByCredentials = (username, password) =>
//   users.find( (user) => user.username === username && user.password === password );

export const findUserByCredentials = (username, password) => {
  try {
      const user = users.find(user => user.username === username && user.password === password);
      return user || null;
  } catch (error) {
      console.error('Error in findUserByCredentials:', error);
      throw new Error('Database query failed');
  }
};


export const updateUser = (userId, user) => (
  users = users.map((u) => (u._id === userId ? user : u)));

export const deleteUser = (userId) => (
  users = users.filter((u) => u._id !== userId));
