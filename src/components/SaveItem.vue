<template>
  <block>
    <view v-if="savingType === 'buyNone'">
      {{ saving.wantBuy.name }}：{{ saving.wantBuy.cost }}元
    </view>
    <view v-if="savingType === 'buyCheap'">
      <text class="old-good">{{ saving.wantBuy.name }}</text>  -> {{ saving.didBuy.name }}: {{ saving.wantBuy.cost - saving.didBuy.cost }}元
    </view>
  </block>
</template>

<script>
export default {
  name: 'SaveItem',
  props: ['saving'],
  computed: {
    savingType () {
      return 'didBuy' in this.saving ? 'buyCheap' : 'buyNone';
    }
  }
}
</script>

<style lang="scss" scoped>
.old-good {
  text-decoration: line-through;
}
</style>
