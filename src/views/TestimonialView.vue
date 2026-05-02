<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { galleryItems, fullTestimonials } from '@/data/gallery.js'
import ImageLightbox from '@/components/ui/ImageLightbox.vue'

// ============ LIGHTBOX STATE ============
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (i) => {
  lightboxIndex.value = i
  lightboxOpen.value = true
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="testi">
    <!-- ===================== HERO ===================== -->
    <section class="t-hero">
      <div class="container">
        <span class="eyebrow reveal">★ Testimoni & Galeri</span>
        <h1 class="t-hero__title reveal" style="--d: 120ms">
          Cerita &amp; Momen
          <em class="t-hero__title-em">Bersama Kami.</em>
        </h1>
        <p class="t-hero__lead reveal" style="--d: 240ms">
          Dokumentasi acara dan pengalaman rasa dari para pelanggan—setiap foto adalah satu cerita
          kepercayaan yang kami jaga.
        </p>

        <div class="t-hero__meta reveal" style="--d: 360ms">
          <div class="t-hero__meta-item">
            <span class="t-hero__meta-num">1.200+</span>
            <span class="t-hero__meta-label">Acara terdokumentasi</span>
          </div>
          <span class="t-hero__meta-divider"></span>
          <div class="t-hero__meta-item">
            <span class="t-hero__meta-num">4,9<small>/5</small></span>
            <span class="t-hero__meta-label">Rata-rata rating</span>
          </div>
          <span class="t-hero__meta-divider"></span>
          <div class="t-hero__meta-item">
            <span class="t-hero__meta-num">98%</span>
            <span class="t-hero__meta-label">Pelanggan kembali</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== MASONRY GALLERY ===================== -->
    <section class="t-gallery">
      <div class="container">
        <header class="t-section-head reveal">
          <span class="eyebrow">Galeri Dokumentasi</span>
          <h2 class="t-section-title">Setiap acara, satu <em>memori</em>.</h2>
        </header>

        <div class="masonry">
          <button
            v-for="(item, i) in galleryItems"
            :key="item.id"
            :class="['m-tile', `m-tile--${item.h}`, 'reveal']"
            :style="{ '--d': (i % 8) * 40 + 'ms' }"
            @click="openLightbox(i)"
            :aria-label="`Lihat foto: ${item.caption}`"
            type="button"
          >
            <img :src="item.src" :alt="item.alt" loading="lazy" />
            <div class="m-tile__overlay">
              <span class="m-tile__caption">{{ item.caption }}</span>
              <span class="m-tile__loc">
                <svg
                  width="11"
                  height="11"
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
                {{ item.location }}
              </span>
            </div>
            <span class="m-tile__zoom" aria-hidden="true">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- ===================== TESTIMONIAL CARDS ===================== -->
    <section class="t-comments">
      <div class="container">
        <header class="t-section-head reveal">
          <span class="eyebrow">★ Komentar Pelanggan</span>
          <h2 class="t-section-title">Suara langsung dari <em>meja-meja</em> kami.</h2>
        </header>

        <div class="comments">
          <article
            v-for="(t, i) in fullTestimonials"
            :key="t.id"
            class="comment reveal"
            :style="{ '--d': (i % 3) * 100 + 'ms' }"
          >
            <span class="comment__quote-bg" aria-hidden="true">"</span>

            <div class="comment__rating" :aria-label="`Rating ${t.rating} dari 5`">
              <span v-for="n in t.rating" :key="n">★</span>
            </div>

            <blockquote class="comment__text">
              {{ t.quote }}
            </blockquote>

            <footer class="comment__person">
              <img :src="t.avatar" :alt="t.name" class="comment__avatar" loading="lazy" />
              <div>
                <div class="comment__name">{{ t.name }}</div>
                <div class="comment__event">{{ t.event }}</div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </section>

    <!-- ===================== CTA ===================== -->
    <section class="t-cta">
      <div class="container">
        <div class="t-cta__inner reveal">
          <span class="eyebrow eyebrow--center">Bergabunglah dengan mereka</span>
          <h2 class="t-cta__title">Tambahkan acara Anda ke galeri ini.</h2>
          <p class="t-cta__lead">
            Setiap pesanan adalah cerita baru yang kami rangkum dengan rasa terbaik.
          </p>
          <a
            href="https://wa.me/6289517733600?text=Halo%20Puri%20Rasa%2C%20saya%20ingin%20konsultasi%20katering%20untuk%20acara%20saya."
            target="_blank"
            rel="noopener noreferrer"
            class="t-cta__btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"
              />
              <path
                d="M20.5 3.5C18.3 1.2 15.3 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3z"
              />
            </svg>
            Konsultasi Gratis
          </a>
        </div>
      </div>
    </section>

    <!-- ===================== LIGHTBOX ===================== -->
    <ImageLightbox
      :show="lightboxOpen"
      :items="galleryItems"
      v-model:index="lightboxIndex"
      @close="lightboxOpen = false"
    />
  </div>
</template>

<style scoped>
.testi {
  /* Off-white hangat (bukan putih murni) sesuai brief */
  background: #fbf8f2;
}

/* ===================== SHARED ===================== */
.eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-red);
  margin-bottom: 1.25rem;
}

