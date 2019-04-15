<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <h3 class="col-xs-12 text-center">코멘토 과제전형-심소영</h3>
      </div>
      <ul class="contents row">
        <li class="contents__item list-group col-xs-12" v-for="i in contentsList" v-bind:key="i.no">
          <p class="contents__header">
            <span class="col-xs-6">{{findCategory(i.category_no).name}}</span>
            <span class="col-xs-6 text-right">{{i.no}}</span>
          </p>
          <p class="contents__info col-xs-12">
            <span>{{i.email}}</span>
            <span>{{i.updated_at}}</span>
          </p>
          <h3 class="list-group-item-headeing col-xs-12">{{i.title}}</h3>
          <p class="list-group-item-text col-xs-12">{{i.contents}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Todo from "./components/Todo";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      contentsList: [],
      page: 1,
      ord: "asc",
      category: []
    };
  },
  computed: {},

  methods: {
    findCategory(no) {
      // 불러온 contentsList 데이터의 category_no 값을 이용해서 category의 name을 찾는 함수.
      // category_no을 인수로 받아서 category에서 no값이 인수로 들어온 category_no값과 일치하는
      // 인덱스를 찾고, category의 이 인덱스 값의 name 을 출력 => 했었는데 에러나서 .name은 템플릿에서 설정

      const index = this.category.findIndex(i => i.no === no);
      return this.category[index];
    },
    async getCategory() {
      // category 목록을 불러오는 함수.
      const { data } = await axios.get(
        "http://comento.cafe24.com/category.php"
      );
      // 불러서 category에 넣는다.
      this.category = this.category.concat(data.list);
    },
    async getList() {
      // 글 목록을 불러오는 함수. 무한스크롤을 위해 page 값, 정렬을 위해 ord값을 사용한다.
      let api = `http://comento.cafe24.com/request.php?page=${this.page}&ord=${
        this.ord
      }`;
      console.log(api);
      const { data } = await axios.get(api);
      this.contentsList = this.contentsList.concat(data.list);
    },
    onScroll() {
      // 무한스크롤 함수. 스크롤바가
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        if (this.page < 100) {
          this.page += 1;
          this.getList();
        }
      }
    }
  },
  async mounted() {
    this.getList();
    await this.getCategory();
    await this.findCategory();
    window.addEventListener("scroll", e => this.onScroll(), false);
  },
  created() {},
  destroyed() {},
  components: {
    Todo
  }
};
</script>

<style lang="less">
@import "./index.less";
.contents {
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
