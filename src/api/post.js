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
