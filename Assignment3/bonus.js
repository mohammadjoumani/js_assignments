function getMajorityElement() {
    var max = 0;
    const numsMap = new Map();
    var nums = [3, 2, 3];

    for (num of nums) {
        const value = (numsMap.get(num) ?? 0) + 1
        numsMap.set(num, value);
    }

    for (const [key, value] of numsMap) {
        console.log(key, value);

        if (value > nums.length / 2) {
            max = key;
        }
    }
    console.log(max);

}


getMajorityElement();