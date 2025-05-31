import { db, storage } from "./firebase-config.js";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

// ✅ Resim sıkıştırma fonksiyonu (mobil uyum için)
async function resizeImage(file, maxWidth = 1024, maxHeight = 1024) {
    return new Promise((resolve) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = e => img.src = e.target.result;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width, height = img.height;
            if (width > height && width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            } else if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.8);
        };
        reader.readAsDataURL(file);
    });
}

// ✅ Modal fonksiyonu
function showConfirmModal(message, onConfirm) {
    const modal = document.getElementById("confirmModal");
    document.getElementById("confirmText").innerText = message;
    modal.style.display = "block";

    document.getElementById("confirmYes").onclick = () => { modal.style.display = "none"; onConfirm(); };
    document.getElementById("confirmNo").onclick = () => { modal.style.display = "none"; };
}

// ✅ ÜRÜN EKLEME
async function urunEkle() {
    const isim = document.getElementById("isim").value.trim();
    const fiyat = parseFloat(document.getElementById("fiyat").value);
    const ozellikler = document.getElementById("ozellikler").value.split(",").map(s => s.trim());
    const dosyalar = document.getElementById("resimDosya").files;

    if (!isim || isNaN(fiyat) || ozellikler.length === 0 || dosyalar.length === 0) {
        alert("Lütfen tüm alanları doldurun ve resim seçin.");
        return;
    }

    showConfirmModal("Bu ürünü eklemek istediğinize emin misiniz?", async () => {
        try {
            let urlList = [];

            for (let dosya of dosyalar) {
                const compressed = await resizeImage(dosya);
                const storageRef = ref(storage, `urunler/${Date.now()}-${dosya.name}`);
                const snapshot = await uploadBytes(storageRef, compressed);
                const downloadURL = await getDownloadURL(snapshot.ref);
                urlList.push(downloadURL);
            }

            await addDoc(collection(db, "urunler"), {
                isim, fiyat, ozellikler, resim: urlList
            });

            alert("Ürün başarıyla eklendi.");
            temizleForm();
            urunleriListele();
            urunFiltreOlustur();

        } catch (err) {
            console.error("Hata oluştu: ", err);
            alert("Bir hata oluştu.");
        }
    });
}

// ✅ ÜRÜN GÜNCELLEME
async function urunGuncelle() {
    const urunId = document.getElementById("urunId").value;
    const isim = document.getElementById("isim").value.trim();
    const fiyat = parseFloat(document.getElementById("fiyat").value);
    const ozellikler = document.getElementById("ozellikler").value.split(",").map(s => s.trim());
    const dosyalar = document.getElementById("resimDosya").files;

    if (!isim || isNaN(fiyat) || ozellikler.length === 0) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    showConfirmModal("Kaydetmek istediğinize emin misiniz?", async () => {
        try {
            const urunRef = doc(db, "urunler", urunId);
            const eskiVeri = (await getDoc(urunRef)).data();
            let urlList = [];

            if (dosyalar.length > 0) {
                for (let eskiUrl of eskiVeri.resim) {
                    const eskiRef = ref(storage, decodeURIComponent(new URL(eskiUrl).pathname.split("/o/")[1].split("?")[0]));
                    await deleteObject(eskiRef).catch(err => console.warn("Eski görsel silinemedi: ", err));
                }

                for (let dosya of dosyalar) {
                    const compressed = await resizeImage(dosya);
                    const storageRef = ref(storage, `urunler/${Date.now()}-${dosya.name}`);
                    const snapshot = await uploadBytes(storageRef, compressed);
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    urlList.push(downloadURL);
                }
            }

            await updateDoc(urunRef, {
                isim, fiyat, ozellikler, resim: urlList.length > 0 ? urlList : eskiVeri.resim
            });

            alert("Ürün güncellendi.");
            temizleForm();
            urunleriListele();
            urunFiltreOlustur();

        } catch (err) {
            console.error("Güncelleme Hatası:", err);
            alert("Bir hata oluştu.");
        }
    });
}

