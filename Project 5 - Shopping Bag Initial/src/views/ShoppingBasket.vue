<template>
    <div class="basket">
      <div class="items">
        <template v-if="productsBag.length >= 1">
          <div class="item" v-for="item in productsBag" :key="item.id">
            <div @click="this.$store.dispatch('removeFromBag',item)" class="remove">Remove item</div>
            <div class="photo"><img :src="item.image" alt=""></div>
            <div class="description">
              <span v-html="item.title"/>
            </div>
            <div class="price">
              <span class="quantity-area">
                <button :disabled="item.quantity == 1" @click="item.quantity--">-</button>
                <span class="quantity">{{item.quantity}}</span>
                <button @click="item.quantity++">+</button>
              </span>
              <span class="amount">US$ {{(item.quantity * item.price).toFixed(2)}}</span>
            </div>
          </div>
          <div class="grand-total"> Grand Total: US$ {{total()}}</div>
        </template>
        <template v-else>
          <h4>No items in Bag yet</h4>
        </template>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  export default {
    name: 'ShoppingBasket',
  
    computed:mapState([
        'productsBag',
      ]),
      methods:{
        total() {
          var total = 0;
            this.productsBag.forEach(item => {
                total += item.quantity * item.price;
            });
           return total.toFixed(2);
        }
      }
   
  }
  </script>
  
  <style lang="scss">
  
  .basket {
    padding: 60px 0;  
    .items {
      max-width: 800px;
      margin: auto;
      .item {
        display: flex;
        justify-content: space-between;
        padding: 40px 0;
        border-bottom: 1px solid lightgrey;
        position: relative;
  
        .remove {
          position: absolute;
          top: 8px;
          right: 0;
          font-size: 11px;
          text-decoration: underline;
          cursor: pointer;
        }
  
        .quantity-area {
          margin: 8px auto;
          height: 14px;
  
          button {
            width: 16px;
            height: 16px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
  
          .quantity {
  
              margin: 0 4px;
          }
        }
  
        .photo {
          img {
            max-width: 80px;
          }
        }
  
        .description {
          padding-left: 30px;
          box-sizing: border-box;
          max-width: 50%;
  
        }
  
        .price {
          .amount {
            font-size: 16px;
            margin-left: 8px;
            vertical-align: middle;
  
          }
        }
      }
        .grand-total {
            font-size: 24px;
            font-weight: bold;
            text-align: right;
            margin-top: 8px;
        }
  
    }
  
  }
  
  </style>
  