<template>
  <div class="form-input">
    <input type="text" class="textInput" placeholder="What things to do?" maxlength="254"
      v-model="text"
      @keyup.enter="onEnter"
    >
  </div>
</template>

<script>
export default {
  name: 'form-input',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    // When key press on input add new item
    onEnter (event) {
      const text = this.text.trim()
      if (text.length > 2) {
        this.$store.dispatch('additem', this.text)
        this.text = ''
      }
    }
  }
}
</script>
