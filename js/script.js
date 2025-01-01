const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const categories = document.querySelector('.categories');
const randomizeBtn = document.getElementById('randomizeBtn');

const imageData = [
    { src: 'img/eytgd34f.webp', categories: ['nature', 'animals'], description: 'A beautiful nature scene with animals.' },
    { src: 'img/ghtr345we.webp', categories: ['architecture'], description: 'An ancient architectural masterpiece.' },
    { src: 'img/werwr4354df.webp', categories: ['nature'], description: 'A serene view of the natural world.' },
    { src: 'img/eytgd34f.webp', categories: ['animals'], description: 'Wildlife in its natural habitat.' },
    { src: 'img/gffgdf76ityjgh.webp', categories: ['animals'], description: 'Close-up of an adorable animal.' },
    { src: 'img/eytgd34f.webp', categories: ['nature', 'animals'], description: 'A beautiful nature scene with animals.' },
    { src: 'img/ghtr345we.webp', categories: ['architecture'], description: 'An ancient architectural masterpiece.' },
    { src: 'img/werwr4354df.webp', categories: ['nature'], description: 'A serene view of the natural world.' },
    { src: 'img/eytgd34f.webp', categories: ['animals'], description: 'Wildlife in its natural habitat.' },
    { src: 'img/gffgdf76ityjgh.webp', categories: ['animals'], description: 'Close-up of an adorable animal.' },    { src: 'img/eytgd34f.webp', categories: ['nature', 'animals'], description: 'A beautiful nature scene with animals.' },
    { src: 'img/ghtr345we.webp', categories: ['architecture'], description: 'An ancient architectural masterpiece.' },
    { src: 'img/werwr4354df.webp', categories: ['nature'], description: 'A serene view of the natural world.' },
    { src: 'img/eytgd34f.webp', categories: ['animals'], description: 'Wildlife in its natural habitat.' },
    { src: 'img/gffgdf76ityjgh.webp', categories: ['animals'], description: 'Close-up of an adorable animal.' },    { src: 'img/eytgd34f.webp', categories: ['nature', 'animals'], description: 'A beautiful nature scene with animals.' },
    { src: 'img/ghtr345we.webp', categories: ['architecture'], description: 'An ancient architectural masterpiece.' },
    { src: 'img/werwr4354df.webp', categories: ['nature'], description: 'A serene view of the natural world.' },
    { src: 'img/eytgd34f.webp', categories: ['animals'], description: 'Wildlife in its natural habitat.' },
    { src: 'img/gffgdf76ityjgh.webp', categories: ['animals'], description: 'Close-up of an adorable animal.' },    { src: 'img/eytgd34f.webp', categories: ['nature', 'animals'], description: 'A beautiful nature scene with animals.' },
    { src: 'img/ghtr345we.webp', categories: ['architecture'], description: 'An ancient architectural masterpiece.' },
    { src: 'img/werwr4354df.webp', categories: ['nature'], description: 'A serene view of the natural world.' },
    { src: 'img/eytgd34f.webp', categories: ['animals'], description: 'Wildlife in its natural habitat.' },
    { src: 'img/gffgdf76ityjgh.webp', categories: ['animals'], description: 'Close-up of an adorable animal.' },    { src: 'img/eytgd34f.webp', categories: ['nature', 'animals'], description: 'A beautiful nature scene with animals.' },
    { src: 'img/ghtr345we.webp', categories: ['architecture'], description: 'An ancient architectural masterpiece.' },
    { src: 'img/werwr4354df.webp', categories: ['nature'], description: 'A serene view of the natural world.' },
    { src: 'img/eytgd34f.webp', categories: ['animals'], description: 'Wildlife in its natural habitat.' },
    { src: 'img/gffgdf76ityjgh.webp', categories: ['animals'], description: 'Close-up of an adorable animal.' },
    // Add more image descriptions as needed
];

let imagesLoaded = 0;
const imagesPerLoad = 48;
let activeCategories = ['all'];

function loadImages() {
    const fragment = document.createDocumentFragment();
    const filteredImages = imageData.filter(img =>
        activeCategories.includes('all') || img.categories.some(category => activeCategories.includes(category))
    );

    for (let i = imagesLoaded; i < imagesLoaded + imagesPerLoad && i < filteredImages.length; i++) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'img-container';

        const img = document.createElement('img');
        img.src = filteredImages[i].src;
        img.alt = filteredImages[i].description || `Image ${i + 1}`;
        img.loading = 'lazy';
        img.addEventListener('click', () => {
            const pngPath = filteredImages[i].src.replace('.webp', '.png');
            const categories = filteredImages[i].categories.join(',');
            window.location.href = `viewimage.html?src=${encodeURIComponent(filteredImages[i].src)}&download=${encodeURIComponent(pngPath)}&categories=${encodeURIComponent(categories)}&description=${encodeURIComponent(filteredImages[i].description)}`;
        });

        imgContainer.appendChild(img);
        fragment.appendChild(imgContainer);
    }

    gallery.appendChild(fragment);
    imagesLoaded += imagesPerLoad;

    if (imagesLoaded >= filteredImages.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

function setActiveCategory(category) {
    if (category === 'all') {
        activeCategories = ['all'];
        document.querySelectorAll('.categories button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`button[data-category="all"]`).classList.add('active');
    } else {
        const index = activeCategories.indexOf('all');
        if (index > -1) {
            activeCategories.splice(index, 1);
        }

        const categoryIndex = activeCategories.indexOf(category);
        if (categoryIndex > -1) {
            activeCategories.splice(categoryIndex, 1);
            document.querySelector(`button[data-category="${category}"]`).classList.remove('active');
        } else {
            activeCategories.push(category);
            document.querySelector(`button[data-category="${category}"]`).classList.add('active');
        }

        if (activeCategories.length === 0) {
            activeCategories = ['all'];
            document.querySelector(`button[data-category="all"]`).classList.add('active');
        } else {
            document.querySelector(`button[data-category="all"]`).classList.remove('active');
        }
    }

    imagesLoaded = 0;
    gallery.innerHTML = '';
    loadImages();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

categories.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        setActiveCategory(event.target.getAttribute('data-category'));
    }
});

randomizeBtn.addEventListener('click', () => {
    imagesLoaded = 0;
    gallery.innerHTML = '';
    shuffleArray(imageData);
    loadImages();
});

loadImages();

loadMoreBtn.addEventListener('click', loadImages);

// Intersection Observer для автоматичного натискання кнопки "Load More"
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadImages();
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
});

observer.observe(loadMoreBtn);
