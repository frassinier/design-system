import { DefaultTheme } from 'styled-components';

import tokens from '../tokens';

const colors = tokens.colors;

const theme: DefaultTheme = {
	colors: {
		primaryColor: colors.paleCyan,
		informationColor: colors.lochmara,
		warningColor: colors.jaffa500,
		successColor: colors.rioGrande500,
		destructiveColor: colors.chesnutRose500,

		textColor: colors.gray0,
		focusColor: colors.moodyPurple,
		activeColor: colors.paleCyan,
		backgroundColor: colors.gray900,

		inputColor: colors.gray0,
		inputPlaceholderColor: colors.gray100,
		inputBackgroundColor: colors.gray800,
		inputGroupColor: colors.gray0,
		inputGroupBackgroundColor: colors.gray600,
		inputGroupInteractiveColor: colors.paleCyan,
		inputGroupInteractiveBackgroundColor: colors.gray700,
		inputRadioBackgroundColor: colors.gray600,
		inputBackgroundReadOnlyColor: colors.gray600,
		inputBorderColor: colors.gray800,
		inputBorderHoverColor: colors.gray0,
		inputBorderFocusColor: colors.paleCyan,
		inputBorderDisabledColor: colors.gray300,
		inputBorderReadOnlyColor: colors.gray300,
	},
	id: 'dark',
};

export default theme;
