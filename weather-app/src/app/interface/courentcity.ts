export interface CurrentCity {
    weatherText: string;
    timeRightNow: string;
    weatherIcon: string;
    temperatureImperial: {
        value: number | null | string; // Allow null or string types
        unit: string;
        unitType: number;

    };
}