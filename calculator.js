const zeroButton = document.getElementById('calc-zero')
const oneButton = document.getElementById('calc-one')
const twoButton = document.getElementById('calc-two')
const threeButton = document.getElementById('calc-three')
const fourButton = document.getElementById('calc-four')
const fiveButton = document.getElementById('calc-five')
const sixButton = document.getElementById('calc-six')
const sevenButton = document.getElementById('calc-seven')
const eightButton = document.getElementById('calc-eight')
const nineButton = document.getElementById('calc-nine')

const clearButton = document.getElementById('calc-clear')
const posNegButton = document.getElementById('calc-pos-neg')
const precentageButton = document.getElementById('calc-precentage')
const divideButton = document.getElementById('calc-divide')
const multiplyButton = document.getElementById('calc-multiply')
const minusButton = document.getElementById('calc-minus')
const plusButton = document.getElementById('calc-plus')
const equalsButton = document.getElementById('calc-equals')
const dotButton = document.getElementById('calc-dot')

let display = document.getElementById('calc-display')
let displayValue = '0'
let pendingValue
let evalString = []

let numbers = document.getElementsByClassName('calc-btn-num')
let operators = document.getElementsByClassName('calc-btn-operator')

let updateDisplay = (event) => {
    let btnText = event.target.innerText
    clearButton.innerHTML = 'C'
    if (displayValue === '0')
        displayValue = ''
    displayValue += btnText
    display.innerText = displayValue
    if (displayValue.length > 9) {
        if (displayValue.length > 19) { display.className = ('font-adjust-smallest') }
        else { display.className = ('font-adjust-smaller') }
    }

}
const pendingCalculation = function (operator) {
    pendingValue = displayValue
    displayValue = '0'
    display.innerText = displayValue
    display.className = ''
    evalString.push(pendingValue)
    evalString.push(operator)
    clearButton.innerHTML = 'AC'

}

const setResult = function () {
    let result = eval(evalString.join(' '))
    displayValue = result + ''
    display.innerText = displayValue
    evalString = []
    clearButton.innerHTML = 'AC'
    if (displayValue.length > 9) {
        if (displayValue.length > 19) { display.className = ('font-adjust-smallest') }
        else { display.className = ('font-adjust-smaller') }
    }
    else
        display.className = ''
}

let performOperation = (event) => {
    let operator = event.target.innerText
    switch (operator) {
        case '+':
            pendingCalculation('+')
            break
        case '-':
            pendingCalculation('-')
            break
        case 'x':
            pendingCalculation('*')
            break
        case '÷':
            pendingCalculation('/')
            break
        case '%':
            evalString.push(displayValue)
            evalString.push('/')
            evalString.push('100')
            setResult()
            break
        case '+-':
            evalString.push(0)
            evalString.push('-')
            evalString.push(displayValue)
            setResult()
            break
        case '=':
            evalString.push(displayValue)

            setResult()
            break

        default:
            break;
    }
}



for (let index = 0; index < numbers.length; index++) {
    numbers[index].addEventListener('click', updateDisplay, false)
}

for (let index = 0; index < operators.length; index++) {
    operators[index].addEventListener('click', performOperation, false)
}

clearButton.onclick = () => {
    displayValue = '0'
    pendingValue = undefined
    evalString = []
    display.innerHTML = displayValue
    display.className = ''
    clearButton.innerHTML = 'AC'
}

dotButton.addEventListener('click', () => {
    if (!displayValue.includes('.'))
        displayValue += '.'
    display.innerText = displayValue
})



