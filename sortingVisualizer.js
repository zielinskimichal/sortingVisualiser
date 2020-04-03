let sortableArray = [];
function generateArray() {
  sortableArray = [];
  let clearArray = document.querySelector(".arrayWrapper");
  if (clearArray != null && clearArray != undefined)
    clearArray.parentElement.removeChild(clearArray);
  let numberOfElements = document.querySelector("input").value;
  let newArrayWrapper = document.createElement("div");
  newArrayWrapper.classList.add("arrayWrapper");
  document.querySelector("body").appendChild(newArrayWrapper);
  let arrayWrapperWidth = document.querySelector(".arrayWrapper").offsetWidth;
  let arrayBarWidth =
    (arrayWrapperWidth - numberOfElements * 2) / numberOfElements;
  for (let i = 0; i < numberOfElements; i++) {
    sortableArray.push(Math.round(Math.random() * 600));
    let newArrayBar = document.createElement("div");
    newArrayBar.classList.add("arrayBar");
    newArrayBar.id = i;
    newArrayBar.style.height = sortableArray[i];
    newArrayBar.style.width = `${arrayBarWidth}px`;
    document.querySelector(".arrayWrapper").appendChild(newArrayBar);
  }
}

document
  .querySelector(".generateArray")
  .addEventListener("click", generateArray);
