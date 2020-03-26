// 分页请求参数
export interface IPageProps {
  page?: number
  limit?: number
}

// 排序请求参数
export interface ISortProps {
  column?: string
  direction?: string
}
