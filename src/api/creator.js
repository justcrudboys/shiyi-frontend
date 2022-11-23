import request from '@/utils/request'

export function isCreator() {
  return request({
    url: '/api/creator/iscreator',
    method: 'get'
  })
}

export function getPesonalCreatorInfo() {
  return request({
    url: '/api/creator/personal',
    method: 'get'
  })
}
export function changeIntroduction(introduction) {
  return request({
    url: '/api/creator/introduction',
    method: 'put',
    data: introduction,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

export function changeAccount(account) {
  return request({
    url: '/api/creator/account',
    method: 'put',
    data: account,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function becomeCreator() {
  return request({
    url: '/api/creator/becomecreator',
    method: 'post'
  })
}
