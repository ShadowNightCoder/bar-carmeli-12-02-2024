// convert Fahrenheit to Celsius
export function fahrenheitToCelsius(fahrenheit: number): number {
    console.log("the number you send bar is: " + fahrenheit)
    console.log("the number you send bar is:------------ " + parseFloat(((fahrenheit - 32) * 5 / 9).toFixed(1)))
    return parseFloat(((fahrenheit - 32) * 5 / 9).toFixed(1)); 
}

// // set if its day or night to know what image to show
// export function dayOrNight(cityTime: string): string {
//     const time = new Date(cityTime); // Convert the string to a Date object
//     const hour = time.getHours(); // Get the hour component of the time

//     if (hour >= 5 && hour < 19) {
//         return "day";
//     } else {
//         return "night";
//     }
// }


export function dayOrNight(cityTime: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const time = new Date(cityTime);
        const hour = time.getHours();
        console.log("the houre is:::: " + cityTime)
        console.log("the houre is:::: " + time)

        if (hour >= 5 && hour < 20) {
            resolve("day");
            console.log("just a day???")
        } else {
            resolve("night");
            console.log("just a night??????")
        }
    });
}
