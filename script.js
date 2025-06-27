let previousInput = '';
let currentInput = '0'; 
let operation = null;
let shouldResetInput = false;

const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

function updateDisplay() {  
    display.textContent = currentInput;
    if (previousInput && operation) {
        historyDisplay.textContent = '${previousInput} ${operation}';  
        } else {
        historyDisplay.textContent = '';
    }
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetInput) { 
        currentInput = number;
        shouldResetInput = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetInput) {
        currentInput = '0.';
        shouldResetInput = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

        function appendOperator(op) {
            if (operation !== null) calculate();
            previousInput = currentInput;
            operation = op;
            shouldResetInput = true;
            updateDisplay();
        }

        function calculate() {
            if (operation === null || shouldResetInput) return;
            
            let result;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    result = prev / current;
                    break;
                default:
                    return;
            }
            
            currentInput = result.toString();
            operation = null;
            previousInput = '';
            shouldResetInput = true;
            updateDisplay();
        }

        function clearDisplay() {
            currentInput = '0';
            previousInput = '';
            operation = null;
            updateDisplay();
        }

        function backspace() {
            if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
                currentInput = '0';
            } else {
                currentInput = currentInput.slice(0, -1);
            }
            updateDisplay();
        }

    
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
            else if (e.key === '.') appendDecimal();
            else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                appendOperator(e.key);
            }
            else if (e.key === 'Enter' || e.key === '=') calculate();
            else if (e.key === 'Escape') clearDisplay();
            else if (e.key === 'Backspace') backspace();
        });