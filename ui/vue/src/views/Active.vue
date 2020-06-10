<template>
  <ul class="todo-list unstyled">
    <TodoItem v-for="item in todos" v-bind:item="item" :key="item.key"></TodoItem>
  </ul>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'

export default {
  name: 'active',
  components: {
    TodoItem
  },
  computed: {
    todos () {
      // filter todos list and show only active
      return this.$store.getters.activeTodo
    }
  }
}
</script>
