import request from '@/utils/request'

export function createPost(channelId, content, datetime) {
    return request({
      url: '/api/post/createPost',
      method: 'post',
      data: {
        channelId: channelId,
        content: content,
        datetime: datetime
      }
    }) 
}
