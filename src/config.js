// Edit this file to change contact details, prices and products.
export const CFG = {
  // TO CONFIRM: three numbers appear on Shuvai's adverts. Put the real WhatsApp one here:
  // country code + number, no + or spaces.
  whatsapp: '263773045994',
  phoneDisplay: '+263 77 304 5994',
  address: 'Shop W6, Westgate Mall, Harare',
  email: 'shuvaigro25@gmail.com',
  instagram: 'shuvaiincorporated',
}
export const wa = (text) => `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(text)}`

// Showroom sets (what the 3D scene shows). Prices are Shuvai's advertised prices.
export const SETS = {
  rect: { label: 'Rectangular', name: 'Rectangular set', price: 1030, parts: ['Backlit rectangular LED mirror', 'Double floating marble vanity'] },
  oval: { label: 'Elliptical', name: 'Elliptical set', price: 500, parts: ['Elliptical LED mirror', 'Floating vanity'] },
}

export const PRODUCTS = [
  { id: 'rect-set', name: 'Complete rectangular set', price: 1030, img: '/img/rect-set.jpg', text: 'Backlit LED mirror with a double floating marble vanity.' },
  { id: 'oval-set', name: 'Complete elliptical set', price: 500, img: '/img/ell-set.jpg', text: 'Elliptical LED mirror with a floating vanity.' },
  { id: 'rect-mirror', name: 'Rectangular backlit LED mirror', price: 210, img: '/img/rect-mirror.jpg', text: 'Illuminated rectangular mirror.' },
  { id: 'rect-vanity', name: 'Double floating marble vanity', price: 830, img: '/img/rect-vanity.jpg', text: 'Wall-mounted, marble finish, two basins.' },
  { id: 'oval-mirror', name: 'Elliptical LED mirror', price: 170, img: '/img/ell-mirror.jpg', text: 'Soft halo-lit elliptical mirror.' },
  { id: 'oval-vanity', name: 'Floating vanity', price: 350, img: '/img/ell-vanity.jpg', text: 'Wall-mounted stone-finish vanity unit.' },
]
export const money = (n) => '$' + n.toLocaleString('en-US')
