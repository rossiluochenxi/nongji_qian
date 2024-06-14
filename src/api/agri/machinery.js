import request from '@/utils/request'

// 查询农机管理列表
export function listMachinery(query) {
  return request({
    url: '/agri/machinery/list',
    method: 'get',
    params: query
  })
}

// 查询农机管理列表
export function listMachineryQuery(query) {
  return request({
    url: "/agri/machinery/listMachineryQuery",
    method: "get",
    params: query,
  });
}

// 查询农机管理详细
export function getMachinery(id) {
  return request({
    url: '/agri/machinery/' + id,
    method: 'get'
  })
}

// 新增农机管理
export function addMachinery(data) {
  return request({
    url: '/agri/machinery',
    method: 'post',
    data: data
  })
}

// 修改农机管理
export function updateMachinery(data) {
  return request({
    url: '/agri/machinery',
    method: 'put',
    data: data
  })
}

// 删除农机管理
export function delMachinery(id) {
  return request({
    url: '/agri/machinery/' + id,
    method: 'delete'
  })
}
