// ==========================================================================
// PORTFOLIO LOGIC & DYNAMIC RENDERER
// ==========================================================================

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio(PORTFOLIO_ITEMS);
  initWhatsAppLinks();
});

function renderPortfolio(items) {
  const container = document.getElementById('portfolioGrid');
  if (!container) return;

  const filteredItems = currentFilter === 'all' 
    ? items 
    : items.filter(item => item.category === currentFilter);

  if (filteredItems.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-gray-500">
        <i class="ri-movie-2-line text-5xl mb-3 block text-gray-600"></i>
        <p class="text-base font-medium">No projects found in this category yet.</p>
        <p class="text-xs text-gray-600 mt-1">Check back soon or request custom samples on WhatsApp.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredItems.map(item => `
    <div class="portfolio-card bg-brand-card rounded-2xl overflow-hidden border border-brand-border cursor-pointer group flex flex-col justify-between" onclick="openModal(${item.id})">
      <div>
        <!-- Thumbnail Media Box -->
        <div class="relative ${item.aspectRatio === 'vertical' ? 'aspect-[4/5] sm:aspect-video' : 'aspect-video'} w-full overflow-hidden bg-brand-darker">
          <img src="${item.thumbnail || item.imageUrl}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-black/45 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div class="w-12 h-12 rounded-full bg-emerald-500/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <i class="${item.type === 'image' ? 'ri-zoom-in-line' : 'ri-play-fill'} text-xl"></i>
            </div>
          </div>
          <!-- Category Badge -->
          <span class="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/10">
            ${item.categoryLabel}
          </span>
          ${item.aspectRatio === 'vertical' ? `
            <span class="absolute top-3 right-3 bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md">
              9:16 Reel
            </span>
          ` : ''}
        </div>

        <!-- Content Details -->
        <div class="p-5">
          <h3 class="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
            ${item.title}
          </h3>
          <p class="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
            ${item.description}
          </p>
        </div>
      </div>

      <!-- Tags & Action Bar -->
      <div class="px-5 pb-5 pt-3 border-t border-brand-border/50 flex items-center justify-between">
        <div class="flex flex-wrap gap-1.5">
          ${item.tags.slice(0, 2).map(tag => `
            <span class="text-[11px] font-medium text-gray-400 bg-brand-dark px-2 py-0.5 rounded-md border border-brand-border/60">
              #${tag}
            </span>
          `).join('')}
        </div>
        <span class="text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
          View Work <i class="ri-arrow-right-s-line"></i>
        </span>
      </div>
    </div>
  `).join('');
}

// Category filter tabs switch
function filterCategory(category) {
  currentFilter = category;
  
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.classList.remove('active', 'bg-emerald-500', 'text-black');
    tab.classList.add('bg-brand-card', 'text-gray-300', 'border', 'border-brand-border');
  });

  const activeBtn = event?.currentTarget;
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-emerald-500', 'text-black');
    activeBtn.classList.remove('bg-brand-card', 'text-gray-300', 'border-brand-border');
  }

  renderPortfolio(PORTFOLIO_ITEMS);
}

