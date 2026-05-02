<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { faqItems } from '@/data/faq.js'

// ============ FAQ ACCORDION STATE ============
const openId = ref(faqItems[0].id) // FAQ pertama default terbuka

const toggleFaq = (id) => {
  openId.value = openId.value === id ? null : id
}

// ============ COPY-TO-CLIPBOARD UNTUK EMAIL ============
const copied = ref(false)
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('reqgandi@gmail.com')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Fallback: do nothing if clipboard API unavailable
  }
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
  <div class="contact">
    <!-- ===================== HERO ===================== -->
    <section class="c-hero">
      <div class="container">
        <span class="eyebrow reveal">Pusat Bantuan &amp; Kontak</span>
        <h1 class="c-hero__title reveal" style="--d: 120ms">Mari kita <em>bicara</em>.</h1>
        <p class="c-hero__lead reveal" style="--d: 240ms">
          Temukan jawaban cepat di FAQ, atau hubungi tim kami secara langsung. Kami siap membantu
          mewujudkan acara Anda.
        </p>
      </div>
    </section>

    <!-- ===================== FAQ ===================== -->
    <section class="c-faq">
      <div class="container">
        <div class="faq-grid">
          <!-- LEFT: HEADING -->
          <header class="faq-head reveal">
            <span class="faq-head__num">FAQ</span>
            <h2 class="faq-head__title">Pertanyaan yang sering <em>ditanyakan.</em></h2>
            <p class="faq-head__desc">
              Tidak menemukan jawaban yang Anda cari?
              <a
                href="https://wa.me/6282145108485"
                target="_blank"
                rel="noopener noreferrer"
                class="faq-head__link"
              >
                Tanya langsung via WhatsApp →
              </a>
            </p>
          </header>

          <!-- RIGHT: ACCORDION -->
          <div class="faq-list reveal" style="--d: 200ms">
            <details
              v-for="(item, i) in faqItems"
              :key="item.id"
              class="faq"
              :class="{ 'is-open': openId === item.id }"
              :open="openId === item.id"
              @click.prevent="toggleFaq(item.id)"
            >
              <summary class="faq__head">
                <span class="faq__num">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="faq__q">{{ item.q }}</span>
                <span class="faq__icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <div class="faq__answer">
                <p>{{ item.a }}</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== CONTACT CARDS ===================== -->
    <section class="c-channels">
      <div class="container">
        <header class="c-section-head reveal">
          <span class="eyebrow eyebrow--center">Hubungi Tim Kami</span>
          <h2 class="c-section-title">Pilih jalur yang paling nyaman.</h2>
        </header>

        <div class="channels">
          <!-- WHATSAPP CARD (primary) -->
          <article class="channel channel--wa reveal">
            <div class="channel__top">
              <span class="channel__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"
                  />
                  <path
                    d="M20.5 3.5C18.3 1.2 15.3 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3z"
                  />
                </svg>
              </span>
              <span class="channel__badge">
                <span class="channel__pulse"></span>
                Online
              </span>
            </div>

            <span class="channel__label">WhatsApp · Tercepat</span>
            <h3 class="channel__title">Respon cepat untuk pemesanan dan konsultasi.</h3>
            <p class="channel__desc">
              Tim kami aktif setiap hari pukul 07.00–21.00 WITA. Konsultasi gratis, tanpa komitmen.
            </p>

            <div class="channel__value">082145108485</div>

            <a
              href="https://wa.me/6282145108485"
              target="_blank"
              rel="noopener noreferrer"
              class="channel__btn channel__btn--wa"
            >
              Chat via WhatsApp
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
          </article>

          <!-- EMAIL CARD -->
          <article class="channel channel--email reveal" style="--d: 120ms">
            <div class="channel__top">
              <span class="channel__icon channel__icon--email" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
            </div>

            <span class="channel__label">Email · Resmi</span>
            <h3 class="channel__title">Kirimkan pesan atau tawaran kerja sama.</h3>
            <p class="channel__desc">
              Untuk inquiry partnership, undangan event, atau dokumen resmi. Kami balas dalam 1×24
              jam.
            </p>

            <div class="channel__value">reqgandi@gmail.com</div>

            <div class="channel__actions">
              <a href="mailto:reqgandi@gmail.com" class="channel__btn channel__btn--email">
                Kirim Email
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
              <button @click="copyEmail" class="channel__btn channel__btn--copy" type="button">
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
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {{ copied ? 'Tersalin!' : 'Salin' }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ===================== MAP SECTION ===================== -->
    <section class="c-map">
      <div class="container">
        <header class="c-section-head c-section-head--center reveal">
          <span class="eyebrow eyebrow--center">Lokasi Dapur</span>
          <h2 class="c-section-title">Kunjungi <em>dapur kami.</em></h2>
          <p class="c-section-lead">
            Dapur produksi pusat Puri Rasa berada di kawasan Singaraja, Bali Utara— tidak jauh dari
            pasar tradisional tempat kami belanja bahan setiap pagi.
          </p>
        </header>

        <div class="map-shell reveal">
          <!-- INFO STRIP DI ATAS MAP -->
          <div class="map-strip">
            <div class="map-strip__item">
              <span class="map-strip__icon">
                <svg
                  width="16"
                  height="16"
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
              </span>
              <div>
                <span class="map-strip__label">Lokasi</span>
                <span class="map-strip__value">Catering Puri Rasa </span>
              </div>
            </div>
            <span class="map-strip__divider"></span>
            <div class="map-strip__item">
              <span class="map-strip__icon">
                <svg
                  width="16"
                  height="16"
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
              </span>
              <div>
                <span class="map-strip__label">Jam Buka</span>
                <span class="map-strip__value">07.00 – 21.00 WITA</span>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Gagapan+Bali+Utara"
              target="_blank"
              rel="noopener noreferrer"
              class="map-strip__btn"
            >
              Buka di Google Maps
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

          <!-- MAP IFRAME -->
          <div class="map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.026679000901!2d115.09778007358425!3d-8.127004091902625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd191c754a4f121%3A0x9347e51fdad11df0!2sGagapan%20Bali%20Utara!5e1!3m2!1sen!2sid!4v1777647367931!5m2!1sen!2sid"
              width="100%"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Lokasi Dapur Puri Rasa Catering"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact {
  background: var(--color-cream);
  padding-bottom: var(--space-3xl);
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

.c-section-head {
  margin-bottom: 2.5rem;
}

.c-section-head--center {
  text-align: center;
  max-width: 720px;
  margin-inline: auto;
  margin-bottom: 2.5rem;
}

.c-section-title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-variation-settings: 'opsz' 144;
  margin-bottom: 0.75rem;
}

