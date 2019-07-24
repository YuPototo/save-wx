<template>
<view>
    <view>
    <label for="want-buy-name">商品<input type="text" id="want-buy-name" v-model="savingEdited.wantBuy.name"></label>
      <label for="want-buy-cost">价格<input type="number" id="want-buy-cost" v-model.number="savingEdited.wantBuy.cost" /></label>
      </view>
      <view v-if="savingType==='buyCheap'">
        <label for="want-buy-name">替代品<input type="text" id="want-buy-name" v-model="savingEdited.didBuy.name"></label>
        <label for="want-buy-cost">价格<input type="number" id="want-buy-cost" v-model.number="savingEdited.didBuy.cost" /></label>
      </view>

      <button @click="clickEdit(savingEdited)">确定修改</button>
      <button @click="clickDelete(savingEdited)">删除</button>
    </view>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      savingEdited: {},
    }
  },
  computed: {
    savingType () {
      return 'didBuy' in this.savingEdited ? 'buyCheap' : 'buyNone';
    }
  },
  methods: {
    ...mapActions([
      'editSaving',
      'removeSaving'
    ]),
    clickEdit(saving){
      this.editSaving(saving)
      uni.navigateBack({
        delta: 1
      })
    },
    clickDelete (saving) {
      this.removeSaving(saving);
      uni.navigateBack({
        delta: 1
      })
    }
  },
  onLoad(option) {
    const time = Number.parseInt(option.time)
    const saving = this.$store.state.savings.filter(saving => saving.time === time)[0]
    this.savingEdited = _.cloneDeep(saving)
  }
}
</script>

<style>

</style>
