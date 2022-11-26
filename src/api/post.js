import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: '/api/post/file',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;'
    },
    data
  })
}

export function createPost(channelId, content, datetime, nameList, urlList, title, planId) {
  return request({
    url: '/api/post/createPost',
    method: 'post',
    data: {
      channelId: channelId,
      content: content,
      datetime: datetime,
      nameList: nameList,
      urlList: urlList,
      title: title,
      planId: planId
    }
  })
}

export function getPost(param) {
  return request({
    url: '/api/post/getPost',
    method: 'get',
    params: {
      'channel_id': param
    }
  })
}

export function getPostById(param) {
  return request({
    url: '/api/post/getPostById',
    method: 'get',
    params: {
      'post_id': param
    }
  })
}
export function getAttachment(param) {
  return request({
    url: '/api/post/getAttachment',
    method: 'get',
    params: {
      'post_id': param
    }
  })
}

export function createReply(data) {
  return request({
    url: '/api/post/reply/createReply',
    method: 'post',
    data: {
      content: data.content,
      postId: data.postId,
      replyTime: data.replyTime
    }
  })
}
export function getReply(param) {
  return request({
    url: '/api/post/reply/getReply',
    method: 'get',
    params: {
      'post_id': param
    }
  })
}
export function isPostValid(param) {
  return request({
    url: '/api/subscription/post',
    method: 'get',
    params: {
      'postId': param
    }
  })
}

export function getPostAndPlan(channelId){
  return request({
    url: '/api/post/getPostAndPlan',
    method: 'get',
    params: {
      'channel_id': channelId
    }
  })
}