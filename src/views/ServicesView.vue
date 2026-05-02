<script setup>
import { onMounted, onUnmounted } from 'vue'

// ============ DATA LAYANAN ============
const services = [
  {
    id: 'adat',
    eyebrow: 'Layanan Penuh · On-Site',
    title: 'Layanan Adat & Wedding',
    tagline: 'Prasmanan lengkap di lokasi acara—Anda tinggal menerima tamu.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1400&auto=format&q=80',
    desc: 'Dari pawiwahan hingga upacara adat Bali, tim kami menangani seluruh rantai sajian di lokasi acara—prasmanan, peralatan, kru staf profesional, hingga koordinator yang menjaga kelancaran dari kursi pertama hingga tamu terakhir pulang.',
    features: [
      { icon: 'utensils', label: 'Prasmanan lengkap dengan estetika Bali' },
      { icon: 'users', label: 'Kru profesional & koordinator acara' },
      { icon: 'plate', label: 'Peralatan saji premium tersedia' },
      { icon: 'clock', label: 'Setup H-2 jam, pasti siap on-time' },
    ],
    bestFor: ['Pernikahan', 'Pawiwahan', 'Upacara Adat', 'Gala Dinner'],
    cta: 'Pesan Layanan Adat',
    waUrl:
      'https://wa.me/6282145108485?text=Halo%20Puri%20Rasa%2C%20saya%20tertarik%20untuk%20memesan%20Layanan%20Adat.%20Bisa%20minta%20info%20lebih%20lanjut%3F',
    accent: 'red',
  },
  {
    id: 'rumah',
    eyebrow: 'Private Catering · Live Cooking',
    title: 'Layanan Rumah',
    tagline: 'Kru kami datang & memasak fresh langsung di dapur Anda.',
    image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=1400&auto=format&q=80',
    desc: 'Untuk acara keluarga atau pertemuan privat, tim Puri Rasa hadir di rumah Anda untuk memasak, menyiapkan, dan menyajikan hidangan secara langsung. Tamu Anda menikmati aroma masakan yang baru jadi—pengalaman jamuan yang sulit ditandingi catering konvensional.',
    features: [
      { icon: 'chef', label: 'Koki memasak live di lokasi Anda' },
      { icon: 'fresh', label: 'Bahan dibawa segar pagi hari' },
      { icon: 'home', label: 'Setup minimal, tak perlu sediakan apa pun' },
      { icon: 'sparkle', label: 'Pengalaman intim & personal' },
    ],
    bestFor: ['Reuni Keluarga', 'Arisan Eksklusif', 'Birthday Privat', 'Family Day'],
    cta: 'Pesan Layanan Rumah',
    waUrl:
      'https://wa.me/6282145108485?text=Halo%20Puri%20Rasa%2C%20saya%20tertarik%20untuk%20memesan%20Layanan%20Rumah.%20Bisa%20minta%20info%20lebih%20lanjut%3F',
    accent: 'gold',
  },
]

// ============ ALUR / WORKFLOW ============
const steps = [
  {
    num: '01',
    title: 'Konsultasi via WhatsApp',
    desc: 'Sampaikan jenis acara, jumlah tamu, dan tanggalnya. Tim kami akan merekomendasikan paket yang paling pas.',
  },
  {
    num: '02',
    title: 'Konfirmasi & DP',
    desc: 'Setelah menu disepakati, kami kirim ringkasan & detail pengiriman. Booking dikunci dengan DP minimal H-7 acara.',
  },
  {
    num: '03',
    title: 'Hari Acara',
    desc: 'Kru kami hadir tepat waktu—lengkap dengan setup, sajian, dan tim yang siap menjaga kelancaran acara Anda.',
  },
]

