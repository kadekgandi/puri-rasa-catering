<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { aboutStories } from '@/data/aboutStories.js'
import BaseModal from '@/components/ui/BaseModal.vue'

const activeId = ref(null)
const activeStory = computed(() => aboutStories.find((s) => s.id === activeId.value) || null)

const openStory = (id) => {
  activeId.value = id
}
const closeStory = () => {
  activeId.value = null
}

// ============ SCROLL REVEAL ============
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="about">
    <!-- ===================== HERO HEADER ===================== -->
    <section class="hero">
      <div class="hero__bg" aria-hidden="true">
        <span class="hero__shape hero__shape--1"></span>
        <span class="hero__shape hero__shape--2"></span>
      </div>

      <div class="container hero__inner">
        <span class="hero__eyebrow reveal">
          <span class="hero__line"></span>
          About · Our Story
        </span>

        <h1 class="hero__title reveal" style="--d: 120ms">
          Kisah <em>Puri Rasa</em>
          <span class="hero__title-meta">
            <span class="hero__title-meta-line"></span>
            Memasak Sejak 1999
          </span>
        </h1>

        <p class="hero__lead reveal" style="--d: 240ms">
          Selami cerita di balik setiap hidangan—dari dapur kecil seorang nenek di Singaraja hingga
          ribuan meja yang kami layani hari ini.
        </p>

        <div class="hero__hint reveal" style="--d: 360ms">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Klik kartu di bawah untuk membaca cerita lengkapnya
        </div>
      </div>
    </section>

    <!-- ===================== STORY GRID ===================== -->
    <section class="grid-section">
      <div class="container">
        <div class="story-grid">
          <button
            v-for="(story, i) in aboutStories"
            :key="story.id"
            class="story-card reveal"
            :style="{ '--d': i * 80 + 'ms' }"
            @click="openStory(story.id)"
            type="button"
          >
            <div class="story-card__media">
              <img :src="story.image" :alt="story.label" loading="lazy" />
              <div class="story-card__overlay"></div>
            </div>

            <div class="story-card__content">
              <span class="story-card__num">0{{ i + 1 }}</span>
              <h3 class="story-card__label">{{ story.label }}</h3>
              <span class="story-card__cta">
                Baca cerita
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- ===================== MODAL ===================== -->
    <BaseModal :show="!!activeStory" @close="closeStory">
      <article v-if="activeStory" class="story-modal">
        <div class="story-modal__media">
          <img :src="activeStory.image" :alt="activeStory.label" />
          <div class="story-modal__media-overlay"></div>
          <div class="story-modal__media-meta">
            <span class="story-modal__eyebrow">{{ activeStory.eyebrow }}</span>
          </div>
        </div>

        <div class="story-modal__content">
          <h2 class="story-modal__title">{{ activeStory.title }}</h2>

          <div class="story-modal__body">
            <p v-for="(para, i) in activeStory.body" :key="i">{{ para }}</p>
          </div>

          <div class="story-modal__footer">
            <span class="story-modal__sig">— Tim Puri Rasa</span>
            <button class="story-modal__close-btn" @click="closeStory">Tutup cerita</button>
          </div>
        </div>
      </article>
    </BaseModal>
  </div>
</template>

<style scoped>
.about {
  background: var(--color-cream);
}

/* ===================== HERO ===================== */
.hero {
  position: relative;
  padding-block: clamp(4rem, 3rem + 5vw, 7rem) clamp(3rem, 2rem + 3vw, 5rem);
  overflow: hidden;
  isolation: isolate;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.hero__shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
}

.hero__shape--1 {
  top: -10%;
  right: -8%;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(178, 58, 58, 0.45) 0%, transparent 70%);
}

.hero__shape--2 {
  bottom: -20%;
  left: -10%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(217, 119, 87, 0.35) 0%, transparent 70%);
}

.hero__inner {
  max-width: 880px;
  position: relative;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-red);
  margin-bottom: 1.5rem;
}

.hero__line {
  width: 40px;
  height: 1px;
  background: var(--color-red);
}

.hero__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.5rem, 1.6rem + 4vw, 5rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
  font-variation-settings: 'opsz' 144;
  color: var(--color-charcoal);
  margin-bottom: 1.5rem;
  position: relative;
}

.hero__title em {
  font-style: italic;
  font-weight: 500;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

.hero__title-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  vertical-align: middle;
  font-style: normal;
  position: relative;
  top: -0.6em;
}

.hero__title-meta-line {
  display: inline-block;
  width: 28px;
  height: 1px;
  background: var(--color-text-muted);
}

.hero__lead {
  font-size: clamp(1.05rem, 0.95rem + 0.4vw, 1.25rem);
  line-height: 1.65;
  color: var(--color-text-muted);
  max-width: 56ch;
  margin-bottom: 1.75rem;
}

