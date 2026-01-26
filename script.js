// Minimal demo JS: renders products, search, carousel, modal, simple filters

const productsEl = document.getElementById('products')
const searchInput = document.getElementById('searchInput')
const resultsCount = document.getElementById('resultsCount')
const sortSelect = document.getElementById('sortSelect')
const modal = document.getElementById('productModal')
const modalBody = document.getElementById('modalBody')
const modalClose = document.getElementById('modalClose')

const productsData = [
  { id:1, title:'Striped Casual T-Shirt', brand:'BrandA', price:599, img:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=60&auto=format&fit=crop', rating:4.2 },
  { id:2, title:'Slim Fit Jeans', brand:'BrandB', price:1399, img:'https://images.unsplash.com/photo-1520975698513-2b8ba8f6f6b9?w=800&q=60&auto=format&fit=crop', rating:4.5 },
  { id:3, title:'Running Sneakers', brand:'BrandC', price:2499, img:'https://images.unsplash.com/photo-1600180758894-0b4b7f7b7bba?w=800&q=60&auto=format&fit=crop', rating:4.6 },
  { id:4, title:'Casual Shirt', brand:'BrandA', price:899, img:'https://images.unsplash.com/photo-1520975913787-3d09f95b3d4f?w=800&q=60&auto=format&fit=crop', rating:4.1 },
  { id:5, title:'Denim Jacket', brand:'BrandB', price:2999, img:'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=60&auto=format&fit=crop', rating:4.7 },
  { id:6, title:'Sport Shorts', brand:'BrandC', price:399, img:'https://images.unsplash.com/photo-1593032465175-c877d25ecb43?w=800&q=60&auto=format&fit=crop', rating:4.0 },
  { id:7, title:'Classic Watch', brand:'BrandA', price:4999, img:'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&q=60&auto=format&fit=crop', rating:4.8 },
  { id:8, title:'Sunglasses', brand:'BrandB', price:1299, img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=60&auto=format&fit=crop', rating:4.3 }
]

let state = {
  products: productsData.slice(),
  query: '',
  sort: 'popular'
}

function renderProducts(){
  let list = state.products.filter(p => p.title.toLowerCase().includes(state.query.toLowerCase()))

  if(state.sort === 'low') list = list.slice().sort((a,b)=>a.price-b.price)
  if(state.sort === 'high') list = list.slice().sort((a,b)=>b.price-a.price)
  if(state.sort === 'new') list = list.slice().reverse()

  productsEl.innerHTML = list.map(p => `
    <article class="card" data-id="${p.id}">
      <img src="${p.img}" alt="${escapeHtml(p.title)}" loading="lazy" />
      <div class="brand">${escapeHtml(p.brand)}</div>
      <div class="title">${escapeHtml(p.title)}</div>
      <div class="price">₹${p.price.toLocaleString()}</div>
      <div class="actions">
        <button class="btn" onclick="openModal(${p.id})">Quick view</button>
        <button class="btn primary" onclick="addToCart(${p.id})">Add</button>
      </div>
    </article>
  `).join('')

  resultsCount.textContent = `Showing ${list.length} product${list.length!==1?'s':''}`
}

function addToCart(id){
  alert('Added product ' + id + ' to bag (demo)')
}

function openModal(id){
  const p = productsData.find(x=>x.id===id)
  modalBody.innerHTML = `
    <div style="display:flex; gap:18px; flex-wrap:wrap">
      <img src="${p.img}" style="width:320px; border-radius:8px; object-fit:cover" alt="${escapeHtml(p.title)}" />
      <div style="flex:1; min-width:220px">
        <h2 style="margin-top:0">${escapeHtml(p.title)}</h2>
        <div style="color:var(--muted)">${escapeHtml(p.brand)}</div>
        <div style="margin:12px 0; font-weight:700; color:var(--accent)">₹${p.price.toLocaleString()}</div>
        <p>Rating: ${p.rating} ★</p>
        <p style="margin-top:12px; color:#444">Product description goes here. This is a demo quick view modal with product details, sizes and add to bag actions.</p>
        <div style="margin-top:16px; display:flex; gap:8px">
          <button class="btn primary" onclick="addToCart(${p.id})">Add to Bag</button>
          <button class="btn" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
  `
  modal.classList.remove('hidden')
  modal.setAttribute('aria-hidden','false')
}

function closeModal(){
  modal.classList.add('hidden')
  modal.setAttribute('aria-hidden','true')
}

// simple escaping
function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])) }

// search binding
searchInput.addEventListener('input', e => {
  state.query = e.target.value
  renderProducts()
})

// sort binding
sortSelect.addEventListener('change', e => {
  state.sort = e.target.value
  renderProducts()
})

// modal close
modalClose.addEventListener('click', closeModal)
modal.addEventListener('click', (e)=>{
  if(e.target === modal) closeModal()
})

// init
renderProducts()

// Carousel minimal behavior
const slides = document.querySelectorAll('.slide')
let current = 0
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

function showSlide(idx){
  slides.forEach((s,i)=> s.classList.toggle('active', i===idx))
  current = (idx+slides.length)%slides.length
}
prevBtn.addEventListener('click', ()=> showSlide(current-1))
nextBtn.addEventListener('click', ()=> showSlide(current+1))
setInterval(()=> showSlide(current+1), 6000)