// ============ ICON RENDERER (inline SVG) ============
const icons = {
  utensils: `<path d="M3 2v7c0 1.1.9 2 2 2h2v11M9 2v9M5 2v6"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>`,
  users: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  plate: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>`,
  clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  chef: `<path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/>`,
  fresh: `<path d="M12 2a10 10 0 0 0-3.5 19.4 1 1 0 0 0 1.5-.86V18a4 4 0 0 1 4-4h.5a3.5 3.5 0 0 0 0-7H12V2Z"/>`,
  home: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
  sparkle: `<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4"/>`,
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
  <div class="services">
    <!-- ===================== HERO HEADER ===================== -->
    <section class="s-hero">
      <div class="container">
        <span class="eyebrow reveal">Our Services</span>
        <h1 class="s-hero__title reveal" style="--d: 120ms">Layanan <em>Kami</em>.</h1>
        <p class="s-hero__lead reveal" style="--d: 240ms">
          Hadirkan kelezatan dan kepraktisan di setiap momen berharga Anda— langsung di lokasi
          acara, atau di kehangatan rumah Anda sendiri.
        </p>
      </div>
    </section>

    <!-- ===================== SERVICE CARDS ===================== -->
    <section class="s-grid-section">
      <div class="container">
        <div class="s-grid">
          <article
            v-for="(svc, i) in services"
            :key="svc.id"
            class="svc-card reveal"
            :class="`svc-card--${svc.accent}`"
            :style="{ '--d': i * 160 + 'ms' }"
          >
            <!-- MEDIA -->
            <div class="svc-card__media">
              <img :src="svc.image" :alt="svc.title" loading="lazy" />
              <div class="svc-card__media-overlay"></div>
              <span class="svc-card__num">0{{ i + 1 }}</span>
              <span class="svc-card__eyebrow">{{ svc.eyebrow }}</span>
            </div>

            <!-- BODY -->
            <div class="svc-card__body">
              <h2 class="svc-card__title">{{ svc.title }}</h2>
              <p class="svc-card__tagline">{{ svc.tagline }}</p>
              <p class="svc-card__desc">{{ svc.desc }}</p>

              <!-- FEATURES -->
              <ul class="features">
                <li v-for="f in svc.features" :key="f.label" class="features__item">
                  <span class="features__icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      v-html="icons[f.icon]"
                    ></svg>
                  </span>
                  <span class="features__label">{{ f.label }}</span>
                </li>
              </ul>

              <!-- BEST FOR PILLS -->
              <div class="best-for">
                <span class="best-for__label">Cocok untuk:</span>
                <div class="best-for__pills">
                  <span v-for="b in svc.bestFor" :key="b" class="pill">{{ b }}</span>
                </div>
              </div>

              <!-- CTA -->
              <a :href="svc.waUrl" target="_blank" rel="noopener noreferrer" class="svc-card__cta">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"
                  />
                  <path
                    d="M20.5 3.5C18.3 1.2 15.3 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3z"
                  />
                </svg>
                {{ svc.cta }}
                <span class="svc-card__cta-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ===================== HOW IT WORKS ===================== -->
    <section class="s-flow">
      <div class="container">
        <header class="s-flow__head reveal">
          <span class="eyebrow eyebrow--center">Bagaimana Memesan</span>
          <h2 class="s-flow__title">Tiga langkah, satu acara <em>tak terlupakan.</em></h2>
        </header>

        <div class="steps">
          <div class="steps__line" aria-hidden="true"></div>
          <article
            v-for="(step, i) in steps"
            :key="step.num"
            class="step reveal"
            :style="{ '--d': i * 120 + 'ms' }"
          >
            <span class="step__num">{{ step.num }}</span>
            <h3 class="step__title">{{ step.title }}</h3>
            <p class="step__desc">{{ step.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ===================== CTA STRIP ===================== -->
    <section class="s-cta">
      <div class="container">
        <div class="s-cta__inner reveal">
          <div class="s-cta__deco" aria-hidden="true">
            <span class="s-cta__deco-1"></span>
            <span class="s-cta__deco-2"></span>
          </div>

          <div class="s-cta__content">
            <span class="eyebrow eyebrow--light">Belum yakin?</span>
            <h2 class="s-cta__title">Mari diskusikan kebutuhan acara Anda dulu.</h2>
            <p class="s-cta__lead">
              Konsultasi gratis tanpa komitmen. Tim kami akan bantu menemukan paket & layanan yang
              paling pas dengan jumlah tamu, tema, dan budget Anda.
            </p>
          </div>

          <a
            href="https://wa.me/6282145108485?text=Halo%20Puri%20Rasa%2C%20saya%20ingin%20konsultasi%20layanan%20katering%20untuk%20acara%20saya."
            target="_blank"
            rel="noopener noreferrer"
            class="s-cta__btn"
          >
            Konsultasi Gratis
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
.services {
  background: var(--color-cream);
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
.eyebrow--light {
  color: rgba(255, 255, 255, 0.7);
}

/* ===================== HERO ===================== */
.s-hero {
  padding-block: clamp(3rem, 2rem + 4vw, 5.5rem) clamp(2rem, 1rem + 2vw, 3rem);
}

.s-hero__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.25rem, 1.5rem + 3.5vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
  font-variation-settings: 'opsz' 144;
  margin-bottom: 1.25rem;
}

.s-hero__title em {
  font-style: italic;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

.s-hero__lead {
  font-size: clamp(1rem, 0.95rem + 0.4vw, 1.18rem);
  line-height: 1.65;
  color: var(--color-text-muted);
  max-width: 60ch;
}

/* ===================== SERVICE CARDS ===================== */
.s-grid-section {
  padding-bottom: var(--space-4xl);
}

.s-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.svc-card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.06);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition:
    transform var(--transition),
    box-shadow var(--transition),
    border-color var(--transition);
}

.svc-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 32px 60px -24px rgba(28, 19, 17, 0.18);
}

.svc-card--red:hover {
  border-color: rgba(178, 58, 58, 0.2);
}
.svc-card--gold:hover {
  border-color: rgba(201, 169, 97, 0.3);
}

/* MEDIA */
.svc-card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.svc-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 800ms cubic-bezier(0.32, 0.72, 0, 1);
}

