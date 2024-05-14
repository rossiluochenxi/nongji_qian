import request from '@/utils/request'

// 查询报警数据列表
export function listAlarm(query) {
  return request({
    url: '/dm/alarm/list',
    method: 'get',
    params: query
  })
}

// 查询报警数据详细
export function getAlarm(id) {
  return request({
    url: '/dm/alarm/' + id,
    method: 'get'
  })
}

// 新增报警数据
export function addAlarm(data) {
  return request({
    url: '/dm/alarm',
    method: 'post',
    data: data
  })
}

// 修改报警数据
export function updateAlarm(data) {
  return request({
    url: '/dm/alarm',
    method: 'put',
    data: data
  })
}

// 删除报警数据
export function delAlarm(id) {
  return request({
    url: '/dm/alarm/' + id,
    method: 'delete'
  })
}
