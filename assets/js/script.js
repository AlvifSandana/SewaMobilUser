// Deklarasi array dan variabel global
var tmp_totalbayar = 0;
var tmp_mobilsewa = new Array();
var totalfinal = 0;
var datasewa = new Array();
var datamobil = new Array();
datamobil = [{
        merk: "Toyota Avanza",
        stok: 2,
        harga: 200000
    }, {
        merk: "Daihatsu Xenia",
        stok: 2,
        harga: 250000
    }, {
        merk: "Suzuki Ertiga",
        stok: 2,
        harga: 220000
    }, {
        merk: "Honda Jazz",
        stok: 2,
        harga: 300000
    }, {
        merk: "Toyota Yaris",
        stok: 2,
        harga: 350000
    }, {
        merk: "Kijang Innova",
        stok: 2,
        harga: 240000
    }, {
        merk: "Datsun Go",
        stok: 2,
        harga: 270000
    }, {
        merk: "Lancer Evo X",
        stok: 2,
        harga: 400000
    }, {
        merk: "Pajero Sport",
        stok: 2,
        harga: 320000
    }, {
        merk: "Mazda 8",
        stok: 2,
        harga: 280000
    }];
// Fungsi menampilkan data per mobil
function show() {
    for (var i = 0; i < datamobil.length; i++) {
        document.getElementById("merk" + i).innerHTML = datamobil[i].merk;
        document.getElementById("stok" + i).innerHTML = datamobil[i].stok;
        document.getElementById("harga" + i).innerHTML = "Rp. " + datamobil[i].harga + ".00";
    }
}
function pesan(indeks, btnCancle) {
    // Deklarasi Variabel
    var btnBatal = document.getElementById(btnCancle);
    var lblstok = document.getElementById("stok" + indeks);
    var total = 0;
    var stok = 0;
    stok = datamobil[indeks].stok;
    // input data mobil yang disewa
    switch (stok) {
        case 0:
            alert('Maaf, stok mobil ini habis.\nSilahkan pilih mobil yang tersedia.');
            break;
        case 1:
            tmp_mobilsewa.push(datamobil[indeks].merk);
            total += datamobil[indeks].harga;
            tmp_totalbayar += total;
            datamobil[indeks].stok -= 1;
            lblstok.innerHTML = datamobil[indeks].stok;
            btnBatal.removeAttribute("hidden");
            break;
        case 2:
            tmp_mobilsewa.push(datamobil[indeks].merk);
            total += datamobil[indeks].harga;
            tmp_totalbayar += total;
            datamobil[indeks].stok -= 1;
            lblstok.innerHTML = datamobil[indeks].stok;
            btnBatal.removeAttribute("hidden");
            break;
    }
}
function batalpesan(indeks, btnCancle) {
    // reset totalfinal dan datamobil[indeks].stok
    tmp_totalbayar = 0;
    datamobil[indeks].stok = 2;
    tmp_mobilsewa.length = 0;
    // hide button
    document.getElementById(btnCancle).setAttribute("hidden", "");
    // show stok
    document.getElementById("stok" + indeks).innerHTML = datamobil[indeks].stok;
}
function proses() {
    // Deklarasi Variabel
    var namapenyewa = "";
    var noktp = "";
    var merksewa = "";
    // input namapenyewa dan noktp
    namapenyewa = document.getElementById("namapenyewa").value;
    noktp = document.getElementById("NIK").value;
    // output ke modal
    document.getElementById("namapenyewa_final").value = namapenyewa;
    document.getElementById("noktp_final").value = noktp;
    document.getElementById("txtbiayatotal").value = tmp_totalbayar.toString();
    for (var i = 0; i < tmp_mobilsewa.length; i++) {
        merksewa += "<li>" + tmp_mobilsewa[i] + "</li>";
    }
    document.getElementById("listmobil").innerHTML = merksewa;
}
function sewa() {
    // Deklarasi Variabel
    var namapenyewa = "";
    var noktp = "";
    // input namapenyewa dan noktp
    namapenyewa = document.getElementById("namapenyewa").value;
    noktp = document.getElementById("NIK").value;
    totalfinal = tmp_totalbayar;
    // validasi
    if ((namapenyewa && noktp) != "") {
        // push ke datasewa
        datasewa.push({
            'nama': namapenyewa,
            'id': noktp,
            'mobil': tmp_mobilsewa,
            'totalbayar': totalfinal
        });
        // reset temporary variable
        tmp_totalbayar = 0;
        tmp_mobilsewa.length = 0;
        // reset input
        // save to localStorage
        saveLocal(datasewa);
        window.open("kuitansi.html", "_blank");
    }
    else {
        alert('Isi data diri terlebih dahulu');
    }
}
function saveLocal(data) {
    var simpan;
    simpan = JSON.stringify(data);
    localStorage.setItem("kuitansi", simpan);
}