.svc-card:hover .svc-card__media img {
  transform: scale(1.06);
}

.svc-card__media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(28, 19, 17, 0.1) 0%,
    rgba(28, 19, 17, 0.05) 40%,
    rgba(28, 19, 17, 0.65) 100%
  );
}

.svc-card__num {
  position: absolute;
  top: 1.25rem;
  left: 1.5rem;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  font-variation-settings: 'opsz' 9;
  letter-spacing: 0.05em;
}

.svc-card__eyebrow {
  position: absolute;
  bottom: 1.25rem;
  left: 1.5rem;
  padding: 0.45rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border-radius: var(--radius-full);
}

.svc-card--red .svc-card__eyebrow {
  color: var(--color-red-dark);
}
.svc-card--gold .svc-card__eyebrow {
  color: #8a6a1a;
}

/* BODY */
.svc-card__body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 2rem clamp(1.5rem, 1rem + 1.2vw, 2.25rem) 2rem;
}

.svc-card__title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-charcoal);
  font-variation-settings: 'opsz' 144;
  margin-bottom: 0.5rem;
}

.svc-card__tagline {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.0625rem;
  line-height: 1.4;
  color: var(--color-text);
  font-variation-settings: 'opsz' 24;
  margin-bottom: 1.25rem;
  max-width: none;
}

.svc-card--red .svc-card__tagline {
  color: var(--color-red-dark);
}
.svc-card--gold .svc-card__tagline {
  color: #8a6a1a;
}

.svc-card__desc {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text-muted);
  margin-bottom: 1.75rem;
  max-width: none;
}

/* FEATURES */
.features {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1rem;
  margin-bottom: 1.75rem;
  padding: 1.25rem;
  background: var(--color-cream);
  border-radius: var(--radius-md);
}

.features__item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--color-charcoal);
}

.features__icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  margin-top: -2px;
}

.svc-card--red .features__icon {
  background: rgba(178, 58, 58, 0.1);
  color: var(--color-red);
}

.svc-card--gold .features__icon {
  background: rgba(201, 169, 97, 0.15);
  color: #8a6a1a;
}

.features__icon svg {
  width: 16px;
  height: 16px;
}

/* BEST FOR */
.best-for {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.best-for__label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.best-for__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.pill {
  padding: 0.32rem 0.8rem;
  font-size: 0.78rem;
  font-weight: 500;
  border-radius: var(--radius-full);
  border: 1px solid rgba(28, 19, 17, 0.1);
  color: var(--color-text);
  background: var(--color-white);
}

/* CTA */
.svc-card__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin-top: auto;
  padding: 1.05rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition:
    transform var(--transition),
    background-color var(--transition),
    box-shadow var(--transition);
  position: relative;
  overflow: hidden;
}

.svc-card__cta-arrow {
  margin-left: 0.15rem;
  transition: transform var(--transition);
}

.svc-card--red .svc-card__cta {
  background: var(--color-red);
  color: var(--color-white);
  box-shadow: 0 8px 24px -8px rgba(178, 58, 58, 0.4);
}

.svc-card--red .svc-card__cta:hover {
  background: var(--color-red-dark);
  transform: translateY(-2px);
  box-shadow: 0 14px 32px -8px rgba(178, 58, 58, 0.5);
}

