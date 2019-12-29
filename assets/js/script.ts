// Deklarasi array dan variabel global
let tmp_totalbayar: number = 0;
let tmp_mobilsewa: string[] = new Array()
let totalfinal: number = 0;
let datasewa: Array<any> = new Array();
let datamobil: Array<any> = new Array();
datamobil = [{
    merk: "Toyota Avanza",
    stok: 2,
    harga: 200000
},{
    merk: "Daihatsu Xenia",
    stok: 2,
    harga: 250000
},{
    merk: "Suzuki Ertiga",
    stok: 2,
    harga: 220000
},{
    merk: "Honda Jazz",
    stok: 2,
    harga: 300000
},{
    merk: "Toyota Yaris",
    stok: 2,
    harga: 350000
},{
    merk: "Kijang Innova",
    stok: 2,
    harga: 240000
},{
    merk: "Datsun Go",
    stok: 2,
    harga: 270000
},{
    merk: "Lancer Evo X",
    stok: 2, 
    harga: 400000
},{
    merk: "Pajero Sport",
    stok: 2,
    harga: 320000
},{
    merk: "Mazda 8",
    stok: 2,
    harga: 280000
}];

// Fungsi menampilkan data per mobil
function show(){
    for(let i=0; i < datamobil.length;i++){
        (<HTMLElement>document.getElementById("merk"+i)).innerHTML = datamobil[i].merk;
        (<HTMLElement>document.getElementById("stok"+i)).innerHTML = datamobil[i].stok;
        (<HTMLElement>document.getElementById("harga"+i)).innerHTML = "Rp. " + datamobil[i].harga + ".00";
    }
}

function pesan(indeks: number, btnCancle: string){
    // Deklarasi Variabel
    let btnBatal: HTMLElement = (<HTMLElement>document.getElementById(btnCancle))
    let lblstok: HTMLElement = (<HTMLElement>document.getElementById("stok"+indeks));
    let total: number = 0;
    let stok: number = 0;
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

function batalpesan(indeks: number, btnCancle: string){
    // reset totalfinal dan datamobil[indeks].stok
    tmp_totalbayar = 0;
    datamobil[indeks].stok = 2;
    tmp_mobilsewa.length = 0;
    // hide button
    (<HTMLElement>document.getElementById(btnCancle)).setAttribute("hidden","");
    // show stok
    (<HTMLElement>document.getElementById("stok"+indeks)).innerHTML = datamobil[indeks].stok;
}

function proses(){
    // Deklarasi Variabel
    let namapenyewa: string = "";
    let noktp: string = "";
    let merksewa: string = ""
    // input namapenyewa dan noktp
    namapenyewa = (<HTMLInputElement>document.getElementById("namapenyewa")).value;
    noktp = (<HTMLInputElement>document.getElementById("NIK")).value;
    // output ke modal
    (<HTMLInputElement>document.getElementById("namapenyewa_final")).value = namapenyewa;
    (<HTMLInputElement>document.getElementById("noktp_final")).value = noktp;
    (<HTMLInputElement>document.getElementById("txtbiayatotal")).value = tmp_totalbayar.toString();
    for(let i=0; i < tmp_mobilsewa.length;i++){
        merksewa += "<li>" + tmp_mobilsewa[i] + "</li>";
    }
    (<HTMLElement>document.getElementById("listmobil")).innerHTML = merksewa;
}

function sewa(){
    // Deklarasi Variabel
    let namapenyewa: string = "";
    let noktp: string = "";
    // input namapenyewa dan noktp
    namapenyewa = (<HTMLInputElement>document.getElementById("namapenyewa")).value;
    noktp = (<HTMLInputElement>document.getElementById("NIK")).value;
    totalfinal = tmp_totalbayar;
    // validasi
    if ((namapenyewa && noktp) != "") {
        // push ke datasewa
        datasewa.push({
            'nama': namapenyewa,
            'id': noktp,
            'mobil':tmp_mobilsewa,
            'totalbayar': totalfinal
        });
        // reset temporary variable
        tmp_totalbayar = 0;
        tmp_mobilsewa.length = 0;
        // reset input
        
        // save to localStorage
        saveLocal(datasewa);
        window.open("kuitansi.html","_blank");
    }else{
        alert('Isi data diri terlebih dahulu');
    }
}

function saveLocal(data: Array<any>){
    let simpan;
    simpan = JSON.stringify(data);
    localStorage.setItem("kuitansi", simpan);
}