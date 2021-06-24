<template>
  <el-card class = "hot-news">
    <h3 class = "hot-title">热门新闻</h3>
    <ul class = "hot-list" v-if = "hotNews.length!==0">
      <li class = "hot-list-item" v-for = "(item,index) in hotNews" :key = "index">
        <span class = "num-top">{{ index + 1 }}</span>
        <p>
          <router-link :to = "`/news/${item.news_path}`">{{ item.news_title }}</router-link>
          <span class = "hot-date">{{ item.publish_time }}</span>
        </p>
      </li>
    </ul>
    <span class = "is-null" v-else>暂无数据</span>
  </el-card>
</template>

<script>
export default {
  name: 'hotNews',
  data () {
    return {
      //  热门新闻列表
      hotNews: []
    }
  },
  created () {
    this.getHotNews()
  },
  methods: {
    // 获取热门新闻
    async getHotNews () {
      const { data: res } = await this.$http.get('/web/hotnews')
      if (res.status !== 200) {
        this.hotNews = []
      } else {
        // this.$message.success('获取成功')
        this.hotNews = res.data.list
      }
    }
  }
}
</script>

<style lang = "less" scoped>
* {
  margin: 0;
  padding: 0;
}

.is-null {
  display: flex;
  justify-content: center;
  margin-top: 45px;
  color: #777
}

@hover_color: #3370ff;
.hot-news {
  width: 300px;
  min-height: 180px;
  //background-color: #d3dce6;
  //border: 1px dashed skyblue;
  //padding: 0 15px;
  box-sizing: border-box;
  //margin-top: 33px;
  margin-bottom: 50px;
  height: fit-content;
}

.hot-title {
  font-weight: 600;
  text-align: center;
  font-size: 16px;
  height: 58px;
  line-height: 58px;
  border-bottom: 1px dashed #e6e8eb;
}

.hot-list {
  padding: 18px 5px 0;

  :first-child .num-top {
    background-color: #f84521
  }

  :nth-child(2) .num-top {
    background-color: #ff6f24;
  }

  :nth-child(3) .num-top {
    background-color: #ff8c25;
  }
}

.num-top {
  position: absolute;
  left: 0;
  top: 2px;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  color: #fff;
  background-color: #ababab;
  display: block;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
}

.hot-list-item {
  position: relative;
  cursor: pointer;
  padding: 0 0 20px;

  p {
    margin-left: 24px;
  }

  a {
    color: rgba(0, 0, 0, 1);
    transition: color .3s;
    width: 230px;
    line-height: 22px;
    font-size: 14px;
    overflow: hidden;
    //white-space: pre-wrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  a:hover {
    color: @hover_color;
  }

  .hot-date {
    display: block;
    color: #b8b8b8;
    font-size: 14px;
    padding-top: 5px;
    line-height: 16px;
    white-space: nowrap;
  }
}

.hot-list-item:after {
  content: "";
  display: block;
  width: 230px;
  position: absolute;
  bottom: 10px;
  left: 24px;
  border-bottom: 1px dashed #e6e8eb;
}

.hot-list-item:last-of-type:after {
  content: none;
}

::v-deep .el-card__body {
  padding-top: 0;
}
</style>
