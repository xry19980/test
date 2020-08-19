<template>
  <div id='detail'>
    <detail-nav-bar @titleClick='titleClick'  class="detail-nav"></detail-nav-bar>
    <scroll class="content1">
      <!-- <ul><li v-for="item in $store.state.cartList" :key='item.iid'>{{item}}
        </li></ul> -->
      <div>{{$store.state.cartList.length}}</div>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo'></detail-goods-info>
      <detail-param-info :param-info='paramInfo' />
      <!-- <detail-comment-info :comment-Info='commentInfo'></detail-comment-info> -->
      <goods-list :goods='recommends'/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart='addToCart'/>
    <toast :message='message' :show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/content/backtop/BackTop'
import Toast from 'components/common/toast/Toast'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[0,1000,2000],
      isShowBackTop:false,
      message:'',
      show:false
    }
  },
  created () {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res=>
    {
      //top image
      const data = res.result
      this.topImages =data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      this.shop= new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      if(data.rate.cRate!== 0){
      this.commentInfo = data.rate.list[0]
      }
    },
    getRecommend().then(res=>
    {
      this.recommends = res.data.list
    }))
  },
  methods: {
    titleClick(index){
      
    },
    addToCart(){
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // this.$store.cartList.push(product)
      this.$store.dispatch('addCart',product).then(res=>{
        this.show= true;
        this.message = res;
        setTimeout(()=>{
          this.show = false;
          this.message = ''
        },1500)
       
      })
    }
  }
}
</script>

<style scoped> 
#detail{
  position:relative;
  z-index:9;
  background-color:#fff ;
  height: 100vh;
}
.detail-nav{
  position: relative;
  background-color: #fff;
}
.content1{
  height: calc(100%-44px);
}

</style>