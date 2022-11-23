import request from '@/utils/request'

export function getUserSubscriptions(user_id) {
  return request({
    url: 'api/subscription/list',
    method: 'get',
    params: {
      'user_id': user_id
    }
  })
}
