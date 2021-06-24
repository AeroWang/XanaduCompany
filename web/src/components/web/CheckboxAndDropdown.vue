<template>
  <div>
    <el-checkbox-group
      ref = "location"
      v-model = "checked_list"
      @change = "handleSelect">
      <el-checkbox v-for = "(item,index) in targetData" :label = "item.code" :key = "index">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-dropdown
      trigger = "click" @command = "addToTarget"
      v-if = "sourceData.length" placement = "bottom-end">
      <el-input
        class = "search-input"
        :prefix-icon = "search_el_icon"
        :placeholder = "placeholder"
        :class = "{ focusing }"
        @focus = "focusing = true"
        @blur = "onInputBlur"
        type = "text"
        v-model = "filterKeyword"></el-input>
      <el-dropdown-menu slot = "dropdown">
        <el-dropdown-item v-for = "item in filterableData"
                          :key = "item.code"
                          :command = "item">
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'CheckboxAndDropdown',
  data () {
    return {
      checked_list: [],
      // 已展示
      // targetData: [],
      // 搜索、更多
      // hiddenData: [],
      // filterableData: [],
      filterKeyword: '',
      focusing: false,
      targets: []
    }
  },
  props: ['data', 'cityList'],
  methods: {
    handleSelect () {
      // console.log(this)
      this.$emit('changed', this.checked_list)
    },
    showHiddenData () {
      if (this.data.length >= 6) {
        this.hiddenData = this.data.slice(5, this.data.length - 1)
      }
    },
    onInputBlur (e) {
      // this.focusing = false
      setTimeout(() => {
        this.focusing = false
      }, 200 * Math.random())
    },
    addToTarget (command) {
      if (command.code) {
        // console.log('前' + this.targets)
        // 选中 ‘更多’ 列表中的某项，添加到展开列表项
        this.targets.push(command.code)
        // 并选中，更新 this.checked_list 到父组件中
        this.checked_list.push(command.code)
        this.$emit('changed', this.checked_list)
        // console.log(this)
      }
      this.filterKeyword = ''
    }
  },
  computed: {
    placeholder () {
      return !this.focusing ? '更多' : '搜索'
    },
    // 计算 targetData， 用来渲染默认展开的列表
    targetData () {
      return this.targets.map(key => {
        return this.data.find(item => item.code === key)
      }).filter(item => item && item.code)
    },
    // 计算 sourceData， 用来渲染默认隐藏的列表
    sourceData () {
      return this.data.filter(
        item => this.targets.indexOf(item.code) === -1
      )
    },
    // 计算 filterableData， 用来渲染搜索结果
    filterableData () {
      return this.sourceData.filter(item => {
        return item.name.startsWith(this.filterKeyword)
      })
    },
    search_el_icon () {
      if (this.focusing) {
        return 'el-icon-search'
      } else {
        return 'el-icon-plus'
      }
    }
  },
  watch: {
    data () { this.targets = this.data.slice(0, 6).map(item => item.code) },
    cityList () {
      this.checked_list = this.cityList
    }
  },
  mounted () {
    // 存储默认展开的复选框列表项 id 值
    // this.data 为父组件传入值
    // this.targets = this.data.slice(0, 6).map(item => item.code)
    // console.log(this.targetData)
  }
}
</script>
<style lang = "less">

.el-dropdown {
  input::placeholder {
    color: @main-color;
  }

  .el-input__icon {
    color: @main-color;
  }

  .focusing {
    input::placeholder {
      color: @secondary-text-color;
    }

    .el-input__icon {
      color: @secondary-text-color;
    }
  }
}
</style>
<style lang = "less" scoped>
/deep/ .el-checkbox-group {
  display: flex;
  flex-direction: column;

  .el-checkbox {
    height: 38px;
    line-height: 38px;
  }

  > .el-checkbox:first-child {
    margin-top: 8px;
  }

  .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }

  .el-checkbox__label {
    font-size: 16px;
  }

}

/deep/ .el-input {
  .el-input__inner {
    border: none;
  }

  .el-input__inner:hover {
    border: none;
  }

  .el-input__prefix {
    left: 0;
  }

  .el-input__icon {
    font-size: 16px;
    width: 0;
  }
}

.el-dropdown {
  //position: relative;
  //width: 200px;
}

:focus {
  outline: none
}
</style>
