import request from '@/utils/request'

// 查询我的任务列表
export function listTasksAssignments(query) {
  return request({
    url: '/biz/tasksAssignments/list',
    method: 'get',
    params: query
  })
}

// 查询我的任务详细
export function getTasksAssignments(id) {
  return request({
    url: '/biz/tasksAssignments/' + id,
    method: 'get'
  })
}

// 新增我的任务
export function addTasksAssignments(data) {
  return request({
    url: '/biz/tasksAssignments',
    method: 'post',
    data: data
  })
}

// 修改我的任务
export function updateTasksAssignments(data) {
  return request({
    url: '/biz/tasksAssignments',
    method: 'put',
    data: data
  })
}

// 修改任务状态
export function updateTasksData(data) {
  return request({
    url: '/biz/tasksAssignments/updateTasksData',
    method: 'put',
    data: data
  })
}

// 删除我的任务
export function delTasksAssignments(id) {
  return request({
    url: '/biz/tasksAssignments/' + id,
    method: 'delete'
  })
}
