import request from '@/utils/request'

export function getCreatorChannel(creator_id) {
  return request({
    url: 'api/channel/mychannel',
    method: 'get',
    params: {
      'creator_id': creator_id
    }
  })
}

export function uploadImg(data) {
  return request({
    url: '/api/channel/uploadImg',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;'
    },
    data
  })
}

export function createChannel(name, introduction, img, creator_id,tags) {
  return request({
    url: '/api/channel/createChannel',
    method: 'post',
    data: {
      name: name,
      introduction: introduction,
      img: img,
      creator_id: creator_id,
      tags: tags
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
