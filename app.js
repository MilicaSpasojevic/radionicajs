
 /*U ovom fajlu se nalazi sav js kod koji je koriscen za izradu kalkulatora
 Bitno je odma na pocetku razumeti da je trenutni operator broj koji je odabran za neku od operacija u kalkulatoru
 a prethodni onaj koji je unet pre njega u kalkulatoru (npr unosimo 7 to je trenutni pa u nesemo + 8 i 
 tada je 8 trenutni a 7 prethodni operator pa odabranu operaciju u ovom slucaju sabiranje racunamo kao prethodni plus trenutni odnosno 7+8)*/

/*Takodje da vas ne buni prethodniTekst i trenutniTekst se odnose na ono sto mi unosimo konkretno sa tastature i povezuje se sa html-om
pa se kroz jednu od narednih funkcija prevodi u prethodniOperator i trenutniOperator a oba se odnose na brojeve koje unosimo u kalkulator*/

/*Vas zadatak je da u funkciji racunanje obezbedite izvrsenje odabrane operacije nad prethodnim i trenutnim operatorom*/
/*Najbitnije je da prodjete kroz kod detlajno da biste razumeli sta je sta, a sam zadatak je jednostavan hint je da se koristi switch ili if*/


const brojeviButtons = document.querySelectorAll(".broj"); //vracamo listu svih dugmica koji se odnose na brojeve (1,2,3,4..)
const operacijeButtons = document.querySelectorAll(".operacija"); //vracamo listu svih dugmica koji se odnose na operacije (-,/,*,+)

const jednakostButton = document.querySelector(".jednakost"); //vracamo dugme za jednakost
const brisanjeButton = document.querySelector(".brisanje"); //vracamo dugne za brisanje
const brisisveButton = document.querySelector(".brisisve") //vracamo dugme AC (koje brise sve elemente)

const trenutniTekst = document.querySelector(".trenutni-operator") //vracamo trenutno broj koji smo uneli u kalkulator
const prethodniTekst = document.querySelector('[data-prethodni]') //vracamo prethodni broj koji smo uneli u kalkulator (prepoznaje ga kao tekst jer se unosi sa tastature)



 


class Kalkulator{
    constructor(prethodniTekst, trenutniTekst){
        this.prethodniTekst=prethodniTekst;
        this.trenutniTekst=trenutniTekst;
        this.clear();
    }


    /*Ova funkcija brise sve vrednosti koje se trenutno nalaze u kalkulatoru*/ 
    clear(){
        this.trenutniOperator = '';
        this.prethodniOperator = ''; 
        this.operation=undefined;

    }

    /*Brisemo samo poslednju cifru u trenutnom broju (npr ako smo ukucali 123 brise se 3)*/ 
    delete(){
        this.trenutniOperator=this.trenutniOperator.toString().slice(0,-1);

    }

    /*Fukncija koja upisuje odabranu cifru na kraj trenutnog operatora (tj trenutni broj u kalkulatoru) npr kada unosimo 1, pa 2, pa 3 on ce to posmatrati kao broj 123*/ 
    izborBroja(broj){
        if(broj==='.' && this.trenutniOperator.includes('.')) return; //BROJ NE SME DA SADRZI VISE OD JEDNE TACKE
        this.trenutniOperator= this.trenutniOperator.toString() +broj.toString();

    }


    /*Funkcija koja odredjuje sta se radi kada se odabere operacija*/
    izborOperacije(operacija){
        
        if(this.trenutniOperator === '') return;
        if(this.prethodniOperator!== '') {
            this.racunanje();
        }
        this.operation=operacija;
        this.prethodniOperator=this.trenutniOperator;
        this.trenutniOperator='';
    }


    /*Funkcija koja vrsi operaciju koju smo izabrali nad trenutnim i prethodnim operatorom*/ 
    racunanje(){
        let racun;
        const preth = parseFloat(this.prethodniOperator)
        const tren = parseFloat(this.trenutniOperator)
        if(isNaN(preth) || isNaN(tren)) return;
        /*IZRACUNATI 'RACUN' U ZAVISNOSTI OD ODABRANE OPERACIJE (THIS.OPERATION)*/ 
        
        this.trenutniOperator=racun;
        this.operation=undefined;
        this.prethodniOperator='';
          
    }

    /*FUNKCIJA KOJA OBEZBEDJUJE DA U ZAVISNOSTI OD TOGA DA LI JE BROJ DECIMALAN ILI NE PRIKAZUJE GA U PRAVOM FORMATU */ 
   getDisplayNumber(broj){
        const stringBroj = broj.toString();
        const integerCifre =parseFloat(stringBroj.split('.')[0])
        const decimalCifre = stringBroj.split('.')[1]
        let integerDisplay
        if(isNaN(integerCifre)){
            integerDisplay=''
        } else {
            integerDisplay = integerCifre.toLocaleString('en',{maximumFractionDigits: 0})
        } 
        if(decimalCifre != null){
            return `${integerDisplay}.${decimalCifre}`
        } else {
            return integerDisplay;
        }


        

    }

    /*FUNCKIJA KOJA PRIKAZUJE STA SE TRENUTNO NALAZI U KALKULATORU*/
    updateDisplay(){
        this.trenutniTekst.innerText = this.getDisplayNumber(this.trenutniOperator);
        if(this.operation!=null){
            this.prethodniTekst.innerText = `${this.getDisplayNumber(this.prethodniOperator)} ${this.operation}`;

        } else {
            this.prethodniTekst.innerText='';
        }
        

    }

}



const kalkulator = new Kalkulator(prethodniTekst, trenutniTekst);

/*Za svaki od dugmica koje se odnose na brojeve(iz htmla koje smo gore selektovali) dodati da se na svaki klik izvrse dole navedene funckije*/    
brojeviButtons.forEach(button => {
    button.addEventListener('click' , klik =>{
        kalkulator.izborBroja(button.innerText)
        kalkulator.updateDisplay()
    })
})

/*Za svaki od dugmica koji se odnose na operacije (iz htmla koje smo gore selektovali) dodati da se na svaki klik izvrse dole navedene funckije*/  
operacijeButtons.forEach(button => {
    button.addEventListener('click', () =>{
        kalkulator.izborOperacije(button.innerText)
        kalkulator.updateDisplay()
    })
})

/*Za svaki klik na dugme za jednakost izvrsiti sledece funkcije*/
jednakostButton.addEventListener('click', button=>{
    kalkulator.racunanje()
    kalkulator.updateDisplay()
} )

/*Za svaki klik na dugme AC izvrsiti sledece funkcije*/
brisisveButton.addEventListener('click', button=>{
    kalkulator.clear()
    kalkulator.updateDisplay()
} )

/*Za svaki klik na dugme za brisanje (DEL) izvrsiti sledece funkcije*/
brisanjeButton.addEventListener('click', button=>{
    kalkulator.delete();
    kalkulator.updateDisplay()
} )
