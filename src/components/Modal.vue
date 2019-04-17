<template>
  <!-- transition : transition으로 감싸진 엘리먼트가 on/off될때 일어남 -->
  <transition name="modal">
    <div class="modal" v-show="active">
      <div class="modal__con">
        <h3>필터</h3>
        <button type="button" class="close" @click="close()">
          &times;
          <span class="readable-hidden">모달창 닫기 버튼</span>
        </button>
        <ul>
          <li v-for="i in category" v-bind:key="i.no">
            <input
              type="checkbox"
              :name="i.name"
              :id="i.name"
              :value="i.no"
              v-model="selectedCategories"
            >
            <label :for="i.name">{{i.name}}</label>
          </li>
        </ul>
        <button type="button" @click="saveCategory()" class="modal__save">저장</button>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  props: {
    category: {
      type: Array,
      default() {
        return [];
      }
    },
    categoryFilter: {
      type: Array
    }
  },
  data() {
    return {
      // 기존에 선택되어 있는 카테고리 
      selectedCategories: [1, 2, 3],
      // 모달 on/off를 위한 값
      active: false
    };
  },
  methods: {
    // 모달 on
    open() {
      this.active = true;
    },
    // 모달 off
    close() {
      this.active = false;
    },

    // 부모 컴포넌트로부터 받은 함수 : 선택한 카테고리를 저장해서 부모에게 넘겨준다.
    saveCategory() {
      this.$emit("saveCategory", this.selectedCategories);
    }
  }
};
</script>
<style lang="less" >
@import "../index.less";

.modal {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: block;
  &__con {
    padding: 20px;
    background-color: #fff;
    width: 50%;
    max-width: 350px;
    position: relative;
    h3 {
      margin-top: 0;
    }
    ul {
      .clearfix();
      margin-top: 10px;
      li {
        float: left;
        margin-right: 15px;
        input {
          margin-right: 3px;
        }
      }
    }
    .center-block();
    .close {
      padding: 5px;
      position: absolute;
      top: 1rem;
      right: 2rem;
    }
  }
  &__save {
    float: right;
    margin-top: 10px;
  }
}
</style>

