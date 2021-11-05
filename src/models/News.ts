/**
 * お知らせのコンテンツモデル.
 */
import { Dayjs } from 'dayjs'
import dayjs from '~/libs/Dayjs'

export class News {
  day: Dayjs
  title: string

  constructor(ymd: string, title: string) {
    // eg. 2021-02-03
    this.day = dayjs(ymd)
    this.title = title
  }
}
