<script setup>
import { onMounted, onUnmounted } from 'vue'
import { testimonials } from '@/data/testimonials.js'
import logoPuriRasa from '@/assets/images/logo-puri-rasa.svg'

const whatsappConsult =
  'https://wa.me/6289517733600?text=Halo%20Puri%20Rasa%2C%20saya%20ingin%20konsultasi%20paket%20katering%20untuk%20acara%20saya.'

// ============ KATEGORI MENU (Iconic Grid) ============
const categories = [
  {
    name: 'Nasi Kotak',
    desc: 'Praktis untuk meeting & acara',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="6" width="18" height="14" rx="2"/>
      <path d="M3 11h18"/>
      <path d="M8 6V4M16 6V4"/>
      <circle cx="12" cy="15.5" r="1" fill="currentColor"/>
    </svg>`,
  },
  {
    name: 'Prasmanan',
    desc: 'Lengkap untuk acara besar',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 14h18l-1.5 6h-15z"/>
      <path d="M5 14c0-3 7-3 7 0M12 14c0-3 7-3 7 0"/>
      <path d="M9 8c0-1 1-1 1-2.5M15 8c0-1 1-1 1-2.5"/>
    </svg>`,
  },
  {
    name: 'Tumpeng',
    desc: 'Lengkap dengan iring-iringan',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3 4 19h16z"/>
      <path d="M7.5 13h9"/>
      <circle cx="12" cy="6.5" r="0.8" fill="currentColor"/>
    </svg>`,
  },
  {
    name: 'Catering Harian',
    desc: 'Langganan rutin kantor',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2"/>
      <path d="M16 3v4M8 3v4M3 11h18"/>
      <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
    </svg>`,
  },
  {
    name: 'Snack Box',
    desc: 'Hidangan ringan istimewa',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 9h14v11H5z"/>
      <path d="M9 9V6.5a3 3 0 0 1 6 0V9"/>
      <path d="M9 13.5h6"/>
    </svg>`,
  },
]

// ============ USP ============
const usps = [
  {
    title: 'Bahan Segar Pilihan',
    desc: 'Kami belanja setiap pagi di pasar lokal—sayur, ikan, dan rempah selalu dalam kondisi terbaik sebelum sampai ke dapur kami.',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 26C8.5 26 5 22 5 16V8h9c5.5 0 9 3.5 9 9v9"/>
      <path d="M14 26a9 9 0 0 0 9-9"/>
      <path d="M11 14c1.5-1 3.5-1 5 0"/>
    </svg>`,
  },
  {
    title: 'Resep Warisan Keluarga',
    desc: 'Setiap bumbu diracik mengikuti resep turun-temurun dari nenek—rasa yang sama yang dinikmati keluarga Bali sejak puluhan tahun lalu.',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M27 10.5a6 6 0 0 0-11-3.5 6 6 0 0 0-11 3.5C5 17 16 27 16 27s11-10 11-16.5z"/>
    </svg>`,
  },
  {
    title: 'Higienitas Terjamin',
    desc: 'Dapur kami menerapkan SOP kebersihan ketat. Tim memakai sarung tangan, hairnet, dan masker di setiap tahap penyajian.',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 28s10-5 10-13V7l-10-3-10 3v8c0 8 10 13 10 13z"/>
      <polyline points="11 16 14.5 19.5 21 13"/>
    </svg>`,
  },
  {
    title: 'Ketepatan Waktu Pengiriman',
    desc: 'Kami menjadwalkan pengiriman lebih awal dengan armada terpisah—pesanan tiba minimal 30 menit sebelum acara dimulai.',
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="11"/>
      <polyline points="16 9 16 16 21 19"/>
    </svg>`,
  },
]

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
  <div class="home">
    <!-- ===================== HERO ===================== -->
    <section class="hero">
      <div class="hero__media">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&auto=format&q=80"
          alt="Hidangan Puri Rasa Catering"
          class="hero__image"
          fetchpriority="high"
        />
        <div class="hero__overlay"></div>
        <div class="hero__vignette"></div>
      </div>

      <div class="container hero__content">
        <span class="hero__eyebrow">
          <span class="hero__star">✦</span>
          Puri Rasa Catering · Singaraja, Bali
        </span>

        <h1 class="hero__title">
          Kehangatan
          <em class="hero__title-em">Masakan Keluarga</em>
          untuk Setiap Momen
          <span class="hero__title-underline">Spesial</span> Anda.
        </h1>

        <RouterLink to="/menu" class="hero-cta">
          <span class="hero-cta__shine" aria-hidden="true"></span>
          <span class="hero-cta__text">Pesan Sekarang</span>
          <span class="hero-cta__arrow" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </RouterLink>

        <p class="hero__desc">
          Resep warisan, bahan segar harian, dan kru profesional siap menghidangkan kelezatan
          otentik Bali untuk pernikahan, acara adat, hingga catering harian kantor Anda.
        </p>

        <div class="hero-logo" aria-hidden="true">
          <span class="hero-logo__halo"></span>
          <img :src="logoPuriRasa" alt="" class="hero-logo__img" />
        </div>

        <div class="hero__stats">
          <div class="hero__stat">
            <span class="hero__stat-num">1.200+</span>
            <span class="hero__stat-label">Acara Tersaji</span>
          </div>
          <span class="hero__stat-divider"></span>
          <div class="hero__stat">
            <span class="hero__stat-num">15<small>thn</small></span>
            <span class="hero__stat-label">Pengalaman</span>
          </div>
          <span class="hero__stat-divider"></span>
          <div class="hero__stat">
            <span class="hero__stat-num">4,9★</span>
            <span class="hero__stat-label">Rating Pelanggan</span>
          </div>
        </div>
      </div>

      <a href="#kategori" class="hero__scroll" aria-label="Scroll ke bawah">
        <span class="hero__scroll-line"></span>
        <span>Kategori</span>
      </a>
    </section>

    <!-- ===================== ICONIC GRID KATEGORI ===================== -->
    <section id="kategori" class="categories">
      <div class="container">
        <div class="categories__card reveal">
          <header class="categories__head">
            <span class="eyebrow">Mulai Pesananmu</span>
            <h2 class="categories__title">Pilih Kategori <em>Katering</em> Pilihan Anda.</h2>
          </header>

          <div class="categories__grid">
            <RouterLink
              v-for="(cat, i) in categories"
              :key="cat.name"
              to="/menu"
              class="cat-card reveal"
              :style="{ '--d': i * 80 + 'ms' }"
            >
              <span class="cat-card__icon" v-html="cat.icon" aria-hidden="true"></span>
              <span class="cat-card__name">{{ cat.name }}</span>
              <span class="cat-card__desc">{{ cat.desc }}</span>
              <span class="cat-card__arrow" aria-hidden="true">→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== USP ===================== -->
    <section class="usp">
      <div class="container">
        <header class="section-head reveal">
          <span class="eyebrow">Mengapa Puri Rasa</span>
          <h2 class="section-title">
            Empat pilar yang menjadikan setiap hidangan
            <em>istimewa.</em>
          </h2>
          <p class="section-lead">
            Bukan sekadar katering—kami menjaga warisan rasa, kualitas, dan kepercayaan yang telah
            diberikan ribuan keluarga selama lebih dari satu dekade.
          </p>
        </header>

        <div class="usp__grid">
          <article
            v-for="(item, i) in usps"
            :key="item.title"
            class="usp-card reveal"
            :style="{ '--d': i * 100 + 'ms' }"
          >
            <span class="usp-card__num">0{{ i + 1 }}</span>
            <span class="usp-card__icon" v-html="item.icon" aria-hidden="true"></span>
            <h3 class="usp-card__title">{{ item.title }}</h3>
            <p class="usp-card__desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ===================== TESTIMONIAL ===================== -->
    <section class="testimonial">
      <div class="container">
        <header class="section-head section-head--center reveal">
          <span class="eyebrow eyebrow--center">★ Apa Kata Mereka</span>
          <h2 class="section-title">Cerita hangat dari <em>keluarga</em> Puri Rasa.</h2>
        </header>

        <div class="testimonial__grid">
          <article
            v-for="(t, i) in testimonials"
            :key="t.name"
            class="ts-card reveal"
            :style="{ '--d': i * 120 + 'ms' }"
          >
            <span class="ts-card__quote" aria-hidden="true">”</span>
            <div class="ts-card__rating" :aria-label="`Rating ${t.rating} dari 5`">
              <span v-for="n in t.rating" :key="n">★</span>
            </div>
            <blockquote class="ts-card__comment">{{ t.comment }}</blockquote>
            <footer class="ts-card__person">
              <img :src="t.avatar" :alt="t.name" class="ts-card__avatar" loading="lazy" />
              <div>
                <div class="ts-card__name">{{ t.name }}</div>
                <div class="ts-card__role">{{ t.role }}</div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </section>

    <!-- ===================== CTA STRIP ===================== -->
    <section class="cta-strip">
      <div class="container">
        <div class="cta-strip__inner reveal">
          <div>
            <span class="eyebrow eyebrow--light">Konsultasi Gratis</span>
            <h2 class="cta-strip__title">
              Siap menyajikan <em>kelezatan</em> untuk acara Anda berikutnya?
            </h2>
          </div>

          <a
            :href="whatsappConsult"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--white btn--lg"
          >
            Konsultasi Sekarang
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===================== SHARED ===================== */
.eyebrow {
  display: inline-block;
  font-size: 0.75rem;
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
.eyebrow--light {
  color: rgba(255, 255, 255, 0.7);
}

.section-head {
  max-width: 760px;
  margin-bottom: var(--space-3xl);
}

.section-head--center {
  margin-inline: auto;
  text-align: center;
}

.section-title {
  font-size: clamp(2rem, 1.4rem + 2.4vw, 3rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-variation-settings: 'opsz' 144;
  margin-bottom: 1rem;
}

.section-title em {
  font-style: italic;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

.section-lead {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 60ch;
}

.section-head--center .section-lead {
  margin-inline: auto;
}

/* ===================== BUTTONS ===================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.95rem 1.6rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition:
    transform var(--transition),
    background-color var(--transition),
    box-shadow var(--transition),
    color var(--transition);
  cursor: pointer;
  white-space: nowrap;
}

.btn--white {
  background: var(--color-white);
  color: var(--color-red);
}

.btn--white:hover {
  background: var(--color-cream);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
}

.btn--lg {
  padding: 1.1rem 2rem;
  font-size: 1rem;
}

/* ===================== HERO ===================== */
.hero {
  position: relative;
  min-height: 100vh;
  /* Extend ke balik navbar yang fixed (desktop padding-top 76px) */
  margin-top: -76px;
  padding-top: 76px;
  padding-bottom: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: kenburns 22s ease-out infinite alternate;
}

@keyframes kenburns {
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1.12);
  }
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(28, 19, 17, 0.65) 0%,
    rgba(28, 19, 17, 0.85) 100%
  );
}

.hero__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.45) 100%);
  pointer-events: none;
}

.hero__content {
  position: relative;
  width: 100%;
  max-width: 820px;
  margin-inline: auto;
  color: var(--color-white);
  /* Padding atas dikurangi supaya konten lebih mepet ke navbar */
  padding-block: 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 1. EYEBROW BADGE */
.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-full);
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.06);
  margin-bottom: 1.75rem;
  white-space: nowrap;
  animation: fadeUp 800ms cubic-bezier(0.4, 0, 0.2, 1) both;
}

.hero__star {
  color: var(--color-gold);
  font-size: 0.9rem;
}

/* 2. CTA */
.hero-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.15rem 1.85rem;
  margin-bottom: 2.25rem;
  background: var(--color-red);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.005em;
  border-radius: var(--radius-full);
  text-decoration: none;
  overflow: hidden;
  box-shadow:
    0 12px 28px -6px rgba(178, 58, 58, 0.55),
    0 0 0 0 rgba(178, 58, 58, 0.5);
  transition:
    transform var(--transition),
    box-shadow var(--transition),
    background-color var(--transition);
  animation:
    fadeUp 800ms cubic-bezier(0.4, 0, 0.2, 1) 120ms both,
    ctaPulse 2.4s ease-in-out 1s infinite;
}

.hero-cta:hover {
  background: var(--color-red-dark);
  transform: translateY(-3px);
  box-shadow:
    0 18px 36px -6px rgba(178, 58, 58, 0.65),
    0 0 0 6px rgba(178, 58, 58, 0.18);
  animation-play-state: paused;
}

.hero-cta:active {
  transform: translateY(-1px);
}

.hero-cta__shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    rgba(255, 255, 255, 0.25) 50%,
    transparent 100%
  );
  animation: shine 3.4s ease-in-out infinite;
  pointer-events: none;
}

.hero-cta__text {
  position: relative;
  z-index: 1;
}

.hero-cta__arrow {
  position: relative;
  z-index: 1;
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  transition:
    transform var(--transition),
    background var(--transition);
}

.hero-cta:hover .hero-cta__arrow {
  background: rgba(255, 255, 255, 0.28);
  transform: translateX(4px);
}

@keyframes ctaPulse {
  0%,
  100% {
    box-shadow:
      0 12px 28px -6px rgba(178, 58, 58, 0.55),
      0 0 0 0 rgba(178, 58, 58, 0.5);
  }
  50% {
    box-shadow:
      0 12px 28px -6px rgba(178, 58, 58, 0.55),
      0 0 0 12px rgba(178, 58, 58, 0);
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  60% {
    left: 150%;
  }
  100% {
    left: 150%;
  }
}

/* 3. HEADING */
.hero__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.25rem, 1.5rem + 4vw, 5rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
  font-variation-settings: 'opsz' 144;
  color: var(--color-white);
  margin-bottom: 1.75rem;
  animation: fadeUp 900ms cubic-bezier(0.4, 0, 0.2, 1) 240ms both;
  max-width: 18ch;
}

.hero__title-em {
  display: inline-block;
  font-style: italic;
  font-weight: 500;
  background: linear-gradient(120deg, #ffe6b0 0%, #ffb893 50%, #ff8b7a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-variation-settings: 'opsz' 144;
}

.hero__title-underline {
  position: relative;
  display: inline-block;
  font-style: italic;
  font-weight: 500;
}

.hero__title-underline::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.06em;
  height: 0.42em;
  background: var(--color-red);
  opacity: 0.85;
  z-index: -1;
  transform: skewX(-6deg);
  border-radius: 2px;
}

/* 4. DESC */
.hero__desc {
  font-size: clamp(0.98rem, 0.95rem + 0.3vw, 1.15rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.82);
  max-width: 56ch;
  margin: 0 auto 2.25rem;
  animation: fadeUp 900ms cubic-bezier(0.4, 0, 0.2, 1) 360ms both;
}

/* 5. LOGO */
.hero-logo {
  position: relative;
  width: 88px;
  height: 88px;
  margin-bottom: 2.25rem;
  animation:
    fadeUp 900ms cubic-bezier(0.4, 0, 0.2, 1) 480ms both,
    floatUpDown 3.8s ease-in-out 1s infinite;
}

.hero-logo__halo {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 230, 176, 0.35) 0%, rgba(255, 230, 176, 0) 70%);
  animation: haloBreath 3.8s ease-in-out 1s infinite;
  pointer-events: none;
}

.hero-logo__img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.35));
  z-index: 1;
}

@keyframes floatUpDown {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes haloBreath {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
}

/* 6. STATS */
.hero__stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  animation: fadeUp 900ms cubic-bezier(0.4, 0, 0.2, 1) 600ms both;
}

.hero__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.hero__stat-num {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-white);
  font-variation-settings: 'opsz' 144;
  letter-spacing: -0.02em;
}

.hero__stat-num small {
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-left: 0.15rem;
}

.hero__stat-label {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.hero__stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.18);
}

/* SCROLL INDICATOR */
.hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color var(--transition);
}

.hero__scroll:hover {
  color: var(--color-white);
}

.hero__scroll-line {
  width: 1px;
  height: 50px;
  background: rgba(255, 255, 255, 0.4);
  position: relative;
  overflow: hidden;
}

.hero__scroll-line::after {
  content: '';
  position: absolute;
  top: -50%;
  left: 0;
  width: 100%;
  height: 50%;
  background: var(--color-white);
  animation: scrollLine 1.8s ease-in-out infinite;
}

@keyframes scrollLine {
  0% {
    top: -50%;
  }
  100% {
    top: 100%;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===================== KATEGORI ===================== */
.categories {
  position: relative;
  margin-top: -5rem;
  z-index: 5;
}

.categories__card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: clamp(1.75rem, 1rem + 2vw, 3rem);
  box-shadow:
    0 1px 0 rgba(28, 19, 17, 0.04),
    0 24px 60px -20px rgba(28, 19, 17, 0.18),
    0 8px 24px -12px rgba(28, 19, 17, 0.1);
  border: 1px solid rgba(28, 19, 17, 0.04);
}

.categories__head {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.categories__title {
  font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-variation-settings: 'opsz' 144;
}

.categories__title em {
  font-style: italic;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

.categories__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
}

.cat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1.5rem 1.25rem;
  background: var(--color-cream);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-charcoal);
  overflow: hidden;
  transition:
    transform var(--transition),
    background-color var(--transition),
    border-color var(--transition),
    box-shadow var(--transition);
}

.cat-card::before {
  content: '';
  position: absolute;
  inset: auto auto -40px -40px;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(178, 58, 58, 0.08) 0%, transparent 70%);
  transition: transform var(--transition-slow);
}

.cat-card:hover {
  transform: translateY(-4px);
  background: var(--color-white);
  border-color: rgba(178, 58, 58, 0.25);
  box-shadow: 0 16px 36px -12px rgba(178, 58, 58, 0.18);
}

.cat-card:hover::before {
  transform: translate(20px, -20px) scale(1.4);
}

.cat-card__icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: var(--color-white);
  border-radius: 12px;
  color: var(--color-red);
  border: 1px solid rgba(178, 58, 58, 0.12);
  margin-bottom: 0.4rem;
  transition:
    background-color var(--transition),
    color var(--transition),
    transform var(--transition);
}

.cat-card__icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.cat-card:hover .cat-card__icon {
  background: var(--color-red);
  color: var(--color-white);
  border-color: var(--color-red);
  transform: rotate(-6deg) scale(1.05);
}

.cat-card__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.0625rem;
  letter-spacing: -0.01em;
  font-variation-settings: 'opsz' 144;
  line-height: 1.2;
}

.cat-card__desc {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.cat-card__arrow {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-size: 1rem;
  color: var(--color-red);
  opacity: 0;
  transform: translate(-6px, 6px);
  transition:
    opacity var(--transition),
    transform var(--transition);
}

.cat-card:hover .cat-card__arrow {
  opacity: 1;
  transform: translate(0, 0);
}

/* ===================== USP ===================== */
.usp {
  padding-block: var(--space-4xl);
  background: var(--color-cream);
  position: relative;
  overflow: hidden;
}

.usp::before {
  content: '';
  position: absolute;
  top: -120px;
  right: -120px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(178, 58, 58, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.usp__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.usp-card {
  position: relative;
  padding: 2rem 1.75rem 1.75rem;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(28, 19, 17, 0.05);
  overflow: hidden;
  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.usp-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -16px rgba(28, 19, 17, 0.14);
}

.usp-card__num {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1;
  color: var(--color-red);
  opacity: 0.08;
  font-variation-settings: 'opsz' 144;
  pointer-events: none;
  transition: opacity var(--transition);
}

.usp-card:hover .usp-card__num {
  opacity: 0.16;
}

.usp-card__icon {
  display: inline-grid;
  place-items: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(178, 58, 58, 0.1) 0%, rgba(217, 119, 87, 0.05) 100%);
  border-radius: 14px;
  color: var(--color-red);
  margin-bottom: 1.25rem;
  transition: background var(--transition);
}

.usp-card__icon :deep(svg) {
  width: 28px;
  height: 28px;
}

.usp-card:hover .usp-card__icon {
  background: linear-gradient(135deg, var(--color-red) 0%, #d97757 100%);
  color: var(--color-white);
}

.usp-card__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.25;
  margin-bottom: 0.6rem;
  font-variation-settings: 'opsz' 144;
}

.usp-card__desc {
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

/* ===================== TESTIMONIAL ===================== */
.testimonial {
  padding-block: var(--space-4xl);
}

.testimonial__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.ts-card {
  position: relative;
  padding: 2rem;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.06);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition:
    transform var(--transition),
    box-shadow var(--transition),
    border-color var(--transition);
}

.ts-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -16px rgba(28, 19, 17, 0.12);
  border-color: rgba(178, 58, 58, 0.18);
}

.ts-card__quote {
  position: absolute;
  top: 0.4rem;
  right: 1.4rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 7rem;
  font-weight: 700;
  color: var(--color-red);
  opacity: 0.1;
  line-height: 1;
  font-variation-settings: 'opsz' 144;
  pointer-events: none;
}

.ts-card__rating {
  display: flex;
  gap: 0.18rem;
  color: var(--color-gold);
  font-size: 1.05rem;
}

.ts-card__comment {
  font-family: var(--font-display);
  font-size: 1.0625rem;
  line-height: 1.55;
  color: var(--color-charcoal);
  font-weight: 400;
  font-variation-settings: 'opsz' 24;
  flex-grow: 1;
  margin: 0;
}

.ts-card__person {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(28, 19, 17, 0.08);
}

.ts-card__avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-cream);
}

.ts-card__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-charcoal);
  font-variation-settings: 'opsz' 144;
}

.ts-card__role {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-top: 0.1rem;
}

/* ===================== CTA STRIP ===================== */
.cta-strip {
  padding-block: var(--space-2xl);
}

.cta-strip__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 2rem;
  padding: clamp(2rem, 1rem + 3vw, 3.5rem);
  background: linear-gradient(135deg, #b23a3a 0%, #7e2424 100%);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
  color: var(--color-white);
}

.cta-strip__inner::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.cta-strip__inner::after {
  content: '✦';
  position: absolute;
  bottom: -1rem;
  left: 1.5rem;
  font-size: 6rem;
  color: rgba(255, 255, 255, 0.06);
  font-family: var(--font-display);
  pointer-events: none;
}

.cta-strip__title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--color-white);
  font-variation-settings: 'opsz' 144;
  margin-top: 0.5rem;
  max-width: 28ch;
}

.cta-strip__title em {
  font-style: italic;
  color: #ffd9a8;
  font-variation-settings: 'opsz' 144;
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
  .categories__grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .usp__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .testimonial__grid {
    grid-template-columns: 1fr;
    max-width: 640px;
    margin-inline: auto;
  }
}

@media (max-width: 768px) {
  /* Mobile: hero extend ke balik navbar 64px */
  .hero {
    margin-top: -68px;
    padding-top: 68px;
    padding-bottom: 5rem;
    min-height: 100vh;
  }

  .hero__content {
    padding-block: 1rem 3.5rem;
  }
  .hero__scroll {
    display: none;
  }

  .hero-logo {
    width: 76px;
    height: 76px;
    margin-bottom: 1.75rem;
  }
  .hero__stats {
    gap: 1.25rem;
  }
  .hero__stat-num {
    font-size: 1.45rem;
  }

  .categories {
    margin-top: -4rem;
  }

  .categories__grid {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 70%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 0.5rem;
    margin-inline: calc(var(--container-padding) * -1);
    padding-inline: var(--container-padding);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .categories__grid::-webkit-scrollbar {
    display: none;
  }
  .cat-card {
    scroll-snap-align: start;
  }

  .usp__grid {
    grid-template-columns: 1fr;
  }

  .cta-strip__inner {
    grid-template-columns: 1fr;
    text-align: left;
  }
  .cta-strip__inner .btn {
    justify-self: start;
  }
}

@media (max-width: 480px) {
  /* Badge dipasin biar muat 1 baris */
  .hero__eyebrow {
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    padding: 0.42rem 0.85rem;
    gap: 0.45rem;
    margin-bottom: 1.4rem;
  }
  .hero__star {
    font-size: 0.8rem;
  }

  .hero__title {
    font-size: clamp(2.1rem, 1.5rem + 4vw, 3rem);
    margin-bottom: 1.4rem;
  }

  .hero-cta {
    font-size: 0.95rem;
    padding: 0.95rem 1.4rem;
    margin-bottom: 1.6rem;
  }
  .hero-cta__arrow {
    width: 24px;
    height: 24px;
  }

  .hero__desc {
    margin-bottom: 1.75rem;
  }
  .hero-logo {
    width: 68px;
    height: 68px;
    margin-bottom: 1.6rem;
  }

  .hero__stat-divider {
    display: none;
  }
  .hero__stats {
    gap: 1rem 1.75rem;
  }
  .hero__stat-num {
    font-size: 1.3rem;
  }

  .ts-card {
    padding: 1.5rem;
  }
}

@media (max-width: 360px) {
  /* Layar ekstra sempit (iPhone SE dll) */
  .hero__eyebrow {
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    padding: 0.4rem 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__image {
    animation: none;
  }
  .hero__scroll-line::after {
    animation: none;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
  .hero-cta,
  .hero-cta__shine,
  .hero-logo,
  .hero-logo__halo {
    animation: none !important;
  }
}
</style>
