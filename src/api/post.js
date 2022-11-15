import request from '@/utils/request'

export function createPost(channelId, content, datetime, nameList, urlList) {
    return request({
      url: '/api/post/createPost',
      method: 'post',
      data: {
        channelId: channelId,
        content: content,
        datetime: datetime,
        nameList: nameList,
        urlList: urlList
      }
    }) 
}

export function uploadFile(data) {
  return request({
    url: '/api/post/uploadFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;'
    },
    data
  })
}

export function getPost(param) {
  console.log(param)
  return request({
    url: '/api/post/getPost',
    method: 'get',
    params: {
      'channel_id': param
    }
  })
}