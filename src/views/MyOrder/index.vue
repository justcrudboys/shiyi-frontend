<template>
  <div style="padding: 10px 200px">
    <div class="myorder">
      <a-card>
        <div class="order-info" v-for="order in orderList">
          <a-card class="order-card" hoverable>
            <p style="font-size: x-large">{{order.channelName}}</p>
            <div class="plan-name">
              <a-tag color="cyan">
                <p class="plan-name"> {{order.planName}}</p>
              </a-tag>
              ￥ {{order.planAmount}} / 月
            </div>
            <p style="font-size: medium;margin: 10px">期限: {{order.subscribeMonth}}</p>
            <p style="font-size: medium;margin: 10px">金额: {{order.orderAmount}}</p>
            <a-divider></a-divider>
            <a-row>
              <a-col span="20">
                <p style="font-size: small;">状态: {{order.status===0?'未支付':order.status===1?'已支付':'已取消'}}</p>
                <p style="font-size: small;">订单号: {{order.orderId}}</p>
              </a-col>
              <a-col span="4">
                <div v-if="order.status===0">
                  <a-button type="primary" class="order-button">支付</a-button>
                  <a-button type="danger" class="order-button">取消</a-button>
                </div>
              </a-col>
            </a-row>

          </a-card>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
const list = [
  {
    orderId: '1',
    planId: '2',
    planName: '超级测试用',
    channelName: '测试用频道罢了',
    subscribeMonth: 3,
    orderAmount: 20.37,
    planAmount: 10.11,
    status: 0,
  },
  {
    orderId: '2',
    planId: '2',
    planName: '超级测试用',
    channelName: '测试用频道罢了',
    subscribeMonth: 3,
    orderAmount: 20.37,
    planAmount: 10.11,
    status: 1,
  },
  {
    orderId: '3',
    planId: '2',
    planName: '超级测试用',
    channelName: '测试用频道罢了',
    subscribeMonth: 3,
    orderAmount: 20.37,
    planAmount: 10.11,
    status: 2,
  }
]
export default {
  name: 'MyOrder',
  data() {
    return {
      orderList: list
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.myorder{
  .order-card{
    border-radius: 10px;
    margin: 10px;
    .plan-name{
      font-size: x-large;
      margin: 10px;
    }
    .order-button{
      margin: 5px;
    }
  }
}
</style>
