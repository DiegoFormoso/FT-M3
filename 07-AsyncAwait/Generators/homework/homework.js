function* fizzBuzzGenerator(max) {
  let number = 1;
  while (!max || number <= max) {
    if (number % 3 === 0 && number % 5 === 0) { 
       yield "Fizz Buzz";
    }
    else if (number % 3 === 0) {
       yield "Fizz";
    }
    else if (number % 5 === 0)
       yield "Buzz";
    else
       yield number;   
    number ++;
  }
}

module.exports = fizzBuzzGenerator;
