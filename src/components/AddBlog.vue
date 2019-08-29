<template>
  <div class="add-blog">
    <h2>添加新的博客</h2>
    <form v-if="!submitted">
      <lablel>博客标题</lablel>
      <input type="text" v-model="blog.title" required />
      <label>博客内容</label>
      <textarea v-model.lazy="blog.content"></textarea>
      <!-- 分类 -->
      <div id="checkboxes">
        <label>vue.js</label>
        <input type="checkbox" value="vue" v-model="blog.categories" />
        <label>vue.js</label>
        <input type="checkbox" value="react" v-model="blog.categories" />
        <label>vue.js</label>
        <input type="checkbox" value="angular" v-model="blog.categories" />
        <label>vue.js</label>
        <input type="checkbox" value="wechat" v-model="blog.categories" />
      </div>

      <!-- 选项 -->
      <label>作者</label>
      <select v-model="blog.author">
        <!-- <option value="米斯特吴">米斯特吴</option> -->
        <option v-for="(author,index) in authors" :key="index">{{author}}</option>
      </select>

      <hr />
      <!-- 数据请求 ，取消表单默认事件-->
      <button @click.prevent="handlePost">添加博客</button>
    </form>

    <div v-if="submitted">
      <h3>您的博客已经添加成功.....</h3>
    </div>

    <!-- 预览 -->
    <div id="preview">
      <h3>博客预览</h3>
      <p>标题预览：{{blog.title}}</p>
      <p>内容预览：{{blog.content}}</p>
      <p>技术分类</p>
      <ul>
        <li v-for="(category,index) in blog.categories" :key="index">{{category}}</li>
      </ul>
      <p>作者：{{blog.author}}</p>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "AddBlog",
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: "佩奇"
      },
      authors: ["佩奇", "苏西", "佩德罗"],
      submitted: false
    };
  },
  methods: {
    handlePost() {
      // console.log(this.blog);
      // axios
      //   .get("http://jsonplaceholder.typicode.com/posts")
      //   .then(res => {
      //     console.log(res.data);
      //   })
      //   .catch(err => console.log("接口出错！"));
      const self = this;
      this.$axios
        .post("http://jsonplaceholder.typicode.com/posts", {
          title: this.blog.title,
          body: this.blog.content,
          userId: 1
        })
        // .then(function(res) {
        //   // console.log(res);
        //   self.submitted = true; //函数中this指向window
        // });
        .then(res => {
          this.submitted = true;
        });
    }
  }
};
</script>

<style scoped>
#add-blog {
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  max-width: 500px;
}
label {
  display: block;
  margin: 29px 0 10px;
}
input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: 8px;
}
#preview {
  padding: 10px;
  border: 1px solid #ccc;
}
h3 {
  margin-top: 10px;
}
#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}
#checkboxes label {
  display: inline-block;
}
</style>
