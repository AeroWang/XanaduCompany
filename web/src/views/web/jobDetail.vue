<template>
  <div>
    <AwHeader class = "job-header" ref = "news-header"></AwHeader>
    <div class = "content-container">
      <div class = "jobDetail">
        <h1>{{ jobDetail.title }}</h1>
        <div class = "job-info">
          <span>{{ jobDetail.city }}</span>
          <div class = "lineDivider"></div>
          <span>{{ jobDetail.job_category }}</span>
          <div class = "lineDivider"></div>
          <div class = "publish-time">
            <span>发布时间:</span>&nbsp;<span>{{ jobDetail.publish_time }}</span>
          </div>
        </div>
        <div class = "description">
          <h2>职位描述</h2>
          <mavon-editor
            ref = "description"
            class = "markdown"
            v-model = "jobDetail.description"
            :subfield = "false"
            :boxShadow = "false"
            defaultOpen = "preview"
            :toolbarsFlag = "false"
          />
        </div>
        <div class = "requirement">
          <h2>职位要求</h2>
          <mavon-editor
            ref = "requirement"
            class = "markdown"
            v-model = "jobDetail.requirement"
            :subfield = "false"
            :boxShadow = "false"
            defaultOpen = "preview"
            :toolbarsFlag = "false"
          />
        </div>
        <div class = "update-time">
          <span>最近更新时间：</span>&nbsp;&nbsp;<span>{{ jobDetail.update_time }}</span>
        </div>
        <el-button round type = "primary" style="width: 150px"><a href = "mailto:aerowangue@126.com">投递</a></el-button>
      </div>
    </div>
    <AwFooter></AwFooter>
  </div>
</template>

<script>
import AwHeader from '../../components/web/public/Header'
import AwFooter from '../../components/web/public/Footer'

export default {
  name: 'jobDetail',
  components: {
    AwHeader,
    AwFooter
  },
  data () {
    return {
      jobDetail: {}
    }
  },
  computed: {
    job_path () {
      return this.$route.params.id
    }
  },
  created () {
    this.getJobDetail()
  },
  mounted () {
    this.$store.commit('setHeaderLogo', {
      headerLogoShow: false
    })
    this.$store.commit('setShadowActive', {
      headerShadowActive: true
    })
    this.$store.commit('setNavDarkActive', {
      navDarkActive: true
    })
    this.$store.commit('setHeaderShow', {
      headerShow: false
    })
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (to.name === 'index') {
      this.$store.commit('setHeaderLogo', {
        headerLogoShow: true
      })
      this.$store.commit('setShadowActive', {
        headerShadowActive: false
      })
      this.$store.commit('setNavDarkActive', {
        navDarkActive: false
      })
      this.$store.commit('setHeaderShow', {
        headerShow: false
      })
      next()
    } else {
      next()
    }
  },
  methods: {
    // 获取热职位详情
    async getJobDetail () {
      const { data: res } = await this.$http.get('/web/job/' + this.job_path)
      // console.log(res)
      if (res.status !== 200) {
        console.log(res)
      } else {
        this.jobDetail = {
          title: res.data.title,
          city: res.data.city,
          description: res.data.description,
          requirement: res.data.requirement,
          job_category: res.data.job_category,
          publish_time: res.data.publish_time,
          update_time: res.data.update_time
        }
      }
    }
  }
}
</script>

<style lang = "less" scoped>
.job-header {
  background-color: rgba(255, 255, 255, .7);
  backdrop-filter: blur(10px);
}

.content-container {
  padding-top: 60px;
  width: 100%;

  * {
    box-sizing: border-box
  }
}

h1 {
  font-size: 30px;
  font-weight: 800;
  color: #1f2329;
  margin-bottom: 13px;
}

.job-info, .update-time {
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  color: #646a73;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.update-time {
  margin-top: 20px;
  margin-bottom: 20px;
}
a, a:hover, a:active, a:visited, a:link, a:focus {
  outline: none;
  background: none;
  text-decoration: none;
  color: #FFFFFF;
}
.lineDivider {
  display: inline-block;
  width: 1px;
  height: 12px;
  background-color: #bbbfc4;
  margin: 0 8px;
}

h2 {
  margin: 50px 0 8px;
  font-size: 21px;
  line-height: 1.52;
  font-weight: 800;
  color: #1f2329;
}

.jobDetail {
  font-size: 16px;
  max-width: 800px;
  min-height: 573px;
  margin: 60px auto 110px;
  padding-left: 32px;

  .markdown {
    position: relative;
    z-index: 0;
    border: none !important;

    ::v-deep .v-show-content {
      background-color: #FFFFFF !important;
      padding: 0 !important;
    }
  }

  ::v-deep .v-note-wrapper {
    min-height: 50px;
  }
}
</style>
