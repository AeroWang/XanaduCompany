<template>
  <div class="job">
    <AwHeader class="job_header" ref="jobRef" />
    <div class="box">
      <div class="banner">和优秀的人，做有挑战的事</div>
      <!-- 搜索 -->
      <div class="search-wrapper" :class="{ fixedTop: searchBarFixedTop }">
        <el-input :class="[{ 'medium': searchBarFixedTop }, 'small']" placeholder="搜索职位" @change="search"
          v-model="searchKeyword">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button :class="[{ 'medium': searchBarFixedTop }, 'small']" type="primary" round @click="search">搜索
        </el-button>
      </div>
      <div class="main">
        <div class="aside-filter">
          <div class="aside-header">
            <span>筛选</span>
            <span :class="{ clearable }" class="clear" @click="clearFilter">清空</span>
          </div>
          <div class="job-category job-filter-block">
            <div class="title">职位类别</div>
            <el-tree ref="jobCategory" :data="jobCategories" :props="jobCategoryProps" node-key="id" check-on-click-node
              @check="jobCategoryChange" show-checkbox>
            </el-tree>
          </div>
          <div class="city-category job-filter-block">
            <div class="title">城市</div>
            <checkbox-and-dropdown @changed="cityChange" :data="jobCities" :cityList="this.location_code_list">{{
                location_code_list
            }}
            </checkbox-and-dropdown>
          </div>
        </div>
        <div class="content">
          <h2 class="content-title" v-show="results.total > 0">开启新的工作 ({{ results.total }})</h2>
          <h2 class="content-title" v-show="!results.total > 0">开启新的工作 (0)</h2>
          <ul class="content-list">
            <li class="content-item is-hover-shadow" v-for="item in results.job_post_list" :key="item.id">
              <router-link :to="`/job/${item.id}`">
                <h3 class="title">{{ item.title }}</h3>
                <div class="subTitle">
                  <span class="city">{{ item.aw_city_info.name }}</span>&nbsp;|
                  <span class="job_category">{{ item.aw_job_category.name }}</span>
                </div>
                <p class="desc">{{ item.description }}</p>
              </router-link>
            </li>
          </ul>
          <div v-show="!loading" class="pagination-wrapper">
            <el-pagination layout="prev, pager, next" v-model:current-page="currentPage" :total="results.total"
              :hide-on-single-page="singlePage">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <AwFooter />
  </div>
</template>
<script lang="ts" setup>
import AwHeader from '@/components/public/Header.vue'
import AwFooter from '@/components/public/Footer.vue'
import CheckboxAndDropdown from '@/components/CheckboxAndDropdown.vue'

import mainStore from '@/store'
import { onBeforeRouteLeave } from 'vue-router'
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { getJobListApi } from '@/apis/job'

const jobCategories = ref([])
const jobCategoryProps = ref({
  children: 'children',
  label: 'name'
})
const jobCities = ref([])
const job_category_id_list = ref([])
const location_code_list = ref([])
const searchBarFixedTop = ref(false)

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const cityList = ref([])
const cities = ref([])
const results = ref([])
const loading = ref(false)
const locationCodeProps = ref({
  label: 'name'
})
const singlePage = ref(false)
const checked = ref(false)
const scrollTop = ref(0)
const oldScrollTop = ref(0)

const queryFilter = computed(() => {
  return {
    job_category_id_list: job_category_id_list.value,
    location_code_list: location_code_list.value,
    keyword: searchKeyword.value,
    pagesize: pageSize.value,
    currentPage: currentPage.value
  }
})
const clearable = computed(() => job_category_id_list.value.length !== 0 ||
  location_code_list.value.length != 0
)

onBeforeMount(() => {
  getJobConfigRequest()
  getJobList()
})

onMounted(() => {
  mainStore.commit('setHeaderLogo', {
    headerLogoShow: false
  })
  mainStore.commit('setShadowActive', {
    headerShadowActive: false
  })
  mainStore.commit('setNavDarkActive', {
    navDarkActive: true
  })
  mainStore.commit('setHeaderShow', {
    headerShow: false
  })
  window.addEventListener('scroll', scrollHandle)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandle)
})

function scrollHandle() {
  scrollTop.value =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop
  oldScrollTop.value = scrollTop.value
  if (scrollTop.value >= 350) {
    mainStore.commit('setHeaderShow', {
      headerShow: true
    })
  } else {
    mainStore.commit('setHeaderShow', {
      headerShow: false
    })
  }
  searchBarFixedTop.value = scrollTop.value >= 430
}

