var createCounter = function(init) {
    let currentValue = init;
    return obj = {
        increment:function() {
            currentValue+=1;
            return currentValue;
        },
        decrement: function() {
            currentValue-=1;
            return currentValue;
        },
        reset: function() {
            currentValue = init;
            return currentValue;
        }
    }
};

const counter = createCounter(5);
console.log(counter.increment());
console.log(counter.reset());     
console.log(counter.decrement()); 