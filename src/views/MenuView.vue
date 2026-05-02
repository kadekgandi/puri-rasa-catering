<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { packages, packagingOptions, menuItems, menuCategories } from '@/data/menuData.js'
import { useOrder } from '@/composables/useOrder.js'

const order = useOrder(packages, packagingOptions, menuItems)

// ============ VIEW STATE: 'list' | 'detail' ============
const view = ref('list')

const openDetail = (id) => {
  order.setPackage(id)
  view.value = 'detail'
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  })
}

const backToList = () => {
  view.value = 'list'
  nextTick(() => {
    const el = document.querySelector('[data-section="packages"]')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  })
}

const goCustomFromBisnis = (pkg) => {
  order.activateCustomFromPackage(pkg)
  view.value = 'list'
  nextTick(() => {
    const el = document.querySelector('[data-section="custom"]')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  })
}

const handleModeSwitch = (mode) => {
  order.switchMode(mode)
  view.value = 'list'
}

const activeCategory = ref('Semua')
const allCategories = ['Semua', ...menuCategories]

const filteredMenu = computed(() => {
  if (activeCategory.value === 'Semua') return menuItems
  return menuItems.filter((m) => m.category === activeCategory.value)
})

const submitOrder = () => {
  if (!order.hasOrder.value) return
  // 1. Buka WhatsApp dulu
  window.open(order.buildWhatsappUrl(), '_blank', 'noopener,noreferrer')
  // 2. Beri delay sedikit supaya tab WA sempat terbuka, lalu reset
  setTimeout(() => {
    order.resetAll()
    view.value = 'list'
  }, 500)
}

const handleEsc = (e) => {
  if (e.key === 'Escape' && view.value === 'detail') backToList()
}

onMounted(() => {
  document.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
})

watch(
  () => order.activeMode.value,
  () => {
    if (view.value === 'detail') view.value = 'list'
  },
)
</script>