.c-section-title em {
  font-style: italic;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

.c-section-lead {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.c-section-head--center .c-section-lead {
  margin-inline: auto;
  max-width: 50ch;
}

/* ===================== HERO ===================== */
.c-hero {
  padding-block: clamp(3rem, 2rem + 4vw, 5rem) clamp(2rem, 1rem + 2vw, 3rem);
}

.c-hero__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.25rem, 1.5rem + 3.5vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
  font-variation-settings: 'opsz' 144;
  margin-bottom: 1.25rem;
}

.c-hero__title em {
  font-style: italic;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

.c-hero__lead {
  font-size: clamp(1rem, 0.95rem + 0.4vw, 1.18rem);
  line-height: 1.65;
  color: var(--color-text-muted);
  max-width: 56ch;
}

/* ===================== FAQ ===================== */
.c-faq {
  padding-block: var(--space-3xl);
  background: var(--color-white);
  border-top: 1px solid rgba(28, 19, 17, 0.04);
  border-bottom: 1px solid rgba(28, 19, 17, 0.04);
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: clamp(2rem, 1rem + 3vw, 4rem);
  align-items: start;
}

.faq-head {
  position: sticky;
  top: 100px; /* di-offset karena navbar fixed */
}

.faq-head__num {
  display: inline-block;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-red);
  letter-spacing: 0.18em;
  margin-bottom: 0.75rem;
  font-variation-settings: 'opsz' 9;
}

.faq-head__title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.6rem, 1.3rem + 1.2vw, 2.25rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-variation-settings: 'opsz' 144;
  margin-bottom: 1rem;
}

