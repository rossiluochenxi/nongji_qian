import request from '@/utils/request'

// 查询面积类型管理列表
export function listType(query) {
  return request({
    url: '/agri/type/list',
    method: 'get',
    params: query
  })
}

// 查询面积类型管理详细
export function getType(id) {
  return request({
    url: '/agri/type/' + id,
    method: 'get'
  })
}

// 新增面积类型管理
export function addType(data) {
  return request({
    url: '/agri/type',
    method: 'post',
    data: data
  })
}

// 修改面积类型管理
export function updateType(data) {
  return request({
    url: '/agri/type',
    method: 'put',
    data: data
  })
}

// 删除面积类型管理
export function delType(id) {
  return request({
    url: '/agri/type/' + id,
    method: 'delete'
  })
}
