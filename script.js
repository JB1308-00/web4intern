const correctCode = '1308';
const maxDigits = correctCode.length;
const autoSequence = ['1', '3', '0', '8'];
const passcodeDots = document.getElementById('passcodeDots');
const keypad = document.getElementById('keypad');
const statusText = document.getElementById('statusText');
let enteredCode = '';

function updateDots() {
  const dots = passcodeDots.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('filled', index < enteredCode.length);
  });
}

function resetCode(message = '') {
  enteredCode = '';
  updateDots();
  statusText.textContent = message;
  statusText.classList.toggle('error', Boolean(message));
}

function pressButton(value) {
  const button = Array.from(keypad.querySelectorAll('.key')).find(
    btn => btn.textContent.trim() === value
  );
  if (!button) return;
  button.classList.add('active');
  setTimeout(() => button.classList.remove('active'), 140);
}

function handleKey(value) {
  if (enteredCode.length >= maxDigits) {
    return;
  }
  enteredCode += value;
  updateDots();
  statusText.textContent = '';
  if (enteredCode.length === maxDigits) {
    setTimeout(() => {
      if (enteredCode === correctCode) {
        window.location.href = 'blank.html';
      } else {
        resetCode('Incorrect passcode');
      }
    }, 150);
  }
}

function autoEnterCode() {
  autoSequence.forEach((digit, index) => {
    setTimeout(() => {
      pressButton(digit);
      handleKey(digit);
    }, index * 450);
  });
}

keypad.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.classList.contains('empty')) return;
  const value = button.textContent.trim();
  if (button.id === 'eraseKey') {
    enteredCode = enteredCode.slice(0, -1);
    updateDots();
    statusText.textContent = '';
    return;
  }
  handleKey(value);
});

window.addEventListener('load', () => {
  resetCode();
  setTimeout(autoEnterCode, 500);
});
