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
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { getJobDetailApi } from '@/apis/job'
import AwHeader from '@/components/public/Header.vue'
import AwFooter from '@/components/public/Footer.vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const mainStore = useStore()
const jobDetail = ref<Record<string, unknown>>({})
const job_path = computed<string>(() => route.params.id as string)

async function getJobDetail () {
  const { data: res } = await getJobDetailApi(job_path.value)
  if (res.status !== 200) {
    console.log(res)
  } else {
    jobDetail.value = {
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
onMounted(() => {
  mainStore.commit('setHeaderLogo', {
    headerLogoShow: false
  })
  mainStore.commit('setShadowActive', {
    headerShadowActive: true
  })
  mainStore.commit('setNavDarkActive', {
    navDarkActive: true
  })
  mainStore.commit('setHeaderShow', {
    headerShow: false
  })
  getJobDetail()
})
onBeforeRouteLeave((to, from, next) => {
  if (to.name === 'index') {
    mainStore.commit('setHeaderLogo', {
      headerLogoShow: true
    })
    mainStore.commit('setShadowActive', {
      headerShadowActive: false
    })
    mainStore.commit('setNavDarkActive', {
      navDarkActive: false
    })
    mainStore.commit('setHeaderShow', {
      headerShow: false
    })
  }
  next()
})
</script>
<style lang="less" scoped>
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

    ::v-deep(.v-show-content) {
      background-color: #FFFFFF !important;
      padding: 0 !important;
    }
  }
  ::v-deep(.v-note-wrapper) {
    min-height: 50px;
  }
}
</style>
