let nbRounds = document.getElementById('roundsNum')
let nbBits = document.getElementById('bitsNum')
let maxNum = document.getElementById('maxNum')

let startGame = document.getElementById('startGame')

let zoneBtn = document.getElementById('zoneBtn')
zoneBtn.style.display='flex';
let zoneGame = document.getElementById('zoneGame')
zoneGame.style.display='none';

let targetNum = document.getElementById('targetNum')
let actualNum = document.getElementById('actualNum')

let btnContainer = document.getElementById('btnContainer')

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
})

class Game{
    constructor(rounds, bits){
        this.rounds=rounds
        this.bits=bits
    }

    reloadUi(){
        btnContainer.innerHTML='';
        for(let i = 0;i<=parseInt(nbBits.value);i++){
            let parentDiv=document.createElement('div')
            parentDiv.classList.add('chkValue')
        }
    }

    start(){
        this.reloadUi()
    }

    quest(){
        this.reloadUi()
        targetNum.innerText=this.generateRandomInt()
    }

    update(){
        for
    }

    get generateRandomInt(){
        return Math.floor(Math.random() * (2**parseInt(nbBits.value)));
    }
}