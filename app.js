document.addEventListener("DOMContentLoaded", function () {
    const urunler = [
        {
            isim: "IŞIKLI KÜRE",
            fiyat: 3000,
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
                "20x20 cm": 0,
                "30x30 cm": 1000,
                "40x40 cm": 1500,
                "50x50 cm": 2500,
                "60x60 cm": 3500,
                "80x80 cm": 5750,
                "100x100 cm": 7000
            },
            sarjliFark: {
                "20x20 cm": 750,
                "30x30 cm": 500,
                "40x40 cm": 1000,
                "50x50 cm": 1000,
                "60x60 cm": 1000,
                "80x80 cm": 500,
                "100x100 cm": 1000
            },
            isiksizFark: {
                "20x20 cm": -1000,
                "30x30 cm": -1000,
                "40x40 cm": -500,
                "50x50 cm": -1000,
                "60x60 cm": -1500,
                "80x80 cm": -750,
                "100x100 cm": -1000

            }
        },
        {
            isim: "PLASTİK LOCA",
            fiyat: 42000,
            resim: [
                "loca1.jpeg", 
                "loca2.jpeg", 
                "loca3.jpeg",
                "loca4.jpeg",
                "loca5.jpeg", 
                "loca6.jpeg",
                "loca7.jpeg"
            ],
            ozellikler: [
                "Ürün plastik loca üst kısmı pistonlarla açılıp kapanabilir.",
                "Minderleri ile birlikte gelir.",
                "Işıklı olup şarjlı ve ya fişli seçenekleri mevcuttur",
                "4 ana 12 ara renk mevcuttur.",
                "Kumandası ile istediğin hızda ve renkte kullanılabilirsiniz."
            ],
        },
        {
            isim: "KARŞILAMA MASASI",
            fiyat: 9000,
            resim: [
                "karşılama1.jpeg", 
                "karşılama2.jpeg", 
                "karşılama3.jpeg"
            ],
            ozellikler: [
                "Ürün plastik loca üst kısmı pistonlarla açılıp kapanabilir.",
                "Minderleri ile birlikte gelir.",
                "Işıklı olup şarjlı ve ya fişli seçenekleri mevcuttur",
                "4 ana 12 ara renk mevcuttur.",
                "Kumandası ile istediğin hızda ve renkte kullanılabilirsiniz."
            ],
             sarjliFark: {
                "40X40X40 cm": 1000

            },
            isiksizFark: {
                "44-40-175 cm": -1000

            }
        },
        {
            isim: "IŞIKLI SİLİNDİR",
            fiyat: 9000,
            resim: [
                "silindir1.jpeg", 
                "silindir2.jpeg" 
            ],
            ozellikler: [
                "Göz alıcı ışık efektleri",
                "Renk değiştirebilen LED ışıklar",
                "Uzun ömürlü batarya",
                "Kolay taşınabilir tasarım"
            ],
            sarjliFark: {
                "10x10 cm": 1000,
                "20x20 cm": 1500,
                "30x30 cm": 2000
            }
        },
        {
            isim: "BAR KOLTUĞU",
            fiyat: 8000,
            resim: [
                "barkoltuğu1.jpeg", 
                "barkoltuğu2.jpeg", 
                "barkoltuğu3.jpeg",
                "barkoltuğu4.jpeg"
            ],
            ozellikler: [
                "Polietilen malzemeden imal edilmektedir.",
                "RGB Led 12V Batarya Pil veya Adaptör ile çalışmaktadır.",
                "60X60X60",
                "Uzaktan kumanda sistemi ile ışık geçişleri, renk ayarı ve açma/kapama yapılmaktadır.",
                "Ürünlerimiz adet fiyatı üzerinden listelenmiştir."
            ],
            sarjliFark: {
                "40X40X40 cm": 1000

            },
            isiksizFark: {
                "44-40-175 cm": -1000

            }
        },
        {
            isim: "DEKOR BURGU",
            fiyat: 15000,
            resim: [
                "dekor1.jpg", 
                "dekor2.jpg", 
                "dekor3.jpg"
            ],
            ozellikler: [
                "Polietilen malzemeden imal edilmektedir.",
                "RGB Led 12V Batarya Pil veya Adaptör ile çalışmaktadır.",
                "Uzaktan kumanda sistemi ile ışık geçişleri, renk ayarı ve açma/kapama yapılmaktadır.",
                "Ürünlerimiz adet fiyatı üzerinden listelenmiştir."
            ],
            sarjliFark: {
                "40X40X40 cm": 2000

            },
            isiksizFark: {
                "44-40-175 cm": -2000

            }
        },
        {
            isim: "KOLON AYDINLATMA",
            fiyat: 10000,
            resim: [
                "kolon1.png", 
                "kolon2.png", 
                "kolon3.png"
            ],
            ozellikler: [
                "Polietilen malzemeden imal edilmektedir.",
                "RGB Led 12V Batarya Pil veya Adaptör ile çalışmaktadır.",
                "Uzaktan kumanda sistemi ile ışık geçişleri, renk ayarı ve açma/kapama yapılmaktadır.",
                "Ürünlerimiz adet fiyatı üzerinden listelenmiştir."
            ],
            sarjliFark: {
                "40X40X40 cm": 1000

            },
            isiksizFark: {
                "44-40-175 cm": -1000

            }
        },
         {
            isim: "YARIM DAİRE BAR MASASI",
            fiyat: 42000,
            resim: [
                "yarım1.jpeg", 
                "yarım2.jpeg" 
            ],
            ozellikler: [
                "Polietilen malzemeden imal edilmektedir.",
                "RGB Led 12V Batarya Pil veya Adaptör ile çalışmaktadır.",
                "60X60X60",
                "Uzaktan kumanda sistemi ile ışık geçişleri, renk ayarı ve açma/kapama yapılmaktadır.",
                "Ürünlerimiz adet fiyatı üzerinden listelenmiştir."
            ],
            sarjliFark: {
                "40X40X40 cm": 2200

            },
            isiksizFark: {
                "44-40-175 cm": -2000

            }
        },
        {
            isim: "KÜP OTURMA GRUBU",
            fiyat: 30000,
            resim: [
                "küpoturma1.jpeg", 
                "küpoturma2.jpeg", 
                "küpoturma3.jpeg"     
            ],
            ozellikler: [
                "Polietilen malzemeden imal edilmektedir.",
                "RGB Led 12V Batarya Pil veya Adaptör ile çalışmaktadır.",
                "60X60X60",
                "Uzaktan kumanda sistemi ile ışık geçişleri, renk ayarı ve açma/kapama yapılmaktadır.",
                "Ürünlerimiz adet fiyatı üzerinden listelenmiştir."
            ],
            sarjliFark: {
                "40X40X40 cm": 2000

            },
            isiksizFark: {
                "44-40-175 cm": -5000

            }
        },
                {
            isim: "PAPATYA OTURMA GRUBU",
            fiyat: 35000,
            resim: [
                "papatya1.jpeg", 
                "papatya2.jpeg", 
                "papatya3.jpeg",
                "papatya4.jpeg", 
                "papatya5.jpeg", 
                "papatya6.jpeg" 
            ],
            ozellikler: [
                "Polietilen malzemeden imal edilmektedir.",
                "RGB Led 12V Batarya Pil veya Adaptör ile çalışmaktadır.",
                "60X60X60",
                "Uzaktan kumanda sistemi ile ışık geçişleri, renk ayarı ve açma/kapama yapılmaktadır.",
                "Ürünlerimiz adet fiyatı üzerinden listelenmiştir."
            ],
            sarjliFark: {
                "40X40X40 cm": 2500

            },
            isiksizFark: {
                "44-40-175 cm": -5000

            }
        },
        {
            isim: "FİLDİŞİ",
            fiyat: 13000,
            resim: [
                "fildisi1.jpeg", 
                "fildisi2.jpeg" 
            ],
            ozellikler: [
                "Göz alıcı ışık efektleri",
                "Renk değiştirebilen LED ışıklar",
                "Uzun ömürlü batarya",
                "Kolay taşınabilir tasarım",
                "Boyutlar En x Genişlik x Yükseklik şeklinde verilmiştir"
            ],
            boyutlar: {
            
                "43x30x210 cm": 0
            },
            sarjliFark: {
                "30x30x100 cm": 1000,
                "30x30x150 cm": 3000,
                "43x30x210 cm": 2000
            },
            isiksizFark: {
                "30x30x100 cm": -1000,
                "30x30x150 cm": -1000,
                "43x30x210 cm": -3000

            }
        },
        {
            isim: "BİSTRO MASA",
            fiyat: 8000,
            resim: [
                "bistro_masa1.jpeg", 
                "bistromasa2.jpeg", 
                "bistromasa3.jpeg", 
                "bistromasa4.jpeg", 
                "bistromasa5.jpeg"  
            ],
            ozellikler: [
                "Ürünümüz:",
                "Polietilen malzemeden imal edilmektedir.",
                "RGB Led 12V Batarya Pil veya Adaptör ile çalışmaktadır.",
                "65*45*105H cm ölçülerindedir",
                "Uzaktan kumanda sistemi ile ışık geçişleri, renk ayarı ve açma/kapama yapılmaktadır.",
                "Ürünlerimiz adet fiyatı üzerinden listelenmiştir."
            ],
            sarjliFark: {
                "60x60 cm": 1000
            },
            isiksizFark: {
                "60x60 cm": -1000

            }
        },
        {
            isim: "MANTAR ABAJUR",
            fiyat: 20000,
            resim: [
                "abajur1.jpeg", 
                "abajur2.jpeg", 
                "abajur3.jpeg", 
                "abajur4.jpeg", 
                "abajur5.jpeg",
                "abajur6.jpeg"  
            ],
            ozellikler: [
                "Polietilen malzemeden imal edilmektedir.",
                "RGB Led 12V Batarya Pil veya Adaptör ile çalışmaktadır.",
                "ÜST ÇAP:44 CM ALT ÇAP:40 YÜKSEKLİK:175",
                "Uzaktan kumanda sistemi ile ışık geçişleri, renk ayarı ve açma/kapama yapılmaktadır.",
                "Ürünlerimiz adet fiyatı üzerinden listelenmiştir."
            ],
            sarjliFark: {
                "44-40-175 cm": 1000

            },
            isiksizFark: {
                "44-40-175 cm": -2000

            }
        },
        {
            isim: "KONİK PLASTİK SAKSI",
            fiyat: 9500,
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
                "50X40X50 cm": 0,
                "70X50X70 cm": 500,
                "90X60X90 cm": 3500
            },
             isiksizFark: {
                "50X40X50 cm": -1000,
                "70X50X70 cm": -1000,
                "90x60x90 cm": -1000

            }

        },
        {
            isim: "BAR MASASI",
            fiyat: 67000,
            resim: [
                "barmasasi1.jpeg", 
                "barmasasi2.jpeg", 
                "barmasasi3.jpeg", 
                "barmasasi4.jpeg"  
            ],
            ozellikler: [
                "Ürün karşılama ve bar masası 7 parçanın birleşimiyle birlikte oluşuyor",
                "Işıklı ve fişli olan modelimiz",
                "4 ana 12 ara renk mevcuttur",
                "Kumandası ile istediğiniz hızda ve renkte kullanabilirsiniz",
                "Ürünün maddesi polietilendir plastiktir",
                "İç çapı 270 cm x Yükselik 120 cm x En 70 cm"
            ],
      
           sarjliFark: {
                "44-40-175 cm": 5000

            },
            isiksizFark: {
                "44-40-175 cm": -2000

            }
        },
        
        {
            isim: "ŞEZLONG",
            fiyat: 8000,
            resim: [
                "şezlong1.jpeg",
                "şezlong2.jpeg",
                "şezlong3.jpeg",
                "şezlong4.jpeg",
                "şezlong5.jpeg",
                "şezlong6.jpeg",
                "şezlong7.jpeg"
            ],
            ozellikler: [
                "Ergonomik tasarım",
                "Dayanıklı malzeme",
                "Kolay taşınabilir",
                "Rahat ve konforlu"
            ]
        }
    ];

    const urunlerContainer = document.getElementById("urunler");
    const sidebarNav = document.getElementById("sidebar-nav");

    urunler.forEach(urun => {
        const urunDiv = document.createElement("div");
        urunDiv.classList.add("urun");
        urunDiv.id = urun.isim.toLowerCase().replace(/\s+/g, '_');

        // Dropdown menüler oluştur
        let dropdownHTML = '<div class="dropdown-container">';
        if (urun.isim === "IŞIKLI KÜRE" || urun.isim === "PLASTİK SAKSI") {
            dropdownHTML += '<select class="urun-boyut-secimi">';
            for (const boyut in urun.boyutlar) {
                dropdownHTML += `<option value="${boyut}">${boyut}</option>`;
            }
            dropdownHTML += '</select>';
        }

        if (urun.sarjliFark !== undefined) {
            dropdownHTML += '<select class="urun-tip-secimi">';
            dropdownHTML += `<option value="fisli">Fişli</option>`;
            dropdownHTML += `<option value="sarjli">Şarjlı</option>`;
            dropdownHTML += '</select>';
        }
        dropdownHTML += '</div>';

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
            <button class="ozellikler" onclick="openModal('${urun.isim}')">Özellikler</button>
            <a href="https://wa.me/905542345454?text=${encodeURIComponent(urun.isim + ' satın almak istiyorum.')}" class="satin-al">Satın Al</a>
        `;

        urunlerContainer.appendChild(urunDiv);

        // Sidebar için ürün isimleri ekleme
        const sidebarItem = document.createElement("a");
        sidebarItem.href = `#${urun.isim.toLowerCase().replace(/\s+/g, '_')}`;
        sidebarItem.textContent = urun.isim;
        sidebarItem.classList.add("sidebar-item");
        sidebarNav.appendChild(sidebarItem);

        // Fiyatı güncelleme işlevi
        const boyutSecimi = urunDiv.querySelector('.urun-boyut-secimi');
        const tipSecimi = urunDiv.querySelector('.urun-tip-secimi');
        
        if (boyutSecimi) {
            boyutSecimi.addEventListener('change', function () {
                updatePrice(urunDiv, urun);
            });
        }

        if (tipSecimi) {
            tipSecimi.addEventListener('change', function () {
                updatePrice(urunDiv, urun);
            });
        }
    });

    function updatePrice(urunDiv, urun) {
        const boyutSecimi = urunDiv.querySelector('.urun-boyut-secimi');
        const tipSecimi = urunDiv.querySelector('.urun-tip-secimi');
        
        let yeniFiyat = urun.fiyat;
        if (boyutSecimi) {
            const secilenBoyut = boyutSecimi.value;
            yeniFiyat += urun.boyutlar[secilenBoyut];
            
            if (tipSecimi) {
                const secilenTip = tipSecimi.value;
                if (secilenTip === "sarjli") {
                    yeniFiyat += urun.sarjliFark[secilenBoyut];
                }
            }
        } else if (tipSecimi) {
            const secilenTip = tipSecimi.value;
            if (secilenTip === "sarjli") {
                yeniFiyat += urun.sarjliFark[Object.keys(urun.sarjliFark)[0]];
            }
        }
        
        urunDiv.querySelector('.urun-fiyat').textContent = `Fiyat: ${yeniFiyat} TL`;
    }

    window.changeImage = function (event, direction) {
        const images = event.target.closest('.urun-gorseller').querySelectorAll('.urun-gorsel-container');
        const currentIndex = Array.from(images).findIndex(img => img.style.display !== 'none');
        const nextIndex = (currentIndex + direction + images.length) % images.length;

        images[currentIndex].style.display = 'none';
        images[nextIndex].style.display = 'block';
    };

    // Modal açma ve kapatma işlevleri
window.openModal = function(productName) {
    const modal = document.getElementById("myModal");
    const featuresList = document.getElementById("product-features");
    featuresList.innerHTML = ""; // Listeyi temizle

    // Ürün özelliklerini ekle
    const urun = urunler.find(item => item.isim === productName);
    urun.ozellikler.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    modal.style.display = "block";
};

// Modal kapatma işlevi
window.closeModal = function() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
};

// Boşluğa tıklanırsa modalı kapatma işlevi
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
        closeModal();
    }
};

    // Filtreleme sistemi
    document.getElementById('filter-input').addEventListener('input', function(event) {
        const filterText = event.target.value.toLowerCase();
        const urunler = document.querySelectorAll('.urun');
        urunler.forEach(urun => {
            const urunIsim = urun.querySelector('h2').textContent.toLowerCase();
            if (urunIsim.includes(filterText)) {
                urun.style.display = 'block';
            } else {
                urun.style.display = 'none';
            }
        });

        // Sidebar filtreleme
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(filterText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