// ✅ ÜRÜNLERİ LİSTELE
async function urunleriListele() {
    const urunListesi = document.getElementById("urunListesi");
    urunListesi.innerHTML = "";

    const snapshot = await getDocs(collection(db, "urunler"));
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const urunDiv = document.createElement("div");
        urunDiv.className = "urun-card";
        urunDiv.innerHTML = `
            <div class="urun-info">
                <h3>${data.isim}</h3>
                <img src="${data.resim[0]}" alt="${data.isim}">
                <p>Fiyat: ${data.fiyat} TL</p>
                <p>Özellikler: ${data.ozellikler.join(", ")}</p>
            </div>
            <div class="urun-buttons">
                <button onclick="silUrun('${docSnap.id}')">Sil</button>
                <button onclick="duzenleUrun('${docSnap.id}')">Düzenle</button>
            </div>
        `;
        urunListesi.appendChild(urunDiv);
    });
}

// ✅ ÜRÜN SİLME
window.silUrun = function (id) {
    showConfirmModal("Bu ürünü silmek istediğinize emin misiniz?", async () => {
        const urunRef = doc(db, "urunler", id);
        const docSnap = await getDoc(urunRef);
        const data = docSnap.data();

        for (let url of data.resim) {
            const storageRef = ref(storage, decodeURIComponent(new URL(url).pathname.split("/o/")[1].split("?")[0]));
            await deleteObject(storageRef).catch(err => console.warn("Görsel silinemedi: ", err));
        }

        await deleteDoc(urunRef);
        alert("Ürün silindi.");
        urunleriListele();
        urunFiltreOlustur();
    });
}

// ✅ ÜRÜN DÜZENLEME
window.duzenleUrun = async function (id) {
    const urunRef = doc(db, "urunler", id);
    const docSnap = await getDoc(urunRef);
    const data = docSnap.data();

    document.getElementById("urunId").value = id;
    document.getElementById("isim").value = data.isim;
    document.getElementById("fiyat").value = data.fiyat;
    document.getElementById("ozellikler").value = data.ozellikler.join(", ");
}

// ✅ FORM TEMİZLEME
function temizleForm() {
    document.getElementById("urunId").value = "";
    document.getElementById("isim").value = "";
    document.getElementById("fiyat").value = "";
    document.getElementById("ozellikler").value = "";
    document.getElementById("resimDosya").value = "";
}

// ✅ SELECT2 FİLTRELEME
async function urunFiltreOlustur() {
    const selectFilter = $('#urunFilter');
    selectFilter.empty();

    const snapshot = await getDocs(collection(db, "urunler"));
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        selectFilter.append(new Option(data.isim, docSnap.id));
    });

    $('#urunFilter').select2({
        placeholder: "Ürün ara...",
        allowClear: true
    });

    $('#urunFilter').on('change', async function () {
        const urunId = $(this).val();
        if (!urunId) {
            urunleriListele();
            return;
        }

        const urunRef = doc(db, "urunler", urunId);
        const docSnap = await getDoc(urunRef);
        const data = docSnap.data();

        const urunListesi = document.getElementById("urunListesi");
        urunListesi.innerHTML = "";

        const urunDiv = document.createElement("div");
        urunDiv.className = "urun-card";
        urunDiv.innerHTML = `
            <div class="urun-info">
                <h3>${data.isim}</h3>
                <img src="${data.resim[0]}" alt="${data.isim}">
                <p>Fiyat: ${data.fiyat} TL</p>
                <p>Özellikler: ${data.ozellikler.join(", ")}</p>
            </div>
            <div class="urun-buttons">
                <button onclick="silUrun('${docSnap.id}')">Sil</button>
                <button onclick="duzenleUrun('${docSnap.id}')">Düzenle</button>
            </div>
        `;
        urunListesi.appendChild(urunDiv);
    });
}

// ✅ SAYFA YÜKLENİNCE ÇALIŞTIR
window.addEventListener("DOMContentLoaded", () => {
    urunleriListele();
    urunFiltreOlustur();

    document.getElementById("ekleBtn").addEventListener("click", () => { urunEkle(); });
    document.getElementById("kaydetBtn").addEventListener("click", () => { urunGuncelle(); });
});