<template>
  <div class="menu">
    <!-- ===================== HERO ===================== -->
    <section v-show="view === 'list'" class="m-hero">
      <div class="container">
        <span class="eyebrow">Katalog · Pesan Sekarang</span>
        <h1 class="m-hero__title">Menu <em>Kami</em></h1>
        <p class="m-hero__lead">
          Pilih paket katering siap-saji atau susun sendiri isi box-mu. Pesanan langsung terkirim
          rapi ke WhatsApp.
        </p>

        <!-- MODE SWITCHER (full width di mobile) -->
        <div class="mode-switch" role="tablist" aria-label="Pilih mode pesanan">
          <button
            class="mode-switch__btn"
            :class="{ 'is-active': order.activeMode.value === 'paket' }"
            role="tab"
            :aria-selected="order.activeMode.value === 'paket'"
            @click="handleModeSwitch('paket')"
          >
            Paket Katering
          </button>
          <button
            class="mode-switch__btn"
            :class="{ 'is-active': order.activeMode.value === 'custom' }"
            role="tab"
            :aria-selected="order.activeMode.value === 'custom'"
            @click="handleModeSwitch('custom')"
          >
            Paket Custom
          </button>
          <span
            class="mode-switch__indicator"
            :class="{ 'is-right': order.activeMode.value === 'custom' }"
          ></span>
        </div>
      </div>
    </section>

    <!-- ===================== PAKET LIST VIEW ===================== -->
    <section
      v-show="order.activeMode.value === 'paket' && view === 'list'"
      class="packages-section"
      data-section="packages"
    >
      <div class="container">
        <div class="packages">
          <article
            v-for="pkg in packages"
            :key="pkg.id"
            class="pkg-card"
            :class="{ 'is-premium': pkg.isPremium }"
            @click="openDetail(pkg.id)"
            tabindex="0"
            role="button"
            :aria-label="`Pilih ${pkg.name}, mulai dari ${pkg.priceLabel} per box`"
            @keydown.enter="openDetail(pkg.id)"
            @keydown.space.prevent="openDetail(pkg.id)"
          >
            <div class="pkg-card__media">
              <img :src="pkg.image" :alt="pkg.name" loading="lazy" />
              <span v-if="pkg.badge" class="pkg-card__badge">⭐ {{ pkg.badge }}</span>
            </div>

            <div class="pkg-card__info">
              <div class="pkg-card__top">
                <span class="pkg-card__tagline">{{ pkg.tagline }}</span>
                <h3 class="pkg-card__name">{{ pkg.name }}</h3>

                <div class="pkg-card__meta">
                  <span class="pkg-card__rating">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      />
                    </svg>
                    {{ pkg.rating }}/5
                  </span>
                  <span class="pkg-card__divider"></span>
                  <span class="pkg-card__price">{{ pkg.priceLabel }}/box</span>
                </div>

                <p class="pkg-card__desc">{{ pkg.desc }}</p>
              </div>

              <span class="pkg-card__cta">
                Lihat &amp; pesan
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ===================== DETAIL VIEW ===================== -->
    <Transition name="detail">
      <section
        v-if="
          order.activeMode.value === 'paket' && view === 'detail' && order.selectedPackage.value
        "
        class="detail-section"
        :class="{ 'is-premium': order.selectedPackage.value.isPremium }"
      >
        <div class="container">
          <!-- BREADCRUMB & BACK -->
          <div class="detail-nav">
            <button
              class="back-btn"
              @click="backToList"
              type="button"
              aria-label="Kembali ke daftar paket"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Kembali
            </button>
            <nav class="breadcrumb" aria-label="Breadcrumb">
              <button class="breadcrumb__link" @click="backToList" type="button">Menu</button>
              <span class="breadcrumb__sep" aria-hidden="true">/</span>
              <span class="breadcrumb__current">{{ order.selectedPackage.value.name }}</span>
            </nav>
          </div>

          <!-- HEADER PAKET -->
          <header class="detail-head">
            <div class="detail-head__main">
              <span class="detail-head__tagline">{{ order.selectedPackage.value.tagline }}</span>
              <h1 class="detail-head__title">{{ order.selectedPackage.value.name }}</h1>
              <p class="detail-head__desc">{{ order.selectedPackage.value.desc }}</p>
            </div>

            <div class="detail-head__price-tag">
              <span class="detail-head__price-label">Harga per box</span>
              <span class="detail-head__price-value">{{
                order.selectedPackage.value.priceLabel
              }}</span>
              <span class="detail-head__price-meta">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  />
                </svg>
                {{ order.selectedPackage.value.rating }}/5 · Min.
                {{ order.selectedPackage.value.minOrder }} box
              </span>
            </div>
          </header>

          <!-- FORM CARDS -->
          <div class="detail-form">
            <!-- 01 ISI PAKET -->
            <section class="form-card">
              <header class="form-card__head">
                <span class="form-card__step">01</span>
                <div>
                  <h3 class="form-card__title">Isi Paket</h3>
                  <p class="form-card__sub">Komposisi yang akan Anda dapatkan per box.</p>
                </div>
              </header>

              <ul class="fixed-items">
                <li
                  v-for="item in order.selectedPackage.value.fixedItems"
                  :key="item"
                  class="fixed-items__item"
                >
                  <span class="fixed-items__check" aria-hidden="true">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {{ item }}
                </li>
              </ul>

              <button
                v-if="order.selectedPackage.value.type === 'customizable'"
                class="custom-cta"
                @click="goCustomFromBisnis(order.selectedPackage.value)"
                type="button"
              >
                <span class="custom-cta__icon" aria-hidden="true">✨</span>
                <span class="custom-cta__text">
                  <span class="custom-cta__title">Custom Menu</span>
                  <span class="custom-cta__sub">Atur isi box sesuai selera Anda</span>
                </span>
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </section>

            <!-- 02 QUANTITY -->
            <section class="form-card">
              <header class="form-card__head">
                <span class="form-card__step">02</span>
                <div>
                  <h3 class="form-card__title">Jumlah Box</h3>
                  <p class="form-card__sub">
                    Min. {{ order.selectedPackage.value.minOrder }} box per pesanan.
                  </p>
                </div>
              </header>

              <div class="qty-row">
                <div class="stepper">
                  <button @click="order.decQty" class="stepper__btn" aria-label="Kurangi">−</button>
                  <span class="stepper__val">{{ order.quantity.value }}</span>
                  <button @click="order.incQty" class="stepper__btn" aria-label="Tambah">+</button>
                </div>
                <span class="qty-row__hint">box</span>
              </div>
            </section>

            <!-- 03 PACKAGING -->
            <section class="form-card">
              <header class="form-card__head">
                <span class="form-card__step">03</span>
                <div>
                  <h3 class="form-card__title">Pilihan Packaging</h3>
                  <p class="form-card__sub">Tap salah satu untuk memilih.</p>
                </div>
              </header>

              <div class="packaging-grid">
                <button
                  v-for="pkgOpt in packagingOptions"
                  :key="pkgOpt.id"
                  class="pkg-opt"
                  :class="{ 'is-active': order.packagingId.value === pkgOpt.id }"
                  @click="order.packagingId.value = pkgOpt.id"
                  type="button"
                >
                  <div class="pkg-opt__img">
                    <img :src="pkgOpt.image" :alt="pkgOpt.name" loading="lazy" />
                    <span class="pkg-opt__check" aria-hidden="true">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  </div>
                  <span class="pkg-opt__name">{{ pkgOpt.name }}</span>
                  <span class="pkg-opt__desc">{{ pkgOpt.desc }}</span>
                </button>
              </div>
            </section>

            <!-- 04 CATATAN -->
            <section class="form-card">
              <header class="form-card__head">
                <span class="form-card__step">04</span>
                <div>
                  <h3 class="form-card__title">Catatan Khusus</h3>
                  <p class="form-card__sub">
                    Opsional — alergi, request rasa, jam pengiriman, dll.
                  </p>
                </div>
              </header>

              <textarea
                v-model="order.note.value"
                class="textarea"
                rows="4"
                placeholder="Misal: alergi udang, request rasa kurang pedas..."
              ></textarea>
            </section>

            <!-- 05 SUMMARY & CTA -->
            <section class="form-card form-card--summary">
              <header class="form-card__head">
                <span class="form-card__step">05</span>
                <div>
                  <h3 class="form-card__title">Konfirmasi Pesanan</h3>
                  <p class="form-card__sub">Review ringkasan sebelum kirim ke WhatsApp.</p>
                </div>
              </header>

              <div class="summary">
                <div class="summary__row">
                  <span class="summary__label">Paket</span>
                  <span class="summary__value">{{ order.selectedPackage.value.name }}</span>
                </div>
                <div class="summary__row">
                  <span class="summary__label">Jumlah</span>
                  <span class="summary__value">{{ order.quantity.value }} box</span>
                </div>
                <div class="summary__row">
                  <span class="summary__label">Harga per box</span>
                  <span class="summary__value">{{ order.selectedPackage.value.priceLabel }}</span>
                </div>
                <div v-if="order.selectedPackaging.value" class="summary__row">
                  <span class="summary__label">Packaging</span>
                  <span class="summary__value">{{ order.selectedPackaging.value.name }}</span>
                </div>
                <div v-else class="summary__row">
                  <span class="summary__label">Packaging</span>
                  <span class="summary__value summary__value--warn">Belum dipilih</span>
                </div>

                <div class="summary__divider"></div>

                <div class="summary__row summary__row--total">
                  <span class="summary__label">Estimasi Total</span>
                  <span class="summary__value">{{
                    order.formatIDR(order.packageTotal.value)
                  }}</span>
                </div>
              </div>

              <button class="big-cta" @click="submitOrder" type="button">
                <svg
                  width="20"
                  height="20"
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
                Pesan via WhatsApp
              </button>

              <p class="big-cta__hint">
                Pesanan terkirim ke <strong>089517733600</strong>. Admin akan balas dengan
                konfirmasi & jadwal pengiriman.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Transition>

    <!-- ===================== CUSTOM SECTION ===================== -->
    <section
      v-show="order.activeMode.value === 'custom'"
      class="custom-section"
      data-section="custom"
    >
      <div class="container">
        <div v-if="order.customSourceLabel.value" class="custom-banner">
          <span class="custom-banner__icon" aria-hidden="true">✨</span>
          <div class="custom-banner__text">
            <strong>{{ order.customSourceLabel.value }}</strong> sudah dimuat — tambah, kurangi,
            atau ganti item sesuai selera.
          </div>
          <button class="custom-banner__reset" @click="order.resetCustom" type="button">
            Reset
          </button>
        </div>

        <div class="custom-intro">
          <h2 class="custom-intro__title">Susun isi box-mu sendiri.</h2>
          <p class="custom-intro__lead">
            Pilih kombinasi favoritmu dari menu pilihan. Tambah atau kurangi sesuka hati—semua bisa
            kamu atur di sini.
          </p>
        </div>

        <div class="cat-filter" role="tablist">
          <button
            v-for="cat in allCategories"
            :key="cat"
            class="cat-chip"
            :class="{ 'is-active': activeCategory === cat }"
            @click="activeCategory = cat"
            type="button"
          >
            {{ cat }}
          </button>
        </div>

        <div class="menu-grid">
          <article
            v-for="item in filteredMenu"
            :key="item.id"
            class="menu-card"
            :class="{ 'is-active': order.itemCount(item.id) > 0 }"
          >
            <div class="menu-card__media">
              <img :src="item.image" :alt="item.name" loading="lazy" />
              <span v-if="item.top" class="menu-card__badge">⭐ Top</span>
              <span v-if="order.itemCount(item.id) > 0" class="menu-card__count">
                {{ order.itemCount(item.id) }}
              </span>
            </div>

            <div class="menu-card__body">
              <span class="menu-card__cat">{{ item.category }}</span>
              <h3 class="menu-card__name">{{ item.name }}</h3>

              <div class="menu-card__meta">
                <span class="menu-card__rating">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    />
                  </svg>
                  {{ item.rating }}
                </span>
                <span class="menu-card__price">{{ order.formatIDR(item.price) }}</span>
              </div>

              <div v-if="order.itemCount(item.id) > 0" class="menu-card__stepper">
                <button
                  @click="order.removeItem(item.id)"
                  class="stepper__btn stepper__btn--sm"
                  aria-label="Kurangi"
                >
                  −
                </button>
                <span class="stepper__val stepper__val--sm">{{ order.itemCount(item.id) }}</span>
                <button
                  @click="order.addItem(item.id)"
                  class="stepper__btn stepper__btn--sm"
                  aria-label="Tambah"
                >
                  +
                </button>
              </div>
              <button v-else @click="order.addItem(item.id)" class="menu-card__add" type="button">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Tambah
              </button>
            </div>
          </article>
        </div>

        <div v-if="order.customTotalItems.value > 0" class="custom-submit">
          <div class="custom-submit__info">
            <span class="custom-submit__label">{{ order.summaryLabel.value }}</span>
            <span class="custom-submit__total">{{
              order.formatIDR(order.summaryTotal.value)
            }}</span>
          </div>
          <button class="big-cta big-cta--custom" @click="submitOrder" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"
              />
              <path
                d="M20.5 3.5C18.3 1.2 15.3 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3z"
              />
            </svg>
            Pesan via WhatsApp
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.menu {
  background: var(--color-cream);
  padding-bottom: 4rem;
  min-height: 100vh;
}

