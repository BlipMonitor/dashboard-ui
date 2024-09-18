/**
 * Available time ranges for data analysis and display in the dashboard.
 */
export enum TimeRange {
  HOUR_1 = 'HOUR_1',
  HOUR_3 = 'HOUR_3',
  HOUR_6 = 'HOUR_6',
  HOUR_12 = 'HOUR_12',
  DAY_1 = 'DAY_1',
  DAY_3 = 'DAY_3',
  WEEK_1 = 'WEEK_1',
  WEEK_2 = 'WEEK_2',
  MONTH_1 = 'MONTH_1',
  MONTH_3 = 'MONTH_3',
  MONTH_6 = 'MONTH_6',
  YEAR_1 = 'YEAR_1',
  ALL_TIME = 'ALL_TIME'
}

/**
 * Available limits for data fetching.
 */
export enum Limit {
  LIMIT_1 = 1,
  LIMIT_5 = 5,
  LIMIT_10 = 10,
  LIMIT_25 = 25,
  LIMIT_50 = 50,
  LIMIT_100 = 100,
}