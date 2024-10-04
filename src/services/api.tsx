// src/services/api.ts
import axios from 'axios';
import { User } from '../types/user';

const API_URL = 'http://localhost:3001'; // JSON Server URL

export const getUsers = () => axios.get<User[]>(`${API_URL}/users`);

export const getUser = (id: number) => axios.get<User>(`${API_URL}/users/${id}`);

export const createUser = (user: User) => axios.post<User>(`${API_URL}/users`, user);

export const updateUser = (id: number, user: User) => axios.put<User>(`${API_URL}/users/${id}`, user);

export const deleteUser = (id: number) => axios.delete(`${API_URL}/users/${id}`);
