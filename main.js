// --- Translation System ---
const translations = {
    ar: {
        nav_brand: "GEL",
        nav_home: "الرئيسية",
        nav_contact: "تواصل معنا",
        nav_about: "من نحن",
        nav_shop: "المتجر",
        nav_bag: "الحقيبة",
        announce: "شحن دولي من قطر | اطلب مباشرة عبر واتساب",
        hero_title: "GEL BRAND",
        hero_desc: "نحن لا نبيع الملابس فقط، نحن نصنع أسلوب حياة يجمع بين الفخامة والراحة العصرية. اكتشف مجموعتنا المختارة بعناية لتناسب ذوقك الرفيع.",
        hero_btn: "تصفح المنتجات",
        cart_title: "حقيبتك",
        cart_empty: "حقيبتك فارغة",
        cart_total: "الإجمالي",
        cart_checkout: "إتمام الطلب",
        footer_desc: "ملابس فاخرة للجيل العصري.",
        footer_rights: "جميع الحقوق محفوظة © 2026 براند GEL.",
        footer_shop: "المتجر",
        footer_info: "عن GEL",
        footer_contact: "تواصل",
        footer_location: "قطر · شحن دولي",
        contact_title: "تواصل معنا",
        contact_desc: "نحن هنا لمساعدتك دائماً. يمكنك مراسلتنا عبر النموذج التالي:",
        contact_name: "الاسم",
        contact_email: "البريد الإلكتروني",
        contact_msg: "رسالتك",
        contact_send: "إرسال",
        contact_whatsapp: "أو تواصل معنا مباشرة عبر واتساب:",
        about_title: "رؤيتنا في GEL",
        about_desc: "بدأت رحلتنا بشغف لصناعة ملابس تعكس روح العصر. في GEL، لا نكتفي بتصميم الأزياء بل نبتكر تجربة فريدة تجمع بين الفخامة والراحة اليومية.",
        about_val1_title: "جودة عالية",
        about_val1_desc: "مصنوعة من أقمشة قطنية ثقيلة وكتان فاخر مُصمم للراحة والاستدامة.",
        about_val2_title: "تصميم بسيط وعصري",
        about_val2_desc: "قصات واسعة (Boxy fit)، خطوط نظيفة، وتطريز ناعم يبرز الفخامة بهدوء.",
        shop_title: "المجموعة الكاملة",
        shop_subtitle: "اكتشف أحدث تصاميمنا الحصرية",
        filter_all: "الكل",
        filter_tees: "تيشيرتات",
        filter_hoodies: "هوديز",
        filter_jackets: "جاكيتات",
        filter_shorts: "شورتات",
        filter_accessories: "إكسسوارات",
        products_one: "منتج واحد",
        products_two: "منتجان",
        products_few: "{n} منتجات",
        products_many: "{n} منتج",
        add_to_cart: "أضف للسلة",
        added: "تمت الإضافة!",
        size_choose: "اختر المقاس",
        size_one: "مقاس واحد",
        size_label: "المقاس",
        qty_label: "الكمية",
        subtotal_label: "المجموع",
        close: "إغلاق",
        order_greeting: "مرحباً GEL Brand، أرغب بطلب الآتي:",
        currency: "ر.ق",
        lang_btn: "English",
        ai_name: "مساعد GEL",
        ai_online: "متصل",
        ai_welcome: "مرحباً بك في GEL! أنا مساعدك الشخصي للأناقة. كيف يمكنني مساعدتك اليوم؟",
        ai_placeholder: "اسأل عن الأناقة أو التواصل..."
    },
    en: {
        nav_brand: "Gel",
        nav_home: "Home",
        nav_contact: "Contact",
        nav_about: "About",
        nav_shop: "Shop",
        nav_bag: "Bag",
        announce: "Worldwide shipping from Qatar | Order directly on WhatsApp",
        hero_title: "GEL BRAND",
        hero_desc: "We don't just sell clothes; we create a lifestyle that blends luxury with modern comfort. Discover our carefully selected collection to suit your refined taste.",
        hero_btn: "Browse Products",
        cart_title: "Your Bag",
        cart_empty: "Your bag is empty",
        cart_total: "Total",
        cart_checkout: "Checkout",
        footer_desc: "Premium apparel for the modern generation.",
        footer_rights: "© 2026 GEL Brand. All rights reserved.",
        footer_shop: "Shop",
        footer_info: "GEL",
        footer_contact: "Contact",
        footer_location: "Qatar · Ships worldwide",
        contact_title: "Contact Us",
        contact_desc: "We are always here to help. You can message us via the form below:",
        contact_name: "Name",
        contact_email: "Email",
        contact_msg: "Your Message",
        contact_send: "Send",
        contact_whatsapp: "Or contact us directly via WhatsApp:",
        about_title: "Our Vision at GEL",
        about_desc: "Our journey began with a passion for creating clothes that reflect the spirit of the age. At GEL, we don't just design fashion; we craft a unique experience that blends luxury with daily comfort.",
        about_val1_title: "Premium Quality",
        about_val1_desc: "Crafted using heavy organic fabrics & fine linen built for comfort and longevity.",
        about_val2_title: "Minimal Aesthetics",
        about_val2_desc: "Boxy fits, clean cuts, and subtle embroidered details that stand out silently.",
        shop_title: "Full Collection",
        shop_subtitle: "Discover our latest exclusive designs",
        filter_all: "All",
        filter_tees: "Tees",
        filter_hoodies: "Hoodies",
        filter_jackets: "Jackets",
        filter_shorts: "Shorts",
        filter_accessories: "Accessories",
        products_one: "1 product",
        products_two: "2 products",
        products_few: "{n} products",
        products_many: "{n} products",
        add_to_cart: "Add to Cart",
        added: "Added!",
        size_choose: "Choose your size",
        size_one: "One size",
        size_label: "Size",
        qty_label: "Qty",
        subtotal_label: "Subtotal",
        close: "Close",
        order_greeting: "Hello GEL Brand, I would like to order:",
        currency: "QAR",
        lang_btn: "العربية",
        ai_name: "GEL Assistant",
        ai_online: "Online",
        ai_welcome: "Welcome to GEL! I'm your AI style assistant. How can I help you today?",
        ai_placeholder: "Ask about style or contact..."
    }
};

