console.log('Client side javascript file is loaded!');

var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.querySelector('#messageOne');
var messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) 
                messageOne.textContent = data.error;
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});