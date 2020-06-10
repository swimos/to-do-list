<template>
  <ul class="todo-list unstyled">
    <TodoItem v-for="item in todos" v-bind:item="item" :key="item.key"></TodoItem>
  </ul>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'

export default {
  name: 'home',
  components: {
    TodoItem
  },
  computed: {
    todos () {
      // show todos list
      return this.$store.state.todos
    }
  }
}
</script>