let currentLang = localStorage.getItem('gel_lang') || 'ar';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gel_lang', lang);
    
    // Switch direction according to selected language
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Update the language button text/icon if needed
    const langLabel = document.getElementById('current-lang-label');
    if (langLabel) {
        // The button shows the language you can switch to
        langLabel.textContent = lang === 'ar' ? 'EN' : 'ع';
        langLabel.lang = lang === 'ar' ? 'en' : 'ar';
        langLabel.parentElement.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    }

    // Specific update for Add to Cart buttons that aren't dynamic
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        if (!btn.classList.contains('success')) {
            btn.textContent = translations[lang].add_to_cart;
        }
    });

    updateCartUI(); // Refresh cart text
    if (window.updateShopCount) window.updateShopCount();
}

// 1. وظيفة تشغيل الحركات عند تحميل الصفحة بالكامل
function revealContent() {
    const heroText = document.querySelector('.hero-text');
    const heroLogo = document.querySelector('.hero-logo');
    const galleryItems = document.querySelectorAll('.gallery-item');

    setTimeout(() => {
        if (heroText) {
            heroText.style.opacity = "1";
            heroText.style.transform = "translateY(0)";
        }
        if (heroLogo) {
            heroLogo.style.opacity = "1";
            heroLogo.style.transform = "translateX(0)";
        }

        // تشغيل حركة ظهور صور المنتجات بالتدريج
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('reveal');
            }, index * 200);
        });
    }, 300);
}

// 2. كود لجعل التنقل بين الأقسام ناعماً
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;

        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 3. تشغيل الحركات عند تحميل الصفحة بالكامل
window.addEventListener('load', function() {
    setLanguage(currentLang); // Apply saved language
    window.scrollTo(0, 0);
    revealContent();
    updateCartUI();
});

// --- نظام سلة المشتريات (Shopping Cart System) ---
let cart = JSON.parse(localStorage.getItem('gel_cart')) || [];

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