/* ===================== HERO ===================== */
.m-hero {
  padding-block: clamp(2rem, 1.5rem + 3vw, 4rem) clamp(1.75rem, 1rem + 2vw, 2.5rem);
}

.eyebrow {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-red);
  margin-bottom: 0.85rem;
}

.m-hero__title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.1rem, 1.5rem + 3.5vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
  font-variation-settings: 'opsz' 144;
  color: var(--color-charcoal);
  margin-bottom: 0.85rem;
}

.m-hero__title em {
  font-style: italic;
  color: var(--color-red);
  font-variation-settings: 'opsz' 144;
}

.m-hero__lead {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 56ch;
  margin-bottom: 1.5rem;
}

/* ===================== MODE SWITCHER ===================== */
.mode-switch {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.08);
  border-radius: var(--radius-full);
  padding: 0.3rem;
  box-shadow: 0 4px 14px -4px rgba(28, 19, 17, 0.08);
  width: fit-content;
  max-width: 100%;
}

.mode-switch__btn {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-muted);
  border-radius: var(--radius-full);
  transition: color var(--transition);
  white-space: nowrap;
  letter-spacing: -0.005em;
}

.mode-switch__btn.is-active {
  color: var(--color-white);
}

.mode-switch__indicator {
  position: absolute;
  top: 0.3rem;
  bottom: 0.3rem;
  left: 0.3rem;
  width: calc(50% - 0.3rem);
  background: var(--color-red);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-red);
  transition: transform 320ms cubic-bezier(0.32, 0.72, 0, 1);
}

