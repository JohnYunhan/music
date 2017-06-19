<template>
  <div class="recommend" ref="scrollRecommend">
    <div class="recommend-content">
      <!-- <div class="top-tip" :style="{'top':showTopTip?'0':'-60px'}">{{topTip}}</div> -->
      <div class="img-swiper" :style="{'margin-top':showTopTip?'60px':'0'}">
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in recommends" :key="item.id">
            <a :href="item.linkUrl"><img :src="item.picUrl" width="100%"></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="radio-wrapper">
        <h1 class="title">热门电台</h1>
        <ul class="radio-list">
          <li v-for="list in radioList" :key="list.radioid" class="radio-item" v-ripple="'rgba(255, 255, 255, 0.3)'">
            <a :href="list.linkUrl">
              <div class="radio-img">
                <img v-lazy="list.picUrl">
              </div>
              <h2 class="name">{{list.Ftitle}}</h2>
            </a>
          </li>
        </ul>
      </div>
      <div class="hot-song-list">
        <h1 class="title">热门歌单</h1>
        <div class="song-list" v-for="song in songList" :key="song.id" v-ripple>
          <div class="icon">
            <img v-lazy="song.imgurl" width="60">
          </div>
          <div class="text">
            <div class="name" v-html="song.creator.name"></div>
            <p class="desc" v-html="song.dissname"></p>
          </div>
        </div>
      </div>
      <div class="bottom-tip">{{bottomTip}}</div>
    </div>
    <loading :showLoading="showLoading"></loading>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
import {
  getRecommend,
  getSongList
} from 'api/recommend';
import {
  ERR_OK
} from 'api/config';
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper';
// import scroll from 'base/scroll/scroll';
import BScroll from 'better-scroll';
import loading from 'base/loading/loading';

export default {
  data() {
      return {
        recommends: [],
        swiperOption: {
          pagination: '.swiper-pagination',
          autoplay: 2500,
          loop: true
        },
        radioList: [],
        songList: [],
        radioUrl: ['https://c.y.qq.com/v8/playsong.html?ADTAG=myqq&from=myqq&channel=10007100&songid=5452502,11772,101525,89756,1425425,416764,1007827,237281,7228564,5408217,855611,102679605,3596012,102338859,105161539,7012266,137873,7702,102371771,4829977', 'https://c.y.qq.com/v8/playsong.html?ADTAG=myqq&from=myqq&channel=10007100&songid=109839552,202497114,200506302,202325928,201712321,104919028,104244290,105460886,102806932,105664042,202049046,109671452,200374390,202177901,105533676,109472611,202116648,200904285,200535850,102419875'],
        start: 0,
        end: 29,
        bottomTip: '查看更多',
        topTip: '下拉刷新',
        loadMore: true,
        showTopTip: false,
        showLoading: true
      };
    },
    created() {
      this._getRecommend();
      this._getSongList(this.start, this.end);
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider;
            this.radioList = res.data.radioList;
            for (var i = 0; i < this.radioUrl.length; i++) {
              Vue.set(this.radioList[i], 'linkUrl', this.radioUrl[i]);
            }
            this._initScroll();
          }
        });
      },
      _getSongList(start, end) {
        getSongList(start, end).then((res) => {
          if (res.code === ERR_OK) {
            // 最多获取300条数据
            if (start >= 300) {
              this.bottomTip = '没有更多数据了…';
              this.loadMore = false;
            } else {
              this.bottomTip = '查看更多';
              this.loadMore = true;
            }
            this.songList = this.songList.concat(res.data.list);
            setTimeout(() => {
              this.scroll.refresh();
              this.showLoading = false;
              // this.topTip = '刷新成功';
            }, 1000);
            // setTimeout(() => {
            //   this.showTopTip = false;
            //   this.topTip = '下拉刷新';
            // }, 5000);
          }
        });
      },
      _initScroll() {
        var _this = this;
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scrollRecommend, {
            click: true,
            probeType: 1
          });
        } else {
          this.scroll.refresh();
        }
        this.scroll.on('touchend', function(pos) {
          // 上拉加载
          if (pos.y < (this.maxScrollY - 30) && _this.loadMore) {
            _this.bottomTip = '加载中…';
            setTimeout(() => {
              _this.reloadData();
            }, 1000);
          }
          // 下拉刷新
          // if (pos.y > 50) {
          //   console.log(pos.y, 2);
          //   _this.topTip = '正在刷新…';
          //   _this.showTopTip = true;
          //   setTimeout(() => {
          //     _this.start = 0;
          //     _this.end = 29;
          //     _this.bottomTip = '';
          //     _this.songList = [];
          //     _this._getRecommend();
          //     _this._getSongList(_this.start, _this.end);
          //   }, 1000);
          // }
        });
        // this.scroll.on('scroll', function(pos) {
        //   console.log(pos.y, 1);
        //   if (pos.y > 50) {
        //     _this.topTip = '释放立即刷新';
        //   } else {
        //     _this.topTip = '下拉刷新';
        //   }
        // });
      },
      reloadData() {
        this.start += 30;
        this.end += 30;
        this._getSongList(this.start, this.end);
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true;
          this.scroll.refresh();
        }
      }
    },
    filters: {},
    components: {
      swiper,
      swiperSlide,
      loading
    }
};
</script>
<style lang="sass">
@import "./recommend.scss";
</style>