// Open video/media preview modal with strict viewport constraints
function openModal(id) {
  const item = PORTFOLIO_ITEMS.find(p => p.id === id);
  if (!item) return;

  const modal = document.getElementById('videoModal');
  const modalBox = document.getElementById('modalBox');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const mediaContainer = document.getElementById('modalMediaContainer');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
  const modalDirectPlayBtn = document.getElementById('modalDirectPlayBtn');
  const modalDirectPlayText = document.getElementById('modalDirectPlayText');

  modalTitle.textContent = item.title;
  modalDesc.textContent = item.description;

  // Prevent background page from scrolling
  document.body.style.overflow = 'hidden';

  // Extract pure YouTube video ID
  let videoId = '';
  if (item.videoUrl) {
    const match = item.videoUrl.match(/(?:embed\/|v=|shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    videoId = match ? match[1] : '';
  }

  // Sizing based on aspect ratio with mobile-responsive minimum height
  if (item.aspectRatio === 'vertical') {
    modalBox.className = 'bg-brand-card border border-brand-border rounded-2xl w-full max-w-[360px] max-h-[92vh] overflow-hidden relative shadow-2xl z-10 flex flex-col transition-all';
    mediaContainer.className = 'relative w-full aspect-[9/16] min-h-[360px] max-h-[64vh] bg-black flex items-center justify-center overflow-hidden';
  } else {
    modalBox.className = 'bg-brand-card border border-brand-border rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden relative shadow-2xl z-10 flex flex-col transition-all';
    mediaContainer.className = 'relative w-full aspect-video min-h-[230px] sm:min-h-[380px] bg-black flex items-center justify-center overflow-hidden';
  }

  // Render Media: Google Drive Preview OR MP4 Video OR YouTube Embed OR Image
  if (item.videoUrl && item.videoUrl.includes('drive.google.com')) {
    mediaContainer.innerHTML = `
      <iframe 
        src="${item.videoUrl}" 
        title="${item.title}" 
        class="w-full h-full min-h-[230px] sm:min-h-[380px] border-0 rounded-lg" 
        allow="autoplay; fullscreen" 
        allowfullscreen>
      </iframe>
    `;
    if (modalDirectPlayBtn) {
      modalDirectPlayBtn.href = item.videoUrl.replace('/preview', '/view');
      if (modalDirectPlayText) modalDirectPlayText.textContent = 'Watch Full HD';
      modalDirectPlayBtn.classList.remove('hidden');
    }
  } else if (item.videoUrl && (item.videoUrl.endsWith('.mp4') || item.videoUrl.endsWith('.webm') || item.videoType === 'mp4')) {
    mediaContainer.innerHTML = `
      <video src="${item.videoUrl}" controls autoplay playsinline class="w-full h-full object-contain bg-black rounded-lg"></video>
    `;
    if (modalDirectPlayBtn) modalDirectPlayBtn.classList.add('hidden');
  } else if (videoId) {
    mediaContainer.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1" 
        title="${item.title}" 
        class="w-full h-full border-0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
    `;
    if (modalDirectPlayBtn) {
      modalDirectPlayBtn.href = item.aspectRatio === 'vertical' 
        ? `https://youtube.com/shorts/${videoId}` 
        : `https://www.youtube.com/watch?v=${videoId}`;
      if (modalDirectPlayText) modalDirectPlayText.textContent = 'Watch on YouTube';
      modalDirectPlayBtn.classList.remove('hidden');
    }
  } else if (item.imageUrl || item.thumbnail) {
    mediaContainer.innerHTML = `
      <img src="${item.imageUrl || item.thumbnail}" alt="${item.title}" class="w-full h-full object-contain">
    `;
    if (modalDirectPlayBtn) modalDirectPlayBtn.classList.add('hidden');
  }

  // Pre-fill WhatsApp inquiry message
  const inquiryMsg = encodeURIComponent(`Hello Imran, I saw "${item.title}" on your portfolio and would like to discuss a similar project.`);
  modalWhatsAppBtn.href = `https://wa.me/${PORTFOLIO_CONFIG.whatsappNumber}?text=${inquiryMsg}`;

  modal.classList.remove('hidden');
}

// Close Modal function (Unlocks body scroll & cleans iframe)
function closeModal() {
  const modal = document.getElementById('videoModal');
  const mediaContainer = document.getElementById('modalMediaContainer');
  if (mediaContainer) mediaContainer.innerHTML = ''; // Stop video audio
  if (modal) modal.classList.add('hidden');
  
  // Re-enable background scrolling
  document.body.style.overflow = '';
}

// Keyboard ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function initWhatsAppLinks() {
  console.log("Portfolio ready for: " + PORTFOLIO_CONFIG.name);
}
