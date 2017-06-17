import { commonParams, options } from './config';
import jsonp from 'common/js/jsonp';
import axios from 'axios';

export function getRecommend() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });
  return jsonp(url, data, options);
};

export function getSongList(start, end) {
  let url = 'api/getSongList';
  let data = {
    rnd: Math.random(),
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: start,
    ein: end
  };
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
