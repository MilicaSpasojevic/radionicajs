
 


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
        /*IZRACUNATI 'RACUN' U ZAVISNOSTI OD ODABRANE OPERACIJE (THIS.OPERATION) HINT KORISITI NEKU OD PETLJI*/ 
        
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