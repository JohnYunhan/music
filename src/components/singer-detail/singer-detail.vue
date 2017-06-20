<template>
  <transition name="move">
    <div class="singer-detail" ref="detail">
      <div class="back-btn" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title">{{singer.name}}</h1>
      <div class="bg-image bg-hook" :style="bgImage">
        <div class="play-btn">
          <div class="play" v-ripple>
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>
        </div>
        <div class="bg-filter"></div>
      </div>
      <div class="song-wrapper" ref="scrollSong" :style="{'top':fixedTop+'px'}">
        <div class="song-list">
          <div class="song-item" v-for="item in singerDetail">
            <h1 class="name">{{item.name}}</h1>
            <p class="desc">{{item.singer}}·{{item.album}}</p>
          </div>
        </div>
      </div>
      <loading :showLoading="showLoading" :fixTop="0" :loadingTop="50"></loading>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import {
  mapGetters
} from 'vuex';
import {
  getSingerDetail
} from 'api/singer';
import {
  ERR_OK
} from 'api/config';
import {
  createSong
} from 'common/js/singer';
import BScroll from 'better-scroll';
import loading from 'base/loading/loading';

export default {
  data() {
      return {
        singerDetail: [],
        fixedTop: 290,
        showLoading: true
      };
    },
    computed: {
      ...mapGetters([
        'singer'
      ]),
      title() {
        return this.singer.name;
      },
      bgImage() {
        return `background-image:url(${this.singer.avatar})`;
      }
    },
    created() {
      this._getSingerDetail(this.singer.id);
    },
    methods: {
      _getSingerDetail(id) {
        if (!this.singer.id) {
          this.$router.push('/singer');
          return;
        }
        getSingerDetail(id).then((res) => {
          if (res.code === ERR_OK) {
            this.singerDetail = this._normalizeDetail(res.data.list);
            this._initScroll();
          }
        });
      },
      _normalizeDetail(list) {
        let ret = [];
        list.forEach((item) => {
          let {
            musicData
          } = item;
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData));
          }
        });
        setTimeout(() => {
          this.scroll.refresh();
          this.caculateHeight();
          this.showLoading = false;
        }, 1000);
        return ret;
      },
      back() {
        this.$router.push('/singer');
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scrollSong, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      caculateHeight() {
        let bgimg = this.$refs.detail.getElementsByClassName('bg-hook');
        this.fixedTop = bgimg[0].clientHeight;
      }
    },
    components: {
      loading
    }
};
</script>
<style lang="sass">
@import 'singer-detail.scss'
</style>
