= urunler.find(item => item.isim === productName);
        urun.ozellikler.forEach(feature => {
            const li = document.createElement("li");
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        modal.style.display = "block";
    };

    window.closeModal = function() {
        document.getElementById("myModal").style.display = "none";
    };

    window.onclick = function(event) {
        const modal = document.getElementById("myModal");
        if (event.target === modal) {
            modal.style.display = "none";
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
    });

    // Instagram yönlendirmesi
    document.querySelector('.instagram-link').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = "https://www.instagram.com/ayzplastik?igsh=MWJ6c2djYTdoeTVhag==";
    });
});
