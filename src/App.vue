<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <h3 class="col-xs-12 text-center">코멘토 과제전형-심소영</h3>
      </div>
      <div class="row">
        <template v-for="item in contentsList">
          <p class="col-xs-12">{{item.title}}</p>
        </template>
      </div>
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
      trigger: 100,
      page: 1,
      category :[],
    };
  },
  computed: {},

  methods: {
    async getCategory(){
      const {data} = await axios.get("http://comento.cafe24.com/category.php")
      this.category = this.category.concat(data.list)
    }
    async getList() {
      let api = `http://comento.cafe24.com/request.php?page=${this.page}`;
      console.log(api);
      const { data } = await axios.get(api);
      this.contentsList = this.contentsList.concat(data.list);
    },
    onScroll() {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        if (this.page < 100) {
          this.page += 1;
          this.getList();
        }
      }
    },
    scroll() {
      window.onscroll = ev => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - this.trigger
        ) {
          console.log("hohohoohoho");
        }
      };
    }
  },
  mounted() {
    this.getList();
    window.addEventListener("scroll", e => this.onScroll(), false);
  },
  created() {
    console.log("created");
  },
  destroyed() {},
  components: {
    Todo
  }
};
</script>

