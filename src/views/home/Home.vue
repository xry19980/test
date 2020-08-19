<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" 
    :pull-up-load="true"
    @scroll="contentScroll"
    @pullingUp="loadMore "> 
      <home-swiper :banners="banners"
      @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends="recommends"> </recommend-view>
      <feature-view></feature-view>
      <tab-control 
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  
  import TabControl from "components/content/tabControl/TabControl"
  import FeatureView from "./childComps/Feature"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils"

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
      },
      currentType: "pop",
      isShowBackTop:false,
      tabOffsetTop:545,
      isTabFixed:false,
      saveY:0
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },

    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

     
    },
    activated () {
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated () {
      this.saveY =this.$refs.scroll.getScrollY()
    },
    mounted () {
      const refresh =debounce(this.$refs.scroll.scroll.refresh(),200)
      
       //监听图片加载完成
      this.$bus.$on('itemImageLoad',()=>{
        this.scrool&&refresh()
      })
      this.tabOffsetTop = this.$refs.tabControl
    },
    methods: {
      //事件监听
      

      tabClick(index){
        switch(index){
          case 0 :
            this.currentType= 'pop'
            break
          case 1 :
            this.currentType ='new'
            break
          case 2 :
            this.currentType = 'sell'
            break    
        }
        this.$refs.tabControl1.currentType = index
        this.$refs.tabControl2.currentType = index
      },
      contentScroll(position){
        this.isShowBackTop = (-position.y) > 1000
        this.isTabFixed= (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
     //网络请求
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        }
        )
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page +=1
          this.$refs.scroll.finishPullUp()
      })
      },
      backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      }
      
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
/* 
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  

    .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }

</style>
