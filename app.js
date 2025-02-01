document.addEventListener("DOMContentLoaded", function () {
    const urunler = [
        {
            isim: "FİŞLİ IŞIKLI KÜRE",
            fiyat: 2500,
            resim: [
                "isikli_top1.jpeg", 
                "isiklitop2.jpeg", 
                "isiklitop3.jpeg", 
                "isiklitop4.jpeg"  
            ],
            ozellikler: [
                "Göz alıcı ışık efektleri",
                "Renk değiştirebilen LED ışıklar",
                "Uzun ömürlü batarya",
                "Kolay taşınabilir tasarım"
            ],
            boyutlar: {
                "10x10 cm": 0,
                "20x20 cm": 500,
                "30x30 cm": 1000
            }
        },
        {
            isim: "FİŞLİ BİSTRO MASA",
            fiyat: 6500,
            resim: [
                "bistro_masa1.jpeg", 
                "bistromasa2.jpeg", 
                "bistromasa3.jpeg", 
                "bistromasa4.jpeg", 
                "bistromasa5.jpeg"  
            ],
            ozellikler: [
                "Polietilen malzemeden imal edilmektedir.",
                "RGB Led 12V Batarya Pil veya Adaptör ile çalışmaktadır.",
                "65*45*105H cm ölçülerindedir",
                "Uzaktan kumanda sistemi ile ışık geçişleri, renk ayarı ve açma/kapama yapılmaktadır.",
                "Ürünlerimiz adet fiyatı üzerinden listelenmiştir."
            ],
            boyutlar: {
                "60x60 cm": 0,
                "70x70 cm": 700,
                "80x80 cm": 1400
            }
        },
        {
            isim: "FİŞLİ PLASTİK SAKSI",
            fiyat: 3500,
            resim: [
                "saksi1.jpeg", 
                "saksi2.jpeg", 
                "saksi3.jpeg", 
                "saksi4.jpeg"  
            ],
            ozellikler: [
                "Dayanıklı plastik malzeme",
                "Farklı renk seçenekleri",
                "Iç mekan ve dış mekan kullanımına uygun",
                "Kolay taşınabilir"
            ],
            boyutlar: {
                "10x10 cm": 0,
                "20x20 cm": 300,
                "30x30 cm": 600
            }
        }
    ];

    // Ürünlerin kopyalarını oluştur ve isimlerini "ŞARJLI" olarak değiştir, fiyatlarına 1000 TL ekle
    const sarjliUrunler = urunler.map(urun => ({
        ...urun,
        isim: urun.isim.replace("FİŞLİ", "ŞARJLI"),
        fiyat: urun.fiyat + 1000
    }));

    // Orijinal ürünleri ve şarjlı ürünleri birleştir
    const tumUrunler = [...urunler, ...sarjliUrunler];

    const urunlerContainer = document.getElementById("urunler");

    tumUrunler.forEach(urun => {
        const urunDiv = document.createElement("div");
        urunDiv.classList.add("urun");
        urunDiv.id = urun.isim.toLowerCase().replace(/\s+/g, '_');

        // Dropdown menü oluştur
        let dropdownHTML = '<select class="urun-boyut-secimi">';
        for (const boyut in urun.boyutlar) {
            dropdownHTML += `<option value="${boyut}">${boyut}</option>`;
        }
        dropdownHTML += '</select>';

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
            <h2 id="${urun.isim.toLowerCase().replace(/\s+/g, '_')}">${urun.isim}</h2>
            <p class="urun-fiyat">Fiyat: ${urun.fiyat} TL</p>
            ${dropdownHTML}
            <button class="ozellikler" data-ozellikler='${JSON.stringify(urun.ozellikler)}'>Özellikler</button>
            <a href="https://wa.me/905542345454?text=${encodeURIComponent(urun.isim + ' satın almak istiyorum.')}" class="satin-al">Satın Al</a>
        `;

        urunlerContainer.appendChild(urunDiv);

        // Fiyatı güncelleme işlevi
        urunDiv.querySelector('.urun-boyut-secimi').addEventListener('change', function (event) {
            const secilenBoyut = event.target.value;
            const yeniFiyat = urun.fiyat + urun.boyutlar[secilenBoyut];
            urunDiv.querySelector('.urun-fiyat').textContent = `Fiyat: ${yeniFiyat} TL`;
        });

        // Özellikler butonu tıklama işlevi
        urunDiv.querySelector('.ozellikler').addEventListener('click', function (event) {
            const ozellikler = JSON.parse(event.target.getAttribute('data-ozellikler'));
            const modal = document.getElementById("myModal");
            const modalContent = modal.querySelector(".modal-content");
            const ozelliklerList = modalContent.querySelector("ul#product-features");
            ozelliklerList.innerHTML = "";
            ozellikler.forEach(ozellik => {
                const li = document.createElement("li");
                li.textContent = ozellik;
                ozelliklerList.appendChild(li);
            });
            modal.style.display = "flex";
        });
    });

    window.changeImage = function (event, direction) {
        const images = event.target.closest('.urun-gorseller').querySelectorAll('.urun-gorsel-container');
        const currentIndex = Array.from(images).findIndex(img => img.style.display !== 'none');
        const nextIndex = (currentIndex + direction + images.length) % images.length;

        images[currentIndex].style.display = 'none';
        images[nextIndex].style.display = 'block';
    };

    // Modal kapatma işlevi
    document.querySelector(".modal .close").addEventListener('click', function () {
        document.getElementById("myModal").style.display = "none";
    });

    // Modal dışına tıklama işlevi
    window.addEventListener('click', function (event) {
        const modal = document.getElementById("myModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Dropdown menüden ürün seçildiğinde yönlendirme işlevi
    window.navigateToProduct = function () {
        const productMenu = document.getElementById('productMenu');
        const selectedProduct = productMenu.value;
        if (selectedProduct) {
            // Önce tüm ürünleri gizle
            document.querySelectorAll('.urun').forEach(urun => {
                urun.style.display = 'none';
            });

            // Seçilen ürünü göster
            const selectedProductElement = document.getElementById(selectedProduct);
            if (selectedProductElement) {
                selectedProductElement.style.display = 'block';
                selectedProductElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
});
