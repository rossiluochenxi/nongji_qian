import request from '@/utils/request'

// 查询牲畜档案管理列表
export function listLivestock(query) {
  return request({
    url: '/agro/livestock/list',
    method: 'get',
    params: query
  })
}

// 查询牲畜档案管理详细
export function getLivestock(id) {
  return request({
    url: '/agro/livestock/' + id,
    method: 'get'
  })
}

// 新增牲畜档案管理
export function addLivestock(data) {
  return request({
    url: '/agro/livestock',
    method: 'post',
    data: data
  })
}

// 修改牲畜档案管理
export function updateLivestock(data) {
  return request({
    url: '/agro/livestock',
    method: 'put',
    data: data
  })
}

// 删除牲畜档案管理
export function delLivestock(id) {
  return request({
    url: '/agro/livestock/' + id,
    method: 'delete'
  })
}
