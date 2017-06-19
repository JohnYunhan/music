import { options } from './config';
import jsonp from 'common/js/jsonp';

export function getSingerList() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  let data = {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  };
  return jsonp(url, data, options);
};

export function getSingerDetail(id) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  let data = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 50,
    songstatus: 1,
    singermid: id
  };
  return jsonp(url, data, options);
};
