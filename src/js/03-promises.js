import Notiflix from "notiflix";

const form = document.querySelector('.form')
const delay = document.querySelector('[name="delay"]')
const step = document.querySelector('[name="step"]')
const amount = document.querySelector('[name="amount"]')

form.addEventListener('submit', onFormSubmit)

function onFormSubmit(event){
  event.preventDefault()

      let delayValue = Number(delay.value)
      console.log(delayValue)
      let stepValue = Number(step.value)
      let amountValue = Number(amount.value)
      
      for (let i = 1; i <= amountValue; i++) {
        createPromise(i, delayValue);
        delayValue += stepValue;
      }
    }


// for(let i = 1)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
  if (shouldResolve) {
   resolve()
  } else {
   reject()
  }
}, delay)
})
promise
.then(()=>{
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
})
.catch(()=>{
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
})
}