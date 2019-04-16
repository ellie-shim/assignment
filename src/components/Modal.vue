<template>
  <!-- transition : transition으로 감싸진 엘리먼트가 on/off될때 일어남 -->
  <transition name="modal">
    <div class="modal" v-show="active">
      <ul class="modal__con">
        <button type="button" class="close" @click="close()">
          &times;
          <span class="readable-hidden">모달창 닫기 버튼</span>
        </button>
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
        <button type="button" @click="saveCategory()">저장</button>
      </ul>
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
      selectedCategories: [1, 2, 3],
      active: false
    };
  },
  methods: {
    open() {
      this.active = true;
    },
    close() {
      this.active = false;
    },

    handleClickCategory() {
      this.$emit("handleClickCategory");
    },
    handleCategoryFilter() {
      console.log(this.categoryFilter);
      this.$emit("update:categoryFilter", this.selectedCategories);
    },
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
  background-color: gray;
  display: block;
  &__con {
    padding: 20px;
    background-color: #fff;
    width: 50%;
    .center-block();
    .close {
      padding: 5px;
    }
  }
}
</style>