// Sizes offered per product. Anything not listed gets the standard clothing run.
const CLOTHING_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const ONE_SIZE = 'ONE SIZE';
function sizesFor(name) {
    return /cap/i.test(name) ? [ONE_SIZE] : CLOTHING_SIZES;
}

function sizeText(size) {
    return size === ONE_SIZE ? translations[currentLang].size_one : size;
}

// "Add to cart" on a product opens the size picker; the item goes in once a size is chosen.
function addToCart(name, price, img, event) {
    openSizePicker({ name, price, img }, event ? event.currentTarget : null);
}

function putInCart(name, price, img, size) {
    const existingItem = cart.find(item => item.name === name && item.size === size);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, img, size, quantity: 1, id: Date.now() });
    }
    saveCart();
    updateCartUI();
}

const sizePicker = (() => {
    let overlay, product, selected, returnFocus;

    function build() {
        overlay = document.createElement('div');
        overlay.className = 'size-overlay';
        overlay.innerHTML = `
            <div class="size-dialog" role="dialog" aria-modal="true" aria-labelledby="size-product-name">
                <button type="button" class="size-close">&times;</button>
                <div class="size-product">
                    <img alt="">
                    <div>
                        <h4 id="size-product-name"></h4>
                        <p class="size-product-price"></p>
                    </div>
                </div>
                <span class="size-label"></span>
                <div class="size-options"></div>
                <button type="button" class="size-confirm"></button>
            </div>`;
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        overlay.querySelector('.size-close').addEventListener('click', close);
        overlay.querySelector('.size-confirm').addEventListener('click', confirm);
        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('open')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'Tab') trapFocus(e);
        });
    }

    function trapFocus(e) {
        const items = [...overlay.querySelectorAll('button:not(:disabled)')];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function select(size) {
        selected = size;
        overlay.querySelectorAll('.size-option').forEach(btn => {
            btn.setAttribute('aria-pressed', String(btn.dataset.size === size));
        });
        overlay.querySelector('.size-confirm').disabled = false;
    }

    function open(p, trigger) {
        if (!overlay) build();
        const t = translations[currentLang];
        product = p;
        selected = null;
        returnFocus = trigger;

        overlay.querySelector('.size-product img').src = p.img;
        overlay.querySelector('#size-product-name').textContent = p.name;
        overlay.querySelector('.size-product-price').textContent = `${p.price} QAR`;
        overlay.querySelector('.size-label').textContent = t.size_choose;
        overlay.querySelector('.size-close').setAttribute('aria-label', t.close);
        const confirmBtn = overlay.querySelector('.size-confirm');
        confirmBtn.textContent = t.add_to_cart;
        confirmBtn.disabled = true;

        const options = overlay.querySelector('.size-options');
        options.innerHTML = '';
        const sizes = sizesFor(p.name);
        sizes.forEach(size => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'size-option';
            btn.dataset.size = size;
            btn.textContent = sizeText(size);
            btn.setAttribute('aria-pressed', 'false');
            btn.addEventListener('click', () => select(size));
            options.appendChild(btn);
        });
        if (sizes.length === 1) select(sizes[0]);

        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        (sizes.length === 1 ? confirmBtn : options.firstElementChild).focus();
    }

    function close() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        if (returnFocus) returnFocus.focus();
    }

    function confirm() {
        if (!selected) return;
        putInCart(product.name, product.price, product.img, selected);
        const trigger = returnFocus;
        close();

        // Brief "Added!" on the product's own button
        if (trigger) {
            trigger.textContent = translations[currentLang].added;
            trigger.classList.add('success');
            setTimeout(() => {
                trigger.textContent = translations[currentLang].add_to_cart;
                trigger.classList.remove('success');
            }, 1200);
        }
    }

    return { open };
})();

function openSizePicker(product, trigger) {
    sizePicker.open(product, trigger);
}

