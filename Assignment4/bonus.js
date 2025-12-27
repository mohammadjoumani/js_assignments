
function longestCommonPrefix() {
    var arr = ["flower","flow","flight"];
    var result = "";
    const firstItem = [...arr[0]];
    for (var i = 0; i < firstItem.length; i++) {
        for (var item of arr) {
            var otherItem = [...item];
            if (firstItem[i] != otherItem[i]) {
                return result;
            }
        }
        result += firstItem[i];
    }
    
}

console.log(longestCommonPrefix());
