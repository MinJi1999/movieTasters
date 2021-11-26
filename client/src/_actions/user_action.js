import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  SAVE_POST,
  GET_POST_BY_ID,
  SAVE_USER,
} from "./types";
import axios from "axios";
import apiClient from "../apiClient";

const USER_PATH = "/api/user";
const POST_PATH = "/api/post";
export function auth() {
  const request = apiClient.get(`${USER_PATH}/auth`).then((res) => res.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function registerUser(data) {
  const request = apiClient
    .post(`${USER_PATH}/register`, data)
    .then((res) => res.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(data) {
  const request = apiClient
    .post(`${USER_PATH}/login`, data)
    .then((res) => res.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = apiClient.get(`${USER_PATH}/logout`).then((res) => res.data);
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function savePost(data) {
  const request = apiClient
    .post(`${POST_PATH}/save`, data)
    .then((res) => res.data);
  return {
    type: SAVE_POST,
    payload: request,
  };
}

export function updateUser(data) {
  const request = apiClient
    .patch(`${USER_PATH}/update`, data)
    .then((res) => res.data);
  return {
    type: SAVE_USER,
    payload: request,
  };
}

export function getPostById(id) {
  const request = apiClient
    .get(`${POST_PATH}/post_by_id?id=${id}&type=single`)
    .then((res) => res.data);
  return {
    type: GET_POST_BY_ID,
    payload: request,
  };
}
