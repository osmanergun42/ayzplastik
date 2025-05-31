import { db, auth, provider } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", async function () {
    const urunlerContainer = document.getElementById("urunler");
    const filtreContainer = document.getElementById("filters");
    const loginBtn = document.getElementById("loginBtn");
    const adminBtn = document.getElementById("adminPanelBtn");

    // Kullanıcı girişi kontrolü
auth.onAuthStateChanged((user) => {
    if (user) {
        loginBtn.textContent = "Çıkış Yap";
        loginBtn.onclick = () => signOut(auth);

        const adminEmails = ["osmane722@gmail.com", "eneeesergunn@gmail.com"];

        if (adminEmails.includes(user.email)) {
            adminBtn.style.display = "inline-block";
        } else {
            adminBtn.style.display = "none";
        }
    } else {
        loginBtn.textContent = "Giriş Yap";
        loginBtn.onclick = () => signInWithPopup(auth, provider);
        adminBtn.style.display = "none";
    }
});


    // Firestore'dan ürünleri çek
    const urunlerRef = collection(db, "urunler");
    const urunSnapshot = await getDocs(urunlerRef);
    const urunler = urunSnapshot.docs.map(doc => doc.data());

    // Kategorileri belirle
    let kategoriler = new Set();
    urunler.forEach(urun => {
        if (urun.isim.includes("KÜRE")) kategoriler.add("KÜRE");
        else if (urun.isim.includes("LOCA")) kategoriler.add("LOCA");
        else if (urun.isim.includes("MASA")) kategoriler.add("MASA");
        else if (urun.isim.includes("ŞEZLONG")) kategoriler.add("ŞEZLONG");
        else if (urun.isim.includes("BAR")) kategoriler.add("BAR");
        else if (urun.isim.includes("DEKOR")) kategoriler.add("DEKOR");
        else if (urun.isim.includes("SAKSI")) kategoriler.add("SAKSI");
        else if (urun.isim.includes("ABAJUR")) kategoriler.add("ABAJUR");
        else kategoriler.add("DİĞER");
    });

    // Filtre butonları
    const tumBtn = document.createElement("button");
    tumBtn.textContent = "TÜMÜ";
    tumBtn.onclick = () => filtreUygula("TÜMÜ");
    filtreContainer.appendChild(tumBtn);

    kategoriler.forEach(kat => {
        const btn = document.createElement("button");
        btn.textContent = kat;
        btn.onclick = () => filtreUygula(kat);
        filtreContainer.appendChild(btn);
    });

    // İlk başta tüm ürünleri göster
    filtreUygula("TÜMÜ");

    function filtreUygula(kategori) {
        urunlerContainer.innerHTML = "";  // Temizle

        let filtreliUrunler = kategori === "TÜMÜ" 
            ? urunler 
            : urunler.filter(urun => urun.isim.includes(kategori));

        filtreliUrunler.forEach((urun, index) => {
            const urunDiv = document.createElement("div");
            urunDiv.classList.add("urun-card");

            let imageGallery = '';
            urun.resim.forEach((resim, i) => {
                imageGallery += `<div class="urun-gorsel-container" style="display:${i === 0 ? 'block' : 'none'}">
                                    <img src="${resim}" alt="${urun.isim}">
                                 </div>`;
            });

            let boyutHTML = '';
            if (urun.boyutlar) {
                boyutHTML = `<select class="boyut-secimi">
                                ${Object.keys(urun.boyutlar).map(boyut => `<option value="${boyut}">${boyut}</option>`).join('')}
                             </select>`;
            }

            let tipHTML = '';
            if (urun.sarjliFark || urun.isiksizFark) {
                tipHTML = `<select class="tip-secimi">
                                <option value="normal">Normal</option>
                                ${urun.sarjliFark ? '<option value="sarjli">Şarjlı</option>' : ''}
                                ${urun.isiksizFark ? '<option value="isiksiz">Işıksız</option>' : ''}
                            </select>`;
            }

            urunDiv.innerHTML = `
                <div class="urun-gorseller">
                    ${imageGallery}
                    <button class="prev" onclick="changeImage(${index}, -1)">←</button>
                    <button class="next" onclick="changeImage(${index}, 1)">→</button>
                </div>
                <h3>${urun.isim}</h3>
                <p class="fiyat">Fiyat: ${urun.fiyat} TL</p>
                ${boyutHTML}
                ${tipHTML}
                <button class="details-btn" onclick="openModal(${index})">Özellikler</button>
                <a class="buy-btn" href="https://wa.me/905542345454?text=${encodeURIComponent(urun.isim + ' satın almak istiyorum.')}" target="_blank">Satın Al</a>
            `;
            urunlerContainer.appendChild(urunDiv);

            const fiyatGuncelle = () => {
                let yeniFiyat = urun.fiyat;
                const boyutSecimi = urunDiv.querySelector(".boyut-secimi");
                const tipSecimi = urunDiv.querySelector(".tip-secimi");

                if (boyutSecimi) {
                    const seciliBoyut = boyutSecimi.value;
                    yeniFiyat += urun.boyutlar[seciliBoyut];

                    if (tipSecimi) {
                        const seciliTip = tipSecimi.value;
                        if (seciliTip === "sarjli" && urun.sarjliFark?.[seciliBoyut]) {
                            yeniFiyat += urun.sarjliFark[seciliBoyut];
                        }
                        if (seciliTip === "isiksiz" && urun.isiksizFark?.[seciliBoyut]) {
                            yeniFiyat += urun.isiksizFark[seciliBoyut];
                        }
                    }
                } else if (tipSecimi) {
                    const seciliTip = tipSecimi.value;
                    if (seciliTip === "sarjli") yeniFiyat += Object.values(urun.sarjliFark ?? {})[0] || 0;
                    if (seciliTip === "isiksiz") yeniFiyat += Object.values(urun.isiksizFark ?? {})[0] || 0;
                }

                urunDiv.querySelector(".fiyat").innerText = `Fiyat: ${yeniFiyat} TL`;
            };

            urunDiv.querySelectorAll("select").forEach(select => {
                select.addEventListener("change", fiyatGuncelle);
            });
        });
    }

    // Modal
    window.openModal = function(index) {
        const modalHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeModal()">&times;</span>
                <h3>${urunler[index].isim}</h3>
                <ul>${urunler[index].ozellikler.map(ozellik => `<li>${ozellik}</li>`).join('')}</ul>
            </div>`;
        document.getElementById("modal").innerHTML = modalHTML;
        document.getElementById("modal").style.display = "block";
    };

    window.closeModal = function() {
        document.getElementById("modal").style.display = "none";
    };

    window.onclick = function(e) {
        if (e.target.id === "modal") closeModal();
    };

    window.changeImage = function(productIndex, direction) {
        const urunDiv = document.querySelectorAll(".urun-card")[productIndex];
        const images = urunDiv.querySelectorAll(".urun-gorsel-container");
        let current = Array.from(images).findIndex(img => img.style.display === 'block');
        let next = (current + direction + images.length) % images.length;
        images[current].style.display = 'none';
        images[next].style.display = 'block';
    };
});
