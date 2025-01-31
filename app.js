document.addEventListener("DOMContentLoaded", function () {
    const urunler = [
        {
            isim: "IŞIKLI TOP",
            fiyat: "2500 TL",
            resim: [
                "isikli_top1.jpeg", // Var olan görsel
                "isiklitop2.jpeg", // Yeni görsel
                "isiklitop3.jpeg", // Yeni görsel
                "isiklitop4.jpeg"  // Yeni görsel
            ],
            ozellikler: [
                "Göz alıcı ışık efektleri",
                "Renk değiştirebilen LED ışıklar",
                "Uzun ömürlü batarya",
                "Kolay taşınabilir tasarım"
            ]
        },
        {
            isim: "BİSTRO MASA",
            fiyat: "6500 TL",
            resim: [
                "bistro_masa1.jpeg", // Var olan görsel
                "bistromasa2.jpeg", // Yeni görsel
                "bistromasa3.jpeg", // Yeni görsel
                "bistromasa4.jpeg", // Yeni görsel
                "bistromasa5.jpeg"  // Yeni görsel
            ],
            ozellikler: [
                "Tek şarjla 40 saat rakipsiz",
                "4 ana 12 ara renk kumandalı kontrol",
                "Klasik bistro masasının boyutu: 60 cm x 60 cm"
            ]
        },
        {
            isim: "PLASTİK SAKSI",
            fiyat: "3500 TL",
            resim: [
                "saksi1.jpeg", // Yeni görsel
                "saksi2.jpeg", // Yeni görsel
                "saksi3.jpeg", // Yeni görsel
                "saksi4.jpeg"  // Yeni görsel
            ],
            ozellikler: [
                "Dayanıklı plastik malzeme",
                "Farklı renk seçenekleri",
                "İç mekan ve dış mekan kullanımına uygun",
                "Kolay taşınabilir"
            ]
        }
    ];

    const urunlerContainer = document.getElementById("urunler");

    // Ürünleri döngüyle ekle
    urunler.forEach(urun => {
        const urunDiv = document.createElement("div");
        urunDiv.classList.add("urun");

        // Ürün görselleri için HTML yapısını oluştur
        let imagesHTML = '';
        if (Array.isArray(urun.resim)) {
            urun.resim.forEach((image, index) => {
                imagesHTML += `
                    <div class="urun-gorsel-container" style="display: ${index === 0 ? 'block' : 'none'};">
                        <img src="${image}" alt="${urun.isim}" class="urun-gorsel" data-index="${index}">
                    </div>
                `;
            });
        } else {
            imagesHTML = `
                <div class="urun-gorsel-container" style="display: block;">
                    <img src="${urun.resim}" alt="${urun.isim}" class="urun-gorsel">
                </div>
            `;
        }

        urunDiv.innerHTML = `
            <div class="urun-gorseller">
                ${imagesHTML}
                <button class="prev" onclick="changeImage(event, -1)">←</button>
                <button class="next" onclick="changeImage(event, 1)">→</button>
            </div>
            <h2>${urun.isim}</h2>
            <p>Fiyat: ${urun.fiyat}</p>
            <a href="https://wa.me/905542345454?text=${encodeURIComponent(urun.isim + ' satın almak istiyorum.')}" class="satin-al">Satın Al</a>
            <a href="#" class="ozellikler" onclick="openModal('${urun.isim}')">Özellikler</a>
        `;

        urunlerContainer.appendChild(urunDiv);
    });

    // Görsel değiştirme fonksiyonu
    window.changeImage = function (event, direction) {
        const images = event.target.closest('.urun-gorseller').querySelectorAll('.urun-gorsel-container');
        const currentIndex = Array.from(images).findIndex(img => img.style.display !== 'none');
        const nextIndex = (currentIndex + direction + images.length) % images.length;

        images[currentIndex].style.display = 'none';
        images[nextIndex].style.display = 'block';
    };

    // Modal açma fonksiyonu
    window.openModal = function(productName) {
        document.getElementById('myModal').style.display = "flex";
        
        // Ürün Özellikleri
        const featuresList = document.getElementById('product-features');
        featuresList.innerHTML = ""; // Listeyi temizle

        // Ürün özelliklerini ekle
        const urun = urunler.find(item => item.isim === productName);
        urun.ozellikler.forEach(feature => {
            const li = document.createElement("li");
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    };

    // Modal kapama fonksiyonu
    function closeModal() {
        document.getElementById('myModal').style.display = "none";
    }

    // Modal dışında bir yere tıklanırsa da kapanmasını sağla
    window.onclick = function(event) {
        if (event.target == document.getElementById('myModal') || event.target == document.querySelector('.close')) {
            closeModal();
        }
    }
});
