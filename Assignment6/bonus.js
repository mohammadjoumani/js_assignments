


function removeElement(nums, val) {
    let k = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i];
            k++;
        }
    }

    return k;
}


const nums = [0, 1, 2, 2, 3, 0, 4, 2];
const val = 2;

const k = removeElement(nums, val);
console.log(k);
// console.log(nums);
console.log(nums.slice(0, k)); 
