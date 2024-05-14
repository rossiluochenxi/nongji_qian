import request from '@/utils/request'

// 查询全部数据列表
export function listData(query) {
  return request({
    url: '/dm/data/list',
    method: 'get',
    params: query
  })
}

// 查询全部数据详细
export function getData(id) {
  return request({
    url: '/dm/data/' + id,
    method: 'get'
  })
}

// 新增全部数据
export function addData(data) {
  return request({
    url: '/dm/data',
    method: 'post',
    data: data
  })
}

// 修改全部数据
export function updateData(data) {
  return request({
    url: '/dm/data',
    method: 'put',
    data: data
  })
}

// 删除全部数据
export function delData(id) {
  return request({
    url: '/dm/data/' + id,
    method: 'delete'
  })
}
