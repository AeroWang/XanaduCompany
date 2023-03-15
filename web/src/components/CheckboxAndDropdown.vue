<!--
 * @Author: zerotower69 zerotower@163.com
 * @Date: 2022-11-20 22:11:55
 * @LastEditors: zerotower69 zerotower@163.com
 * @LastEditTime: 2023-03-02 23:39:27
 * @FilePath: /XanaduCompany/web/src/components/CheckboxAndDropdown.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
     <div>
    <el-checkbox-group
      ref="location"
      v-model="checked_list"
      @change="handleSelect"
    >
      <el-checkbox
        v-for="(item, index) in targetData"
        :label="item.code"
        :key="index"
      >
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-dropdown
      trigger="click"
      @command="addToTarget"
      v-if="sourceData.length"
      placement="bottom-end"
    >
      <el-input
        class="search-input"
        :placeholder="placeholder"
        :class="{ focusing }"
        @focus="focusing = true"
        @blur="onInputBlur"
        type="text"
        v-model="filterKeyword"
      >
      <template #prefix>
      <el-icon>
      <Search v-if="focusing"/>
      <Plus v-else/>
      </el-icon>
      </template>
      </el-input>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in filterableData"
          :key="item.code"
          :command="item"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps,defineEmits,computed,watch} from "vue"
import { Search, Plus } from "@element-plus/icons-vue"
const props = defineProps({
    data: {
        type:Array
    },
    cityList: {
        type:Array
    }
})
const emits = defineEmits(['changed'])

const checked_list = ref<any[]>([])
const filterKeyword = ref('')
const focusing = ref(false)
const targets = ref<any[]>([])

const placeholder = computed(() => focusing.value ? '搜索' : "更多")
const targetData = computed<any[]>(() =>
    targets.value.map(key => props.data
        ?.find((item: any) => item.code === key))
        .filter((item:any)=>item && item.code)
)

const sourceData = computed(() => props.data
    ?.filter((item: any) => targets.value.indexOf(item.code) === -1) ?? [])
const filterableData = computed<any[]>(() =>
    sourceData.value?.filter((item:any) => {
      return item.name.startsWith(filterKeyword.value) ?? []
})
)
const search_el_icon = computed(() => focusing.value ? 'el-icon-search' : 'el-icon-plus')

//利用正则表达式判断邮箱
const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

// 1-100中能被3整除的数字
const is_valid_number = (num: any) => {
  return num % 3 === 0
}




watch(() => props.data, (val) => {
    targets.value=val?.slice(0,6).map((item:any)=>item.code) ?? []
})
watch(() => props.cityList, (val) => {
    checked_list.value=val as any[]
})

function handleSelect(){
  emits('changed',checked_list.value)
}
function showHiddenData() {
    if (props.data?.length??0 >= 6) {
        
    }
}
function onInputBlur(e: Event) {
    setTimeout(() => { 
        focusing.value=false
    },200*Math.random())
}
function addToTarget(command: any) {
    if (command.code) {
        targets.value.push(command.code)
        checked_list.value.push(command.code)
        emits('changed',checked_list.value)
    }
    filterKeyword.value=''
}
</script>
<style lang="less">
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
<style lang="less" scoped>
:deep(.el-checkbox-group) {
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

:deep(.el-input) {
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
  outline: none;
}
</style>
