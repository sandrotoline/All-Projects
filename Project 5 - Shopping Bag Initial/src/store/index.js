import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    productsBag:[]
  },
  mutations: {
    loadProducts(state, products){
        state.products = products
    },
    loadBag(state, products){
      state.productsBag = products
    },
    addToBag(state, product){
      state.productsBag.push(product);
      localStorage.setItem("productsBag", JSON.stringify(state.productsBag))
    },
    removeFromBag(state, product){
      if(confirm('Are you sure you want remove '+ product.title + ' from your bag?')){  
        state.productsBag = state.productsBag.filter(item => item.id !== product.id);
        localStorage.setItem("productsBag",JSON.stringify(state.productsBag));
      }
    }
  },
  actions: {
      loadProducts({commit}){
        axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          commit('loadProducts', response.data);
        })
      },
      loadBag({commit}){
        if (localStorage.getItem("productsBag")) {
          commit('loadBag', JSON.parse(localStorage.getItem("productsBag")));
        }
      },
      addToBag({commit}, product){
        commit('addToBag',product)
      },
      removeFromBag({commit}, product){
        commit('removeFromBag',product)
      }
  },
  modules: {
  }
})
