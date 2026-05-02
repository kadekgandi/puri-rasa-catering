<script setup>
const currentYear = new Date().getFullYear()

const quickLinks = [
  { name: 'Home', to: '/' },
  { name: 'Kisah Kami', to: '/tentang' },
  { name: 'Katalog Menu', to: '/menu' },
  { name: 'Layanan', to: '/layanan' },
  { name: 'Testimoni & Galeri', to: '/testimoni' },
  { name: 'Pusat Bantuan', to: '/kontak' },
]

const services = [
  {
    name: 'Paket Katering',
    href: '/menu',
    isInternal: true,
  },
  {
    name: 'Layanan Adat & Wedding',
    href: 'https://wa.me/6289517733600?text=Halo%20Puri%20Rasa%2C%20saya%20tertarik%20untuk%20memesan%20Layanan%20Adat.%20Bisa%20minta%20info%20lebih%20lanjut%3F',
    isInternal: false,
  },
  {
    name: 'Layanan Rumah (Private)',
    href: 'https://wa.me/6289517733600?text=Halo%20Puri%20Rasa%2C%20saya%20tertarik%20untuk%20memesan%20Layanan%20Rumah.%20Bisa%20minta%20info%20lebih%20lanjut%3F',
    isInternal: false,
  },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__accent" aria-hidden="true"></div>

    <div class="footer__inner">
      <!-- KOLOM 1: BRAND -->
      <div class="footer__col footer__brand-col">
        <RouterLink to="/" class="footer__logo">
          <span class="footer__logo-mark">P</span>
          <span class="footer__logo-text">
            <span class="footer__logo-name">Puri Rasa</span>
            <span class="footer__logo-sub">catering &middot; bali</span>
          </span>
        </RouterLink>

        <p class="footer__desc">
          Menyajikan kehangatan masakan keluarga dengan resep warisan turun-temurun untuk setiap
          momen istimewa Anda di Pulau Dewata.
        </p>

        <div class="footer__socials">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social"
            aria-label="Instagram Puri Rasa"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social"
            aria-label="Facebook Puri Rasa"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
              />
            </svg>
          </a>
          <a
            href="https://tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social"
            aria-label="TikTok Puri Rasa"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- KOLOM 2: QUICK LINKS -->
      <div class="footer__col">
        <h4 class="footer__heading">Jelajahi</h4>
        <ul class="footer__links">
          <li v-for="link in quickLinks" :key="link.to">
            <RouterLink :to="link.to" class="footer__link">{{ link.name }}</RouterLink>
          </li>
        </ul>
      </div>

      <!-- KOLOM 3: SERVICES -->
      <div class="footer__col">
        <h4 class="footer__heading">Layanan Utama</h4>
        <ul class="footer__links">
          <li v-for="s in services" :key="s.name">
            <RouterLink v-if="s.isInternal" :to="s.href" class="footer__link">
              {{ s.name }}
            </RouterLink>
            <a v-else :href="s.href" target="_blank" rel="noopener noreferrer" class="footer__link">
              {{ s.name }}
            </a>
          </li>
        </ul>
      </div>

      <!-- KOLOM 4: KONTAK -->
      <div class="footer__col">
        <h4 class="footer__heading">Hubungi Kami</h4>
        <ul class="footer__contact">
          <li>
            <a
              href="https://wa.me/6289517733600"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__contact-item"
            >
              <span class="footer__contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"
                  />
                  <path
                    d="M20.5 3.5C18.3 1.2 15.3 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3z"
                  />
                </svg>
              </span>
              <span>
                <span class="footer__contact-label">WhatsApp</span>
                <span class="footer__contact-value">089517733600</span>
              </span>
            </a>
          </li>
          <li>
            <a href="mailto:purirasachat@gmail.com" class="footer__contact-item">
              <span class="footer__contact-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <span>
                <span class="footer__contact-label">Email</span>
                <span class="footer__contact-value">purirasachat@gmail.com</span>
              </span>
            </a>
          </li>
          <li class="footer__contact-item footer__contact-item--static">
            <span class="footer__contact-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span>
              <span class="footer__contact-label">Lokasi</span>
              <span class="footer__contact-value">Singaraja, Bali Utara</span>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- BOTTOM BAR -->
    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <p class="footer__copy">
          &copy; {{ currentYear }} <strong>Puri Rasa Catering</strong>. All Rights Reserved.
        </p>
        <ul class="footer__legal">
          <li><a href="#" class="footer__legal-link">Syarat &amp; Ketentuan</a></li>
          <li><a href="#" class="footer__legal-link">Kebijakan Privasi</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ============ FOOTER SHELL ============ */
.footer {
  position: relative;
  background: linear-gradient(180deg, #211514 0%, #1a0f0e 100%);
  color: rgba(255, 255, 255, 0.78);
  margin-top: var(--space-4xl);
  overflow: hidden;
}

/* Garis aksen tipis di atas footer */
.footer__accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-red) 20%,
    var(--color-gold) 50%,
    var(--color-red) 80%,
    transparent 100%
  );
  opacity: 0.7;
}

