import request from '@/utils/request'

// 查询养殖户管理列表
export function listUser(query) {
  return request({
    url: '/agro/user/list',
    method: 'get',
    params: query
  })
}

// 查询养殖户管理详细
export function getUser(id) {
  return request({
    url: '/agro/user/' + id,
    method: 'get'
  })
}

// 新增养殖户管理
export function addUser(data) {
  return request({
    url: '/agro/user',
    method: 'post',
    data: data
  })
}

// 修改养殖户管理
export function updateUser(data) {
  return request({
    url: '/agro/user',
    method: 'put',
    data: data
  })
}

// 删除养殖户管理
export function delUser(id) {
  return request({
    url: '/agro/user/' + id,
    method: 'delete'
  })
}
