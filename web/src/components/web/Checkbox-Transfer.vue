<template>
  <div class = "checkbox">
    <h2>{{ title }}</h2>

    <ul class = "checkbox-list">
      <li class = "checkbox-item" v-for = "(item, index) in targetData" :key = "index">
        <input
          @change = "check(item, $event)"
          type = "checkbox"
          :id = "item[props.key]"
          :checked = "checked[index]"
        />
        <label :for = "item[props.key]" class = "label-text">
          {{
            item[props.label]
          }}
        </label>
      </li>
    </ul>
    <div class = "search" v-if = "sourceData.length">
      <input
        @blur = "onInputBlur"
        @focus = "focusing = true"
        class = "search-input"
        :class = "{ focusing }"
        :placeholder = "placeholder"
        type = "text"
        v-model = "filterKeyword"
      />
      <ul class = "search-list" v-show = "focusing">
        <li
          v-for = "item in filterableData"
          :key = "item[props.key]"
          class = "search-item"
          @click = "addToTarget(item)"
        >
          <span>{{ item[props.label] }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'checkbox-transfer',
  data () {
    return {
      focusing: false,
      filterKeyword: '',
      targets: []
    }
  },
  props: {
    title: String,
    targetCount: {
      type: Number,
      default: 5
    },
    data: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default () {
        return {
          key: 'key',
          label: 'label'
        }
      }
    },
    value: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    checked () {
      return this.targets.map(key => this.value.includes(key))
    },
    targetData () {
      return this.targets
        .map(key => {
          return this.data.find(item => item[this.props.key] === key)
        })
        .filter(item => item && item[this.props.key])
    },
    sourceData () {
      return this.data.filter(
        item => this.targets.indexOf(item[this.props.key]) === -1
      )
    },

    filterableData () {
      return this.sourceData.filter(item => {
        return item[this.props.label].startsWith(this.filterKeyword)
      })
    },
    placeholder () {
      return !this.focusing ? '更多' : '搜索'
    }
  },

  watch: {
    checked () {
      this.$emit('change', this.checkedValue)
    },
    data () {
      this.targets = this.data.slice(0, 6).map(item => item[this.props.key])
      this.checked.length = this.targets.length
      this.value.forEach(key => {
        if (!this.targets.includes(key)) {
          this.targets.push(key)
          this.checked.push(true)
        }
      })
    }
  },
  methods: {
    clearChecked () {
      for (let i = 0, l = this.value.length; i < l; i++) {
        this.value.pop()
      }
    },
    onInputBlur (e) {
      setTimeout(() => {
        this.focusing = false
      }, 200)
    },
    addToTarget (item) {
      if (item[this.props.key]) {
        this.targets.push(item[this.props.key])
        this.value.push(item[this.props.key])
      }

      this.filterKeyword = ''
    },
    check (item, e) {
      if (!e.target.checked) {
        const delIndex = this.value.indexOf(item[this.props.key])
        if (delIndex > -1) {
          this.value.splice(delIndex, 1)
        }
      } else {
        if (!this.value.includes(item[this.props.key])) {
          this.value.push(item[this.props.key])
        }
      }

      this.$emit('check', e.target.checked, item[this.props.key])
      this.$emit('input', this.value)
    }
  }
}
</script>
<style lang = "less" scoped>
.checkbox {
  max-width: 200px;

  h2 {
    font-weight: @font-weight-regular;
    margin-bottom: 12px;
    color: black;
    font-size: @font-size-large;
  }

  &-item {
    margin-bottom: 8px;
    // cursor: pointer;
    input,
    label {
      cursor: pointer;
    }

    input {
      transform: scale(1.4);
    }

    .label-text {
      margin-left: 3px;
      vertical-align: middle;
    }

    &:hover {
      border-color: @main-color;
    }
  }
}

.search {
  position: relative;

  &-placeholder {
    cursor: pointer;
    // border-bottom: 1px solid @border-lighter-color;
  }

  &-input {
    border-width: 0 0 1px 0;
    outline: none;
    width: 100%;
    padding: 5px;
    border-color: @border-lighter-color;

    &.focusing {
      border-color: @main-color;
    }
  }

  &-list {
    padding-top: 10px;
    position: absolute;

    z-index: 10000;
    background-color: #fff;
    max-height: 300px;
    width: 100%;
    overflow: auto;
    line-height: 34px;
    box-shadow: 0 10px 30px 0 rgba(136, 150, 171, 0.15);
  }

  &-item {
    padding: 0 20px;

    &:hover {
      cursor: pointer;
      background: @bg-base-color;
    }
  }
}
</style>
