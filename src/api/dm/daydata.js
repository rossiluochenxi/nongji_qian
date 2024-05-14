import request from '@/utils/request'

// 查询每天数据列表
export function listDaydata(query) {
  return request({
    url: '/dm/daydata/list',
    method: 'get',
    params: query
  })
}

// 查询每天数据详细
export function getDaydata(id) {
  return request({
    url: '/dm/daydata/' + id,
    method: 'get'
  })
}

// 新增每天数据
export function addDaydata(data) {
  return request({
    url: '/dm/daydata',
    method: 'post',
    data: data
  })
}

// 修改每天数据
export function updateDaydata(data) {
  return request({
    url: '/dm/daydata',
    method: 'put',
    data: data
  })
}

// 删除每天数据
export function delDaydata(id) {
  return request({
    url: '/dm/daydata/' + id,
    method: 'delete'
  })
}
