const btn = document.querySelectorAll(".btn");
let screenPanel = document.querySelector("#screen");
let PanelTextContent = screenPanel.textContent
const numbers = document.querySelectorAll(".numbers");
const esittir = document.querySelector("#esittir");
const AC = document.querySelector("#AC");
const del = document.querySelector("#del");
const Tablo = document.querySelector("table")
const TabloDiv = document.querySelector(".calculatorParent")



btn.forEach(btnclick => {

    //METNİN SEÇİLEMEMESİ
    btnclick.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });

    //!TIKLAMA OLAYI
    btnclick.addEventListener('click', clicked);

    function clicked() {
        //0'ı silip yazdır
        if (screenPanel.textContent == "0") {
            screenPanel.textContent = "";
        };
        //*yazdir
        //console.log("butona tıklandı");
        screenPanel.textContent += this.textContent;


        //!btn animasyon

        btnclick.style.borderRadius = "0px";
        btnclick.style.background = "rgb(25, 25, 25)";
        btnclick.style.animation = "tıklamaAnimasyonu 1s linear forwards";
        this.style.color = "green"


        //animasyon süresi
        setTimeout(() => {
            btnclick.style.borderRadius = "";
            btnclick.style.background = "";
            btnclick.style.fontSize = "";
            btnclick.style.animation = "";
            this.style.color = ""
        }, 100);


        //!SİLME İŞLEMLERİ

        //AC tanımlamak
        if (this === AC) {
            TabloDiv.style.animation = "";
            screenPanel.style.color = "#17ff00"
            setTimeout(() => {
                screenPanel.style.color = ""
            }, 100);
            screenPanel.textContent = "0";
            //console.log("sıfırla");
            return;
        }
        //delete tuşu
        if (this === del) {
            PanelTextContent = screenPanel.textContent;
            TabloDiv.style.animation = "";
            screenPanel.style.color = "red"
            setTimeout(() => {
                screenPanel.style.color = ""
            }, 100);
            if (PanelTextContent.length > 0) {
                PanelTextContent = PanelTextContent.slice(0, -4);
                screenPanel.textContent = PanelTextContent;
            };
            if (PanelTextContent.length === 0) {
                screenPanel.textContent = "0"; // Ekran boşsa "0" olarak ayarla

            };
        };

        //!esittir ile hesaplat
        esittir.addEventListener('click', hesaplatmak);


        //METNİN SEÇİLEMEMESİ
        esittir.addEventListener('mousedown', function (event) {
            event.preventDefault();
        });

        function hesaplatmak() {
            console.log("tıklandı");



            //!esittir animasyonu

            esittir.style.borderRadius = "0px";
            esittir.style.background = "rgb(25, 25, 25)";
            esittir.style.animation = "tıklamaAnimasyonu .1s linear forwards";
            screenPanel.style.color = "#17ff00";


            //animasyon süresi
            setTimeout(() => {
                esittir.style.borderRadius = "";
                esittir.style.background = "";
                esittir.style.fontSize = "";
                esittir.style.animation = "";
                screenPanel.style.color = "";
            }, 100);


            //tabloAnimasyonu
            Tablo.style.animation = "TabloAnimasyonu .3s linear forwards";

            setTimeout(() => {
                Tablo.style.animation = "";
            }, 300);




            //toplama
            if (screenPanel.textContent.includes("+")) {
                //console.log("+bulundu");
                let screenPanelDizi = screenPanel.textContent.split("+");
                //console.log(screenPanelDizi);
                let toplamSonuc = 0;
                //hesaplat
                screenPanelDizi.forEach(function (toplama) {
                    toplamSonuc += Number(toplama);
                    screenPanel.textContent = toplamSonuc;
                });
            };

            //çarpma
            if (screenPanel.textContent.includes("*")) {
                //console.log("*bulundu");
                let screenPanelDizi = screenPanel.textContent.split("*");
                //console.log(screenPanelDizi);
                let toplamSonuc = 1;
                //hesaplat
                screenPanelDizi.forEach(function (carpma) {
                    toplamSonuc *= Number(carpma);
                    screenPanel.textContent = toplamSonuc;
                });
            };

            //çıkarma
            if (screenPanel.textContent.includes("-")) {
                //console.log("-bulundu");
                let screenPanelDizi = screenPanel.textContent.split("-");
                //console.log(screenPanelDizi);
                let toplamSonuc = Number(screenPanelDizi[0]); // İlk elemanı başlangıç değeri olarak kullan
                //hesaplat
                screenPanelDizi.slice(1).forEach(function (cikarma) {
                    toplamSonuc -= Number(cikarma);
                });
                screenPanel.textContent = toplamSonuc;
            };

            //bölme
            if (screenPanel.textContent.includes("/")) {
                //console.log("/ bulundu");
                let screenPanelDizi = screenPanel.textContent.split("/");
                //console.log(screenPanelDizi);

                if (Number(screenPanelDizi[1]) !== 0) { // Payda sıfır olmamalı
                    let bolmeSonuc = Number(screenPanelDizi[0]); // İlk elemanı başlangıç değeri olarak kullan
                    //hesaplat
                    screenPanelDizi.slice(1).forEach(function (bolum) {
                        bolmeSonuc /= Number(bolum);
                    });
                    screenPanel.textContent = bolmeSonuc;
                } else {
                    //console.log("Payda sıfır olamaz");
                    screenPanel.innerHTML = screenPanelDizi[0] + '<span style="color: red; animation: PaydaAnimasyonu .5s linear infinite">/0</span>';
                    TabloDiv.style.animation = "PaydaAnimasyonuTablo .1s linear infinite";
                };
            };
        };
    };
});

//