.mode-switch__indicator.is-right {
  transform: translateX(100%);
}

/* ===================== PAKET LIST CARDS ===================== */
.packages-section {
  padding-bottom: 2.5rem;
}

.packages {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.pkg-card {
  display: flex;
  align-items: stretch;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.06);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition:
    transform var(--transition),
    box-shadow var(--transition),
    border-color var(--transition);
  overflow: hidden;
}

.pkg-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px -16px rgba(28, 19, 17, 0.14);
  border-color: rgba(178, 58, 58, 0.2);
}

.pkg-card:focus-visible {
  outline: none;
  border-color: var(--color-red);
  box-shadow: 0 0 0 3px rgba(178, 58, 58, 0.18);
}

.pkg-card.is-premium {
  background: linear-gradient(180deg, #1a1411 0%, #0f0a09 100%);
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(201, 169, 97, 0.25);
}

.pkg-card.is-premium:hover {
  border-color: rgba(201, 169, 97, 0.5);
  box-shadow: 0 20px 48px -16px rgba(0, 0, 0, 0.4);
}

.pkg-card__media {
  position: relative;
  flex-shrink: 0;
  width: 120px;
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.pkg-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pkg-card__badge {
  position: absolute;
  top: 0.45rem;
  left: 0.45rem;
  padding: 0.22rem 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-red-dark);
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.pkg-card__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.7rem;
  padding: 0.1rem 0;
}

.pkg-card__top {
  min-width: 0;
}

.pkg-card__tagline {
  display: block;
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-red);
  margin-bottom: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pkg-card.is-premium .pkg-card__tagline {
  color: var(--color-gold);
}

.pkg-card__name {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--color-charcoal);
  margin-bottom: 0.4rem;
}

.pkg-card.is-premium .pkg-card__name {
  color: var(--color-white);
}

.pkg-card__meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.45rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  flex-wrap: wrap;
}

.pkg-card__rating {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-charcoal);
  font-weight: 600;
}

.pkg-card__rating svg {
  color: var(--color-gold);
}
.pkg-card.is-premium .pkg-card__rating {
  color: var(--color-white);
}

.pkg-card__divider {
  width: 3px;
  height: 3px;
  background: var(--color-text-muted);
  border-radius: 50%;
  opacity: 0.5;
  flex-shrink: 0;
}

.pkg-card__price {
  font-family: var(--font-body);
  font-weight: 700;
  color: var(--color-red);
  letter-spacing: -0.005em;
}

.pkg-card.is-premium .pkg-card__price {
  color: var(--color-gold);
}

.pkg-card__desc {
  font-family: var(--font-body);
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--color-text-muted);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pkg-card.is-premium .pkg-card__desc {
  color: rgba(255, 255, 255, 0.6);
}

