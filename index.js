// const { arch } = require("os");
// const { array } = require("zod");


const quickSort = (array, low, high) => {
    if (low < high) {
        const location = partition(array, low, high);
        quickSort(array, low, location - 1)
        quickSort(array, location + 1, high)
    }
}

const partition = (array, low, high) => {
    let start = low
    let end = high
    let pivot = array[low];

    while (start < end) {
        while (array[start] <= pivot) {
            start++
        }
        while (array[end] > pivot) {
            end--
        }
        if (start < end) {
            let temp = array[start];
            array[start] = array[end]
            array[end] = temp;
        }
    }
    let temp = array[low];
    array[low] = array[end]
    array[end] = temp
    return end
}

const result = (array) => {
    quickSort(array, 0, array.length - 1)
    return array
}

const array = [2, 3, 5, 9, 7, 8, 6]

console.log(result(array))
console.log(array)