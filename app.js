"use strict";
const num1Element = document.getElementById("num1");
const num2Element = document.getElementById("num2");
const button = document.querySelector("button");
const numResults = [];
const textResults = [];
function addNum(num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }
    else if (typeof num1 === "string" && typeof num2 === "string") {
        return num1 + " " + num2;
    }
    //   forced conversion to integer from string if one value is string
    return +num1 + +num2;
}
function printResult(resultObj) {
    console.log("resultObj = " + resultObj.val);
}
if (button) {
    button.addEventListener("click", () => {
        const num1 = num1Element.value;
        const num2 = num2Element.value;
        const integerValue = addNum(+num1, +num2);
        numResults.push(integerValue);
        console.log("result = " + integerValue);
        const stringValue = addNum(num1, num2);
        textResults.push(stringValue);
        console.log("stringValue = " + stringValue);
        printResult({ val: integerValue, timestamp: new Date() });
        console.log("numResults = ", numResults + " textResults = ", textResults);
    });
}
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("It worked!!");
    }, 1000);
});
myPromise.then((result) => {
    console.log("result = " + result.split("w"));
});
// console.log(addNum(1, 2));
// console.log(addNum("5", "7"));//error