function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('gel_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartTitle = document.querySelector('#cart-sidebar h3');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (cartTitle) cartTitle.textContent = translations[currentLang].cart_title;
    if (checkoutBtn) checkoutBtn.textContent = translations[currentLang].cart_checkout;
    if (!cartItemsContainer) return;

    const totalQty = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.innerText = totalQty > 0 ? totalQty : '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-container">
                <i class="fas fa-shopping-bag empty-icon"></i>
                <p class="empty-msg">${translations[currentLang].cart_empty}</p>
            </div>
        `;
        cartTotal.innerText = '0 QAR';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    ${item.size ? `<span class="cart-item-size">${translations[currentLang].size_label}: ${sizeText(item.size)}</span>` : ''}
                    <p>${item.price} QAR</p>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    </div>
                </div>
                <i class="fas fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
            </div>
        `;
    });
    
    cartTotal.innerText = total + ' QAR';
}

function checkout() {
    if (cart.length === 0) {
        alert(translations[currentLang].cart_empty);
        return;
    }
    
    const t = translations[currentLang];
    let message = t.order_greeting + "\n\n";
    cart.forEach(item => {
        const parts = [item.name];
        if (item.size) parts.push(`${t.size_label}: ${sizeText(item.size)}`);
        parts.push(`${t.qty_label}: ${item.quantity}`);
        parts.push(`${t.subtotal_label}: ${item.price * item.quantity} ${t.currency}`);
        message += `- ${parts.join(' | ')}\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\n${t.cart_total}: ${total} ${t.currency}`;

    const whatsappUrl = `https://wa.me/97431121124?text=${encodeURIComponent(message)}`; 
    window.open(whatsappUrl, '_blank');
}
// --- Header: compact on scroll, and the menu button on small screens ---
(function setupHeader() {
    const header = document.querySelector('.site-header');
    const button = header && header.querySelector('.nav-toggle');
    if (!header || !button) return;

    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const icon = button.querySelector('i');
    const setOpen = (open) => {
        header.classList.toggle('nav-open', open);
        button.setAttribute('aria-expanded', String(open));
        icon.className = open ? 'fas fa-xmark' : 'fas fa-bars';
    };

    button.addEventListener('click', () => setOpen(!header.classList.contains('nav-open')));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 860) setOpen(false);
    });
})();

// --- Home hero: cross-fade between photos every 5 seconds ---
(function setupHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const dots = slider.querySelectorAll('.hero-dot');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;
    let timer = null;

    function show(index) {
        slides[current].classList.remove('is-active');
        dots[current].classList.remove('is-active');
        dots[current].removeAttribute('aria-current');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('is-active');
        dots[current].classList.add('is-active');
        dots[current].setAttribute('aria-current', 'true');
    }

    function start() {
        if (reduceMotion || timer) return;
        timer = setInterval(() => show(current + 1), 5000);
    }

    function stop() {
        clearInterval(timer);
        timer = null;
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            show(i);
            stop();
            start(); // restart the countdown after a manual choice
        });
    });

    // Pause while the visitor hovers or the tab is in the background
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

    start();
})();

// --- Shop: category filter chips and product count ---
(function setupShopFilters() {
    const chips = document.querySelectorAll('.filter-chip');
    const items = document.querySelectorAll('.shop-gallery .gallery-item');
    const countEl = document.getElementById('shop-count');
    if (!chips.length || !items.length) return;

    function countLabel(n) {
        const t = translations[currentLang];
        const key = n === 1 ? 'products_one' : n === 2 ? 'products_two' : (n >= 3 && n <= 10) ? 'products_few' : 'products_many';
        return t[key].replace('{n}', n);
    }

    function visibleCount() {
        return [...items].filter(item => !item.hidden).length;
    }

    window.updateShopCount = () => {
        if (countEl) countEl.textContent = countLabel(visibleCount());
    };

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const filter = chip.dataset.filter;
            chips.forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
            items.forEach(item => {
                item.hidden = filter !== 'all' && item.dataset.category !== filter;
            });
            window.updateShopCount();
        });
    });

    function applyHash() {
        const wanted = location.hash.slice(1);
        const chip = [...chips].find(c => c.dataset.filter === wanted);
        if (chip) chip.click();
    }
    window.addEventListener('hashchange', () => {
        applyHash();
        document.querySelector('.shop-top')?.scrollIntoView({ behavior: 'smooth' });
    });

    window.updateShopCount();
    applyHash();
})();