function search() {
  getJobList()
}

function clearFilter() {

}

// 请求职位列表
async function getJobList() {
  results.value = []
  loading.value = true
  const { data: res } = await getJobListApi()
  if (res.status === 200) {
    results.value = res.data
    loading.value = false
    if (results.value.total <= results.value.limit) {
      singlePage.value = true
    }
  }
}

// 请求筛选条件
async function getJobConfigRequest() {

}

function jobCategoryChange() {

}

function cityChange(value: any) {
  location_code_list.value = value
  getJobList()
}

onBeforeRouteLeave((to, from, next) => {
  if (from.name === 'Product') {
    mainStore.commit('setNavDarkActive', {
      navDarkActive: false
    })
    mainStore.commit('setHeaderLogo', {
      headerLogoShow: true
    })
    next()
  }
})
</script>
<style lang = "less" scoped>
.job_header {
  background-color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(10px);
}

.box {
  padding-top: 60px;
  min-height: 860px;
  width: 100%;

  * {
    box-sizing: border-box
  }

  .banner {
    height: 400px;
    line-height: 400px;
    color: #fff;
    width: 100%;
    min-width: @main-width;
    background-image: url("//sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/joblistbanner2x.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    font-size: @font-size-larger;
  }
}

.search-wrapper {
  position: absolute;
  transform: translateY(-50%);
  width: 100%;

  &.fixedTop {
    position: fixed;
    box-shadow: 0 2px 16px 0 rgba(31, 35, 41, 5%);
    top: 0;
    transform: translateY(0);
    padding: 15px 0;
    z-index: 1000;
    background-color: #fff;
    transition: all 0.3s;
  }

  .el-input {
    width: 50%;
    left: 50%;
    transform: translateX(-50%);

    &.medium {
      width: 64%;
    }
  }

  :deep(.el-input__inner) {
    height: 50px;
    border-radius: 25px;
  }

  .el-button {
    position: absolute;
    line-height: 0;
    height: 50px;
    border-radius: 0 25px 25px 0;
    right: 25%;

    &.medium {
      right: 18%;
    }
  }
}

.main {
  width: 1026px;
  min-height: 400px;
  margin: 80px auto 60px;
  display: flex;

  .aside-filter {
    width: 275px;
    height: auto;
    padding-right: 35px;
    border-right: 1px solid @border-light-color;
  }

  .aside-header {
    font-size: 14px;
    font-weight: 700;
    color: #1f2329;
    border-bottom: 1px solid @border-lighter-color;
    padding-bottom: 12px;
    margin-top: 10px;
    margin-bottom: 23px;

    .clear {
      float: right;
      font-weight: normal;
      cursor: pointer;
    }

    .clearable {
      color: @main-color;
    }
  }

  .job-filter-block {
    margin-bottom: 39px;
    position: relative;
    height: auto;

    .title {
      font-size: 20px;
      font-weight: 700;
      color: @primary-text-color;
      margin-bottom: 9px;
    }
  }

  .content {
    width: 712px;
    height: auto;
    //margin-left: 300px;

    padding-left: 24px;
  }

  .content-title {
    font-size: 30px;
    line-height: 36px;
    height: 36px;
    font-weight: 700;
    margin-left: 16px;
    margin-bottom: 18px;
  }

  .content-list {
    margin-top: 22px;
  }

  .content-item {
    //margin-bottom: 20px;
    padding: 20px;
    transition: box-shadow .5s;

    &.is-hover-shadow:hover {
      box-shadow: 0 8px 24px 0 rgba(187, 191, 196, 0.2);
      border-radius: 5px;
    }

    .title {
      margin: 12px 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.6;
    }

    .subTitle {
      flex-wrap: wrap;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      color: #646a73;
      margin: 4px 0 12px;
    }

    .desc {
      width: 664px;
      max-height: 44px;
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.57;
      letter-spacing: normal;
      color: #8f959e;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      white-space: pre-line;
      -webkit-line-clamp: 2;
    }
  }

  a {
    color: rgba(0, 0, 0, 1);
    overflow: hidden;
    cursor: pointer;
  }
}
</style>


<style lang = "less">
.el-tree {
  color: @primary-text-color;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
  margin: 0;
  padding: 0;

  >.el-tree-node:first-child {
    margin-top: 8px;
  }

  .el-tree-node__content {
    height: 38px;
  }

  .el-tree-node__label {
    font-size: 16px;
  }

  .el-tree-node__expand-icon {
    color: #9ca2a9;
  }
}

.el-pagination {
  margin-top: 20px;
}
</style>
