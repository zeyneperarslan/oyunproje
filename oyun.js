class Game
{
   constructor(document)  //yapıcı metod tanımlandı böylelikle HTML dokumanına erişim sağlandı.
   { 
    this.document = document
     this.turn = "✯"     //oyuna başlayan yıldız olarak belirlendi.
     this.oyunskoru= {   //başlangıçtaki oyunskoru 0-0 olarak belirlendi
       YILDIZ:0,
        KALP:0
     }
    
     this.kazanmaDurumu = [  //tum olasi eslesmelerin kombinasyonlari yazildi.

[0, 1, 2], 
[1, 2, 3],
[4, 5, 6], 
[5, 6, 7],
[8, 9, 10], 
[9, 10, 11],
[12, 13, 14],
[13, 14, 15],
[0, 4, 8], 
[4, 8, 12],
[1, 5, 9], 
[5, 9, 13],
[2, 6, 10], 
[6, 10, 14],
[3, 7, 11],
[7, 11, 15],
[0, 5, 10],
[1, 6, 11], 
[2, 5, 8],
[3, 6, 9], 
[4, 9, 14],
[5, 10, 15],
[7,10,13],
[6,9,12],
[7,10,13]
       ]
     
     this.board = new Array(16).fill(null)  // 16 elemanlı dizi oluşturuldu ve bu dizinin tüm elemanlarını null değeri verildi.

   alert("Oyuna Hoşgeldin!!!!");   
   alert("Aynı şekilleri üçlü olacak şekilde eşleştir puanı kazan!!")  //oyun başlamadan kullanıcıya oyun bilgisi verildi



     this.document.querySelectorAll('.kutu').forEach ( kutu => {
        kutu.addEventListener('click' , () => {  //kutu sınıfına ait ögeler seçildi ve tıklama olayı eklenir.
            this.hucreDoldur(kutu)     // hucreDoldur fonksiyonu çağırılır ve tıklanan hücrenin doldurulması gerçekleştirilir.

        })

     });

     this.ekranaYazdir()

    }

   nextTurn()  {  //oynama sırasını kontrol eder.
    
    this.turn = this.turn === '✯' ? '♥' : '✯'  //this.turn değerini kontrol eder. Eğer this.turn değişkeni '✯' karakterine eşitse, değeri '♥' olarak değiştirir değilse, değeri '✯' olarak değiştirir.
    this.ekranaYazdir()   // ekranaYazdir metodu çağırılır.

   }

   hucreDoldur(kutu) {
      if (this.board[kutu.dataset.i] === null) {   //hücrelerin boş olup olmadığı kontrol edilir.
          this.board[kutu.dataset.i] = this.turn; //eğer hücre boşsa hamle yapılarak doldurulur.
          this.boardYazdir();
      } else {
          alert('Bu hücre zaten dolu! Lütfen başka bir hücre seçin.');  //eğer doluysa oyunu oynayan kullanıcıya uyarı verilir.
      }
  }

   boardYazdir () {
   
    this.board.forEach((value, i) => {   // this.board dizisindeki her bir eleman için döngü oluşturuldu.Her elemanın değeri value değişkenine atanır,elemanın dizideki indeksi ise i değişkenine atanır.
 this.document.querySelector(`.kutu[data-i="${i}"]`).innerText = value //kutu sınıfından olan ve data-i'si i ile eşleşen ögeyi seçer ve bu öğenin içeriğini value ile günceller. 


    })

    this.kazananKontrol()  //kazanan var mı yok mu kontrol eder.

   } 


   ekranaYazdir() {

    this.document.getElementById('turn').innerText = this.turn   //id'si turn olan öğeyi seçti ve bu öğenin içeriğini this.turn değişkeninin değeriyle değiştirildi.
   }

   skorDurumu(){    //güncel oyun skorunu oyunu oynayan kullanıclara göstermek amacıyla oluşturuldu.
   
    this.document.querySelector('.oyunskoru').innerText = ` ✯ ${this.oyunskoru.YILDIZ} - ${this.oyunskoru.KALP} ♥`

   }

  kazananKontrol()
   { 
     let kazanan = null  
     this.kazanmaDurumu.forEach((kombinasyonlar)   => {

        const [c1,c2,c3] = kombinasyonlar

        if(this.board[c1]=== '✯' && this.board[c2]=== '✯' && this.board[c3]=== '✯' ){ //yıldızların üçlü olarak eşleşip eşleşmediği kontrol edildi.
            
            kazanan = 'YILDIZ'  //eğer eşleşiyorsa kazanan yıldız olarak belirlendi.
        }

        else if(this.board[c1] === '♥' && this.board[c2] === '♥' && this.board[c3] === '♥'){     //kalplerin üçlü olarak eşleşip eşleşmediği kontrol edildi.

            kazanan = 'KALP'                 //eğer eşleşiyorsa kazanan yıldız olarak belirlendi.
        }

    
     })

     if(kazanan) { //kazanan olup olmadığı kontrol edildi.
        this.oyunskoru[kazanan]++          // Eğer bir kazanan varsa, oyunskoru objesindeki ilgili oyuncunun skoru 1 arttırıldı.
        this.skorDurumu()                 // skorDurumu fonksiyonu çağırılarak skor durumu güncellendi.
        alert(`KAZANAN: ${kazanan}`)     //kazanan bilgisi kullanıcıya verildi.
        this.yenidenBasla()             // yenidenBasla fonksiyonu çağırılarak oyun yeniden başlatıldı.
     }

    else{

        this.berabereDurum() 

     }
   }

   berabereDurum()
   {
    if(!this.board.includes(null))  // boş hücre yoksa oyun berabere biter.
    {
        alert(`DURUM:BERABERE`)
        this.yenidenBasla()     // kullanıcıya bilgi verildikten sonra oyun yeniden başlatıldı.
    }  
    else {
        this.nextTurn()  // Eğer boş hücre varsa bir sonraki oyuncunun turunu başlatmak için nextTurn fonksiyonu çağırıldı.
    
    }
   }

   yenidenBasla(){    
    this.turn = "✯"                        //Oyuna tekrardan başlayan "✯" olarak ayarlandı.
   this.board = new Array(16).fill(null)  //oyundaki hücreler sıfırlandı.Yeniden oynanmaya hazır hale getirildi.
    this.ekranaYazdir()                  //oyunun ekrandaki durumunu güncellemek için ekranaYazdir fonksiyonu çağırıldı.
    this.boardYazdir()                   //hücrelerin başlangıç durumunu gösteren bilgiler fonksiyon  çağırılarak güncellenir.

   }

}
