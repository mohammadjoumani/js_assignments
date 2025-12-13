
let arr = [2,3,4,7,11];
const k = 10;


function getMissingPositiveIntegers() {
    var arr1 = [];
    for(var i = 0;i< arr.length;i++) {
        let dis = arr[i] - (arr[i-1] ?? 0);
        if(dis > 1) {
            for(var j = dis - 1; j >= 1; j--) {
                arr1.push(arr[i] - j);
            }
        }
    }
    
    const lastItem = arr1[arr1.length - 1] ?? arr[arr.length - 1];
    console.log(lastItem);
    
    const numberOfLoop = k - arr1.length;
    for(var n = 0; n< numberOfLoop; n++) {
        const newItem = lastItem+ 1 + n;
        arr1.push(newItem);
    }


    console.log(arr1);

    console.log(arr1[k-1]);
    
}

getMissingPositiveIntegers();