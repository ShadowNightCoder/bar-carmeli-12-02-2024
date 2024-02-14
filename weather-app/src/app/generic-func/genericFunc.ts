// convert Fahrenheit to Celsius
export function fahrenheitToCelsius(fahrenheit: number): number {
    return parseFloat(((fahrenheit - 32) * 5 / 9).toFixed(1));
}

export function isEnglishLettersOnly(value: string): boolean {
    return /^[a-zA-Z\s]+$/.test(value);
}

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
