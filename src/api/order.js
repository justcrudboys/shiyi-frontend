import request from '@/utils/request'

export function getOrderList() {
  return request({
    url: '/api/order/list',
    method: 'get'
  })
}

export function cancelOrder(orderId) {
  return request({
    url: '/api/order/cancellation',
    method: 'put',
    data: orderId,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
export function Alipay(orderId) {
  return request({
    url: '/api/order/alipay',
    method: 'get',
    params: {
      'orderId': orderId
    }
  })
}