.eyebrow--center {
  display: block;
  text-align: center;
}

.t-section-head {
  margin-bottom: 2.5rem;
}

.t-section-title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-variation-settings: 'opsz' 144;
}

.t-section-title em {
  font-style: italic;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

/* ===================== HERO ===================== */
.t-hero {
  padding-block: clamp(3rem, 2rem + 4vw, 5.5rem) clamp(2rem, 1rem + 2vw, 3rem);
}

.t-hero__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.5rem, 1.6rem + 4vw, 5rem);
  line-height: 1.04;
  letter-spacing: -0.025em;
  font-variation-settings: 'opsz' 144;
  color: var(--color-charcoal);
  margin-bottom: 1.5rem;
}

.t-hero__title-em {
  display: block;
  font-style: italic;
  font-weight: 500;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

.t-hero__lead {
  font-size: clamp(1rem, 0.95rem + 0.4vw, 1.18rem);
  line-height: 1.65;
  color: var(--color-text-muted);
  max-width: 60ch;
  margin-bottom: 2.5rem;
}

.t-hero__meta {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 1.5rem 1.75rem;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.06);
  border-radius: var(--radius-lg);
  width: fit-content;
  box-shadow: 0 4px 20px -8px rgba(28, 19, 17, 0.06);
}

.t-hero__meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.t-hero__meta-num {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.65rem;
  letter-spacing: -0.02em;
  color: var(--color-charcoal);
  font-variation-settings: 'opsz' 144;
  line-height: 1;
}

.t-hero__meta-num small {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-left: 0.05rem;
}

.t-hero__meta-label {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  font-weight: 500;
}

.t-hero__meta-divider {
  width: 1px;
  height: 32px;
  background: rgba(28, 19, 17, 0.12);
}

/* ===================== MASONRY GALLERY ===================== */
.t-gallery {
  padding-block: var(--space-3xl);
}

.masonry {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 80px;
  gap: 0.85rem;
}

/* Variasi tinggi tile untuk efek masonry */
.m-tile--short {
  grid-row: span 3;
} /* ~240px */
.m-tile--medium {
  grid-row: span 4;
} /* ~320px */
.m-tile--tall {
  grid-row: span 5;
} /* ~400px */

.m-tile {
  position: relative;
  display: block;
  width: 100%;
  border: none;
  padding: 0;
  background: var(--color-cream);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: transform var(--transition);
}

.m-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 700ms cubic-bezier(0.32, 0.72, 0, 1),
    filter var(--transition);
}

.m-tile:hover img {
  transform: scale(1.05);
  filter: brightness(0.85);
}

.m-tile:focus-visible {
  outline: 2px solid var(--color-red);
  outline-offset: 4px;
}

