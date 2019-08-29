<template>
  <div v-theme:column="'narrow'" class="show-blogs">
    <h1>第一天学习内容</h1>
    <!-- search -->
    <!--在搜索时，还是输小写，因为数据本来就是小写的，大写只是后来显示格式-->
    <input type="text" v-model="search" placeholder="search somthing...." />
    <div v-for="(blog,index) in filterdBlogs" :key="index" class="single-blog">
      <router-link :to="'/blog/'+blog.id">
        <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
      </router-link>
      <article>{{blog.body | shenglue}}</article>
    </div>
  </div>
</template>

<script>
import searchMixin from "../mixins/searchMixin";
export default {
  name: "ShowBlogs",
  data() {
    return {
      blogs: [],
      search: ""
    };
  },
  created() {
    //钩子函数，请求数据
    this.$axios.get("/posts").then(res => {
      //   console.log(res.data);
      this.blogs = res.data.slice(0, 10);
    });
  },
  directives: {
    rainbow: {
      bind(el, binding, vnode) {
        el.style.color =
          "#" +
          Math.random()
            .toString()
            .slice(2, 8);
      }
    }
  },
  filters: {
    // "to-uppercase": function(value) {
    //   return value.toUpperCase();
    // } 或者如下
    toUppercase(value) {
      return value.toUpperCase();
    }
  },
  mixins: [searchMixin]
};
</script>

<style scoped>
.show-blogs {
  max-width: 800px;
  margin: 0 auto;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
input[type="text"] {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>
