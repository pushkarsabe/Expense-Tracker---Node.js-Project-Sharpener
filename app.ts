const num1Element = document.getElementById("num1") as HTMLInputElement;
const num2Element = document.getElementById("num2") as HTMLInputElement;
const button = document.querySelector("button")!;

const numResults: Array<number> = [];
const textResults: string[] = [];

type NumOrString = number | string;
type Result = { val: number; timestamp: Date };

interface ResultObj {
  val: number;
  timestamp: Date;
}

function addNum(num1: NumOrString, num2: NumOrString) {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else if (typeof num1 === "string" && typeof num2 === "string") {
    return num1 + " " + num2;
  }
  //   forced conversion to integer from string if one value is string
  return +num1 + +num2;
}

function printResult(resultObj: Result) {
  console.log("resultObj = " + resultObj.val);
}

if (button) {
  button.addEventListener("click", () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const integerValue = addNum(+num1, +num2);
    numResults.push(integerValue as number);
    console.log("result = " + integerValue);

    const stringValue = addNum(num1, num2);
    textResults.push(stringValue as string);
    console.log("stringValue = " + stringValue);
    printResult({ val: integerValue as number, timestamp: new Date() });
    console.log("numResults = ", numResults + " textResults = ", textResults);
  });
}

const myPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("It worked!!");
  }, 1000);
});

myPromise.then((result) => {
  console.log("result = " + result.split("w"));
});

// console.log(addNum(1, 2));
// console.log(addNum("5", "7"));//error
