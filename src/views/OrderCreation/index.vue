<template>
  <div style="padding: 10px 200px">
    <a-card class="order-form">
      <p class="channel-name"> {{this.plan.channelName}}</p>
      <a-divider></a-divider>
      <div class="plan-name">
        <a-tag color="cyan">
          <p class="plan-name"> {{this.plan.name}}</p>
        </a-tag>
        ￥ {{this.plan.amount}} / 月      aaaaaaa{{this.order.planId}}
      </div>
      <p class="plan-introduction"> {{this.plan.introduction}}</p>
      <a-divider></a-divider>
      <div class="tip-month">
        <span style="color: red">*</span>
        选择你的赞助期限
      </div>
      <div class="input">
        我要赞助
        <a-input-number class="input-month" v-model="order.subscribeMonth" :min="1" :max="12"/>
        月
      </div>
      <div class="order-info">
        <p style="font-size: large;margin-top: 30px;margin-left: 6px">需要支付</p>
        <p> ￥ {{orderAmount}}</p>
      </div>
      <div class="order-confirm">
        <div  class="footer">
          <div  class="flex-box flex-align-items-center flex-item-1">
            <span  class="mr8 fs12 black-5">共计</span>
            <div  class="fs24 lhi purple flex-box flex-align-items-baseline">
              ￥  {{orderAmount}} <!---->
            </div>
          </div>
          <div class="vm-btn size48" @click="submitOrder">
            下单
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'OrderCreation',
  data() {
    return {
      order: {
        planId: '',
        subscribeMonth: 1,
        moneyAmount: ''
      },
      plan: {
        planId: '',
        amount: 20.1,
        name: '测试计划',
        channelName: '测试用频道',
        introduction: '我会每个月发一点色图，在这个档位中你每个月可以浏览到大约6张色图，每周会发1-2张色图，我的色图质量很高'
      }
    }
  },
  computed: {
    orderAmount() {
      return (this.plan.amount * this.order.subscribeMonth).toFixed(2)
    }
  },
  created() {
    this.order.planId = this.$route.query.planId
  },
  methods: {
    submitOrder() {
      console.log('yes')
      this.$router.push('/MyOrder')
    }
  }
}
</script>

<style lang="less" scoped>
.order-form{

  .channel-name{
    text-align: center;
    font-size: xx-large;
  }
  .plan-name{
    font-size: x-large;
    margin: 10px;
  }
  .plan-introduction{
    width: 80%;
    font-size: large;
    margin: 5px;
  }
  .tip-month{
    font-size: large;
    margin: 10px;
  }
  .input{
    font-size: large;
    margin: 6px;
    .input-month{
      width: 10%;
    }
  }
}
.order-info{
  font-size: xx-large;
}
.order-confirm{
  .footer{
    height: 64px;
    background: #fff;
    box-shadow: 0 -0.3333333333333333rem 0.8333333333333334rem rgb(0 0 0 / 10%);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 1.333333333333333rem;
    box-sizing: border-box;
    .mr8 {
      margin-right: 8px!important;
    }

    .black-5 {
      color: rgba(0,0,0,.5)!important;
    }
    .fs12 {
      font-size: 12px!important;
    }
    .flex-item-1 {
      flex: 1;
    }
    .flex-a-center, .flex-align-items-center {
      align-items: center;
    }
    .flex-box {
      display: flex;
    }
    .fs24 {
      font-size: 24px!important;
    }
    .flex-align-items-baseline {
      align-items: baseline;
    }
    .flex-box {
      display: flex;
    }
    .purple {
      color: #946ce6;
    }
    .vm-btn{
      border-radius: 0.16666666666666666rem;
      background: linear-gradient(90deg,#946ce6,#7e5fd9);
      color: #fff;
      padding: 8px 24px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      white-space: nowrap;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      box-sizing: border-box;
      position: relative;
    }
  }
}
</style>
