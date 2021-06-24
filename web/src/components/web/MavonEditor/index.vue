<template>
  <div>
    <mavon-editor
      ref = "md"
      v-model = "parentContent"
      :subfield = "false"
      :boxShadow = "false"
      defaultOpen = "preview"
      :toolbarsFlag = "false"
    />
  </div>
</template>

<script>

export default {
  name: 'Markdown',
  props: ['content'],
  // computed: {
  //   parentContent () {
  //     return this.content
  //   }
  // },
  // watch: {
  //   content (newVal) {
  //     console.log(newVal)
  //   }
  // },
  data () {
    return {
      parentContent: this.content
    }
  },
  methods: {}
}
</script>