.faq-head__title em {
  font-style: italic;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

.faq-head__desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 36ch;
}

.faq-head__link {
  display: inline-block;
  margin-top: 0.4rem;
  color: var(--color-red);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: color var(--transition-fast);
}

.faq-head__link:hover {
  color: var(--color-red-dark);
}

/* FAQ ACCORDION */
.faq-list {
  display: flex;
  flex-direction: column;
}

.faq {
  border-bottom: 1px solid rgba(28, 19, 17, 0.08);
  transition: border-color var(--transition);
}

.faq:first-child {
  border-top: 1px solid rgba(28, 19, 17, 0.08);
}

.faq.is-open {
  border-color: rgba(178, 58, 58, 0.25);
}

/* Hilangkan default arrow */
.faq summary {
  list-style: none;
  cursor: pointer;
}
.faq summary::-webkit-details-marker {
  display: none;
}

.faq__head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem 0;
  transition: padding var(--transition);
}

.faq__num {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 0.85rem;
  color: var(--color-red);
  font-variation-settings: 'opsz' 9;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}

.faq__q {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1rem, 0.95rem + 0.3vw, 1.15rem);
  line-height: 1.4;
  color: var(--color-charcoal);
  letter-spacing: -0.01em;
  font-variation-settings: 'opsz' 144;
}

.faq__icon {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-cream);
  color: var(--color-charcoal);
  transition:
    background-color var(--transition),
    color var(--transition),
    transform var(--transition);
  flex-shrink: 0;
}

.faq__icon svg {
  width: 16px;
  height: 16px;
}

.faq.is-open .faq__icon {
  background: var(--color-red);
  color: var(--color-white);
  transform: rotate(45deg);
}

.faq__answer {
  overflow: hidden;
  padding-left: calc(0.85rem + 1.25rem); /* sejajar dengan teks Q */
  padding-right: calc(36px + 1.25rem);
  padding-bottom: 1.5rem;
  animation: faqDown 320ms cubic-bezier(0.32, 0.72, 0, 1);
}

.faq__answer p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: none;
  margin: 0;
}

@keyframes faqDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===================== CONTACT CHANNELS ===================== */
.c-channels {
  padding-block: var(--space-3xl);
}

.channels {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.channel {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: clamp(1.75rem, 1rem + 1.5vw, 2.5rem);
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.06);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    transform var(--transition),
    box-shadow var(--transition),
    border-color var(--transition);
}

.channel:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px -16px rgba(28, 19, 17, 0.1);
}

.channel--wa {
  background: linear-gradient(180deg, #f0f9f2 0%, var(--color-white) 60%);
}

.channel--wa:hover {
  border-color: rgba(37, 211, 102, 0.3);
}
.channel--email:hover {
  border-color: rgba(178, 58, 58, 0.25);
}

.channel__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.channel__icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: #25d366;
  color: var(--color-white);
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.3);
}

.channel__icon--email {
  background: var(--color-red);
  box-shadow: var(--shadow-red);
}

.channel__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  background: rgba(37, 211, 102, 0.1);
  color: #1c8a44;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: var(--radius-full);
}

.channel__pulse {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #25d366;
  border-radius: 50%;
  position: relative;
}

.channel__pulse::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #25d366;
  animation: pulse 1.6s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.channel__label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.55rem;
}