.svc-card--gold .svc-card__cta {
  background: linear-gradient(135deg, #1c1311 0%, #2a1f1c 100%);
  color: var(--color-gold);
  border: 1px solid rgba(201, 169, 97, 0.4);
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.3);
}

.svc-card--gold .svc-card__cta:hover {
  background: linear-gradient(135deg, #2a1f1c 0%, #3a2d29 100%);
  border-color: var(--color-gold);
  color: #ffe0a8;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px -8px rgba(201, 169, 97, 0.25);
}

.svc-card__cta:hover .svc-card__cta-arrow {
  transform: translateX(4px);
}

/* ===================== HOW IT WORKS ===================== */
.s-flow {
  padding-block: var(--space-4xl);
  background: var(--color-white);
  border-top: 1px solid rgba(28, 19, 17, 0.05);
  border-bottom: 1px solid rgba(28, 19, 17, 0.05);
}

.s-flow__head {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 3rem;
}

.s-flow__title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-variation-settings: 'opsz' 144;
}

.s-flow__title em {
  font-style: italic;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

.steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.steps__line {
  position: absolute;
  top: 36px;
  left: 18%;
  right: 18%;
  height: 1px;
  background: repeating-linear-gradient(
    90deg,
    rgba(178, 58, 58, 0.4) 0,
    rgba(178, 58, 58, 0.4) 6px,
    transparent 6px,
    transparent 12px
  );
  z-index: 0;
}

.step {
  position: relative;
  z-index: 1;
  text-align: center;
}

.step__num {
  display: inline-grid;
  place-items: center;
  width: 72px;
  height: 72px;
  background: var(--color-white);
  border: 2px solid rgba(178, 58, 58, 0.2);
  border-radius: 50%;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
  margin-bottom: 1.25rem;
  position: relative;
  transition:
    transform var(--transition),
    border-color var(--transition);
}

.step:hover .step__num {
  transform: scale(1.05) rotate(-4deg);
  border-color: var(--color-red);
}

.step__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.25;
  letter-spacing: -0.01em;
  font-variation-settings: 'opsz' 144;
  margin-bottom: 0.5rem;
}

.step__desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 32ch;
  margin: 0 auto;
}

/* ===================== CTA STRIP ===================== */
.s-cta {
  padding-block: var(--space-3xl);
}

.s-cta__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 2rem;
  padding: clamp(2rem, 1.5rem + 2vw, 3.5rem);
  background: linear-gradient(135deg, #1c1311 0%, #2a1f1c 100%);
  border-radius: var(--radius-xl);
  color: var(--color-white);
  overflow: hidden;
  border: 1px solid rgba(201, 169, 97, 0.15);
}

.s-cta__deco {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.s-cta__deco-1 {
  position: absolute;
  top: -120px;
  right: -120px;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(178, 58, 58, 0.3) 0%, transparent 70%);
  filter: blur(20px);
}

.s-cta__deco-2 {
  position: absolute;
  bottom: -80px;
  left: -80px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201, 169, 97, 0.2) 0%, transparent 70%);
  filter: blur(20px);
}

.s-cta__content {
  position: relative;
  z-index: 1;
}

.s-cta__title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--color-white);
  font-variation-settings: 'opsz' 144;
  margin-bottom: 0.75rem;
  max-width: 28ch;
}

.s-cta__lead {
  font-size: 0.95rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.7);
  max-width: 50ch;
}

.s-cta__btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.05rem 2rem;
  background: var(--color-white);
  color: var(--color-charcoal);
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition:
    transform var(--transition),
    background-color var(--transition);
  white-space: nowrap;
}

.s-cta__btn:hover {
  background: var(--color-gold);
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
@media (max-width: 960px) {
  .s-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .features {
    grid-template-columns: 1fr;
  }

  .steps {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .steps__line {
    display: none;
  }
}

@media (max-width: 640px) {
  .svc-card__body {
    padding: 1.5rem;
  }
  .svc-card__media {
    aspect-ratio: 4 / 3;
  }
  .svc-card__num {
    top: 1rem;
    left: 1rem;
  }
  .svc-card__eyebrow {
    bottom: 1rem;
    left: 1rem;
    font-size: 0.62rem;
    padding: 0.4rem 0.85rem;
  }

  .features {
    padding: 1rem;
  }

  .s-cta__inner {
    grid-template-columns: 1fr;
    text-align: left;
  }
  .s-cta__btn {
    justify-self: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
  }
}
</style>
