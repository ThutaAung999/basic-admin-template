/* import { createTheme } from "@mantine/core";

export const theme = createTheme({
  
});
 */

import {
  MantineColorsTuple,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { colors } from "./colors";

export const theme: MantineThemeOverride = {
  fontFamily: "Main Font, sans-serif",
  defaultRadius: "md",
  primaryColor: "primary",
  primaryShade: 5,
  colors: {
    primary: Object.values(colors.primary) as unknown as MantineColorsTuple,
    secondary: Object.values(colors.secondary) as unknown as MantineColorsTuple,
    error: Object.values(colors.error) as unknown as MantineColorsTuple,
  },
  components: {
    InputWrapper: {
      defaultProps: {
        classNames: {
          label: "font-semibold text-sm",
        },
      },
    },
    Input: {
      classNames: {
        input: "disabled:bg-[#f2f2f2] disabled:text-[#333]",
      },
    },
    // Uncomment and modify as needed
    // Tabs: {
    //   classNames: {
    //     list: "before:border-none",
    //     tab: "font-medium border-y-2 border-r-2 border-primary-primary border-collapse rounded-none first:border-2 first:rounded-l-md last:rounded-r-md data-[active=true]:bg-primary-primary data-[active=true]:text-white hover:border-primary-primary",
    //   },
    // },
  },
};

// Wrap your app with MantineProvider
<MantineProvider theme={theme}>{/* your app code */}</MantineProvider>;
