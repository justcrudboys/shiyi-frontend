<template>
  <div style="padding: 10px 200px">
    <div class="myorder">
      <a-card>
        <p style="font-size: xx-large">我的订单</p>
        <div class="order-selector">
          <a-radio-group default-value="0" button-style="solid" v-model="statusOption">
            <a-radio-button value="0">
              待支付订单
            </a-radio-button>
            <a-radio-button value="1">
              已完成订单
            </a-radio-button>
            <a-radio-button value="2">
              已取消订单
            </a-radio-button>
          </a-radio-group>
        </div>
        <div class="order-info" v-for="order in orderList">
          <a-card class="order-card" hoverable v-if="order.status==statusOption">
            <p style="font-size: x-large">{{order.channelName}}</p>
            <div class="plan-name">
              <a-tag color="cyan">
                <p class="plan-name"> {{order.planName}}</p>
              </a-tag>
              ￥ {{order.planAmount}} / 月
            </div>
            <p style="font-size: medium;margin: 10px">期限: {{order.subscribeMonth}} 月</p>
            <p style="font-size: medium;margin: 10px">金额: {{order.orderAmount}}</p>
            <a-divider></a-divider>
            <a-row>
              <a-col span="20">
                <p style="font-size: small;">状态: {{order.status===0?'未支付':order.status===1?'已支付':'已取消'}}</p>
                <p style="font-size: small;">订单号: {{order.orderId}}</p>
              </a-col>
              <a-col span="4">
                <div v-if="order.status===0">
                  <a-button type="primary" class="order-button" @click="pay(order.orderId)">支付</a-button>
                  <a-button type="danger" class="order-button" @click="cancel(order.orderId)">取消</a-button>
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
import { Alipay, cancelOrder, getOrderList } from '@/api/order'

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
      orderList: list,
      statusOption: 0
    }
  },
  mounted() {
    getOrderList().then(res => {
      this.orderList = res.data
    })
  },
  computed: {
  },
  methods: {
    cancel(orderId) {
      cancelOrder(orderId).then(res => {
        this.$router.go(0)
      })
    },
    pay(orderId) {
      Alipay(orderId).then(res => {
        console.log(res)
        const divForm = document.getElementsByTagName('div')
        if (divForm.length) {
          document.body.removeChild(divForm[0])
        }
        const div = document.createElement('div')
        div.innerHTML = res.data // data就是接口返回的form 表单字符串
        document.body.appendChild(div)
        document.forms[0].setAttribute('target', '_blank')// 新开窗口跳转
        document.forms[0].submit()
      })
    }
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
