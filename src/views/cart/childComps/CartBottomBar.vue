<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button  class="check-button" :is-checked='isSelectAll'
      @click.native="checkClick"></check-button>
      <span>all</span>
    </div>
    <div class="x">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算
      <!-- {{checkLength}} -->
    </div>
  </div>
  
</template>

<script>
import CheckButton from './CartCheckButton'
export default {
components: {
  CheckButton
},
computed: {
  totalPrice(){
    return '￥' + this.$store.state.cartList.filter(item=>{
      return item.isChecked
    }
    ).reduce((preValue,item)=>{
      return preValue + item.price * item.count
    },0).toFixed(2)
  },
  checkLength(){
    return this.$store.state.cartList.filter(item=>{
      item.isChecked
    }).length
  },
  isSelectAll(){
    // return !(this.$store.state.cartList.filter(item=>! item.isChecked).length)
    if (this.$store.state.cartList.length ===0) return false
    return !this.$store.state.cartList.find(item =>!item.isChecked)
  }
},
methods:{
  checkClick(){
    if(this.isSelectAll){
      this.$store.state.cartList.forEach(item => item.isChecked = false)
    }else{
      this.$store.state.cartList.forEach(item => item.isChecked = true)
    }
  },
  calcClick(){
    
  }
}
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
  /* line-height: 40px; */
}
.check-content{
  display: flex;
  position: absolute;
  top:50%;
  margin-top:-8px;
  margin-left: 10px;
  
}
.check-button{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.x{
  line-height: 40px;
  margin-left: 50px;

}
.calculate{
  position: absolute;
  right: 0;
  line-height: 40px;
  width: 90px;
  background-color: rgb(100, 30, 73);
  color: #eee;
  text-align: center;
}


</style>