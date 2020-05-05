let sortableArray = [];
let correctlySortedArray = [];
let animations = [];
let animationsValues = [];
let currentAlgorithm;

//adding click listeners to algorithms buttons//
let algorithms = document.querySelectorAll(".sortingAlgorithms__oneAlgorithm ");
algorithms.forEach((element) =>
  element.addEventListener("click", (e) => {
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
    case "Quick sort":
      animationsValues = [];
      animations = [];
      quickSort(0, sortableArray.length - 1);
      correctSort();
      animate();
      break;
    case "Merge sort":
      //console.log(sortableArray);
      animationsValues = [];
      animations = [];
      mergeSort(0, sortableArray.length - 1);
      correctSort();
      // console.log(animations);
      //console.log(animationsValues);
      //console.log(sortableArray);
      animate();
      break;
    case "Insertion sort":
      //console.log(sortableArray);
      animations = [];
      animationsValues = [];
      insertionSort();
      //console.log(sortableArray);
      correctSort();
      animate();
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
    sortableArray.push(Math.round(Math.random() * 550) + 10);
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
  for (let i = 0; i < animations.length; i += 2) {
    setTimeout(() => {
      let animationHelper = animations[i].split(",");

      let firstElement, secondElement;
      firstElement = animationHelper[0];
      secondElement = animationHelper[1];

      if (i > 1) {
        let previousAnimation = document.querySelectorAll(".animated");
        previousAnimation.forEach((e) => {
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
        if (animationsValues[i] < 0) {
          document.getElementById(firstElement).style.height = `${
            animationsValues[i + 1]
          }px`;
        } else {
          document.getElementById(firstElement).style.height = `${
            animationsValues[i + 1]
          }px`;
          document.getElementById(
            secondElement
          ).style.height = `${animationsValues[i]}px`;
        }
      }
    }, 4 * i);
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

  animate();
  correctSort();
}
function correctSort() {
  correctlySortedArray.sort(function (a, b) {
    return a - b;
  });
  for (let i = 0; i < correctlySortedArray.length; i++) {
    if (sortableArray[i] != correctlySortedArray[i]) console.log("fuck");
  }
}

function quickSort(left, right) {
  if (left >= right) return;
  let border = left - 1;
  let pivot = sortableArray[right];
  for (let i = left; i < right; i++) {
    let helper = i + "," + right;
    animations.push(helper);
    if (sortableArray[i] < pivot) {
      helper = i + "," + (border + 1);
      animations.push(helper);
      let temp = sortableArray[i];
      sortableArray[i] = sortableArray[border + 1];
      sortableArray[border + 1] = temp;
      border++;
      animationsValues.push(temp);
      animationsValues.push(sortableArray[i]);
    } else {
      animationsValues.push(0);
      animationsValues.push(0);
      animations.push("none");
    }
  }
  helper = right + "," + (border + 1);
  animations.push(helper);
  animations.push(helper);
  let temp = sortableArray[right];
  sortableArray[right] = sortableArray[border + 1];
  sortableArray[border + 1] = temp;
  animationsValues.push(temp);
  animationsValues.push(sortableArray[right]);
  quickSort(left, border);
  quickSort(border + 2, right);
}

function mergeSort(start, end) {
  let mid = Math.floor((start + end) / 2);
  if (start != end) {
    mid = Math.floor((start + end) / 2);

    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, mid, end);
  }
}

function merge(start, mid, end) {
  let mergeHelper = [];
  for (let i = start; i <= end; i++) {
    mergeHelper[i] = sortableArray[i];
  }

  let i = start;
  let j = mid + 1;
  let k = start;
  while (i <= mid && j <= end) {
    //   console.log(k);
    if (mergeHelper[i] <= mergeHelper[j]) {
      animations.push(j + "," + i);
      animationsValues.push(-1);
      sortableArray[k] = mergeHelper[i];
      animations.push(k + "," + i);
      animationsValues.push(sortableArray[k]);
      i++;
    } else {
      animations.push(j + "," + i);
      animations.push(k + "," + j);
      animationsValues.push(-1);
      sortableArray[k] = mergeHelper[j];
      animationsValues.push(sortableArray[k]);
      j++;
    }
    k++;
  }
  if (i > mid) {
    while (j <= end) {
      //console.log(k);
      animations.push(k + "," + j);
      animations.push(k + "," + j);
      animationsValues.push(-1);
      sortableArray[k] = mergeHelper[j];
      animationsValues.push(sortableArray[k]);
      j++;
      k++;
    }
  } else if (j > end) {
    while (i <= mid) {
      animations.push(k + "," + i);
      animations.push(k + "," + i);
      animationsValues.push(-1);
      sortableArray[k] = mergeHelper[i];
      animationsValues.push(sortableArray[k]);
      //console.log(k);
      i++;
      k++;
    }
  }
}

function insertionSort() {
  let currentElement;
  let correctPosition;
  for (let i = 1; i < sortableArray.length; i++) {
    currentElement = sortableArray[i];
    correctPosition = i;
    for (let j = i - 1; j >= 0; j--) {
      animations.push(j + "," + i);

      if (currentElement < sortableArray[j]) {
        animations.push(j + "," + (j + 1));
        animationsValues.push(sortableArray[j]);
        animationsValues.push(sortableArray[j]);
        sortableArray[j + 1] = sortableArray[j];
        correctPosition = j;
      } else {
        animations.push("none");
        animationsValues.push(0);
        animationsValues.push(0);
        break;
      }
    }

    animations.push(correctPosition + "," + i);
    animations.push(correctPosition + "," + i);
    animationsValues.push(-1);
    animationsValues.push(currentElement);

    sortableArray[correctPosition] = currentElement;
  }
}
