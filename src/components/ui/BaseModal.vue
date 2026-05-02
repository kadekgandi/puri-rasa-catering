<script setup>
import { watch, onUnmounted } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])

const handleEsc = (e) => {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.show,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEsc)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEsc)
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleEsc)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="modal-backdrop"
        @click.self="emit('close')"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-shell">
          <button class="modal-close" @click="emit('close')" aria-label="Tutup">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  background: rgba(28, 19, 17, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  padding: 1rem;
  overflow-y: auto;
}

.modal-shell {
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: calc(100dvh - 2rem);
  background: var(--color-cream);
  border-radius: var(--radius-xl);
  box-shadow: 0 32px 80px -20px rgba(28, 19, 17, 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-body {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  color: var(--color-charcoal);
  z-index: 10;
  transition:
    background-color var(--transition-fast),
    transform var(--transition-fast);
}

.modal-close:hover {
  background: var(--color-white);
  transform: rotate(90deg);
}

/* ============ TRANSITIONS ============ */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 320ms cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-active .modal-shell,
.modal-leave-active .modal-shell {
  transition:
    transform 380ms cubic-bezier(0.32, 0.72, 0, 1),
    opacity 320ms cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-shell,
.modal-leave-to .modal-shell {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
}

@media (max-width: 560px) {
  .modal-shell {
    max-height: calc(100dvh - 1rem);
    border-radius: var(--radius-lg);
  }
}
</style>
