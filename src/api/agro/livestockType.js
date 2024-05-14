import request from '@/utils/request'

// 查询牲畜类型管理列表
export function listLivestockType(query) {
  return request({
    url: '/agro/livestockType/list',
    method: 'get',
    params: query
  })
}

// 查询牲畜类型管理详细
export function getLivestockType(id) {
  return request({
    url: '/agro/livestockType/' + id,
    method: 'get'
  })
}

// 新增牲畜类型管理
export function addLivestockType(data) {
  return request({
    url: '/agro/livestockType',
    method: 'post',
    data: data
  })
}

// 修改牲畜类型管理
export function updateLivestockType(data) {
  return request({
    url: '/agro/livestockType',
    method: 'put',
    data: data
  })
}

// 删除牲畜类型管理
export function delLivestockType(id) {
  return request({
    url: '/agro/livestockType/' + id,
    method: 'delete'
  })
}
