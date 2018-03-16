<template>
    <div>
        <chans></chans>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
  import Menu from '@/components/Menu'
  export default {
    components: {
      'chans': Menu
    }
  }
</script>
