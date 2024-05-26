import request from '@/utils/request'

// 查询业务任务列表
export function listTasks(query) {
  return request({
    url: '/biz/tasks/list',
    method: 'get',
    params: query
  })
}

// 查询业务任务详细
export function getTasks(id) {
  return request({
    url: '/biz/tasks/' + id,
    method: 'get'
  })
}

// 新增业务任务
export function addTasks(data) {
  return request({
    url: '/biz/tasks',
    method: 'post',
    data: data
  })
}

// 修改业务任务
export function updateTasks(data) {
  return request({
    url: '/biz/tasks',
    method: 'put',
    data: data
  })
}

// 删除业务任务
export function delTasks(id) {
  return request({
    url: '/biz/tasks/' + id,
    method: 'delete'
  })
}