.channel__title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.15rem, 0.95rem + 0.7vw, 1.4rem);
  line-height: 1.25;
  letter-spacing: -0.015em;
  font-variation-settings: 'opsz' 144;
  color: var(--color-charcoal);
  margin-bottom: 0.75rem;
}

.channel__desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  max-width: none;
}

.channel__value {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: -0.01em;
  color: var(--color-charcoal);
  font-variation-settings: 'opsz' 144;
  margin-bottom: 1.25rem;
  padding: 0.85rem 1rem;
  background: var(--color-cream);
  border-radius: var(--radius-md);
  border: 1px dashed rgba(28, 19, 17, 0.12);
  user-select: all;
  word-break: break-all;
}

.channel__actions {
  display: flex;
  gap: 0.6rem;
  margin-top: auto;
}

.channel__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.95rem 1.5rem;
  font-size: 0.92rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition);
  cursor: pointer;
  white-space: nowrap;
  border: none;
}

.channel__btn--wa {
  width: 100%;
  background: #25d366;
  color: var(--color-white);
  margin-top: auto;
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.35);
}

.channel__btn--wa:hover {
  background: #1eb358;
  transform: translateY(-2px);
}

.channel__btn--email {
  flex: 1;
  background: var(--color-red);
  color: var(--color-white);
  box-shadow: var(--shadow-red);
}

.channel__btn--email:hover {
  background: var(--color-red-dark);
  transform: translateY(-2px);
}

.channel__btn--copy {
  flex-shrink: 0;
  background: var(--color-cream);
  color: var(--color-charcoal);
  border: 1px solid rgba(28, 19, 17, 0.08);
}

.channel__btn--copy:hover {
  background: var(--color-charcoal);
  color: var(--color-white);
  border-color: var(--color-charcoal);
}

/* ===================== MAP ===================== */
.c-map {
  padding-block: var(--space-3xl);
}

.map-shell {
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.06);
  box-shadow:
    0 1px 0 rgba(28, 19, 17, 0.04),
    0 24px 60px -20px rgba(28, 19, 17, 0.18);
}

.map-strip {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.1rem 1.5rem;
  background: linear-gradient(180deg, var(--color-white) 0%, var(--color-cream) 100%);
  border-bottom: 1px solid rgba(28, 19, 17, 0.08);
}

.map-strip__item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.map-strip__icon {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(178, 58, 58, 0.1);
  color: var(--color-red);
  flex-shrink: 0;
}

.map-strip__label {
  display: block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.1rem;
}

.map-strip__value {
  display: block;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: -0.005em;
  color: var(--color-charcoal);
  font-variation-settings: 'opsz' 144;
}

.map-strip__divider {
  width: 1px;
  height: 28px;
  background: rgba(28, 19, 17, 0.1);
}

.map-strip__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: auto;
  padding: 0.6rem 1rem;
  background: var(--color-charcoal);
  color: var(--color-white);
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background-color var(--transition);
  white-space: nowrap;
}

.map-strip__btn:hover {
  background: var(--color-red);
}

.map-frame {
  position: relative;
  width: 100%;
  background: var(--color-cream);
}

.map-frame iframe {
  display: block;
  width: 100%;
  height: 450px;
  border: 0;
  filter: saturate(0.85) contrast(0.95);
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
  .faq-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .faq-head {
    position: static;
  }

  .channels {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .faq__head {
    grid-template-columns: auto 1fr auto;
    gap: 0.85rem;
  }

  .faq__answer {
    padding-left: calc(0.85rem + 0.85rem);
    padding-right: 1rem;
  }

  .map-strip {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
  }
  .map-strip__divider {
    display: none;
  }
  .map-strip__btn {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }

  .map-frame iframe {
    height: 360px;
  }

  .channel__actions {
    flex-direction: column;
  }
  .channel__btn--copy {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
  }
  .channel__pulse::before {
    animation: none;
  }
}
</style>
