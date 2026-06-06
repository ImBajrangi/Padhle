/* skillTadka - PDF Viewer Controller with PDF.js */

window.PDFReader = {
  // Active PDF variables
  pdfDoc: null,
  bookId: null,
  pdfData: null, // ArrayBuffer or URL string
  pageNum: 1,
  pageRendering: false,
  pageNumPending: null,
  scale: 1.0,
  rotation: 0,
  layoutMode: 'scroll', // 'scroll', 'single', 'dual'
  
  // View elements cache
  container: null,
  viewer: null,
  observer: null,
  
  // Track page heights for scroll positioning
  pagesMetadata: {},
  renderedPages: new Set(),
  
  // Initialize viewer listeners
  init() {
    this.container = document.getElementById('viewer-container');
    this.viewer = document.getElementById('pdf-viewer');
    
    this.bindEvents();
  },

  // Bind controls
  bindEvents() {
    // Page Navigation
    document.getElementById('prev-page').addEventListener('click', () => this.onPrevPage());
    document.getElementById('next-page').addEventListener('click', () => this.onNextPage());
    
    const pageNumInput = document.getElementById('page-num');
    pageNumInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const val = parseInt(pageNumInput.value);
        if (val > 0 && val <= this.pdfDoc.numPages) {
          this.navigateToPage(val);
        }
      }
    });

    // Zoom Controls
    document.getElementById('zoom-out').addEventListener('click', () => this.adjustZoom(-0.25));
    document.getElementById('zoom-in').addEventListener('click', () => this.adjustZoom(0.25));
    
    document.getElementById('zoom-select').addEventListener('change', (e) => {
      this.setZoom(e.target.value);
    });

    // Rotation Control
    document.getElementById('rotate-page').addEventListener('click', () => {
      this.rotation = (this.rotation + 90) % 360;
      this.rebuildViewer();
    });

    // Layout Modes
    document.getElementById('view-mode-scroll').addEventListener('click', () => this.setLayout('scroll'));
    document.getElementById('view-mode-single').addEventListener('click', () => this.setLayout('single'));
    document.getElementById('view-mode-dual').addEventListener('click', () => this.setLayout('dual'));

    // Sidebar Toggles
    const sidebar = document.getElementById('reader-sidebar');
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });

    // Sidebar Tab Switches
    const tabs = document.querySelectorAll('.sidebar-tabs .tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const activeTabPane = tab.dataset.tab;
        document.querySelectorAll('.sidebar-content .tab-pane').forEach(pane => {
          pane.classList.remove('active');
        });
        document.getElementById(`${activeTabPane}-tab`).classList.add('active');
      });
    });

    // Search Toggle
    const searchOverlay = document.getElementById('search-overlay');
    document.getElementById('search-toggle').addEventListener('click', () => {
      if (searchOverlay.style.display === 'none') {
        searchOverlay.style.display = 'block';
        document.getElementById('search-input').focus();
      } else {
        searchOverlay.style.display = 'none';
        this.clearSearchHighlights();
      }
    });

    document.getElementById('search-close').addEventListener('click', () => {
      searchOverlay.style.display = 'none';
      this.clearSearchHighlights();
    });

    // Fullscreen Toggle
    document.getElementById('fullscreen-toggle').addEventListener('click', () => this.toggleFullscreen());
    
    // Scroll event on container to update page number active index
    this.container.addEventListener('scroll', () => this.handleScrollTracker());
  },

  // Load book PDF data
  async loadBook(bookId) {
    this.bookId = bookId;
    this.showLoader();
    
    try {
      let docInit;
      
      if (bookId.startsWith('custom-')) {
        // Load custom book from IndexedDB
        const book = await App.getBook(bookId);
        if (!book) throw new Error('Book not found in database.');
        
        this.pdfData = book.file;
        docInit = { data: book.file.slice(0) }; // Slice to pass array buffer copy
        
        // Setup download link
        const blob = new Blob([book.file], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        document.getElementById('download-pdf').href = url;
        document.getElementById('download-pdf').download = `${book.name}.pdf`;
      } else {
        // Load default main book
        const path = 'pdfs/satsang-ke-bikhare-moti.pdf';
        this.pdfData = path;
        docInit = { url: path };
        
        document.getElementById('download-pdf').href = path;
        document.getElementById('download-pdf').download = 'satsang-ke-bikhare-moti.pdf';
      }

      // Load Document
      this.pdfDoc = await pdfjsLib.getDocument(docInit).promise;
      document.getElementById('page-count').textContent = this.pdfDoc.numPages;
      document.getElementById('document-title').textContent = bookId.startsWith('custom-') ? 
        (await App.getBook(bookId)).name : 'Satsang Ke Bikhare Moti';

      // Load Saved Progress
      const savedPage = await App.getProgress(bookId);
      this.pageNum = Math.min(Math.max(1, savedPage), this.pdfDoc.numPages);
      document.getElementById('page-num').value = this.pageNum;
      
      // Load outline and thumbnails sidebar
      this.loadOutline();
      this.loadThumbnails();
      
      // Render layout
      this.rebuildViewer();
      
    } catch (err) {
      console.error('Error loading PDF document:', err);
      alert('Could not render document. Check file format integrity.');
      window.location.hash = '';
    }
  },

  // Show/Hide page loaders
  showLoader() {
    this.viewer.innerHTML = `
      <div class="loading-overlay">
        <div class="spinner"></div>
        <div class="loading-text">Rendering skillTadka Canvas layers...</div>
      </div>
    `;
  },

  // Set reader theme/layout mode
  setLayout(mode) {
    this.layoutMode = mode;
    
    // Toggle active classes on toolbar buttons
    document.getElementById('view-mode-scroll').classList.toggle('active', mode === 'scroll');
    document.getElementById('view-mode-single').classList.toggle('active', mode === 'single');
    document.getElementById('view-mode-dual').classList.toggle('active', mode === 'dual');
    
    this.rebuildViewer();
  },

  // Set zoom scale
  setZoom(zoomVal) {
    if (zoomVal === 'auto') {
      this.scale = 1.0;
    } else if (zoomVal === 'page-width') {
      // Fit to viewer container width
      this.scale = 'width';
    } else if (zoomVal === 'page-fit') {
      // Fit to viewer container height
      this.scale = 'fit';
    } else {
      this.scale = parseFloat(zoomVal);
    }
    
    this.rebuildViewer();
  },

  // Zoom incremental adjust
  adjustZoom(delta) {
    const zoomSelect = document.getElementById('zoom-select');
    let currentScale = typeof this.scale === 'number' ? this.scale : 1.0;
    let newScale = Math.min(Math.max(0.5, currentScale + delta), 3.0);
    
    this.scale = newScale;
    zoomSelect.value = newScale.toFixed(2);
    
    this.rebuildViewer();
  },

  // Destroy components when exit
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.pdfDoc = null;
    this.renderedPages.clear();
    this.pagesMetadata = {};
  },

  // Navigate to target page
  navigateToPage(pageNum) {
    this.pageNum = pageNum;
    document.getElementById('page-num').value = pageNum;
    
    App.saveProgress(this.bookId, pageNum);

    if (this.layoutMode === 'scroll') {
      const pageEl = document.getElementById(`page-wrapper-${pageNum}`);
      if (pageEl) {
        pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      this.renderPagedLayout();
    }
    
    // Update active thumbnail borders
    document.querySelectorAll('.thumbnail-item').forEach(item => {
      item.classList.toggle('active', parseInt(item.dataset.page) === pageNum);
    });
  },

  // Next Page Handler
  onNextPage() {
    if (!this.pdfDoc) return;
    
    let step = this.layoutMode === 'dual' ? 2 : 1;
    if (this.pageNum + step <= this.pdfDoc.numPages) {
      this.navigateToPage(this.pageNum + step);
    } else if (this.pageNum < this.pdfDoc.numPages) {
      this.navigateToPage(this.pdfDoc.numPages);
    }
  },

  // Prev Page Handler
  onPrevPage() {
    let step = this.layoutMode === 'dual' ? 2 : 1;
    if (this.pageNum - step >= 1) {
      this.navigateToPage(this.pageNum - step);
    } else if (this.pageNum > 1) {
      this.navigateToPage(1);
    }
  },

  // Toggle Fullscreen Mode
  toggleFullscreen() {
    const readerEl = document.getElementById('reader-view');
    if (!document.fullscreenElement) {
      readerEl.requestFullscreen().catch(err => {
        alert(`Fullscreen error: ${err.message}`);
      });
      document.getElementById('fullscreen-toggle').innerHTML = '<i class="fa-solid fa-compress"></i>';
    } else {
      document.exitFullscreen();
      document.getElementById('fullscreen-toggle').innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
  },

  // Re-build all rendering layers
  rebuildViewer() {
    this.renderedPages.clear();
    this.viewer.innerHTML = '';
    
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.layoutMode === 'scroll') {
      this.viewer.className = 'pdf-viewer';
      this.renderScrollLayout();
    } else if (this.layoutMode === 'single') {
      this.viewer.className = 'pdf-viewer';
      this.renderPagedLayout();
    } else if (this.layoutMode === 'dual') {
      this.viewer.className = 'pdf-viewer dual-page';
      this.renderPagedLayout();
    }
  },

  // --- Scroll Layout Rendering ---
  async renderScrollLayout() {
    this.showLoader();
    
    try {
      const numPages = this.pdfDoc.numPages;
      this.viewer.innerHTML = ''; // Clear loader spinner

      // Create lazy observer setup
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const pageNum = parseInt(entry.target.dataset.pageNumber);
          if (entry.isIntersecting) {
            // Lazy render canvas if visible
            this.renderPageCanvas(pageNum);
          } else {
            // Un-render pages that scroll far out of view to optimize GPU memory
            this.unrenderPageCanvas(pageNum);
          }
        });
      }, {
        root: this.container,
        rootMargin: '1200px 0px 1200px 0px', // Pre-load 1-2 pages ahead
        threshold: 0.01
      });

      // Pass 1: Build structural placeholders with accurate sizes to prevent layout shift jumps
      for (let i = 1; i <= numPages; i++) {
        const page = await this.pdfDoc.getPage(i);
        const normalViewport = page.getViewport({ scale: 1.0, rotation: this.rotation });
        
        let calculatedScale = 1.0;
        if (this.scale === 'width') {
          calculatedScale = (this.container.clientWidth - 50) / normalViewport.width;
        } else if (this.scale === 'fit') {
          calculatedScale = (this.container.clientHeight - 60) / normalViewport.height;
        } else if (typeof this.scale === 'number') {
          calculatedScale = this.scale;
        }

        const viewport = page.getViewport({ scale: calculatedScale, rotation: this.rotation });
        
        const wrapper = document.createElement('div');
        wrapper.className = 'pdf-page-wrapper';
        wrapper.id = `page-wrapper-${i}`;
        wrapper.dataset.pageNumber = i;
        wrapper.style.width = `${viewport.width}px`;
        wrapper.style.height = `${viewport.height}px`;
        
        // Save viewport configs
        this.pagesMetadata[i] = {
          viewport: viewport,
          width: viewport.width,
          height: viewport.height
        };
        
        this.viewer.appendChild(wrapper);
        this.observer.observe(wrapper);
      }

      // Initial jump to saved scroll height page
      setTimeout(() => {
        const pageEl = document.getElementById(`page-wrapper-${this.pageNum}`);
        if (pageEl) {
          pageEl.scrollIntoView({ block: 'start' });
        }
      }, 100);

    } catch (err) {
      console.error('Error generating scroll layouts:', err);
    }
  },

  // --- Render Page canvas & Text overlay layer ---
  async renderPageCanvas(pageNum) {
    if (this.renderedPages.has(pageNum)) return;
    this.renderedPages.add(pageNum);
    
    const wrapper = document.getElementById(`page-wrapper-${pageNum}`);
    if (!wrapper) return;
    
    try {
      const page = await this.pdfDoc.getPage(pageNum);
      const metadata = this.pagesMetadata[pageNum] || {};
      const viewport = metadata.viewport || page.getViewport({ scale: 1.0, rotation: this.rotation });
      
      // Clear container loading spin placeholders
      wrapper.innerHTML = '';
      
      // Canvas Creation
      const canvas = document.createElement('canvas');
      canvas.id = `canvas-page-${pageNum}`;
      const ctx = canvas.getContext('2d');
      
      // High DPI / Retina Display Rendering support
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      ctx.scale(dpr, dpr);
      
      wrapper.appendChild(canvas);
      
      // Render canvas layer
      await page.render({
        canvasContext: ctx,
        viewport: viewport
      }).promise;

      // Render Text selection overlay
      const textLayerDiv = document.createElement('div');
      textLayerDiv.className = 'textLayer';
      wrapper.appendChild(textLayerDiv);
      
      const textContent = await page.getTextContent();
      pdfjsLib.renderTextLayer({
        textContent: textContent,
        container: textLayerDiv,
        viewport: viewport,
        textDivs: []
      });

    } catch (err) {
      console.error(`Error rendering page ${pageNum}:`, err);
      this.renderedPages.delete(pageNum);
    }
  },

  // Unload canvas from offscreen container
  unrenderPageCanvas(pageNum) {
    if (!this.renderedPages.has(pageNum)) return;
    this.renderedPages.delete(pageNum);
    
    const wrapper = document.getElementById(`page-wrapper-${pageNum}`);
    if (wrapper) {
      wrapper.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:100%; color:var(--text-muted)"><i class="fa-solid fa-spinner spin"></i></div>`;
    }
  },

  // --- Render Single/Dual page modes ---
  async renderPagedLayout() {
    this.viewer.innerHTML = '';
    
    const pageNum1 = this.pageNum;
    let pageNum2 = this.layoutMode === 'dual' ? pageNum1 + 1 : null;
    
    if (pageNum2 && pageNum2 > this.pdfDoc.numPages) {
      pageNum2 = null; // No double page if final index
    }
    
    const renderPage = async (num) => {
      const page = await this.pdfDoc.getPage(num);
      const normalViewport = page.getViewport({ scale: 1.0, rotation: this.rotation });
      
      let calculatedScale = 1.0;
      if (this.scale === 'width') {
        const maxWidth = this.layoutMode === 'dual' ? 
          (this.container.clientWidth / 2) - 40 : this.container.clientWidth - 50;
        calculatedScale = maxWidth / normalViewport.width;
      } else if (this.scale === 'fit') {
        calculatedScale = (this.container.clientHeight - 80) / normalViewport.height;
      } else if (typeof this.scale === 'number') {
        calculatedScale = this.scale;
      }
      
      const viewport = page.getViewport({ scale: calculatedScale, rotation: this.rotation });
      
      const wrapper = document.createElement('div');
      wrapper.className = 'pdf-page-wrapper';
      wrapper.id = `page-wrapper-${num}`;
      wrapper.style.width = `${viewport.width}px`;
      wrapper.style.height = `${viewport.height}px`;
      
      this.viewer.appendChild(wrapper);
      
      // Save metadata
      this.pagesMetadata[num] = { viewport, width: viewport.width, height: viewport.height };
      this.renderedPages.add(num);
      
      // Render canvas & texts
      await this.renderPageCanvas(num);
    };

    // Render single or both side-by-side
    await renderPage(pageNum1);
    if (pageNum2) {
      await renderPage(pageNum2);
    }
    
    // Reset scroll position to top
    this.container.scrollTop = 0;
  },

  // --- Tracker scroll position to update current page number indices ---
  handleScrollTracker() {
    if (this.layoutMode !== 'scroll' || !this.pdfDoc) return;
    
    const wrappers = this.viewer.querySelectorAll('.pdf-page-wrapper');
    const containerTop = this.container.getBoundingClientRect().top;
    
    let activePage = this.pageNum;
    let minDiff = Infinity;
    
    wrappers.forEach(wrap => {
      const rect = wrap.getBoundingClientRect();
      const diff = Math.abs(rect.top - containerTop);
      if (diff < minDiff) {
        minDiff = diff;
        activePage = parseInt(wrap.dataset.pageNumber);
      }
    });
    
    if (activePage !== this.pageNum) {
      this.pageNum = activePage;
      document.getElementById('page-num').value = activePage;
      App.saveProgress(this.bookId, activePage);
      
      // Focus active thumbnail border link
      document.querySelectorAll('.thumbnail-item').forEach(item => {
        item.classList.toggle('active', parseInt(item.dataset.page) === activePage);
      });
    }
  },

  // --- Thumbnail rendering sidebar loader ---
  async loadThumbnails() {
    const container = document.getElementById('thumbnails-tab');
    if (!container) return;
    
    container.innerHTML = '';
    const totalPages = this.pdfDoc.numPages;
    
    for (let i = 1; i <= totalPages; i++) {
      const thumbItem = document.createElement('div');
      thumbItem.className = `thumbnail-item ${i === this.pageNum ? 'active' : ''}`;
      thumbItem.dataset.page = i;
      
      const canvas = document.createElement('canvas');
      thumbItem.appendChild(canvas);
      
      const numLabel = document.createElement('span');
      numLabel.className = 'thumbnail-page-num';
      numLabel.textContent = i;
      thumbItem.appendChild(numLabel);
      
      container.appendChild(thumbItem);
      
      // Lazy render thumbnail cover using setTimeout to free CPU main thread cycles
      setTimeout(async () => {
        try {
          const page = await this.pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 0.25 });
          
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          
          await page.render({
            canvasContext: ctx,
            viewport: viewport
          }).promise;
        } catch (err) {
          console.error(`Thumbnail error on page ${i}:`, err);
        }
      }, i * 20);

      // Thumbnail Click Navigation handler
      thumbItem.addEventListener('click', () => {
        this.navigateToPage(i);
      });
    }
  },

  // --- Load Outline (Chapters Table of Content) ---
  async loadOutline() {
    const container = document.getElementById('outline-tree');
    if (!container) return;
    
    container.innerHTML = '';
    
    try {
      const outline = await this.pdfDoc.getOutline();
      
      if (!outline || outline.length === 0) {
        container.innerHTML = '<li class="outline-item" style="color:var(--text-muted); cursor:default">No chapters found</li>';
        return;
      }
      
      const renderOutlineNode = (nodes, parentEl) => {
        nodes.forEach(node => {
          const li = document.createElement('li');
          const span = document.createElement('span');
          span.className = 'outline-item';
          span.textContent = node.title;
          li.appendChild(span);
          
          parentEl.appendChild(li);
          
          // Action mapping
          span.addEventListener('click', async () => {
            if (node.dest) {
              const destRef = node.dest;
              let pageIndex = -1;
              
              if (typeof destRef === 'string') {
                pageIndex = await this.pdfDoc.getPageIndex(destRef);
              } else if (Array.isArray(destRef)) {
                // Get page index from destination reference object
                const ref = destRef[0];
                pageIndex = await this.pdfDoc.getPageIndex(ref);
              }
              
              if (pageIndex !== -1) {
                this.navigateToPage(pageIndex + 1);
              }
            }
          });

          // Render nested children
          if (node.items && node.items.length > 0) {
            const ul = document.createElement('ul');
            ul.style.paddingLeft = '15px';
            ul.style.listStyle = 'none';
            li.appendChild(ul);
            renderOutlineNode(node.items, ul);
          }
        });
      };
      
      renderOutlineNode(outline, container);
      
    } catch (err) {
      console.error('Outline fetch failed:', err);
      container.innerHTML = '<li class="outline-item" style="color:var(--text-muted); cursor:default">Error loading outline</li>';
    }
  },

  // --- Client side PDF text matching search engine ---
  clearSearchHighlights() {
    document.querySelectorAll('.textLayer .highlight').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
    document.getElementById('search-results-count').textContent = '0 matches';
  }
};

// Initialize PDF Viewer Module
window.addEventListener('DOMContentLoaded', () => {
  window.PDFReader.init();
});
