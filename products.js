function filterProducts() {
    const category = document.getElementById('productCategory').value;
    const productItems = document.getElementById('productItems');
    
    // Clear existing products
    productItems.innerHTML = '';

    // Fetch products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Filter products by category
    const filteredProducts = category ? products.filter(product => product.category === category) : products;

    // Display filtered products
    if (filteredProducts.length === 0) {
        productItems.innerHTML = '<p>لا توجد منتجات في هذه الفئة.</p>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productItems.appendChild(productCard);
        });
    }
}

// دالة لإنشاء بطاقة المنتج
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p class="price">سعر: <strong>${product.price} ر.س</strong></p>
        <button class="btn add-to-cart">إضافة إلى السلة <i class="fas fa-shopping-cart"></i></button>
    `;

    productCard.querySelector('.add-to-cart').addEventListener('click', function() {
        addToCart(product);
    });

    return productCard;
}

// دالة لإضافة المنتج إلى السلة (كمثال)
function addToCart(product) {
    // إضافة منطق لإضافة المنتج إلى السلة
    alert(`${product.name} تمت إضافته إلى السلة!`);
}
