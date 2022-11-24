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

export function getChannelPlan(channel_id) {
  return request({
    url: 'api/channel/channelPlan',
    method: 'get',
    params: {
      'channel_id': channel_id
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

export function createChannel(name, introduction, img, creator_id) {
  return request({
    url: '/api/channel/createChannel',
    method: 'post',
    data: {
      name: name,
      introduction: introduction,
      img: img,
      creator_id: creator_id
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

export function getChannelInfo(param) {
  return request({
    url: '/api/channel/getChannelInfo',
    method: 'get',
    params: {
      'channel_id': param
    }
  })
}

export function getChannelTag(param) {
  return request({
    url: '/api/channel/getChannelTag',
    method: 'get',
    params: {
      'channel_id': param
    }
  })
}

export function putChannelInfo(params) {
  return request({
    url: '/api/channel/putChannelInfo',
    method: 'put',
    data: {
      id: params.channelId,
      img: params.img,
      introduction: params.introduction,
      name: params.name
    }
  })
}

export function postPlan(params) {
  return request({
    url: '/api/channel/createChannelPlan',
    method: 'post',
    data: {
      amount: params.amount,
      channelId: params.channelId,
      introduction: params.introduction,
      name: params.name
    }
  })
}

export function updateTags(params) {
  return request({
    url: '/api/channel/updateOneChannelTagRelation',
    method: 'post',
    data: params
  })
}
