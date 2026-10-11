// GEL products: one list used by the product page, the product cards and the cart.
// To add a product: add an entry here, add its photos to IMG/, and add a card in shop.html / index.html.
const GEL_PRODUCTS = [
    {
        id: 'tee',
        name: 'GEL Signature Tee',
        price: 120,
        category: 'tees',
        images: ['IMG/gel-tee.jpg', 'IMG/gel-tee-side.jpg', 'IMG/gel-tee-back.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        desc: {
            ar: 'تيشيرت بقصة واسعة من قطن ثقيل، بياقة مضلّعة وأكتاف منخفضة. قطعة أساسية تمشي مع كل شي.',
            en: 'A boxy tee in heavyweight cotton with a ribbed collar and dropped shoulders. The everyday essential.'
        },
        material: { ar: 'قطن ثقيل 100%', en: '100% heavyweight cotton' },
        fit: { ar: 'قصة واسعة (Boxy)', en: 'Boxy fit' }
    },
    {
        id: 'hoodie',
        name: 'GEL Oversized Hoodie',
        price: 250,
        category: 'hoodies',
        images: ['IMG/gel-hoodie.jpg', 'IMG/gel-hoodie-side.jpg', 'IMG/gel-hoodie-back.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        desc: {
            ar: 'هودي واسع من قطن فليس ناعم، بجيب كنغر وأطراف مضلّعة. دافي ومريح للأيام الباردة.',
            en: 'An oversized hoodie in soft cotton fleece with a kangaroo pocket and ribbed trims. Warm and easy.'
        },
        material: { ar: 'قطن فليس', en: 'Cotton fleece' },
        fit: { ar: 'قصة واسعة (Oversized)', en: 'Oversized fit' }
    },
    {
        id: 'jacket',
        name: 'GEL Urban Jacket',
        price: 450,
        category: 'jackets',
        images: ['IMG/gel-jacket.jpg', 'IMG/gel-jacket-side.jpg', 'IMG/gel-jacket-back.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        desc: {
            ar: 'جاكيت خفيف من الكتان بجيبين على الصدر وأزرار أمامية بسيطة. يُلبس مفتوحًا فوق تيشيرت أو مغلقًا.',
            en: 'A lightweight linen overshirt with two chest pockets and a clean button front. Wear it open or closed.'
        },
        material: { ar: 'كتان', en: 'Linen' },
        fit: { ar: 'قصة مريحة', en: 'Relaxed fit' }
    },
    {
        id: 'shorts',
        name: 'GEL Minimalist Shorts',
        price: 110,
        category: 'shorts',
        images: ['IMG/gel-shorts.jpg', 'IMG/gel-shorts-side.jpg', 'IMG/gel-shorts-back.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        desc: {
            ar: 'شورت من قطن فليس بخصر مطاطي وحبل، وجيوب جانبية وخلفية. بسيط ومريح لكل يوم.',
            en: 'Cotton fleece shorts with an elastic drawstring waist, side and back pockets. Simple and comfortable.'
        },
        material: { ar: 'قطن فليس', en: 'Cotton fleece' },
        fit: { ar: 'قصة مريحة', en: 'Relaxed fit' }
    },
    {
        id: 'cap',
        name: 'GEL Classic Cap',
        price: 85,
        category: 'accessories',
        images: ['IMG/gel-cap.jpg', 'IMG/gel-cap-side.jpg', 'IMG/gel-cap-back.jpg'],
        sizes: ['ONE SIZE'],
        desc: {
            ar: 'كاب من الكتان بستة ألواح وحزام خلفي قابل للتعديل بإبزيم معدني.',
            en: 'A six-panel linen cap with an adjustable back strap and metal buckle.'
        },
        material: { ar: 'كتان', en: 'Linen' },
        fit: { ar: 'مقاس واحد قابل للتعديل', en: 'One size, adjustable' }
    }
];

function findProduct(id) {
    return GEL_PRODUCTS.find(p => p.id === id);
}

function findProductByImage(src) {
    const file = src.split('/').pop();
    return GEL_PRODUCTS.find(p => p.images[0].split('/').pop() === file);
}

// Also used by the chat server function (api/chat.js) so the assistant always knows the current list
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GEL_PRODUCTS };
}
