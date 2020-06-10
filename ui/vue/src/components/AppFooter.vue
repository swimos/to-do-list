<template>
  <footer class="main-footer text-center">
    <span class="tip">Press Enter to submit and double click label to edit.</span>
    <div class="copyright">
      <span>{{year}} &copy; SWIM.ai</span>
    </div>
  </footer><!-- ./main-footer -->
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
