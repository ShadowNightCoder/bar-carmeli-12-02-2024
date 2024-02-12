interface CityFiveDaysWether {
    DailyForecasts: Array<{
        Date: String;
        Day: {
            IconPhrase: string;
          };
          Night: {
            IconPhrase: string;
          };
    }>
}

export type CityFiveDaysWetherArray = CityFiveDaysWether[];