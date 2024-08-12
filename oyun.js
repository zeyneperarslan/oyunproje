class Game
{
   constructor(document)        
   { 
    this.document = document
     this.turn = "✯"          
     this.oyunskoru= {        
       YILDIZ:0,
        KALP:0
     }
    
     this.kazanmaDurumu = [   

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
     
     this.board = new Array(16).fill(null)         

   alert("Oyuna Hoşgeldin!!!!");
   alert("Aynı şekilleri üçlü olacak şekilde yatay/dikey/çapraz eşleştir puanı kazan!!")     




     this.document.querySelectorAll('.kutu').forEach ( kutu => {
        kutu.addEventListener('click' , () => {               
            this.hucreDoldur(kutu)                           


        })

     });

     this.ekranaYazdir()

    }

   nextTurn()  {                  
    
    this.turn = this.turn === '✯' ? '♥' : '✯'    
    this.ekranaYazdir()                         

   }

   hucreDoldur(kutu) {
      if (this.board[kutu.dataset.i] === null) {          
          this.board[kutu.dataset.i] = this.turn;       
          this.boardYazdir();
      } else {
          alert('Bu hücre zaten dolu! Lütfen başka bir hücre seçin.');     
      }
  }

   boardYazdir () {
   
    this.board.forEach((value, i) => {               
 this.document.querySelector(`.kutu[data-i="${i}"]`).innerText = value  


    })

    this.kazananKontrol()   //kazanan var mı yok mu kontrol eder.

   } 


   ekranaYazdir() {

    this.document.getElementById('turn').innerText = this.turn    
   }

   skorDurumu(){       
  
    this.document.querySelector('.oyunskoru').innerText = ` ✯ ${this.oyunskoru.YILDIZ} - ${this.oyunskoru.KALP} ♥`

   }

  kazananKontrol()
   { 
     let kazanan = null
     this.kazanmaDurumu.forEach((kombinasyonlar)   => {

        const [c1,c2,c3] = kombinasyonlar

        if(this.board[c1]=== '✯' && this.board[c2]=== '✯' && this.board[c3]=== '✯' ){    
            
            kazanan = 'YILDIZ'      //eğer eşleşiyorsa kazanan yıldız olarak belirlendi.
        }

        else if(this.board[c1] === '♥' && this.board[c2] === '♥' && this.board[c3] === '♥'){    
            kazanan = 'KALP'    
        }

    
     })

     if(kazanan) {                         
        this.oyunskoru[kazanan]++        
        this.skorDurumu()                
        alert(`KAZANAN: ${kazanan}`)   
        this.yenidenBasla()           
        
     }

    else{

        this.berabereDurum()

     }
   }

   berabereDurum()
   {
    if(!this.board.includes(null))     
    {
        alert(`DURUM:BERABERE`)
        this.yenidenBasla()          
    }  
    else {
        this.nextTurn()            
    
    }
   }

   yenidenBasla(){
    this.turn = "✯"                 
   this.board = new Array(16).fill(null) 
    this.ekranaYazdir()                   
    this.boardYazdir()                  

   }

}
