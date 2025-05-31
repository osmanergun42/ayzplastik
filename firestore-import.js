import admin from "firebase-admin";
import fs from "fs";

// JSON dosyasını oku ve parse et
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccount.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

import urunler from "./urunler.js";

async function importData() {
    try {
        for (const urun of urunler) {
            await db.collection("urunler").add(urun);
            console.log(`${urun.isim} eklendi`);
        }
        console.log("Tüm ürünler başarıyla yüklendi.");
    } catch (e) {
        console.error("Hata oluştu: ", e);
    }
}

importData();
