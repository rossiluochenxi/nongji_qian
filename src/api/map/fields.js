import request from '@/utils/request'

// 查询任务耕地信息列表
export function listFields(query) {
  return request({
    url: '/map/fields/list',
    method: 'get',
    params: query
  })
}

// 查询任务耕地信息详细
export function getFields(id) {
  return request({
    url: '/map/fields/' + id,
    method: 'get'
  })
}

// 新增任务耕地信息
export function addFields(data) {
  return request({
    url: '/map/fields',
    method: 'post',
    data: data
  })
}

// 修改任务耕地信息
export function updateFields(data) {
  return request({
    url: '/map/fields',
    method: 'put',
    data: data
  })
}

// 删除任务耕地信息
export function delFields(id) {
  return request({
    url: '/map/fields/' + id,
    method: 'delete'
  })
}
