document.addEventListener('DOMContentLoaded', () => {
  // find the gift container <ul>
  const giftCollection = document.querySelector(".gift-list")

  // find the edit gift form <form>
  const editGiftForm = document.getElementById("new-gift-form")
  const editGiftName = document.getElementById("gift-name-input")
  const editGiftImage = document.querySelector("#gift-image-input")

  // find the search input to filter over gift names <input>
  const filterGifts = document.querySelector("#filter-input")

  // define the array of all gifts
  let allGifts = gifts

  // define the array of filtered gifts when searching
  let filteredGifts = []

  filterGifts.addEventListener("keyup", event => {
    let input = event.target.value // whatever the user searches
    // FILTER the array of gifts to ONLY show the ones
    // whose NAME matches the input

    let filteredGiftArray = allGifts.filter(gift => {
      if (gift.name.includes(input)) {
        return gift
      }
    })

    // if we don't make a copy of the filtered gifts, we'll always
    // overwrite our original array of gifts and never be able
    // to show the original ones when we remove input from the
    // search query. i.e., below:
    // allGifts = [1, 2, 3, 4]
    // allGifts = filteredGiftArray
    // allGifts = [1]

    // instead, we want to make a separate array just for
    // searching through the gifts and still keep
    // the original array of gifts intact
    filteredGifts = filteredGiftArray
    giftCollection.innerHTML = ""
    showGifts()
  })

  editThisGift = event => {
    // console.log("ur tryna edit this")

    // iterate over all gifts to find the one
    // whose id matches the one we clicked on
    let editId = parseInt(event.target.id)
    let editedGift = allGifts.find(gift => {
      return gift.id === editId
    })

    // autopopulate the form to edit the gift
    // with its original name and value
    editGiftName.value = editedGift.name
    editGiftImage.value = editedGift.image

    // add an event listener for when the user submits
    // on the form to edit a gift
    editGiftForm.addEventListener("submit", event => {
      // submit event listeners will refresh the page
      // because the form is making a "POST" request
      // so we have the prevent that behavior with
      // preventDefault
      event.preventDefault()

      editedGift.name = editGiftName.value
      editedGift.image = editGiftImage.value

      // find the index of the gift we are editing
      // and replace the original gift object with
      // the new one, with the name and image attributes
      // reassigned to the inputs from the edit form
      let index = allGifts.indexOf(editedGift)
      allGifts.splice(index, 1, editedGift)

      // remove all gifts currently inside gift collection
      giftCollection.innerHTML = ''
      // reset and iterate over the new gifts array
      // and append each <div> for the gift element
      // to the dom
      showGifts()
    })
  }

  showGifts = () => {
    // we're going to iterate over each gift
    // and display as an <div> inside the <ul>
    // with an <li> for the name of the gift
    // and an <img> for the gift image


    // if the user has tried to search for gifts
    // iterate over the filtered gifts array
    if (filteredGifts.length > 0) {
      filteredGifts.forEach(gift => {
        // create <li> and <img> for gift name + image
        let giftDiv = document.createElement("div")
        let giftLi = document.createElement("li")
        giftLi.innerText = gift.name
        let giftImg = document.createElement("img")
        giftImg.src = gift.image
        giftLi.append(giftImg)
        giftDiv.append(giftLi)

        // edit button for gift
        let editButton = document.createElement("button")
        editButton.innerText = "Edit"
        editButton.id = gift.id
        giftLi.append(editButton)

        // delete button for gift
        let deleteButton = document.createElement("button")
        deleteButton.innerText = "Annihilate :()"
        deleteButton.id = gift.id
        giftLi.append(deleteButton)

        // add event listener for edit gift
        editButton.addEventListener("click", editThisGift)

        // add event listener for delete gift
        deleteButton.addEventListener("click", event => {
          // remove the gift we want to delete from the
          // array of all gifts
          let updatedGifts = allGifts.filter(gift => {
            if (gift.id !== parseInt(event.target.id)) {
              return gift
            }
          })
          allGifts = updatedGifts
          giftCollection.innerHTML = ""
          showGifts()
        })

        // get the gift <div> on dat gift list
        giftCollection.append(giftDiv)
      })

      // otherwise, if the user is not searching,
      // just iterate over the array of all gifts
    } else {
      allGifts.forEach(gift => {
        // create <li> and <img> for gift name + image
        let giftDiv = document.createElement("div")
        let giftLi = document.createElement("li")
        giftLi.innerText = gift.name
        let giftImg = document.createElement("img")
        giftImg.src = gift.image
        giftLi.append(giftImg)
        giftDiv.append(giftLi)

        // edit button for gift
        let editButton = document.createElement("button")
        editButton.innerText = "Edit"
        editButton.id = gift.id
        giftLi.append(editButton)

        // delete button for gift
        let deleteButton = document.createElement("button")
        deleteButton.innerText = "Annihilate :()"
        deleteButton.id = gift.id
        giftLi.append(deleteButton)

        // add event listener for edit gift
        editButton.addEventListener("click", editThisGift)

        // add event listener for delete gift
        deleteButton.addEventListener("click", event => {
          // remove the gift we want to delete from the
          // array of all gifts
          let updatedGifts = allGifts.filter(gift => {
            if (gift.id !== parseInt(event.target.id)) {
              return gift
            }
          })
          allGifts = updatedGifts
          giftCollection.innerHTML = ""
          showGifts()
        })

        // get the gift <div> on dat gift list
        giftCollection.append(giftDiv)
      })
    }
  }

  // IMPORTANT!!!!!!!!
  // when you are defining your logic to create/add elements
  // to the DOM inside of a function,
  // you ABSOLUTELY must invoke that function so that
  // it actually does that logic!
  // otherwise, you're just defining a function that will
  // never apply the code to anywhere on the DOM! 
  showGifts()
})
