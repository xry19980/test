<template>
  <div class="item_check">
    <div class="check_box" :class="{checked: isChecked }">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isChecked:{
      type:Boolean,
      default:false
    } 
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.item_check {
  width: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

}
.check_box {
  width:100%;
  border-radius: 50%;
  border: 2px solid #aaa;

}
.check_box.checked {
  background-color: red;
}
</style>