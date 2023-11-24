let nbRounds = document.getElementById('roundsNum')
let nbBits = document.getElementById('bitsNum')
let maxNum = document.getElementById('maxNum')
let numToBin = document.getElementById('numToBin')

let startGame = document.getElementById('startGame')

let zoneBtn = document.getElementById('zoneBtn')
zoneBtn.style.display='flex';
let zoneGame = document.getElementById('zoneGame')
zoneGame.style.display='none';
let zoneResults = document.getElementById('zoneResults')
zoneResults.style.display='none';



let targetNum = document.getElementById('targetNum')
let actualNum = document.getElementById('actualNum')

let btnContainer = document.getElementById('btnContainer')

maxNum.value=(2**parseInt(nbBits.value))
nbBits.addEventListener('input',()=>{
    maxNum.value=(2**parseInt(nbBits.value))
})

let actualGame=false

let hasGameStarted=false
let actualRound=0

startGame.addEventListener('click',()=>{
    zoneGame.style.display='flex';
    zoneBtn.style.display='none';
    hasGameStarted=true
    actualRound=1
    actualGame=new Game(parseInt(nbRounds.value),parseInt(nbBits.value))
    actualGame.start()
})

class Game{
    constructor(rounds, bits){
        this.rounds=rounds
        this.bits=bits
        this.Save=[]
        this.Times=[]
        this.TimeMoyen=0
    }

    reloadUi(){
        btnContainer.innerHTML='';
        for(let i = 0;i<=parseInt(nbBits.value);i++){
            let parentDiv=document.createElement('div')
            parentDiv.classList.add('chkValue')
            parentDiv.classList.add('chkCont')
            let spanVal = document.createElement('span')
            spanVal.classList.add('chkValue')
            spanVal.innerText=(2**i)
            let chkBoxBin = document.createElement('input')
            chkBoxBin.addEventListener('input',()=>{
                actualGame.update()
            })
            chkBoxBin.type='checkbox'
            chkBoxBin.classList.add('resChk')
            chkBoxBin.setAttribute('data-value',(2**i))
            parentDiv.appendChild(spanVal)
            parentDiv.appendChild(chkBoxBin)
            btnContainer.appendChild(parentDiv)
        }
    }

    start(){
        this.reloadUi()
        this.update()
        this.quest()
    }

    quest(){
        if(hasGameStarted===false) return;
        this.startTime = Date.now()
        this.reloadUi()
        targetNum.innerText=this.generateRandomInt()
    }

    update(){
        if(hasGameStarted===false) return;
        let newVal = 0
        for(let chk of document.getElementsByClassName('resChk')){
            if(chk.checked){
                newVal=newVal+parseInt(chk.getAttribute('data-value'))
            }
        }
        function dec2bin(dec) {
            return (dec >>> 0).toString(2);
        }
        actualNum.innerText=JSON.stringify(newVal)
        numToBin.innerText=dec2bin(parseInt(actualNum.innerText))
        

        if(newVal===parseInt(targetNum.innerText)){
            this.endTime = Date.now()
            let resTime = new Date(this.endTime-this.startTime)

            this.Save.push({ round: actualRound, target: targetNum.innerText, time: resTime.getSeconds()})
            this.Times.push(resTime.getSeconds())
            let max = 0
            for(let num of this.Times) max = max+num;
            this.TimeMoyen=parseFloat(max/this.Times.length)

            if(actualRound<this.rounds){
                actualRound++
                actualNum.innerText=0
                this.quest()
            } else {
                console.log(`terminé! avec ${this.TimeMoyen.toFixed(2)} de temps moyen.`)
                console.log(this.Save)
                actualRound=0
                hasGameStarted=false
            }
            //console.log(`gagné en ${resTime.getSeconds()}sec!`)
        }
    }

    generateRandomInt(){
        return Math.floor(Math.random() * (2**parseInt(nbBits.value)));
    }
}