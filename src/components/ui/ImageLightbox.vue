<script setup>
import { watch, onUnmounted, computed } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  items: { type: Array, required: true },
  index: { type: Number, default: 0 },
})
const emit = defineEmits(['close', 'update:index'])

const current = computed(() => props.items[props.index] || null)

const next = () => {
  emit('update:index', (props.index + 1) % props.items.length)
}
const prev = () => {
  emit('update:index', (props.index - 1 + props.items.length) % props.items.length)
}

const handleKey = (e) => {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

watch(
  () => props.show,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKey)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lb">
      <div
        v-if="show && current"
        class="lb"
        @click.self="emit('close')"
        role="dialog"
        aria-modal="true"
      >
        <!-- TOP BAR -->
        <div class="lb__top">
          <span class="lb__count">
            <span class="lb__count-num">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="lb__count-sep">/</span>
            <span class="lb__count-total">{{ String(items.length).padStart(2, '0') }}</span>
          </span>
          <button class="lb__btn lb__btn--close" @click="emit('close')" aria-label="Tutup">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- NAV PREV -->
        <button
          v-if="items.length > 1"
          class="lb__nav lb__nav--prev"
          @click.stop="prev"
          aria-label="Foto sebelumnya"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <!-- IMAGE STAGE -->
        <div class="lb__stage" @click.self="emit('close')">
          <Transition name="lb-img" mode="out-in">
            <figure :key="current.id" class="lb__figure">
              <img :src="current.src" :alt="current.alt" class="lb__img" />
              <figcaption class="lb__caption">
                <span class="lb__caption-title">{{ current.caption }}</span>
                <span class="lb__caption-loc">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {{ current.location }}
                </span>
              </figcaption>
            </figure>
          </Transition>
        </div>

        <!-- NAV NEXT -->
        <button
          v-if="items.length > 1"
          class="lb__nav lb__nav--next"
          @click.stop="next"
          aria-label="Foto selanjutnya"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  background: rgba(15, 10, 9, 0.94);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 1.5rem;
}

.lb__top {
  position: absolute;
  top: 1.25rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
}

.lb__count {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-full);
  color: var(--color-white);
  font-family: var(--font-display);
  font-variation-settings: 'opsz' 144;
}

.lb__count-num {
  font-size: 1.05rem;
  font-weight: 600;
  font-style: italic;
}

.lb__count-sep,
.lb__count-total {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
}

.lb__btn {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--color-white);
  transition:
    background-color var(--transition-fast),
    transform var(--transition);
}

.lb__btn:hover {
  background: rgba(255, 255, 255, 0.18);
}

.lb__btn--close:hover {
  transform: rotate(90deg);
  background: var(--color-red);
  border-color: var(--color-red);
}

.lb__nav {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--color-white);
  transition: all var(--transition-fast);
  z-index: 5;
  flex-shrink: 0;
}

.lb__nav:hover {
  background: var(--color-white);
  color: var(--color-charcoal);
  transform: scale(1.06);
}

.lb__stage {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem 1rem;
  min-width: 0;
}

.lb__figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: min(1100px, 100%);
  max-height: 100%;
}

.lb__img {
  max-width: 100%;
  max-height: calc(100vh - 200px);
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 32px 80px -20px rgba(0, 0, 0, 0.5);
}

.lb__caption {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1.25rem;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  color: var(--color-white);
}

.lb__caption-title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.95rem;
  font-weight: 500;
  font-variation-settings: 'opsz' 24;
}

.lb__caption-loc {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.65);
  padding-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.18);
}

/* ============ TRANSITIONS ============ */
.lb-enter-active,
.lb-leave-active {
  transition: opacity 320ms cubic-bezier(0.4, 0, 0.2, 1);
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}

.lb-img-enter-active,
.lb-img-leave-active {
  transition:
    opacity 280ms ease,
    transform 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
.lb-img-enter-from {
  opacity: 0;
  transform: scale(0.96);
}
.lb-img-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

@media (max-width: 720px) {
  .lb {
    padding: 1rem;
  }
  .lb__top {
    top: 0.75rem;
    left: 1rem;
    right: 1rem;
  }
  .lb__nav {
    width: 44px;
    height: 44px;
  }
  .lb__stage {
    padding: 4rem 0.5rem 1rem;
  }
  .lb__img {
    max-height: calc(100vh - 240px);
  }
  .lb__caption {
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
  }
  .lb__caption-loc {
    padding-left: 0;
    border-left: none;
  }
}
</style>
