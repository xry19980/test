<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  name:'Scroll',
  data(){
    return{
      scroll:null
    } 
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper,{
     click:true,
     probeType:this.probeType,
     pullUpLoad:this.pullUpLoad
    })

    if (this.probeType === 2|| this.probeType ===3){
      this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
    }

    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })

    if (this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
    
  },
  methods:{
    finishPullUp(){
      this.scroll&&this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll &&  this.scroll.refresh() 
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style>

</style>