import request from '@/utils/request'

// 查询农机类型列表
export function listMachineryType(query) {
  return request({
    url: '/agri/machineryType/list',
    method: 'get',
    params: query
  })
}

// 查询农机类型详细
export function getMachineryType(id) {
  return request({
    url: '/agri/machineryType/' + id,
    method: 'get'
  })
}

// 新增农机类型
export function addMachineryType(data) {
  return request({
    url: '/agri/machineryType',
    method: 'post',
    data: data
  })
}

// 修改农机类型
export function updateMachineryType(data) {
  return request({
    url: '/agri/machineryType',
    method: 'put',
    data: data
  })
}

// 删除农机类型
export function delMachineryType(id) {
  return request({
    url: '/agri/machineryType/' + id,
    method: 'delete'
  })
}
