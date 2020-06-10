<template>
  <li :class="'todo-form' + (item.completed? ' completed' : '' ) + (editing? ' edit' : '' )" @dblclick="editing = true">
    <input class="checkbox" type="checkbox" :name="'item#'+item.key" :value="item.completed" @click="onCompleted">
    <div class="view">
      <label :for="'item#'+item.key">{{item.label}}</label>
      <i class="material-icons" @click="removeItem(index)">clear</i>
      <input class="input-edit" type="text" placeholder="Change Label" maxlength="254" v-model="editLabel" v-show="editing" v-focus="editing" @blur="onBlur" @keyup.enter="onEditEnter">
    </div>
  </li>
</template>

<script>
export default {
  name: 'todo-item',
  props: ['item', 'index'],
  data () {
    return {
      editing: false,
      editLabel: ''
    }
  },
  directives: {
    // create auto focus
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  methods: {
    // on click on checkbox to change completed status
    onCompleted (event) {
      this.$store.dispatch('updateCompleted', { key: this.item.key, value: !this.item.completed })
    },

    // Remove item from todo list
    removeItem (index) {
      this.$store.dispatch('removeItem', this.item.key)
    },

    // When edit input is press on enter blur the input.
    // The reason for blur is because you dont want to 
    // submit the data 2 time. Main hand data on blur
    onEditEnter (event) {
      event.target.blur()
    },

    // When on blur update state and update label
    onBlur (event) {
      const text = this.editLabel.trim()
      if (text.length > 2) {
        this.$store.dispatch('editLabel', { key: this.item.key, label: text })
      }
      this.editing = false
      this.editLabel = ''
    }
  }
}
</script>
