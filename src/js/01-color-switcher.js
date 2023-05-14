function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]')
const stopBtn = document.querySelector('button[data-stop]')


startBtn.addEventListener('click', ()=>{

    timerID = setInterval(()=>{
    startBtn.disabled = true
    stopBtn.disabled = false
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
})

stopBtn.addEventListener('click', ()=>{
    startBtn.disabled = false
    stopBtn.disabled = true
    clearInterval(timerID)
})