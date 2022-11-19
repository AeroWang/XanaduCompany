import request from '@/utils/request'

/**
 * 获取职位列表
 * @returns
 */
export const getJobListApi = () =>
  request.get('/v1/web/job')
