<template>
  <div class="container">
    <div class="datail__content">
      <h3>{{this.content.title}}</h3>
      <p>{{this.content.email}}</p>
      <p>{{this.content.updated_at}}</p>
      <p>{{this.content.contents}}</p>
    </div>
    <div class="detail__repl" v-if="this.repl.length>0">
      <h4>댓글 목록</h4>
      <ul>
        <li v-for="r in repl" :key="r.no">
          <p>{{r.user_no}}번 회원님</p>
          <p>{{r.updated_at}}</p>
          <p>{{r.contents}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Detail",
  data() {
    return {
        // 글 내용을 담은 객체
        content: {},
        // 글에 대한 리플을 담은 베열
        repl: []
    };
  },
  methods: {
    // 글 내용을 불러오는 함수
    async getDetail(contentsId) {
        // contentsId 를 이용해서 데이터를 호출한다.
      let api = `http://comento.cafe24.com/detail.php?req_no=${contentsId}`;
      const {
        data: { detail }
      } = await axios.get(api);
      this.content = detail.article;
      this.repl = detail.replies;
    }
  },
  created() {
      // 주소표시줄에 있는 값을 가져와서 파라미터로 넘겨준다.
    this.getDetail(this.$route.params.contentsId);
  }
};
</script>
<style lang="less">
.detail {
  &__repl {
    margin-top: 40px;
    li {
      background-color: beige;
      padding: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>


