<script setup>
import TheNavbar from '@/components/global/TheNavbar.vue'
import TheFooter from '@/components/global/TheFooter.vue'
</script>

<template>
  <div class="app">
    <TheNavbar />

    <main class="app__main">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <TheFooter />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__main {
  flex: 1;
  width: 100%;
  padding-top: 76px;
}

/* Mobile: navbar lebih ramping, padding ikut menyesuaikan */
@media (max-width: 720px) {
  .app__main {
    padding-top: 68px;
  }
}

/* Hero halaman Home punya margin-top -76px untuk extend ke navbar.
   Beri exception supaya tetap tampil benar. */

.page-enter-active,
.page-leave-active {
  transition:
    opacity 300ms ease,
    transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
