document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('addProductForm');
    const imagePreview = document.getElementById('imagePreview');

    // عرض الصورة قبل الإضافة
    document.getElementById('productImage').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    });

    // إضافة منتج جديد
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // الحصول على قيم المدخلات
        const name = document.getElementById('productName').value.trim();
        const description = document.getElementById('productDescription').value.trim();
        const price = document.getElementById('productPrice').value.trim();
        const phone = document.getElementById('productPhone').value.trim();
        const imageInput = document.getElementById('productImage');

        // التحقق من صحة المدخلات
        if (!name || !description || !price || !phone || !imageInput.files[0]) {
            alert("يرجى ملء جميع الحقول وإضافة صورة.");
            return;
        }

        // التحقق من صحة السعر
        const priceValue = parseFloat(price);
        if (isNaN(priceValue) || priceValue <= 0) {
            alert("يرجى إدخال سعر صحيح.");
            return;
        }

        // قراءة الصورة وإضافة المنتج
        const reader = new FileReader();
        reader.onload = function(e) {
            const newProduct = {
                name,
                description,
                price: priceValue, // تخزين السعر كرقم
                phone,
                image: e.target.result // تخزين رابط الصورة
            };

            // تخزين المنتج في Local Storage
            const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
            storedProducts.push(newProduct);
            localStorage.setItem('products', JSON.stringify(storedProducts));

            alert("تم إضافة المنتج بنجاح!");
            addProductForm.reset(); // إعادة تعيين النموذج
            imagePreview.style.display = 'none'; // إخفاء صورة المعاينة
        }
        reader.readAsDataURL(imageInput.files[0]); // قراءة الصورة
    });
});
