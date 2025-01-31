document.addEventListener("DOMContentLoaded", function () {
    const urunler = [
        {
            isim: "IŞIKLI TOP",
            fiyat: "2500 TL",
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
            ]
        },
        {
            isim: "BİSTRO MASA",
            fiyat: "6500 TL",
            resim: [
                "bistro_masa1.jpeg", 
                "bistromasa2.jpeg", 
                "bistromasa3.jpeg", 
                "bistromasa4.jpeg", 
                "bistromasa5.jpeg"  
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
            ]
        }
    ];

    const urunlerContainer = document.getElementById("urunler");

    urunler.forEach(urun => {
        const urunDiv = document.createElement("div");
        urunDiv.classList.add("urun");

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

        let ozelliklerHTML = '<div class="dropdown"><button class="dropbtn">Özellikler</button><div class="dropdown-content">';
        urun.ozellikler.forEach(ozellik => {
            ozelliklerHTML += `<p>${ozellik}</p>`;
        });
        ozelliklerHTML += '</div></div>';

        urunDiv.innerHTML = `
            <div class="urun-gorseller">
                ${imagesHTML}
                <button class="prev" onclick="changeImage(event, -1)">←</button>
                <button class="next" onclick="changeImage(event, 1)">→</button>
            </div>
            <h2>${urun.isim}</h2>
            <p>Fiyat: ${urun.fiyat}</p>
            <a href="https://wa.me/905542345454?text=${encodeURIComponent(urun.isim + ' satın almak istiyorum.')}" class="satin-al">Satın Al</a>
            ${ozelliklerHTML}
        `;

        urunlerContainer.appendChild(urunDiv);
    });

    window.changeImage = function (event, direction) {
        const images = event.target.closest('.urun-gorseller').querySelectorAll('.urun-gorsel-container');
        const currentIndex = Array.from(images).findIndex(img => img.style.display !== 'none');
        const nextIndex = (currentIndex + direction + images.length) % images.length;

        images[currentIndex].style.display = 'none';
        images[nextIndex].style.display = 'block';
    };

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.style.display === "block") {
                    openDropdown.style.display = "none";
                }
            }
        }
    };

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("dropbtn")) {
            let dropdownContent = event.target.nextElementSibling;
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        }
    });
});
