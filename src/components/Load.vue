<template>

</template>

<script>
  export default {
    created () {
      setTimeout(() => {
        if (this.$store.getters['channels/getChannels'].length > 0) {
          this.$router.push({name: 'Channel', params: {id: this.$store.getters['channels/getChannels'][0]._id}})
        } else {
          this.$router.push({name: 'NewChannel'})
        }
      }, 1000)
    }
  }
</script>