.hero__hint {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  background: rgba(178, 58, 58, 0.08);
  border: 1px solid rgba(178, 58, 58, 0.15);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  color: var(--color-red-dark);
  font-weight: 500;
}

/* ===================== STORY GRID ===================== */
.grid-section {
  padding-bottom: var(--space-4xl);
}

.story-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.story-card {
  position: relative;
  display: flex;
  flex-direction: column;
  aspect-ratio: 4 / 5;
  border: 1px solid rgba(28, 19, 17, 0.05);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-charcoal);
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  padding: 0;
  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.story-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 60px -20px rgba(28, 19, 17, 0.3);
}

.story-card:focus-visible {
  outline: 2px solid var(--color-red);
  outline-offset: 4px;
}

.story-card__media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.story-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 800ms cubic-bezier(0.32, 0.72, 0, 1);
}

.story-card:hover .story-card__media img {
  transform: scale(1.08);
}

.story-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(28, 19, 17, 0.15) 0%,
    rgba(28, 19, 17, 0.45) 55%,
    rgba(28, 19, 17, 0.92) 100%
  );
  transition: background var(--transition);
}

.story-card:hover .story-card__overlay {
  background: linear-gradient(
    180deg,
    rgba(28, 19, 17, 0.25) 0%,
    rgba(28, 19, 17, 0.55) 50%,
    rgba(28, 19, 17, 0.96) 100%
  );
}

.story-card__content {
  position: relative;
  z-index: 2;
  margin-top: auto;
  padding: 1.5rem 1.5rem 1.4rem;
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.story-card__num {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
  font-variation-settings: 'opsz' 9;
}

.story-card__label {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.25rem, 0.95rem + 1vw, 1.625rem);
  line-height: 1.2;
  letter-spacing: -0.015em;
  font-variation-settings: 'opsz' 144;
  color: var(--color-white);
  margin: 0.1rem 0 0.6rem;
}

.story-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  align-self: flex-start;
  padding: 0.5rem 0.95rem;
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-charcoal);
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  transition:
    background-color var(--transition),
    color var(--transition);
}

.story-card__cta svg {
  transition: transform var(--transition);
}

.story-card:hover .story-card__cta {
  background: var(--color-red);
  color: var(--color-white);
}

.story-card:hover .story-card__cta svg {
  transform: translateX(3px);
}

/* ===================== MODAL CONTENT ===================== */
.story-modal {
  display: flex;
  flex-direction: column;
}

.story-modal__media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  flex-shrink: 0;
}

.story-modal__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: modalImg 14s ease-out infinite alternate;
}

@keyframes modalImg {
  from {
    transform: scale(1.02);
  }
  to {
    transform: scale(1.1);
  }
}

.story-modal__media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(28, 19, 17, 0.55) 100%);
}

.story-modal__media-meta {
  position: absolute;
  bottom: 1.25rem;
  left: 1.5rem;
}

.story-modal__eyebrow {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-red-dark);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border-radius: var(--radius-full);
}

.story-modal__content {
  padding: 2rem clamp(1.5rem, 1rem + 1vw, 2.25rem) 1.75rem;
}

.story-modal__title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2rem);
  line-height: 1.2;
  letter-spacing: -0.015em;
  font-variation-settings: 'opsz' 144;
  color: var(--color-charcoal);
  margin-bottom: 1.25rem;
}

.story-modal__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.story-modal__body p {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text);
  max-width: none;
}

.story-modal__body p:first-of-type {
  font-size: 1.0625rem;
  color: var(--color-charcoal);
  font-weight: 500;
}

.story-modal__body p:first-of-type::first-letter {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
  font-size: 3rem;
  line-height: 1;
  float: left;
  color: var(--color-red);
  margin: 0.1rem 0.6rem 0 0;
  font-variation-settings: 'opsz' 144;
}

.story-modal__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(28, 19, 17, 0.1);
}

.story-modal__sig {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-variation-settings: 'opsz' 24;
}

.story-modal__close-btn {
  padding: 0.6rem 1.2rem;
  background: var(--color-charcoal);
  color: var(--color-white);
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  transition: background-color var(--transition);
}

.story-modal__close-btn:hover {
  background: var(--color-red);
}

/* ===================== SCROLL REVEAL ===================== */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 800ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 800ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--d, 0ms);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 960px) {
  .story-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .story-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .story-card {
    aspect-ratio: 16 / 11;
  }

  .hero__title-meta {
    display: flex;
    margin-left: 0;
    margin-top: 0.75rem;
    top: 0;
  }

  .story-modal__media {
    aspect-ratio: 4 / 3;
  }
  .story-modal__media-meta {
    left: 1rem;
    bottom: 1rem;
  }
  .story-modal__content {
    padding: 1.5rem;
  }

  .story-modal__body p:first-of-type::first-letter {
    font-size: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .story-modal__media img {
    animation: none;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}
</style>
