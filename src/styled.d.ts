import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
	colors: {
        //
        primaryColor: string,
		informationColor: string,
		warningColor: string,
		successColor: string,
		destructiveColor: string,
        // 
		textColor: string,
		focusColor: string,
		activeColor: string,
		backgroundColor: string,
        // Inputs
		inputColor:string,
		inputPlaceholderColor: string,
		inputBackgroundColor: string,
		inputGroupColor: string,
		inputGroupBackgroundColor: string,
		inputGroupInteractiveColor: string,
		inputGroupInteractiveBackgroundColor: string,
		inputRadioBackgroundColor: string,
		inputBackgroundReadOnlyColor: string,
		inputBorderColor: string,
		inputBorderHoverColor: string,
		inputBorderFocusColor: string,
		inputBorderDisabledColor: string,
		inputBorderReadOnlyColor: string,
	},
	id: string,
  }
}