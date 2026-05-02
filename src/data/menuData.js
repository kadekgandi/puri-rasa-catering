// ============ PAKET KATERING ============
export const packages = [
  {
    id: 'standar',
    name: 'Paket Standar',
    tagline: 'Paket harian terjangkau',
    price: 10000,
    priceLabel: 'Rp10.000',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&q=80',
    rating: 4.8,
    badge: 'Best Seller',
    desc: 'Pilihan klasik untuk kebutuhan harian, meeting kantor, dan acara kecil. Komposisi seimbang dengan rasa rumahan otentik.',
    minOrder: 20,
    type: 'fixed',
    fixedItems: ['Nasi Putih', 'Be Sisit', 'Sayur Tumis', 'Tempe', 'Ayam Kecap'],
  },
  {
    id: 'plus',
    name: 'Paket Plus',
    tagline: 'Lebih lengkap & memuaskan',
    price: 15000,
    priceLabel: 'Rp15.000',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&q=80',
    rating: 4.9,
    badge: 'Top Rated',
    desc: 'Komposisi Paket Standar plus tambahan sate—pilihan favorit untuk acara keluarga, syukuran, dan ulang tahun.',
    minOrder: 20,
    type: 'fixed',
    fixedItems: ['Nasi Putih', 'Be Sisit', 'Sayur Tumis', 'Tempe', 'Ayam Kecap', 'Sate'],
  },
  {
    id: 'bisnis',
    name: 'Paket Bisnis',
    tagline: 'Premium · Bisa di-custom',
    price: 25000,
    priceLabel: 'Mulai Rp25.000',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&q=80',
    rating: 4.9,
    badge: 'Top Rated',
    desc: 'Konfigurasi VIP dengan 10 isi lengkap. Pas untuk meeting eksekutif, jamuan klien, atau gala dinner. Bisa di-custom isinya sesuai selera.',
    minOrder: 10,
    isPremium: true,
    type: 'customizable',
    fixedItems: [
      'Nasi Putih',
      'Ayam Suir',
      'Sambel Ati Goreng',
      'Sate',
      'Sayur Oseng-Oseng',
      'Mie Goreng',
      'Urab',
      'Buah-buahan (1 biji)',
      'Kerupuk',
      'Air Gelas',
    ],
    // ID item dari menuItems yang akan di-preload ke Custom Box
    baseItemIds: [1, 6, 7, 8, 12, 3, 13, 16, 15, 17],
  },
]

// ============ OPSI PACKAGING ============
export const packagingOptions = [
  {
    id: 'kertas',
    name: 'Kertas Nasi Standar',
    desc: 'Klasik & ramah lingkungan',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&auto=format&q=80',
  },
  {
    id: 'daun',
    name: 'Daun',
    desc: 'Aroma alami & tradisional',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&auto=format&q=80',
  },
  {
    id: 'kotak-standar',
    name: 'Kotak Nasi Standar',
    desc: 'Praktis & mudah dibawa',
    image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400&auto=format&q=80',
  },
  {
    id: 'besek-bali',
    name: 'Besek Bali',
    desc: 'Estetik anyaman tradisional',
    image: 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=400&auto=format&q=80',
  },
]

// ============ MENU SATUAN (untuk Build Your Own Box) ============
export const menuItems = [
  // KARBO
  {
    id: 1,
    name: 'Nasi Putih',
    price: 5000,
    category: 'Karbo',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&auto=format&q=80',
    rating: 4.9,
    top: true,
  },
  {
    id: 2,
    name: 'Nasi Kuning',
    price: 7000,
    category: 'Karbo',
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&auto=format&q=80',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Mie Goreng',
    price: 10000,
    category: 'Karbo',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&auto=format&q=80',
    rating: 4.7,
    top: true,
  },

  // LAUK
  {
    id: 4,
    name: 'Be Sisit',
    price: 12000,
    category: 'Lauk',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&auto=format&q=80',
    rating: 4.8,
    top: true,
  },
  {
    id: 5,
    name: 'Ayam Kecap',
    price: 14000,
    category: 'Lauk',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&auto=format&q=80',
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Ayam Suir',
    price: 13000,
    category: 'Lauk',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&auto=format&q=80',
    rating: 4.9,
    top: true,
  },
  {
    id: 7,
    name: 'Sambel Ati Goreng',
    price: 12000,
    category: 'Lauk',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400&auto=format&q=80',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Sate Lilit',
    price: 12000,
    category: 'Lauk',
    image: 'https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=400&auto=format&q=80',
    rating: 5.0,
    top: true,
  },
  {
    id: 9,
    name: 'Tempe Goreng',
    price: 5000,
    category: 'Lauk',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&auto=format&q=80',
    rating: 4.6,
  },
  {
    id: 10,
    name: 'Tahu Bacem',
    price: 5000,
    category: 'Lauk',
    image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?w=400&auto=format&q=80',
    rating: 4.5,
  },

  // SAYUR
  {
    id: 11,
    name: 'Sayur Tumis',
    price: 7000,
    category: 'Sayur',
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&auto=format&q=80',
    rating: 4.6,
  },
  {
    id: 12,
    name: 'Oseng-Oseng',
    price: 7000,
    category: 'Sayur',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&q=80',
    rating: 4.7,
  },
  {
    id: 13,
    name: 'Urab Bali',
    price: 8000,
    category: 'Sayur',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&auto=format&q=80',
    rating: 4.8,
    top: true,
  },

  // SAMBAL
  {
    id: 14,
    name: 'Sambal Matah',
    price: 4000,
    category: 'Sambal',
    image: 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=400&auto=format&q=80',
    rating: 4.9,
    top: true,
  },

  // PELENGKAP
  {
    id: 15,
    name: 'Kerupuk',
    price: 2000,
    category: 'Pelengkap',
    image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400&auto=format&q=80',
    rating: 4.5,
  },

  // BUAH
  {
    id: 16,
    name: 'Buah Potong',
    price: 5000,
    category: 'Buah',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&auto=format&q=80',
    rating: 4.7,
  },

  // MINUM
  {
    id: 17,
    name: 'Air Gelas',
    price: 1500,
    category: 'Minum',
    image: 'https://images.unsplash.com/photo-1564725877947-0db75e0c2cd2?w=400&auto=format&q=80',
    rating: 4.5,
  },
]

// Kategori unik untuk filter
export const menuCategories = [...new Set(menuItems.map((m) => m.category))]
