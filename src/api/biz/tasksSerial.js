import request from '@/utils/request'

// 查询任务流水详情列表
export function listTasksSerial(query) {
  return request({
    url: '/biz/tasksSerial/list',
    method: 'get',
    params: query
  })
}

// 查询任务流水详情详细
export function getTasksSerial(id) {
  return request({
    url: '/biz/tasksSerial/' + id,
    method: 'get'
  })
}

// 新增任务流水详情
export function addTasksSerial(data) {
  return request({
    url: '/biz/tasksSerial',
    method: 'post',
    data: data
  })
}

// 修改任务流水详情
export function updateTasksSerial(data) {
  return request({
    url: '/biz/tasksSerial',
    method: 'put',
    data: data
  })
}

// 删除任务流水详情
export function delTasksSerial(id) {
  return request({
    url: '/biz/tasksSerial/' + id,
    method: 'delete'
  })
}
