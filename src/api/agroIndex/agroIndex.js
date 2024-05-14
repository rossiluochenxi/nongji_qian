import request from '@/utils/request'

// 查询牲畜档案管理列表
export function listagroIndex() {
  return request({
    url: '/agro/index/list',
    method: 'get',
  })
}

// 查询养殖户牲畜排名
export function listagroRankingFarmers() {
  return request({
    url: '/agro/index/agroNumlist',
    method: 'get',
  })
}

// 首页报警数据api
export function dmAlarmDataIndexList() {
  return request({ 
    url: '/dm/alarm/indexList',
    method: 'get',
  })
}

// 首页耳标在线离线数量
export function ebOnOffLineDevice() {
  return request({
    url: "/agro/index/ebOnOffLineDevice",
    method: "get",
  });
}

// 首页项圈在线离线数量
export function xqOnOffLineDevice() {
  return request({
    url: "/agro/index/xqOnOffLineDevice",
    method: "get",
  });
}