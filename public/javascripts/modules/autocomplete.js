function autoComplete(input, latInput, lngInput) {
    console.log(input, latInput, lngInput);
    if (!input) return;
    const dropdown = new google.maps.places.Autocomplete(input);
    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
    });
    // if someone hits enter on the address field, don't submit the form
    input.on('keydown', (e)=>{    // use on() function in bling.js
        if(e.keyCode === 13) e.preventDefault();
    })
}

export default autoComplete;