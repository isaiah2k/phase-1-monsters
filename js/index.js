document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000/monsters'
  let page = 1

  const createMonsterForm = `
    <form id="monster-form">
      <input type="text" id="name" placeholder="name..." required />
      <input type="number" id="age" placeholder="age..." required />
      <input type="text" id="description" placeholder="description..." required />
      <button type="submit">Create Monster</button>
    </form>
  `

  const createMonsterDiv = document.getElementById('create-monster')
  createMonsterDiv.innerHTML = createMonsterForm

  const monsterContainer = document.getElementById('monster-container')
  const backButton = document.getElementById('back')
  const forwardButton = document.getElementById('forward')

  function fetchMonsters(page) {
    fetch(`${baseUrl}?_limit=50&_page=${page}`)
      .then(response => response.json())
      .then(monsters => {
        console.log(`Fetched monsters for page ${page}:`, monsters)
        updateMonsterList(monsters)
      })
  }

  function updateMonsterList(monsters) {
    monsterContainer.innerHTML = '' // Clear the existing monsters
    monsters.forEach(monster => {
      const monsterDiv = document.createElement('div')
      monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>${monster.description}</p>
      `
      monsterContainer.appendChild(monsterDiv)
    })
  }

  function createMonster(event) {
    event.preventDefault()
    const name = document.getElementById('name').value
    const age = document.getElementById('age').value
    const description = document.getElementById('description').value

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age, description }),
    })
      .then(response => response.json())
      .then(monster => {
        addMonsterToList(monster)
        document.getElementById('monster-form').reset()
      })
  }

  function addMonsterToList(monster) {
    const monsterDiv = document.createElement('div')
    monsterDiv.innerHTML = `
      <h2>${monster.name}</h2>
      <h4>Age: ${monster.age}</h4>
      <p>${monster.description}</p>
    `
    monsterContainer.prepend(monsterDiv)
  }

  document.getElementById('monster-form').addEventListener('submit', createMonster)

  backButton.addEventListener('click', () => {
    if (page > 1) {
      page--
      fetchMonsters(page)
    }
  })

  forwardButton.addEventListener('click', () => {
    page++
    fetchMonsters(page)
  })

  fetchMonsters(page)
})