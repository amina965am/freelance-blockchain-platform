import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const register = (data) => API.post('/users/register', data);
export const login = (data) => API.post('/users/login', data);
export const getProfil = () => API.get('/users/profil');

// Projects
export const getMissions = () => API.get('/projects');
export const getMissionById = (id) => API.get(`/projects/${id}`);
export const creerMission = (data) => API.post('/projects', data);
export const postuler = (id, data) => API.post(`/projects/${id}/postuler`, data);
export const choisirFreelance = (id, data) => API.put(`/projects/${id}/choisir`, data);
export const noterFreelance = (id, data) => API.put(`/projects/${id}/noter`, data);