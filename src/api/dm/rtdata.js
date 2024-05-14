import request from '@/utils/request'

// 查询冻结数据列表
export function listRtdata(query) {
  return request({
    url: '/dm/rtdata/list',
    method: 'get',
    params: query
  })
}

// 查询冻结数据详细
export function getRtdata(id) {
  return request({
    url: '/dm/rtdata/' + id,
    method: 'get'
  })
}

// 新增冻结数据
export function addRtdata(data) {
  return request({
    url: '/dm/rtdata',
    method: 'post',
    data: data
  })
}

// 修改冻结数据
export function updateRtdata(data) {
  return request({
    url: '/dm/rtdata',
    method: 'put',
    data: data
  })
}

// 删除冻结数据
export function delRtdata(id) {
  return request({
    url: '/dm/rtdata/' + id,
    method: 'delete'
  })
}
