import { Theme } from 'react-native-calendars/src/types';

export type ExtendedTheme = Theme & {
  'stylesheet.calendar.header': {
    dayHeader: {
      marginTop: number;
      marginBottom: number;
      textAlign: string;
      fontSize: number;
      fontWeight: string;
      color: string;
    };
  };
};
