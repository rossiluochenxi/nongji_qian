import request from '@/utils/request'

// 查询牲畜品种管理列表
export function listLivestockVarieties(query) {
  return request({
    url: '/agro/livestockVarieties/list',
    method: 'get',
    params: query
  })
}

// 查询牲畜品种管理详细
export function getLivestockVarieties(id) {
  return request({
    url: '/agro/livestockVarieties/' + id,
    method: 'get'
  })
}

// 新增牲畜品种管理
export function addLivestockVarieties(data) {
  return request({
    url: '/agro/livestockVarieties',
    method: 'post',
    data: data
  })
}

// 修改牲畜品种管理
export function updateLivestockVarieties(data) {
  return request({
    url: '/agro/livestockVarieties',
    method: 'put',
    data: data
  })
}

// 删除牲畜品种管理
export function delLivestockVarieties(id) {
  return request({
    url: '/agro/livestockVarieties/' + id,
    method: 'delete'
  })
}
