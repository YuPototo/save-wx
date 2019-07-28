<script>
	export default {
    beforeCreate() {
      this.$store.dispatch('fetchSavings')
    }
	}
</script>

<style>
input {
	border: 1px solid grey;
}
</style>
