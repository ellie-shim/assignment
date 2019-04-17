<template>
  <div>
    <div class="container">
      <div class="row">
        <h3 class="col-xs-12 text-center">코멘토 과제전형-심소영</h3>
      </div>
      <div class="filter row mb-2">
        <div class="col-xs-4">
          <button type="button" @click="$refs.filterModal.open()">필터</button>
        </div>
        <div class="col-xs-6 col-xs-offset-2 text-right">
          <button type="button" @click="toggleAsc()">오름차순</button>
          <button type="button" @click="toggleDesc()">내림차순</button>
        </div>
      </div>
      <ul class="contents row">
        <!--  글 목록 -->
        <template v-for="(i, index) in contentsList">
          <li  class="contents__item list-group col-xs-12" v-if="(index+1)%4!== 0" :key="index">
            <p class="contents__header">
              <span class="col-xs-6">{{findCategory(i.category_no).name}}</span>
              <span class="col-xs-6 text-right">{{i.no}}</span>
            </p>
            <p class="contents__info col-xs-12">
              <span>{{i.email}}</span>
              <span>{{i.updated_at}}</span>
            </p>
            <router-link :to="i.no">
              <h3 class="list-group-item-headeing col-xs-12">{{i.title}}</h3>
              <p class="list-group-item-text col-xs-12">{{i.contents}}</p>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
    <modal
      ref="filterModal"
      :category="category"
      :categoryFilter="categoryFilter"
      @saveCategory="saveCategory"
    ></modal>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "./Modal";

export default {
  name: "Contents",
  data() {
    return {
      // 글 목록이 담긴 배열
      contentsList: [],
      // 파라미터로 넘길 페이지
      page: 1,
      // 파라미터로 넘길 정렬 값
      ord: "asc",
      // 카테고리 목록이 담긴 배열
      category: [],
      // (카테고리 필터링 기능을 위한 ) 파라미터로 넘길 카테고리 값
      categoryFilter: [1, 2, 3],
    };
  },
  methods: {
    // 모달창에서 필터링 한 카테고리를 저장하고 데이터를 다시 불러오는 함수
    async saveCategory(selected) {
      this.categoryFilter = selected.slice();
      this.$refs.filterModal.close();
      this.contentsList = [];
      this.page = 1;
      this.getList(this.ord, this.categoryFilter);
    },
    // 오름차순으로 만드는 함수
    toggleAsc() {
      if (this.ord === "desc") {
        this.ord = "asc";
        this.contentsList = [];
        this.page = 1;
        this.getList(this.ord, this.categoryFilter);
      }
    },
    // 내림차순으로 변경하는 함수
    toggleDesc() {
      if (this.ord === "asc") {
        this.ord = "desc";
        this.contentsList = [];
        this.page = 1;

        this.getList(this.ord, this.categoryFilter);
      }
    },    
    findCategory(no) {
      // 불러온 contentsList 데이터의 category_no 값을 이용해서 category의 name을 찾는 함수.
      // category_no을 인수로 받아서 category에서 no값이 인수로 들어온 category_no값과 일치하는
      // 인덱스를 찾고, category의 이 인덱스 값의 name 을 출력 => 했었는데 에러나서 .name은 템플릿에서 설정
      const index = this.category.findIndex(i => i.no === no);
      return this.category[index];
    },
    // category 목록을 불러오는 함수.
    async getCategory() {
      try {
        const { data } = await axios.get(
          "http://comento.cafe24.com/category.php"
        );
        // 불러서 category에 넣는다.
        this.category = this.category.concat(data.list);
      } catch (e) {
        throw new Error(e);
      }
    },
    // 글 목록을 불러오는 함수. 무한스크롤을 위해 page 값, 정렬을 위해 ord값을 사용한다.
    async getList(ord, category) {
      try {
        let api = `http://comento.cafe24.com/request.php?page=${
          this.page
        }&ord=${ord}&category=${category}`;
        console.log(api);
        const { data } = await axios.get(api);
        this.contentsList = this.contentsList.concat(data.list);
      } catch (e) {
        throw new Error(e);
      }
    },
    // 무한스크롤 함수. 스크롤바가 바닥에 닿으면 page+1 하고 다시 통신한다.
    onScroll() {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        if (this.page < 100) {
          this.page += 1;
          this.getList(this.ord, this.categoryFilter);
          this.getAds();

        }
      }
    }
  },
  async created() {
    this.getAds(); 
    this.getList(this.ord, this.categoryFilter);
    await this.getCategory();
    await this.findCategory();
    window.addEventListener("scroll", () => this.onScroll(), false);
  },
  components: {
    Modal
  }
};
</script>

<style lang="less">
@import "../index.less";
.filter {
  margin: 10px 0;
  button {
    background-color: rebeccapurple;
    color: white;
    cursor: pointer;
    margin-right: 10px;
    padding: 8px;
  }
}
.contents {
  a {
    color: black;
    &:hover {
      color: @primary;
    }
  }
  &__item {
    border: 1px solid @primary;
    padding: 0 0 15px;
  }
  &__header {
    .clearfix();
    padding: 10px 0 10px;
    background-color: @primary;
    color: white;
  }
  &__info {
    span {
      display: inline-block;
      margin-right: 10px;
      &:first-child::after {
        content: "|";
        display: inline-block;
        color: gray;
        padding-left: 10px;
      }
    }
  }
  .list-group-item-heading,
  .list-group-item-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    width: 100%;
    overflow: hidden;
  }
}
</style>
