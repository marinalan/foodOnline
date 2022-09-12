let autocomplete;

function initAutoComplete(){
autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('id_address'),
    {
        types: ['geocode', 'establishment'],
        //default in this app is "IN" - add your country code
        componentRestrictions: {'country': ['ca', 'us']},				
				fields: ["address_components", "geometry"],
    })
// function to specify what should happen when the prediction is clicked
autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged (){
    var place = autocomplete.getPlace();

    // User did not select the prediction. Reset the input field or alert()
    if (!place.geometry){
        document.getElementById('id_address').placeholder = "Start typing...";
    }
    else{
        //console.log('place name=>', place.name)
				console.log(place);
				var geocoder = new google.maps.Geocoder();
				var address = document.getElementById('id_address').value;
				geocoder.geocode({'address': address}, function(results, status){
					// console.log('results->', results);
					// console.log('status->', status);
					if (status == google.maps.GeocoderStatus.OK){
						var latitude = results[0].geometry.location.lat();
						var longitude = results[0].geometry.location.lng();

						// console.log('lat=>', latitude);
						// console.log('lng=>', longitude);
						$('#id_latitude').val(latitude);
						$('#id_longitude').val(longitude);
					}
				});
				var address_line = '';
				for (const component of place.address_components) {
					// @ts-ignore remove once typings fixed
					const componentType = component.types[0];

					switch (componentType) {
						case "street_number": {
							address_line +=  component.long_name;
							break;
						}

						case "route": {
							address_line += ' '+component.long_name;
							break;
						}

						case "postal_code": {
							$('#id_pin_code').val(component.long_name);
							break;
						}

						case "locality":
							$('#id_city').val(component.long_name);
							break;

						case "administrative_area_level_1": {
							$('#id_state').val(component.long_name);
							break;
						}

						case "country":
							$('#id_country').val(component.long_name);
							break;
					}
				}

				// document.getElementById('id_latitude').value=place.geometry.location.lat();
				// document.getElementById('id_longitude').value=place.geometry.location.lng();
    }
}
