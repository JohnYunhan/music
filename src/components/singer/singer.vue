<template>
  <div>
    <div class="singer">
      <div class="singer-content" ref="scrollSinger">
        <div class="singer-list">
          <div v-for="(item,index) in singerList" class="singer-item singer-hook">
            <h1 class="title">{{item.title}}</h1>
            <div @click="selectSinger(singer)" v-for="singer in item.items" class="singer-infor" v-ripple="'rgba(255, 255, 255, 0.3)'">
              <img v-lazy="singer.avatar" width="50" class="avatar">
              <span class="name">{{singer.name}}</span>
            </div>
          </div>
        </div>
        <div class="list-fixed" v-show="fixedTitle">
          <div class="fixed-title">{{fixedTitle}}</div>
        </div>
        <div class="list-shortcut">
          <ul>
            <li v-for="(item,index) in singerList" class="shortcut" :class="{'current':currentIndex === index}" @click="selectList(index,$event)">{{item.title.charAt(0)}}</li>
          </ul>
        </div>
      </div>
      <loading :showLoading="showLoading"></loading>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;

import {
  mapMutations
} from 'vuex';
import {
  getSingerList
} from 'api/singer';
import {
  ERR_OK
} from 'api/config';
import {
  Singer
} from 'common/js/singer';
import BScroll from 'better-scroll';
import loading from 'base/loading/loading';

export default {
  data() {
      return {
        singerList: [],
        showLoading: true,
        listHeight: [],
        srcollY: 0,
        posY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let h1 = this.listHeight[i];
          let h2 = this.listHeight[i + 1];
          // 滚动的位置在某一区块时
          if (!h2 || (this.srcollY >= h1 && this.srcollY < h2)) {
            return i;
          }
        }
        return 0;
      },
      fixedTitle() {
        if (this.posY > 0) {
          return '';
        }
        return this.singerList[this.currentIndex] ? this.singerList[this.currentIndex].title : '';
      }
    },
    created() {
      this._getSingerList();
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singerList = this._normalizeSinger(res.data.list);
            this._initScroll();
          }
        });
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        };
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }));
          }
          const key = item.Findex;
          if (isNaN(key)) {
            if (!map[key]) {
              map[key] = {
                title: key,
                items: []
              };
            }
            map[key].items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }));
          }
        });
        let hot = [];
        let ret = [];
        // for in更适合遍历对象,不要使用for in遍历数组
        for (let index in map) {
          let val = map[index];
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val);
          } else if (val.title === HOT_NAME) {
            hot.push(val);
          }
        }
        // 升序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
        setTimeout(() => {
          this.scroll.refresh();
          this.caculateHeight();
          this.showLoading = false;
        }, 1000);
        return hot.concat(ret);
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scrollSinger, {
            click: true,
            probeType: 3
          });
        } else {
          this.scroll.refresh();
        }
        this.scroll.on('scroll', (pos) => {
          // 获取滚动的位置的纵坐标(正值)
          this.posY = pos.y;
          this.srcollY = Math.abs(Math.round(pos.y));
        });
      },
      caculateHeight() {
        // 获取每个区块的高度
        let singerList = this.$refs.scrollSinger.getElementsByClassName('singer-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < singerList.length; i++) {
          let item = singerList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectList(index, event) {
        if (!event._constructed) {
          return;
        }
        let singerList = this.$refs.scrollSinger.getElementsByClassName('singer-hook');
        let pos = singerList[index];
        this.scroll.scrollToElement(pos, 300);
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        });
        this.setSinger(singer);
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      loading
    }
};
</script>
<style lang="sass">
@import "./singer.scss";
</style>
