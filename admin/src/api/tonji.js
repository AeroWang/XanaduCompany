/**
 * @Description:
 * @author Aerowang
 * @date 2021/6/16
 */
import request from '@/utils/request'

var nowPageUrl = ""

//入口方法
export function getTongJi() {
  // nowPageUrl = path
  // return new Promise((resolve, reject) => {
  //   getBaidu().then((res) => {
  //     resolve(res)
  //   })
  // })
  return request({
    type: "get",
    dataType: "jsonp",
    url: "https://openapi.baidu.com/rest/2.0/tongji/report/getData",
    data: {
      access_token: "121.57d1b82fea54e5478568cd5cb72fa900.YaKGL3mybCzSs3M7m3SIrtbQCR9tBVK5myv46fY.RVK0cQ",
      site_id: "16801227", // 前台门户站点ID
      method: "overview/getCommonTrackRpt", // //需要的报告范围
      start_date: "20210601",
      end_date: "20220617",
      metrics: "pv_count",  // 报告所包含的数据类，pv_count=浏览量
    }
  })
}

async function getBaidu() {
  var num = 0
  await request({
    type: "get",
    dataType: "jsonp",
    url: "https://openapi.baidu.com/rest/2.0/tongji/report/getData",
    data: {
      access_token: "121.57d1b82fea54e5478568cd5cb72fa900.YaKGL3mybCzSs3M7m3SIrtbQCR9tBVK5myv46fY.RVK0cQ",
      site_id: "16801227", // 前台门户站点ID
      method: "overview/getCommonTrackRpt", // //需要的报告范围
      start_date: "20210601",
      end_date: "20220617",
      metrics: "pv_count",  // 报告所包含的数据类，pv_count=浏览量
    },
    // success: function (res) {
    //   num = visiteNum(res.result)
    // },
    // error: function (err) {
    //   console.log("error======", err)
    // },
  })
  return num
}

//计算对应页面的浏览量
function visiteNum(data) {
  var visite = 0
  //计算总浏览量

  if (data && data.visitPage) {
    if (nowPageUrl === "home") {
      // visite = data.sourceSite.items[0][1];-直观统计包括了本地测试域名和正式域名浏览量之和
      //受访页面列表
      const items = data.visitPage.items || []
      //查询对应域名下精确统计总数
      const arrs = items.filter(
        (v) => v[0].indexOf(window.location.origin) > -1
      )
      visite = arrs.reduce((pre, cur) => {
        pre += Number(cur[1])
        return pre
      }, 0)
    } else {
      //计算单页面浏览量
      // encodeURI-转码
      // decodeURI-解码
      //受访页面列表
      const items = data.visitPage.items || []
      //当前页面完整地址
      const pathurl = window.location.origin + nowPageUrl
      for (let i = 0; i < items.length; i++) {
        if (items[i][0] === pathurl) {
          visite = items[i][1]
        }
      }
    }
  }
  return visite
}
