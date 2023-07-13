/*
 * @Author: zerotower69 zerotower@163.com
 * @Date: 2022-11-20 22:11:55
 * @LastEditors: zerotower69 zerotower@163.com
 * @LastEditTime: 2023-01-15 14:07:42
 * @FilePath: /XanaduCompany/web/src/apis/job.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

/**
 * 获取职位列表
 * @returns
 */
export const getJobListApi = (data:any) =>
  request.post('/v1/web/job', data)

/**
 * * 职位过滤
   * @returns
   */
export const getJobFilter = () => request.get('/v1/web/job-filters')

export const getJobDetailApi = (id:string) =>
  request.get('/v1/web/job/' + id)
