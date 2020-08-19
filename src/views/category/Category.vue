<template>
  <div class="wrapper">
    <ul class="content">
      <li>fenleilie1</li>
      <li>fenleilie2</li>
      <li>fenleilie3</li>
      <li>fenleilie4</li>
      <li>fenleilie5</li>
      <li>fenleilie6</li>
      <li>fenleilie7</li>
      <li>fenleilie8</li>
      <li>fenleilie9</li>
      <li>fenleilie10</li>
      <li>fenleilie11</li>
      <li>fenleilie12</li>
      <li>fenleilie13</li>
      <li>fenleilie14</li>
      <li>fenleilie15</li>
      <li>fenleilie16</li>
      <li>fenleilie17</li>
      <li>fenleilie18</li>
      <li>fenleilie19</li>
      <li>fenleilie20</li>
    </ul>

  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  
  export default {
    name: "Category",
    data() {
      return {
        
      }
    },
    created () {
      
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true
      })
      
      this.scroll.on('scroll',(position)=>{
        console.log(position)
      })

      this.scroll.on('pullingUp',()=>{
        console.log('上拉加载')
      })
    },
    methods: {
      
      
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;

    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
