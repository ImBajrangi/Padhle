/* skillTadka - Main Application Router & Local Storage */

// Initialize global app configuration
const App = {
  // DB configurations
  dbName: 'skillTadkaDB',
  dbVersion: 1,
  db: null,
  
  // App initialization
  async init() {
    this.initThemes();
    await this.initDB();
    this.initUploader();
    this.initRouter();
    this.renderDefaultCovers();
    this.loadCustomLibrary();
  },

  // --- Theme Management ---
  initThemes() {
    const savedTheme = localStorage.getItem('skillTadka-theme') || 'vedic';
    document.body.className = `theme-${savedTheme}`;
    
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
      const btnTheme = btn.dataset.theme;
      if (btnTheme === savedTheme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
      
      btn.addEventListener('click', () => {
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.body.className = `theme-${btnTheme}`;
        localStorage.setItem('skillTadka-theme', btnTheme);
      });
    });
  },

  // --- IndexedDB Local Database Wrapper ---
  initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = (e) => {
        console.error('Database failed to open:', e);
        reject(e);
      };
      
      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve();
      };
      
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        // Create books store
        if (!db.objectStoreNames.contains('books')) {
          db.createObjectStore('books', { keyPath: 'id' });
        }
        // Create progress store
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'bookId' });
        }
      };
    });
  },

  // Save book to IndexedDB
  saveBook(id, name, fileArrayBuffer, sizeStr) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['books'], 'readwrite');
      const store = transaction.objectStore('books');
      
      const bookData = {
        id,
        name,
        file: fileArrayBuffer,
        size: sizeStr,
        addedAt: Date.now()
      };
      
      const request = store.put(bookData);
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e);
    });
  },

  // Get book from IndexedDB
  getBook(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['books'], 'readonly');
      const store = transaction.objectStore('books');
      const request = store.get(id);
      
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e);
    });
  },

  // List books from IndexedDB
  listBooks() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['books'], 'readonly');
      const store = transaction.objectStore('books');
      const request = store.getAll();
      
      request.onsuccess = (e) => resolve(e.target.result || []);
      request.onerror = (e) => reject(e);
    });
  },

  // Delete book from IndexedDB
  deleteBook(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['books', 'progress'], 'readwrite');
      transaction.objectStore('books').delete(id);
      transaction.objectStore('progress').delete(id);
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = (e) => reject(e);
    });
  },

  // Save reading progress
  saveProgress(bookId, pageNum) {
    if (!this.db) return;
    const transaction = this.db.transaction(['progress'], 'readwrite');
    const store = transaction.objectStore('progress');
    store.put({ bookId, pageNum });
  },

  // Get reading progress
  getProgress(bookId) {
    return new Promise((resolve) => {
      if (!this.db) return resolve(1);
      const transaction = this.db.transaction(['progress'], 'readonly');
      const store = transaction.objectStore('progress');
      const request = store.get(bookId);
      
      request.onsuccess = (e) => {
        resolve(e.target.result ? e.target.result.pageNum : 1);
      };
      request.onerror = () => resolve(1);
    });
  },

  // --- Router ---
  initRouter() {
    const handleRoute = () => {
      const hash = window.location.hash;
      const libraryView = document.getElementById('library-view');
      const readerView = document.getElementById('reader-view');
      
      if (hash.startsWith('#book=')) {
        const bookId = hash.replace('#book=', '');
        libraryView.style.display = 'none';
        readerView.style.display = 'flex';
        
        // Load custom styles for reader page body
        document.body.style.overflow = 'hidden';
        
        // Launch custom PDF reader
        if (window.PDFReader) {
          window.PDFReader.loadBook(bookId);
        } else {
          // Wait for script initialization if needed
          setTimeout(() => {
            if (window.PDFReader) window.PDFReader.loadBook(bookId);
          }, 500);
        }
      } else {
        // Stop active reader
        if (window.PDFReader) {
          window.PDFReader.destroy();
        }
        
        libraryView.style.display = 'flex';
        readerView.style.display = 'none';
        document.body.style.overflow = '';
        
        // Reload custom shelf
        this.loadCustomLibrary();
      }
    };

    window.addEventListener('hashchange', handleRoute);
    // Initial route check
    window.addEventListener('DOMContentLoaded', handleRoute);
  },

  // --- Uploader Configuration ---
  initUploader() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    if (!dropZone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
      }, false);
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        this.handleUpload(files[0]);
      }
    }, false);

    fileInput.addEventListener('change', (e) => {
      if (fileInput.files.length > 0) {
        this.handleUpload(fileInput.files[0]);
      }
    });
  },

  // Handle PDF upload
  handleUpload(file) {
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are supported.');
      return;
    }
    
    // Check size (100MB max limit to avoid DB overflow crashes)
    if (file.size > 100 * 1024 * 1024) {
      alert('File size exceeds the 100MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      const id = 'custom-' + Date.now();
      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      
      try {
        await this.saveBook(id, file.name.replace('.pdf', ''), arrayBuffer, sizeStr);
        // Navigate directly to the new book
        window.location.hash = `#book=${id}`;
      } catch (err) {
        console.error('Error saving book:', err);
        alert('Failed to save the book locally. Database storage error.');
      }
    };
    
    reader.readAsArrayBuffer(file);
  },

  // --- Cover Renderer ---
  async renderDefaultCovers() {
    // Render featured banner cover
    const featuredCanvas = document.getElementById('featured-cover');
    if (featuredCanvas) {
      this.renderPdfCoverToCanvas('pdfs/satsang-ke-bikhare-moti.pdf', featuredCanvas);
    }

    // Render other catalog items covers
    const catalogCanvases = document.querySelectorAll('.card-cover-canvas');
    catalogCanvases.forEach(canvas => {
      const pdfUrl = canvas.dataset.pdfUrl;
      if (pdfUrl) {
        this.renderPdfCoverToCanvas(pdfUrl, canvas);
      }
    });
  },

  // Helper: Render page 1 of PDF to Canvas
  async renderPdfCoverToCanvas(pdfSource, canvas) {
    try {
      let pdf;
      if (typeof pdfSource === 'string') {
        pdf = await pdfjsLib.getDocument(pdfSource).promise;
      } else {
        // ArrayBuffer clone
        pdf = await pdfjsLib.getDocument({ data: pdfSource.slice(0) }).promise;
      }
      
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.0 });
      
      // Calculate scale to fit canvas width/height
      const canvasWidth = canvas.clientWidth || canvas.width || 300;
      const scale = canvasWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale: scale });
      
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      
      const ctx = canvas.getContext('2d');
      await page.render({
        canvasContext: ctx,
        viewport: scaledViewport
      }).promise;
    } catch (err) {
      console.error('Error rendering cover canvas:', err);
      // Fallback Cover Art
      const ctx = canvas.getContext('2d');
      canvas.width = 300;
      canvas.height = 400;
      ctx.fillStyle = '#ff9933';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#12141c';
      ctx.font = 'bold 20px Cinzel';
      ctx.textAlign = 'center';
      ctx.fillText('Vedic Library', canvas.width / 2, canvas.height / 2);
    }
  },

  // --- Load Custom Bookshelf ---
  async loadCustomLibrary() {
    const customSection = document.getElementById('custom-library-section');
    const customGrid = document.getElementById('custom-books-grid');
    if (!customSection || !customGrid) return;
    
    try {
      const books = await this.listBooks();
      
      if (books.length === 0) {
        customSection.style.display = 'none';
        return;
      }
      
      customSection.style.display = 'block';
      customGrid.innerHTML = '';
      
      books.forEach(book => {
        const bookCard = document.createElement('article');
        bookCard.className = 'book-card';
        bookCard.dataset.bookId = book.id;
        
        bookCard.innerHTML = `
          <div class="book-card-cover-wrapper">
            <canvas class="card-cover-canvas-custom" id="cover-canvas-${book.id}"></canvas>
            <div class="card-hover-actions">
              <a href="#book=${book.id}" class="btn btn-icon btn-read" title="Read Book"><i class="fa-solid fa-book-open"></i></a>
              <button class="btn btn-icon btn-download btn-delete-book" data-id="${book.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
          <div class="book-card-info">
            <span class="book-badge">Local PDF</span>
            <h3>${book.name}</h3>
            <p class="book-author">Uploaded Document</p>
            <div class="book-card-footer">
              <span class="book-size"><i class="fa-solid fa-file-pdf"></i> ${book.size}</span>
              <a href="#book=${book.id}" class="btn btn-text">Open Reader <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        `;
        
        customGrid.appendChild(bookCard);
        
        // Render Cover async
        const canvas = document.getElementById(`cover-canvas-${book.id}`);
        this.renderPdfCoverToCanvas(book.file, canvas);
      });

      // Bind delete handlers
      const deleteButtons = customGrid.querySelectorAll('.btn-delete-book');
      deleteButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          e.preventDefault();
          const bookId = btn.dataset.id;
          if (confirm('Are you sure you want to delete this book from your browser library?')) {
            await this.deleteBook(bookId);
            this.loadCustomLibrary();
          }
        });
      });
      
    } catch (err) {
      console.error('Error loading custom library:', err);
    }
  }
};

// Initialize application on load
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