.pkg-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  align-self: flex-start;
  padding: 0.45rem 0.85rem;
  background: var(--color-red);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  white-space: nowrap;
  transition: background-color var(--transition);
}

.pkg-card:hover .pkg-card__cta {
  background: var(--color-red-dark);
}
.pkg-card:hover .pkg-card__cta svg {
  transform: translateX(3px);
}
.pkg-card__cta svg {
  transition: transform var(--transition);
}

.pkg-card.is-premium .pkg-card__cta {
  background: var(--color-gold);
  color: var(--color-charcoal);
}

.pkg-card.is-premium:hover .pkg-card__cta {
  background: #d9bc78;
}

/* ===================== DETAIL VIEW ===================== */
.detail-section {
  padding-block: clamp(1rem, 0.5rem + 1vw, 1.75rem) clamp(2rem, 1rem + 2vw, 3rem);
}

.detail-enter-active,
.detail-leave-active {
  transition:
    opacity 280ms ease,
    transform 320ms cubic-bezier(0.32, 0.72, 0, 1);
}
.detail-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.detail-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.detail-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.08);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-charcoal);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.back-btn:hover {
  background: var(--color-charcoal);
  color: var(--color-white);
  border-color: var(--color-charcoal);
  transform: translateX(-2px);
}

.back-btn svg {
  transition: transform var(--transition);
}
.back-btn:hover svg {
  transform: translateX(-2px);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  flex-wrap: wrap;
}

.breadcrumb__link {
  color: var(--color-text-muted);
  font-weight: 500;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.breadcrumb__link:hover {
  color: var(--color-red);
  text-decoration: underline;
}
.breadcrumb__sep {
  color: var(--color-text-muted);
  opacity: 0.6;
}
.breadcrumb__current {
  color: var(--color-charcoal);
  font-weight: 600;
}

.detail-head {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1.4rem;
  border-bottom: 1px solid rgba(28, 19, 17, 0.08);
}

.detail-head__main {
  min-width: 0;
}

.detail-head__tagline {
  display: block;
  font-family: var(--font-body);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-red);
  margin-bottom: 0.5rem;
}

.detail-section.is-premium .detail-head__tagline {
  color: #8a6a1a;
}

.detail-head__title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.7rem, 1.3rem + 1.8vw, 2.5rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-variation-settings: 'opsz' 144;
  color: var(--color-charcoal);
  margin-bottom: 0.55rem;
}

.detail-head__desc {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--color-text-muted);
  max-width: 56ch;
}

.detail-head__price-tag {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  padding: 0.85rem 1.2rem;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.08);
  border-radius: var(--radius-md);
  text-align: right;
}

.detail-section.is-premium .detail-head__price-tag {
  background: linear-gradient(135deg, #1c1311 0%, #2a1f1c 100%);
  border-color: rgba(201, 169, 97, 0.3);
  color: var(--color-white);
}

.detail-head__price-label {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.detail-section.is-premium .detail-head__price-label {
  color: rgba(255, 255, 255, 0.55);
}

.detail-head__price-value {
  font-family: var(--font-body);
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-red);
  line-height: 1;
}

.detail-section.is-premium .detail-head__price-value {
  color: var(--color-gold);
}

.detail-head__price-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.detail-head__price-meta svg {
  color: var(--color-gold);
}

.detail-section.is-premium .detail-head__price-meta {
  color: rgba(255, 255, 255, 0.55);
}

.detail-form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.form-card {
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.06);
  border-radius: var(--radius-lg);
  padding: clamp(1.1rem, 0.85rem + 0.7vw, 1.6rem);
}

.detail-section.is-premium .form-card {
  background: linear-gradient(180deg, #1a1411 0%, #0f0a09 100%);
  border-color: rgba(201, 169, 97, 0.18);
  color: rgba(255, 255, 255, 0.85);
}

.form-card__head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.1rem;
}

.form-card__step {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  background: var(--color-cream);
  color: var(--color-red);
  font-family: var(--font-body);
  font-size: 0.76rem;
  font-weight: 800;
  border-radius: 50%;
}

.detail-section.is-premium .form-card__step {
  background: rgba(201, 169, 97, 0.15);
  color: var(--color-gold);
}

.form-card__title {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--color-charcoal);
  margin-bottom: 0.2rem;
}

.detail-section.is-premium .form-card__title {
  color: var(--color-white);
}

.form-card__sub {
  font-family: var(--font-body);
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--color-text-muted);
  margin: 0;
}

.detail-section.is-premium .form-card__sub {
  color: rgba(255, 255, 255, 0.55);
}

.fixed-items {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem 0.75rem;
  padding: 0.85rem 1rem;
  background: var(--color-cream);
  border-radius: var(--radius-md);
  margin: 0;
}

.detail-section.is-premium .fixed-items {
  background: rgba(201, 169, 97, 0.08);
  border: 1px solid rgba(201, 169, 97, 0.15);
}

