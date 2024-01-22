const mod = (n, m) => (n % m + m) % m;
const query = document.getElementById('query');
const button = document.querySelector('.searchBox button');
const searchBox = document.querySelector('.searchBox');
const suggestionBoxItems = document.querySelectorAll('#suggestionBox > li');
const suggestionBox = document.querySelector('#suggestionBox');
let activeSuggestionBoxItems;
const DOWN = 40;//Up arrow
const UP = 38;//Down arrow
const NOT_SELECTED = -1;//Down arrow
let selected = NOT_SELECTED;
let filter;

query.addEventListener('focusin', function(){focusedIn(event)});

query.addEventListener('keydown', function(){filterKeys(event)});

query.addEventListener('keyup', function(){openSuggestionBox(event)});

button.addEventListener('click' , function(){search(event)});
function search(event) {
    location = "./display.php?f=" + query.value;
}

document.addEventListener('click', function(event) {
  const outsideClick = !searchBox.contains(event.target);
  if(outsideClick)
    hideSuggestionBox(event);
});

suggestionBoxItems.forEach(element => {
  element.addEventListener('click', function(){
    console.log("clicked");
    location = "./display.php?f=" + element.innerHTML;
  });
});

function chageHighlightedLi(direction) {
  activeSuggestionBoxItems = suggestionBox.querySelectorAll(':scope .active');
  if(activeSuggestionBoxItems[0] == null)
    return;

  if(selected != NOT_SELECTED)
    activeSuggestionBoxItems[selected].classList.remove('highlighted');

  if(direction == UP)
    selected = mod(((selected+1) - 1), activeSuggestionBoxItems.length + 1) - 1;
  if(direction == DOWN)
    selected = mod(((selected+1) + 1), activeSuggestionBoxItems.length + 1) - 1;

  if(selected != NOT_SELECTED)
    activeSuggestionBoxItems[selected].classList.add('highlighted');
  if(selected != NOT_SELECTED){
    query.value = activeSuggestionBoxItems[selected].innerHTML;
  }else{
    query.value = filter;
  }

  console.log(selected);
}

function focusedIn(event) {
  openSuggestionBox(event);
}

function filterKeys(event){
  switch (event.key) {
    case 'Enter':
        location = "./display.php?f=" + query.value;
      break;
    case "ArrowUp":
      event.preventDefault();
      chageHighlightedLi(UP);
      break;
    case "ArrowDown":
      event.preventDefault();
      chageHighlightedLi(DOWN);
      break;
  }
}

function openSuggestionBox(event){
  if(event.key == "ArrowUp" || event.key == "ArrowDown")
    return;
  filter = event.target.value;

  let NumberOfActiveElements = 0;

    for(const suggestionBoxItem of suggestionBoxItems){
      const textContent = suggestionBoxItem.textContent.trim().toUpperCase();

      if(textContent.indexOf(filter.toUpperCase()) > -1 && NumberOfActiveElements<10 && filter!="" || filter=="*"){
        suggestionBoxItem.classList.remove('hidden');
        suggestionBoxItem.classList.add('active');

        NumberOfActiveElements += 1;
      }else{
        suggestionBoxItem.classList.add('hidden');
        suggestionBoxItem.classList.remove('active');
      }
    }
  if(NumberOfActiveElements == 0){
    hideSuggestionBox();
  }else{
    suggestionBox.classList.remove('hidden');
  }
}

function hideSuggestionBox() {
  suggestionBox.classList.add('hidden');
  if(selected != NOT_SELECTED){
    activeSuggestionBoxItems[selected].classList.remove('highlighted');
    selected = NOT_SELECTED;
  }
}
