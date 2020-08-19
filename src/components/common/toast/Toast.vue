<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  props: {
    message:{
      type:String,
      default:''
    },
    show:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    show(message,duration){
      
    }
  }
}
</script>

<style>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
  padding: 10px 10px;
  color: white;
  background-color:rgba(0,0,0,.4);
}
</style>