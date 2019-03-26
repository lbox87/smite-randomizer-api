function loadCharacters() {
    fetch('/test')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(response => {
            console.log(response);
            // displayCharacters(response);
        })
}

function docReady() {
    loadCharacters();
    // getFewerCharacters();
    // newCharacterSubmitted();
    // deleteCharacter();
    // editCharacterScreen();
    // editCharacterSubmit();
    // getInitialCharacters();
    // openApp();
}

$(docReady);