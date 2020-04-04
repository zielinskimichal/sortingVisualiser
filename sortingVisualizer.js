let sortableArray = [];
let correctlySortedArray = [];
let animations = [];
let animationsValues = [];
let currentAlgorithm;

//adding click listeners to algorithms buttons//
let algorithms = document.querySelectorAll(".sortingAlgorithms__oneAlgorithm ");
algorithms.forEach(element =>
  element.addEventListener("click", e => {
    currentAlgorithm = e.target.innerHTML;
    let buttonClear = document.querySelector(".bolded");
    if (buttonClear != null && buttonClear != undefined) {
      buttonClear.classList.remove("bolded");
    }
    e.target.classList.add("bolded");
  })
);
function processAlgorithmChoice() {
  switch (currentAlgorithm) {
    case "Bubble sort":
      bubbleSort();
      break;
    case "Selection sort":
      selectionSort();
      break;
  }
}

function generateArray() {
  sortableArray = [];
  correctlySortedArray = [];
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
    sortableArray.push(Math.round(Math.random() * 750) + 10);
    let newArrayBar = document.createElement("div");
    newArrayBar.classList.add("arrayBar");
    newArrayBar.id = i;
    newArrayBar.style.height = sortableArray[i];
    newArrayBar.style.width = `${arrayBarWidth}px`;
    document.querySelector(".arrayWrapper").appendChild(newArrayBar);
  }

  for (let i = 0; i < sortableArray.length; i++) {
    correctlySortedArray.push(sortableArray[i]);
  }
}

document
  .querySelector(".generateArray")
  .addEventListener("click", generateArray);

function bubbleSort() {
  animations = [];
  animationsValues = [];
  for (let i = 0; i < sortableArray.length - 1; i++) {
    let ifSorted = true;
    for (let j = 0; j < sortableArray.length - 1 - i; j++) {
      let animation = j + "," + (j + 1);
      animations.push(animation);
      animationsValues.push(sortableArray[j]);
      animationsValues.push(sortableArray[j + 1]);
      if (sortableArray[j] > sortableArray[j + 1]) {
        animations.push(animation);
        let temp = sortableArray[j];
        sortableArray[j] = sortableArray[j + 1];
        sortableArray[j + 1] = temp;
        ifSorted = false;
      } else {
        animations.push("none");
      }
    }
    if (ifSorted == true) break;
  }
  animate();
}
document
  .querySelector(".sortButton")
  .addEventListener("click", processAlgorithmChoice);

function animate() {
  //console.log(animations);
  for (let i = 0; i < animations.length; i += 2) {
    setTimeout(() => {
      let animationHelper = animations[i].split(",");

      let firstElement, secondElement;
      firstElement = animationHelper[0];
      secondElement = animationHelper[1];

      if (i > 1) {
        let previousAnimation = document.querySelectorAll(".animated");
        previousAnimation.forEach(e => {
          e.classList.remove("animated");
        });
      }
      let firstAnimated = document.getElementById(firstElement);
      firstAnimated.classList.add("animated");
      let secondAnimated = document.getElementById(secondElement);
      secondAnimated.classList.add("animated");
      if (animations[i + 1] != "none" && animations[i + 1] != undefined) {
        animationHelper = animations[i + 1].split(",");
        firstElement = animationHelper[0];
        secondElement = animationHelper[1];
        document.getElementById(firstElement).style.height = `${
          animationsValues[i + 1]
        }px`;
        document.getElementById(
          secondElement
        ).style.height = `${animationsValues[i]}px`;
      }
    }, 2 * i);
  }
  correctSort();
}
function selectionSort() {
  animationsValues = [];
  animations = [];
  for (let i = 0; i < sortableArray.length; i++) {
    let minUnsortedIndex = i;
    let firstUnsortedIndex = i;
    for (let j = i + 1; j < sortableArray.length; j++) {
      let animation = minUnsortedIndex + "," + j;
      animations.push(animation);

      if (sortableArray[j] < sortableArray[minUnsortedIndex]) {
        minUnsortedIndex = j;
      }
      if (j != sortableArray.length - 1) {
        animations.push("none");
        animationsValues.push(0);
        animationsValues.push(0);
      }
    }
    animation = firstUnsortedIndex + "," + minUnsortedIndex;
    animations.push(animation);
    let temp = sortableArray[firstUnsortedIndex];
    sortableArray[firstUnsortedIndex] = sortableArray[minUnsortedIndex];
    sortableArray[minUnsortedIndex] = temp;
    animationsValues.push(sortableArray[minUnsortedIndex]);
    animationsValues.push(sortableArray[firstUnsortedIndex]);
  }
  //  console.log(animations);
  // console.log(animationsValues);
  animate();
  correctSort();
}
function correctSort() {
  correctlySortedArray.sort(function(a, b) {
    return a - b;
  });
  for (let i = 0; i < correctlySortedArray.length; i++) {
    if (sortableArray[i] != correctlySortedArray[i]) console.log("fuck");
  }
}
