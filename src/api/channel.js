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
