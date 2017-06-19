<template>
  <transition name="move">
    <div class="singer-detail">
      歌手详情
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

export default {
  data() {
      return {
        singerDetail: []
      };
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
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
            // console.log(this.singerDetail);
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
        return ret;
      }
    }
};
</script>
<style lang="sass">
@import 'singer-detail.scss'
</style>
