import Vue from 'vue'
import Vuex from 'vuex'
import * as swim from '@swim/system'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    HOST: 'warp://localhost:9001',
    NODE: '/todo',
    TodoLink: null,
    todos: []
  },
  mutations: {
    /**
      * When we get an update event from Map downlink
      * we add or update item in the todo state
      */
    subscribeItem (state, data) {
      let newItem = false

      state.todos.forEach((item) => {
        if (item.key === data.key) {
          item.completed = data.completed
          item.label = data.label
          newItem = true
        }
      })

      if (!newItem) {
        state.todos.unshift(data)
      }
    },

    /**
      * When we get a rmeove event from Map downlink
      * we remove item from todos state
      */
    removeItem (state, key) {
      let list = state.todos
      state.todos = list.filter((todo) => todo.key !== key)
    }
  },
  actions: {
    /**
      * subscribe to a Map downlink to our 'list' lane
      * this is how we get updates from the MapLane inside the WebAgent
      */
    openTodoLink (context) {
      context.state.TodoLink = swim.downlinkMap().hostUri(context.state.HOST).nodeUri(context.state.NODE).laneUri('list')
        .didUpdate((key, value) => {
          context.commit('subscribeItem', { ...value.toAny(), key: key.numberValue()})
        })
        .didRemove((key) => {
          context.commit('removeItem', key.numberValue())
        }).open()
    },

    /**
      * Stop subscribe to a Map downlink to our 'list' lane
      * this is how we close from the MapLane
      */
    closeTodoLink (context) {
      context.state.TodoLink.close()
    },

    /**
      * Send Command to Swim WebAgent to add a list item
      * This will call the addItem command lane in the ToDo WebAgent
      * UUID is generated automatically by the command lane adding new value to the list
      */
    additem (context, text) {
      swim.command(context.state.HOST, context.state.NODE, 'addItem', text)
    },

    /**
     * Send Command to Swim WebAgent to remove a list item by UUID
     * This will call the removeItem command lane in the ToDo WebAgent
     */
    removeItem (context, key) {
      swim.command(context.state.HOST, context.state.NODE, 'removeItem', key)
    },

    /**
     * Send Command to Swim WebAgent to update completed status of list item by UUID
     * This will call the updateCompletedItem command lane in the ToDo WebAgent
     */
    updateCompleted (context, data) {
      swim.command(context.state.HOST, context.state.NODE, 'updateCompletedItem', { key: data.key, completed: data.value })
    },

    /**
     * Send Command to Swim WebAgent to update label of list item by UUID
     * This will call the editItem command lane in the ToDo WebAgent
     */
    editLabel (context, data) {
      swim.command(context.state.HOST, context.state.NODE, 'editItem', { key: data.key, label: data.label })
    }
  },
  getters: {
    /**
     * Filter todo list to show only active item
     */
    activeTodo (state) {
      return state.todos.filter(todo => !todo.completed)
    },

    /**
     * Filter todo list to show only completed item
     */
    completedTodo (state) {
      return state.todos.filter(todo => todo.completed)
    }
  }
})
