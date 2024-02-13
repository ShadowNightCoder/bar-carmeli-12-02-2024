export interface weatherForFiveDays{
    Date: string;
    Day: {
        PrecipitationIntensity: string,
        PrecipitationType: string
    }
    Night: {
        PrecipitationIntensity: string,
        PrecipitationType: string
    }
}