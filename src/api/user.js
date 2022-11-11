import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login/name',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info/brief',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getUserDetail() {
  return request({
    url: '/api/user/info/detail',
    method: 'get'
  })
}

export function changeSignature(signature) {
  return request({
    url: '/api/user/info/signature',
    method: 'put',
    data: signature,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

export function uploadAvatar(data) {
  return request({
    url: '/api/user/info/avatar',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;'
    },
    data
  })
}

export function changeAvatar(avatar) {
  return request({
    url: '/api/user/info/avatar',
    method: 'put',
    data: avatar,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