.fixed-items__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-charcoal);
  line-height: 1.3;
}

.detail-section.is-premium .fixed-items__item {
  color: rgba(255, 255, 255, 0.92);
}

.fixed-items__check {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-red);
  color: var(--color-white);
}

.detail-section.is-premium .fixed-items__check {
  background: var(--color-gold);
  color: var(--color-charcoal);
}

.custom-cta {
  margin-top: 0.75rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.05) 100%);
  border: 1px dashed rgba(201, 169, 97, 0.5);
  border-radius: var(--radius-md);
  color: var(--color-gold);
  font-family: var(--font-body);
  cursor: pointer;
  transition: all var(--transition);
  text-align: left;
}

.custom-cta:hover {
  background: linear-gradient(135deg, rgba(201, 169, 97, 0.22) 0%, rgba(201, 169, 97, 0.1) 100%);
  border-color: var(--color-gold);
  transform: translateY(-1px);
}

.custom-cta__icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  background: rgba(201, 169, 97, 0.18);
  border-radius: 50%;
  font-size: 1rem;
}

.custom-cta__text {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
  min-width: 0;
}

.custom-cta__title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-gold);
  letter-spacing: -0.005em;
}

.custom-cta__sub {
  font-size: 0.74rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}

.qty-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.qty-row__hint {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.detail-section.is-premium .qty-row__hint {
  color: rgba(255, 255, 255, 0.5);
}

.stepper {
  display: inline-flex;
  align-items: center;
  background: var(--color-cream);
  border-radius: var(--radius-full);
  padding: 0.22rem;
  width: fit-content;
}

.detail-section.is-premium .stepper {
  background: rgba(255, 255, 255, 0.08);
}

.stepper__btn {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-family: var(--font-body);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-charcoal);
  transition: background-color var(--transition-fast);
}

.detail-section.is-premium .stepper__btn {
  color: var(--color-white);
}
.stepper__btn:hover {
  background: var(--color-white);
}
.detail-section.is-premium .stepper__btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.stepper__btn--sm {
  width: 34px;
  height: 34px;
  font-size: 1.05rem;
}

.stepper__val {
  min-width: 56px;
  text-align: center;
  font-family: var(--font-body);
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.01em;
  color: var(--color-charcoal);
}

.detail-section.is-premium .stepper__val {
  color: var(--color-white);
}
.stepper__val--sm {
  min-width: 32px;
  font-size: 0.88rem;
}

.packaging-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
}

.pkg-opt {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem;
  background: var(--color-cream);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition);
  text-align: left;
  font: inherit;
  color: inherit;
}

.detail-section.is-premium .pkg-opt {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.85);
}

.pkg-opt:hover {
  transform: translateY(-2px);
}
.pkg-opt.is-active {
  border-color: var(--color-red);
  background: var(--color-white);
}

.detail-section.is-premium .pkg-opt.is-active {
  border-color: var(--color-gold);
  background: rgba(201, 169, 97, 0.1);
}

.pkg-opt__img {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.pkg-opt__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pkg-opt__check {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-red);
  color: var(--color-white);
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity var(--transition-fast),
    transform var(--transition);
}

.detail-section.is-premium .pkg-opt__check {
  background: var(--color-gold);
  color: var(--color-charcoal);
}

.pkg-opt.is-active .pkg-opt__check {
  opacity: 1;
  transform: scale(1);
}

.pkg-opt__name {
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.005em;
}

.pkg-opt__desc {
  font-family: var(--font-body);
  font-size: 0.68rem;
  color: var(--color-text-muted);
  line-height: 1.3;
}

.detail-section.is-premium .pkg-opt__desc {
  color: rgba(255, 255, 255, 0.5);
}

.textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  background: var(--color-cream);
  border: 1px solid rgba(28, 19, 17, 0.08);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.5;
  resize: vertical;
  transition:
    border-color var(--transition-fast),
    background-color var(--transition-fast);
}

.detail-section.is-premium .textarea {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-white);
  border-color: rgba(255, 255, 255, 0.1);
}

.detail-section.is-premium .textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.textarea:focus {
  outline: none;
  border-color: var(--color-red);
  background: var(--color-white);
}

.detail-section.is-premium .textarea:focus {
  border-color: var(--color-gold);
  background: rgba(255, 255, 255, 0.08);
}

.form-card--summary {
  background: linear-gradient(180deg, var(--color-white) 0%, var(--color-cream) 100%);
}

.detail-section.is-premium .form-card--summary {
  background: linear-gradient(180deg, #1f1815 0%, #0f0a09 100%);
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  padding: 1.1rem;
  background: var(--color-white);
  border: 1px dashed rgba(28, 19, 17, 0.12);
  border-radius: var(--radius-md);
}

.detail-section.is-premium .summary {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(201, 169, 97, 0.3);
}

.summary__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.85rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
}