.footer__inner {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--space-3xl) var(--container-padding) var(--space-2xl);
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
  gap: var(--space-2xl);
}

/* ============ KOLOM BRAND ============ */
.footer__brand-col {
  padding-right: 1rem;
}

.footer__logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-white);
  margin-bottom: 1rem;
}

.footer__logo-mark {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: var(--color-red);
  color: var(--color-white);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  font-size: 1.375rem;
  border-radius: 50%;
  font-variation-settings: 'opsz' 144;
  box-shadow: 0 6px 18px rgba(178, 58, 58, 0.4);
}

.footer__logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.footer__logo-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.375rem;
  letter-spacing: -0.01em;
  font-variation-settings: 'opsz' 144;
}

.footer__logo-sub {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.3rem;
}

.footer__desc {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.62);
  margin-bottom: 1.5rem;
  max-width: 32ch;
}

.footer__socials {
  display: flex;
  gap: 0.6rem;
}

.footer__social {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  transition:
    background-color var(--transition),
    color var(--transition),
    transform var(--transition),
    border-color var(--transition);
}

.footer__social:hover {
  background: var(--color-red);
  color: var(--color-white);
  border-color: var(--color-red);
  transform: translateY(-3px);
}

/* ============ HEADINGS & LINKS ============ */
.footer__heading {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-white);
  margin-bottom: 1.25rem;
  position: relative;
  padding-bottom: 0.6rem;
}

.footer__heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 24px;
  height: 2px;
  background: var(--color-red);
  border-radius: 2px;
}

.footer__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__link {
  display: inline-block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
  transition:
    color var(--transition-fast),
    transform var(--transition-fast);
  position: relative;
  padding-left: 0;
}

.footer__link::before {
  content: '→';
  position: absolute;
  left: -1.25rem;
  opacity: 0;
  transition:
    opacity var(--transition-fast),
    left var(--transition-fast);
  color: var(--color-red);
}

.footer__link:hover {
  color: var(--color-white);
  transform: translateX(4px);
}

.footer__link:hover::before {
  opacity: 1;
  left: -1rem;
}

/* ============ KONTAK ============ */
.footer__contact {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer__contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer__contact-item:not(.footer__contact-item--static):hover {
  color: var(--color-white);
}
.footer__contact-item:not(.footer__contact-item--static):hover .footer__contact-icon {
  background: var(--color-red);
  border-color: var(--color-red);
  color: var(--color-white);
}

.footer__contact-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
  transition:
    background-color var(--transition),
    color var(--transition),
    border-color var(--transition);
}

.footer__contact-label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.15rem;
}

.footer__contact-value {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}

/* ============ BOTTOM BAR ============ */
.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.18);
}

.footer__bottom-inner {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: 1.25rem var(--container-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__copy {
  font-size: 0.825rem;
  color: rgba(255, 255, 255, 0.5);
}

.footer__copy strong {
  color: rgba(255, 255, 255, 0.78);
  font-weight: 600;
}

.footer__legal {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.footer__legal-link {
  font-size: 0.825rem;
  color: rgba(255, 255, 255, 0.5);
  transition: color var(--transition-fast);
}

.footer__legal-link:hover {
  color: var(--color-white);
}

/* ============ RESPONSIVE ============ */
@media (max-width: 960px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }
  .footer__brand-col {
    grid-column: 1 / -1;
    padding-right: 0;
  }
}

@media (max-width: 560px) {
  .footer__inner {
    grid-template-columns: 1fr;
    padding-block: var(--space-2xl);
    gap: var(--space-xl);
  }
  .footer__bottom-inner {
    flex-direction: column;
    text-align: center;
  }
  .footer__legal {
    justify-content: center;
  }
}
</style>
