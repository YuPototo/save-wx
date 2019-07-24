<template>
	<view>
		<radio-group @change="pickSavingType">
			<radio value="buyNone" id="buy-none"/><label for="buy-none">不买了</label>
			<radio value="buyCheap" id="buy-cheap"/><label for="buy-cheap">买便宜的</label>
		</radio-group>
		
		<form>
      <view v-if="savingType==='buyNone'" class="want-buy">
        <view>
          <label for="want-buy-name">商品</label>
          <input type="text" id="want-buy-name" v-model="wantBuy.name">
        </view>
        <view>
          <label for="want-buy-cost">价格</label>
          <input type="number" id="want-buy-cost" v-model.number="wantBuy.cost">
        </view>
      </view>
      <view v-if="savingType==='buyCheap'" class="add-saving-cheap">
        <view class="want-buy">
          <text>原商品</text>
          <view class="want-buy-name">
            <label for="want-buy-name">商品</label>
            <inputtype="text" id="want-buy-name" v-model="wantBuy.name">
          </view>
          <view class="want-buy-cost">
            <label for="want-buy-cost">价格</label>
            <input type="number" id="want-buy-cost" v-model.number="wantBuy.cost">
          </view>
        </view>
        <view class="did-buy">
          <text>替代品</text>
          <view class="did-buy-name">
            <label for="did-buy-name">商品</label>
            <input type="text" id="did-buy-name" v-model="didBuy.name">
          </view>
          <view class="did-buy-cost">
            <label for="did-buy-cost">价格</label>
            <input type="number" id="new-cost" v-model.number="didBuy.cost">
          </view>
        </view>
      </view>
      <button @click.prevent="onClickAdd">新增节约</button>
    </form>
	</view>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	data () {
    return {
      savingType: 'buyNone',
      wantBuy: {
        name: null,
        cost: null
      },
      didBuy: {
        name: null,
        cost: null
      }
    }
  },
  methods: {
    ...mapActions([
      'addSaving'
	]),
	pickSavingType(e) {
		this.savingType = e.detail.value;
	},
    onClickAdd () {
      const saving = { wantBuy: { ...this.wantBuy } };
      if (this.didBuy.name !== null) saving.didBuy = { ...this.didBuy };
      this.addSaving(saving);
      this.reset();
      uni.navigateTo({
        url: '../record/record'
      });
    },
    reset() {
      this.wantBuy = { name: null, cost: null };
      this.didBuy = { name: null, cost: null };
    },
    onLoad() {
      /*  用于开发时的调试
			uni.navigateTo({
            url: '../record/record'
        });   
      */
		}
  }
}
</script>