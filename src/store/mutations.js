export default{
  //其中的方法应该尽可能单一些
  addCounter(state,payload){
    payload.count++
  },
  addToCart(state,payload){
    payload.isChecked = false
    state.cartList.push(payload)
  }
}