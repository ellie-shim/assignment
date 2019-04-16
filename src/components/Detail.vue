<template>
  <div class="container">
    <div class="datail__content">
      <h3>{{this.content.title}}</h3>
      <p>{{this.content.email}}</p>
      <p>{{this.content.updated_at}}</p>
      <p>{{this.content.contents}}</p>
    </div>
    <div class="detail__repl">
      <!-- 리플이 있으면 확인 후 뿌려주기 -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { log } from "util";

export default {
  name: "Detail",
  data() {
    return {
      content: {},
      repl: {}
    };
  },
  methods: {
    async getDetail(contentsId) {
      let api = `http://comento.cafe24.com/detail.php?req_no=${contentsId}`;
      const {
        data: { detail }
      } = await axios.get(api);
      console.log(detail);
      this.content = detail.article;
      this.repl = detail.replies;
    }
  },
  created() {
    this.getDetail(this.$route.params.contentsId);
  }
};
</script>