.summary__label {
  color: var(--color-text-muted);
  font-weight: 500;
}
.detail-section.is-premium .summary__label {
  color: rgba(255, 255, 255, 0.55);
}

.summary__value {
  color: var(--color-charcoal);
  font-weight: 700;
  text-align: right;
}

.detail-section.is-premium .summary__value {
  color: var(--color-white);
}

.summary__value--warn {
  color: #c97300;
  font-style: italic;
  font-weight: 600;
}

.summary__divider {
  height: 1px;
  background: rgba(28, 19, 17, 0.1);
  margin-block: 0.25rem;
}

.detail-section.is-premium .summary__divider {
  background: rgba(255, 255, 255, 0.1);
}

.summary__row--total .summary__label {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-charcoal);
}

.detail-section.is-premium .summary__row--total .summary__label {
  color: var(--color-white);
}

.summary__row--total .summary__value {
  font-family: var(--font-body);
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-red);
}

.detail-section.is-premium .summary__row--total .summary__value {
  color: var(--color-gold);
}

.big-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  padding: 1.05rem 1.5rem;
  background: #25d366;
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 0.98rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  cursor: pointer;
  box-shadow: 0 10px 28px -8px rgba(37, 211, 102, 0.5);
  transition:
    transform var(--transition),
    background-color var(--transition);
  min-height: 54px;
}

.big-cta:hover {
  background: #1eb358;
  transform: translateY(-2px);
}

.big-cta__hint {
  margin-top: 0.85rem;
  margin-bottom: 0;
  text-align: center;
  font-family: var(--font-body);
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.big-cta__hint strong {
  color: var(--color-charcoal);
  font-weight: 700;
}

.detail-section.is-premium .big-cta__hint {
  color: rgba(255, 255, 255, 0.5);
}
.detail-section.is-premium .big-cta__hint strong {
  color: var(--color-white);
}

/* ===================== CUSTOM SECTION ===================== */
.custom-section {
  padding-bottom: 2.5rem;
  padding-top: 0.5rem;
}

.custom-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: linear-gradient(135deg, #1c1311 0%, #2a1f1c 100%);
  border: 1px solid rgba(201, 169, 97, 0.3);
  border-radius: var(--radius-md);
  color: var(--color-white);
  margin-bottom: 1.25rem;
}

.custom-banner__icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  background: rgba(201, 169, 97, 0.18);
  border-radius: 50%;
  font-size: 1rem;
}

.custom-banner__text {
  flex: 1;
  font-family: var(--font-body);
  font-size: 0.82rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.85);
}

.custom-banner__text strong {
  color: var(--color-gold);
  font-weight: 700;
}

.custom-banner__reset {
  flex-shrink: 0;
  padding: 0.4rem 0.85rem;
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 0.76rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: background var(--transition-fast);
}

.custom-banner__reset:hover {
  background: rgba(255, 255, 255, 0.16);
}

.custom-intro {
  margin-bottom: 1.5rem;
  max-width: 56ch;
}

.custom-intro__title {
  font-family: var(--font-body);
  font-weight: 800;
  font-size: clamp(1.4rem, 1.1rem + 1.2vw, 1.85rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.custom-intro__lead {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.cat-filter {
  display: flex;
  gap: 0.45rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1.25rem;
  scrollbar-width: none;
  margin-inline: calc(var(--container-padding) * -1);
  padding-inline: var(--container-padding);
}

.cat-filter::-webkit-scrollbar {
  display: none;
}

.cat-chip {
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.08);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.cat-chip:hover {
  border-color: var(--color-red);
  color: var(--color-red);
}

.cat-chip.is-active {
  background: var(--color-charcoal);
  color: var(--color-white);
  border-color: var(--color-charcoal);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.85rem;
}

.menu-card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.06);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition:
    transform var(--transition),
    box-shadow var(--transition),
    border-color var(--transition);
}

.menu-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px -12px rgba(28, 19, 17, 0.12);
}

.menu-card.is-active {
  border-color: rgba(178, 58, 58, 0.4);
}

.menu-card__media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.menu-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.32, 0.72, 0, 1);
}

.menu-card:hover .menu-card__media img {
  transform: scale(1.06);
}

.menu-card__badge {
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
  padding: 0.2rem 0.5rem;
  background: var(--color-red);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 10px rgba(178, 58, 58, 0.35);
}

.menu-card__count {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  min-width: 26px;
  height: 26px;
  padding: 0 0.45rem;
  display: grid;
  place-items: center;
  background: var(--color-red);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 10px rgba(178, 58, 58, 0.4);
}

.menu-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.75rem 0.85rem 0.85rem;
}

.menu-card__cat {
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.menu-card__name {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--color-charcoal);
  margin: 0;
}

.menu-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
}

.menu-card__rating {
  display: inline-flex;
  align-items: center;
  gap: 0.22rem;
  font-family: var(--font-body);
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--color-charcoal);
}

.menu-card__rating svg {
  color: var(--color-gold);
}

.menu-card__price {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: -0.005em;
  color: var(--color-red);
}

