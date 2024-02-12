export interface CurrentWeather {
  WeatherText: string;
  WeatherIcon: number;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
  };
}