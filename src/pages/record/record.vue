<template>
  <view>
    <view class="nav-list">
      <text @click="changeActivePage('today')" :class="{active: activePage === 'today'}">今天</text>
      <text @click="changeActivePage('history')" :class="{active: activePage === 'history'}">历史</text>
      <text @click="changeActivePage('summary')" :class="{active: activePage === 'summary'}">累计</text>
    </view>

    <block v-if="activePage === 'today'">
      <SaveItem
      v-for="(saving, index) in savingsToday"
      :key="index"
      :saving="saving"
      @click.native="editSaving(saving)"
      /> 
        <view class="sum-today">今天节约了：{{ sumSavingsToday }}元</view>
      </block>

      <block v-if="activePage === 'history'">
        <SaveItem
        v-for="(saving, index) in savings"
        :key="index"
        :saving="saving"
        @click.native="editSaving(saving)"
        />           
      </block>

    <block v-if="activePage === 'summary'">
      <view>今天节约了 {{ sumSavingsToday }} 元</view>
      <view>累计节约了 {{ sumSavings }} 元</view>
    </block>
    </view>
</template>

<script>
import SaveItem from '@/components/SaveItem';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      activePage: "today"
    }
  },
  components: {
    SaveItem
  },
  computed: {
    ...mapState({
      savings: state => state.savings
    }),
    ...mapGetters([
      'savingsToday'
    ]),
    sumSavings() {
      return this.savings.reduce((accumulator, saving) => accumulator + saving.wantBuy.cost - (saving.didBuy ? saving.didBuy.cost : 0), 0);
    },
    sumSavingsToday() {
      return this.savingsToday.reduce((accumulator, saving) => accumulator + saving.wantBuy.cost - (saving.didBuy ? saving.didBuy.cost : 0), 0);
    },
  },
  methods: {
    changeActivePage(page) {
      this.activePage = page
    },
    editSaving(saving) {
      let url = `../edit/edit?time=${saving.time}`
      uni.navigateTo({
        url: url
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 5px 0;

  .active {
    border-bottom: 1px solid grey;
  }
}

.sum-today {
  margin-top: 100px;
}
</style>