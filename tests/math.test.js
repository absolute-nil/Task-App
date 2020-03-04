const { tipping,fahrenheitToCelsius,celsiusToFahrenheit } = require("../src/math");

test("Tipping function", () => {
  const total = tipping(10, 0.3);
  expect(total).toBe(13);
  // console.log(total)
  // if(total!==13){
  //     throw new Error("incorrect tip. tip should be 13 but recieved ",total)
  // }
});

test("farhenite to celsius",()=>{
    const celsius = fahrenheitToCelsius(32)
    expect(celsius).toBe(0)
})

test("celsius to farhenite",()=>{
    const farhenite = celsiusToFahrenheit(0)
    expect(farhenite).toBe(32)
})