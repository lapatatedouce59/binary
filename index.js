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

let resultTable = document.getElementById('resultTable')



let targetNum = document.getElementById('targetNum')
let actualNum = document.getElementById('actualNum')

let btnContainer = document.getElementById('btnContainer')

maxNum.value=(2**parseInt(nbBits.value)-1)
nbBits.addEventListener('input',()=>{
    maxNum.value=(2**parseInt(nbBits.value)-1)
})

let actualGame=false

let hasGameStarted=false
let actualRound=0

let clicks = 0

document.body.addEventListener('click',()=>{
    clicks++
},true)

startGame.addEventListener('click',()=>{
    zoneGame.style.display='flex';
    zoneBtn.style.display='none';
    nbRounds.disabled=true
    nbBits.disabled=true
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
        this.ClicMoyen=0
        this.Clics=[]
    }

    reloadUi(){
        btnContainer.innerHTML='';
        for(let i = 0;i<parseInt(nbBits.value);i++){
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
        clicks=0
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

            this.Save.push({ round: actualRound, target: targetNum.innerText, time: resTime.getSeconds(), clicks: clicks})
            this.Times.push(resTime.getSeconds())
            this.Clics.push(clicks)
            let maxTimes = 0
            for(let num of this.Times) maxTimes = maxTimes+num;
            this.TimeMoyen=parseFloat(maxTimes/this.Times.length)
            let maxClics = 0
            for(let num of this.Clics) maxClics = maxClics+num;
            this.ClicMoyen=parseFloat(maxClics/this.Clics.length)

            if(actualRound<this.rounds){
                actualRound++
                actualNum.innerText=0
                this.quest()
            } else {
                console.log(`terminé! avec ${this.TimeMoyen.toFixed(2)} de temps moyen.`)
                console.log(this.Save)
                actualRound=0
                hasGameStarted=false

                zoneBtn.style.display='none';
                zoneGame.style.display='none';
                zoneResults.style.display='flex';
                resultTable.innerHTML='<tr><th scope="col">Round</th><th scope="col">Valeur cible</th><th scope="col">Temps</th><th scope="col">Clics</th></tr>';

                document.getElementById('averageTime').innerText=this.TimeMoyen.toFixed(2)
                document.getElementById('averageClic').innerText=this.ClicMoyen.toFixed(2)
                
                for(let result of this.Save){
                    let mastertr = document.createElement('tr')
                    let td1 = document.createElement('td')
                    td1.innerText=result.round
                    let td2 = document.createElement('td')
                    td2.innerText=result.target
                    let td3 = document.createElement('td')
                    td3.innerText=`${result.time}sec`
                    let td4 = document.createElement('td')
                    td4.innerText=`${result.clicks} clics`
                    mastertr.appendChild(td1)
                    mastertr.appendChild(td2)
                    mastertr.appendChild(td3)
                    mastertr.appendChild(td4)
                    resultTable.appendChild(mastertr)
                }

                for(let chk of document.getElementsByClassName('resChk')){
                    chk.checked=true
                    chk.disabled=true
                }
            }
        }
    }
    generateRandomInt(){
        return Math.floor(Math.random() * (2**parseInt(nbBits.value)));
    }
}

document.getElementById('continueBtn').addEventListener('click',()=>{
    nbRounds.disabled=false
    nbBits.disabled=false
    zoneBtn.style.display='flex';
    zoneGame.style.display='none';
    zoneResults.style.display='none';
})