// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', (e) => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        getAllSquares().forEach(square => {
          square.classList.remove('targeted');
        })
        e.currentTarget.classList.add('targeted');
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', e => {

    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈

    let current = document.querySelector('div.targeted');
    
    if (e.key === keys.up) {
      let parent = current.parentNode;
      let index = Array.prototype.indexOf.call(parent.children, current);
      if (parent.previousElementSibling) {
        current.classList.remove('targeted');
        parent.previousSibling.childNodes[index].classList.add('targeted');
      }
    } else
    if (e.key === keys.down) {
      let parent = current.parentNode;
      let index = Array.prototype.indexOf.call(parent.children, current);
      if (parent.nextElementSibling) {
        current.classList.remove('targeted');
        parent.nextSibling.childNodes[index].classList.add('targeted');
      }
    } else
    if (e.key === keys.right) {
      if (current.nextElementSibling) {
        current.classList.remove('targeted');
        current.nextElementSibling.classList.add('targeted');
      }
    } else
    if (e.key === keys.left) {
      if (current.previousElementSibling) {
        current.classList.remove('targeted');
        current.previousElementSibling.classList.add('targeted');
      }
    } else
    
    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    
    if (e.key === keys.space) {
      let mosquitoes = document.querySelectorAll('img');
      if (current.firstChild) {
        current.firstChild.dataset.status = 'dead';
        current.style.backgroundColor = 'red';
      }
      
      // 👉 TASK 5 - End the game 👈

      if (Array.from(mosquitoes)
      .every(elem => elem.dataset.status === 'dead')) {
        
        document.querySelector('h2').innerHTML =
        `Mosquito Exterminator <button>Restart</button>`;
        let restart = document.querySelector('button');
        restart.addEventListener('click', () => location.reload());
        
        let time = getTimeElapsed() / 1000;
        document.querySelector('p.info').textContent =
        `Extermination completed in ${time} seconds!`;
      }
    }
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
