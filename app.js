document.addEventListener('DOMContentLoaded', () => {
  const jokesContainer = document.getElementById('jokes')
  const newJokeButton = document.querySelector('.button')
  const copiedMessage = document.createElement('div')
  copiedMessage.classList.add('copied-message')

  // Function to fetch a new dad joke
  async function fetchJoke() {
    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: {
          Accept: 'application/json',
        },
      })
      return response.data.joke
    } catch (error) {
      console.error('Error fetching joke:', error)
      return 'Oops! Could not fetch a joke. Try again!'
    }
  }

  function addJoke(joke) {
    const li = document.createElement('li')

    // Create a wrapper for the joke text
    const jokeText = document.createElement('span')
    jokeText.textContent = joke

    // Create a "Copy" button
    const copyButton = document.createElement('button')
    copyButton.textContent = 'Copy'
    copyButton.classList.add('copy-button')
    // Add elements to the list item
    li.appendChild(jokeText) // Add joke text
    li.appendChild(copyButton) // Add the button after the text
    // Add animation delay to create staggered effect
    li.style.animationDelay = `${jokesContainer.children.length * 0.1}s`
    jokesContainer.appendChild(li)
  }

  // Event listener for new joke button
  newJokeButton.addEventListener('click', async () => {
    // Remove the previous jokes
    while (jokesContainer.firstChild) {
      jokesContainer.removeChild(jokesContainer.firstChild)
    }
    const joke = await fetchJoke()
    addJoke(joke)
  })

  // Append the copied message element to the DOM
  document.body.appendChild(copiedMessage)

  // Fetch initial joke when page loads
  fetchJoke().then(addJoke)
})
