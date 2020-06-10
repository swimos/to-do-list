<template>
  <div id="app">
    <main class="container">
      <app-header></app-header>
      <section class="todo-wrap">
        <h2 class="title">Vue - Todo List</h2>
        <div class="todo-header">
          <TodoInput></TodoInput>
          <ul class="filter unstyled">
            <li><router-link to="/">All</router-link></li>
            <li><router-link to="/active">Active</router-link></li>
            <li><router-link to="/completed">Completed</router-link></li>
          </ul><!-- ./filter -->

        </div><!-- ./todo-header -->

        <router-view/>
      </section><!-- ./todo-wrap -->

      <app-footer></app-footer>
    </main><!-- ./container -->
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import TodoInput from './components/TodoInput.vue'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter,
    TodoInput
  },
  /**
    * When the app is mount we open Map downlink 
    * to Subscribe totodos list. When the data is updated
    * we will send an action SUBSCRIBE_ITEM to keep track
    * of the state of the todo list. For todo list we 
    * mainly track if new item is added or rmeove or updated
    */
  mounted () {
    this.connect()
  },
  /**
    * When we unmount is best if we close the Map downlink 
    * if we are not using.
    */
  beforeDestroy () {
    this.disconnect()
  },
  methods: {
    connect () {
      this.$store.dispatch('openTodoLink')
    },
    disconnect () {
      this.$store.dispatch('closeTodoLink')
    }
  }
}
</script>

<style src="./app.css"></style>
