//document.getElementById('query').addEventListener( 'keydown', ( event ) => 
const mod = (n, m) => (n % m + m) % m;
var DOWN = 1;
var UP = -1;

let selected = -1;
document.getElementById('query').addEventListener('focusout', function(){focusedOut(event)});
function focusedOut(event){
    suggetionBoxItems = document.querySelectorAll('#suggestionBox > li');
    suggetionBox = document.querySelector('#suggestionBox');
    suggetionBox.classList.add('hidden');
    if(selected != -1){
      suggetionBoxItems[selected].classList.remove('highlighted');
      selected = -1;
    }
}

document.getElementById('query').addEventListener('focusin', function(){focusedIn(event)});
function focusedIn(event) {
  filterMenuItems(event);
}

document.getElementById('query').onkeydown = function(){filterKeys(event)};
function filterKeys(event){
  //console.log("Key Pressed");
  //console.log(event.currentTarget);

  switch (event.key) {
    case 'Enter':
      console.log(location);
      scope = document.querySelector('#suggestionBox');
      suggetionBoxItem = scope.querySelector(':scope .active');
      if(suggetionBoxItem != null){
        console.log(suggetionBoxItem.querySelector(':scope a').text);
        location = "./display.php?f=" + suggetionBoxItem.querySelector(':scope a').text
      }
      break;
    case "ArrowUp":
      event.preventDefault();
      selectLi(UP);
      break;
    case "ArrowDown":
      event.preventDefault();
      selectLi(DOWN);
      break;
  }
  console.log(selected);
}
function selectLi(direction) {
  scope = document.querySelector('#suggestionBox');
  suggetionBoxItems = scope.querySelectorAll(':scope .active');
  if(suggetionBoxItems[0] == null)
    return;
  if(selected != -1){
    suggetionBoxItems[selected].classList.remove('highlighted');
    selected = mod((selected + direction), suggetionBoxItems.length);
    suggetionBoxItems[selected].classList.add('highlighted');
  }else{
    if(direction == UP){
      selected = suggetionBoxItems.length - 1; //-1
    }else{//DOWN
      selected = 0; //1
    }
    suggetionBoxItems[selected].classList.add('highlighted');
  }
}


document.getElementById('query').onkeyup = function(){filterMenuItems(event)};
function filterMenuItems(event){
  filter = event.target.value;
  //console.log(filter);
  let NumberOfActiveElements = 0;
  suggetionBoxItems = document.querySelectorAll('#suggestionBox > li');
  suggetionBox = document.querySelector('#suggestionBox');
    for(const suggetionBoxItem of suggetionBoxItems){
      const textContent = suggetionBoxItem.textContent.trim().toUpperCase();

      if(textContent.indexOf(filter.toUpperCase()) > -1 && NumberOfActiveElements<10 && filter!="" || filter=="*"){
        suggetionBox.classList.remove('hidden');
        suggetionBoxItem.classList.remove('hidden');
        suggetionBoxItem.classList.add('active');

        NumberOfActiveElements += 1;
      }else{
        suggetionBoxItem.classList.add('hidden');
        suggetionBoxItem.classList.remove('active');
      }
    }
  if(NumberOfActiveElements == 0){
    suggetionBox.classList.add('hidden');
    if(selected != -1){
      suggetionBoxItems[selected].classList.remove('highlighted');
      selected = -1;
    }
  }
}