.m-tile__overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 1.5rem 1rem 0.85rem;
  background: linear-gradient(180deg, transparent 0%, rgba(15, 10, 9, 0.88) 100%);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity var(--transition),
    transform var(--transition);
  pointer-events: none;
}

.m-tile:hover .m-tile__overlay,
.m-tile:focus-visible .m-tile__overlay {
  opacity: 1;
  transform: translateY(0);
}

.m-tile__caption {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.92rem;
  color: var(--color-white);
  letter-spacing: -0.005em;
  font-variation-settings: 'opsz' 144;
  line-height: 1.25;
}

.m-tile__loc {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.7);
}

.m-tile__zoom {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-charcoal);
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity var(--transition),
    transform var(--transition);
}

.m-tile:hover .m-tile__zoom {
  opacity: 1;
  transform: scale(1);
}

/* ===================== TESTIMONIAL CARDS ===================== */
.t-comments {
  padding-block: var(--space-4xl);
  background: var(--color-white);
  border-top: 1px solid rgba(28, 19, 17, 0.04);
  border-bottom: 1px solid rgba(28, 19, 17, 0.04);
}

.comments {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.comment {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1.75rem 1.75rem;
  background: #fbf8f2;
  border: 1px solid rgba(28, 19, 17, 0.05);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    transform var(--transition),
    box-shadow var(--transition),
    border-color var(--transition);
}

.comment:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 40px -16px rgba(28, 19, 17, 0.1);
  border-color: rgba(178, 58, 58, 0.18);
}

.comment__quote-bg {
  position: absolute;
  top: -1.2rem;
  right: 1.2rem;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  font-size: 9rem;
  line-height: 1;
  color: var(--color-red);
  opacity: 0.08;
  font-variation-settings: 'opsz' 144;
  pointer-events: none;
  user-select: none;
}

.comment__rating {
  display: flex;
  gap: 0.18rem;
  color: #d4af63; /* Gold redup/pastel sesuai brief */
  font-size: 1.05rem;
  letter-spacing: 0.05em;
}

.comment__text {
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1.55;
  color: var(--color-charcoal);
  font-weight: 400;
  font-variation-settings: 'opsz' 24;
  flex-grow: 1;
  margin: 0;
  max-width: none;
  position: relative;
  z-index: 1;
}

.comment__person {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(28, 19, 17, 0.08);
}

.comment__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-white);
  box-shadow: 0 0 0 1px rgba(28, 19, 17, 0.06);
}

.comment__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.92rem;
  letter-spacing: -0.005em;
  color: var(--color-charcoal);
  font-variation-settings: 'opsz' 144;
}

.comment__event {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-top: 0.1rem;
}

/* ===================== CTA ===================== */
.t-cta {
  padding-block: var(--space-3xl);
}

.t-cta__inner {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  padding-block: 2rem;
}

.t-cta__title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem);
  line-height: 1.2;
  letter-spacing: -0.015em;
  font-variation-settings: 'opsz' 144;
  margin-bottom: 0.85rem;
}

.t-cta__lead {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 50ch;
  margin: 0 auto 2rem;
}

.t-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 1.05rem 2rem;
  background: var(--color-red);
  color: var(--color-white);
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  box-shadow: var(--shadow-red);
  transition:
    transform var(--transition),
    background-color var(--transition);
}

.t-cta__btn:hover {
  background: var(--color-red-dark);
  transform: translateY(-2px);
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
@media (max-width: 1024px) {
  .masonry {
    grid-template-columns: repeat(3, 1fr);
  }
  .comments {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .masonry {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 64px;
    gap: 0.6rem;
  }

  .comments {
    grid-template-columns: 1fr;
  }

  .t-hero__meta {
    width: 100%;
    gap: 1.25rem;
    padding: 1.25rem;
  }

  .t-hero__meta-num {
    font-size: 1.35rem;
  }
  .t-hero__meta-divider {
    display: none;
  }
}

@media (max-width: 420px) {
  .t-hero__meta {
    gap: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
  }
  .m-tile img {
    transition: none;
  }
}
</style>