.menu-card__add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  padding: 0.55rem;
  background: var(--color-cream);
  color: var(--color-charcoal);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
}

.menu-card__add:hover {
  background: var(--color-red);
  color: var(--color-white);
}

.menu-card__stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-cream);
  border-radius: var(--radius-sm);
  padding: 0.18rem;
}

.custom-submit {
  margin-top: 1.75rem;
  padding: 1.25rem;
  background: var(--color-white);
  border: 1px solid rgba(28, 19, 17, 0.08);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.custom-submit__info {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.85rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px dashed rgba(28, 19, 17, 0.12);
}

.custom-submit__label {
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

.custom-submit__total {
  font-family: var(--font-body);
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-red);
}

.big-cta--custom {
  margin: 0;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 960px) {
  .detail-head {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .detail-head__price-tag {
    align-items: flex-start;
    text-align: left;
    width: fit-content;
  }
}

@media (max-width: 720px) {
  /* Mode switcher: full-width 2 columns, padding lebih ringkas */
  .mode-switch {
    width: 100%;
  }
  .mode-switch__btn {
    padding: 0.7rem 0.5rem;
    font-size: 0.88rem;
  }

  /* Paket card: image lebih kecil supaya info dapat ruang */
  .pkg-card {
    gap: 0.75rem;
    padding: 0.85rem;
  }
  .pkg-card__media {
    width: 100px;
  }

  .pkg-card__name {
    font-size: 1.05rem;
  }
  .pkg-card__desc {
    font-size: 0.78rem;
  }
  .pkg-card__cta {
    padding: 0.4rem 0.75rem;
    font-size: 0.74rem;
  }

  .detail-section {
    padding-block: 1rem 2rem;
  }
  .detail-head {
    padding-bottom: 1rem;
    margin-bottom: 1.25rem;
  }

  .fixed-items {
    grid-template-columns: 1fr;
    padding: 0.75rem 0.9rem;
  }

  .packaging-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  .pkg-opt__name {
    font-size: 0.85rem;
  }

  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.65rem;
  }
  .menu-card__body {
    padding: 0.6rem 0.7rem 0.7rem;
  }
  .menu-card__name {
    font-size: 0.88rem;
  }
  .menu-card__price {
    font-size: 0.85rem;
  }

  .custom-banner {
    flex-wrap: wrap;
  }
  .custom-banner__text {
    flex-basis: 100%;
    order: 3;
  }

  .custom-submit__info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }
}

@media (max-width: 480px) {
  .mode-switch__btn {
    padding: 0.65rem 0.4rem;
    font-size: 0.84rem;
  }

  .pkg-card {
    padding: 0.75rem;
    gap: 0.65rem;
  }
  .pkg-card__media {
    width: 88px;
  }
  .pkg-card__tagline {
    font-size: 0.6rem;
  }
  .pkg-card__name {
    font-size: 0.98rem;
    margin-bottom: 0.3rem;
  }
  .pkg-card__meta {
    font-size: 0.75rem;
    gap: 0.45rem;
    margin-bottom: 0.3rem;
  }
  .pkg-card__desc {
    font-size: 0.74rem;
  }
  .pkg-card__cta {
    padding: 0.35rem 0.7rem;
    font-size: 0.7rem;
  }
  .pkg-card__cta svg {
    width: 12px;
    height: 12px;
  }

  .detail-nav {
    gap: 0.7rem;
  }
  .breadcrumb {
    font-size: 0.74rem;
  }
  .back-btn {
    padding: 0.42rem 0.8rem;
    font-size: 0.76rem;
  }

  .detail-head__title {
    font-size: 1.6rem;
  }
  .detail-head__desc {
    font-size: 0.85rem;
  }
  .detail-head__price-tag {
    padding: 0.7rem 1rem;
  }
  .detail-head__price-value {
    font-size: 1.2rem;
  }

  .form-card {
    padding: 1rem 0.95rem;
  }
  .form-card__title {
    font-size: 0.98rem;
  }
  .form-card__sub {
    font-size: 0.76rem;
  }

  .stepper__btn {
    width: 38px;
    height: 38px;
    font-size: 1.1rem;
  }
  .stepper__val {
    min-width: 50px;
    font-size: 1rem;
  }

  .summary {
    padding: 0.95rem;
  }
  .summary__row--total .summary__value {
    font-size: 1.15rem;
  }

  .big-cta {
    padding: 0.95rem 1.25rem;
    font-size: 0.92rem;
    min-height: 50px;
  }
  .big-cta__hint {
    font-size: 0.74rem;
  }

  .menu-card__body {
    gap: 0.3rem;
    padding: 0.55rem 0.65rem 0.65rem;
  }
  .menu-card__name {
    font-size: 0.84rem;
  }
  .menu-card__price {
    font-size: 0.8rem;
  }
  .menu-card__add {
    padding: 0.5rem;
    font-size: 0.74rem;
  }
}
</style>
