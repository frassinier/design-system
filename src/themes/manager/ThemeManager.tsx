import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Form from '../../components/Form';
import InlineMessage from '../../components/InlineMessage';

import dictionary from '../light/dictionary';

import theme from './ThemeManager.scss';

type TokenType =
	| 'color'
	| 'gradient'
	| 'measure'
	| 'shadow'
	| 'typography'
	| 'radius'
	| 'border'
	| 'opacity'
	| 'breakpoint';

type Token = {
	name: string;
	type: TokenType;
	description: string;
	value: string;
};

type ColorToken = Token & {
	hex: string;
	hsla: string;
};

enum STATE {
	DEFAULT,
	LIGHT,
	DARK,
}

function groupBy(collection, property) {
	return collection.reduce((acc, cur) => {
		(acc[cur[property]] = acc[cur[property]] || []).push(cur);
		return acc;
	}, {});
}

function getLabel(token) {
	return token.name
		.replace('coral', '')
		.split(/(?=[A-Z])/)
		.join(' ');
}

const ColorField = React.forwardRef(({ token, property, ...rest }: { token: ColorToken }, ref) => {
	const [color, setColor] = React.useState(token.value);
	return (
		<Form.FieldGroup
			label={getLabel(token)}
			description={token.description}
			suffix={
				<div
					style={{
						width: '3.2rem',
						height: '3.2rem',
						background: color,
						boxShadow: 'inset 8px 0px 8px 0px hsla(0, 0%, 50%, .1) ',
					}}
				/>
			}
		>
			<Form.Text
				name={token.name}
				defaultValue={property || token.value}
				{...rest}
				onKeyUp={e => setColor(e.target.value)}
				ref={ref}
			/>
		</Form.FieldGroup>
	);
});

const ThemeEditor = React.forwardRef(
	(
		{
			properties = [],
			onBack,
			onSubmit,
		}: { properties: Property[]; onBack: () => void; onSubmit: () => void },
		ref,
	) => {
		const { register, handleSubmit } = useForm();
		return (
			<Form onSubmit={handleSubmit(onSubmit)} ref={ref}>
				<InlineMessage.Warning
					title="Caution"
					description="Editing these values will impact all your users!"
					withBackground
				/>
				{Object.entries(groupBy(dictionary, 'type')).map(([type, tokens], index) => (
					<Form.Fieldset key={index} legend={type}>
						{tokens.map((token: Token, key: number) =>
							type === 'color' ? (
								<ColorField
									token={token}
									property={properties[token.name]}
									key={key}
									{...register(token.name)}
								/>
							) : (
								<Form.Text
									key={key}
									label={getLabel(token)}
									name={token.name}
									description={token.description}
									defaultValue={properties[token.name] || token.value}
									{...register(token.name)}
								/>
							),
						)}
					</Form.Fieldset>
				))}
				<Form.Buttons>
					<Button.Secondary onClick={onBack}>Back</Button.Secondary>
					<Button.Primary type="submit">Save</Button.Primary>
				</Form.Buttons>
			</Form>
		);
	},
);

type Property = {
	[key: string]: string;
};

type ThemeManagerProps = {
	isLightThemeEnabled: boolean;
	isDarkThemeEnabled: boolean;
	setLightThemeEnabled: (value: boolean) => void;
	setDarkThemeEnabled: (value: boolean) => void;
	lightProperties: Property[];
	darkProperties: Property[];
	onLightThemeSubmit: () => void;
	onDarkThemeSubmit: () => void;
};

const ThemeManager = ({
	isLightThemeEnabled,
	isDarkThemeEnabled,
	setLightThemeEnabled,
	setDarkThemeEnabled,
	lightProperties,
	darkProperties,
	onLightThemeSubmit,
	onDarkThemeSubmit,
}: ThemeManagerProps) => {
	const [state, setState] = React.useState(STATE.DEFAULT);

	const goBack = () => {
		setState(STATE.DEFAULT);
	};

	switch (state) {
		case STATE.LIGHT:
			return (
				<ThemeEditor onBack={goBack} properties={lightProperties} onSubmit={onLightThemeSubmit} />
			);
		case STATE.DARK:
			return (
				<ThemeEditor onBack={goBack} properties={darkProperties} onSubmit={onDarkThemeSubmit} />
			);
		default:
			return (
				<div className={theme.manager}>
					{/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
					<ul role="list" className={theme.list}>
						<li>
							<Form>
								<Form.Fieldset>
									<figure className={theme.mode}>
										<img
											src="https://github.githubassets.com/images/modules/settings/color_modes/light_colorblind_preview.svg"
											alt=""
										/>
										<figcaption>
											<div className={theme.switch}>
												<Form.Switch
													onChange={() => setLightThemeEnabled(!isLightThemeEnabled)}
													label="Enable custom light theme"
													checked={isLightThemeEnabled}
												/>
											</div>
											{isLightThemeEnabled && (
												<Button.Secondary small onClick={() => setState(STATE.LIGHT)}>
													Edit light theme
												</Button.Secondary>
											)}
										</figcaption>
									</figure>
								</Form.Fieldset>
							</Form>
						</li>
						<li>
							<Form>
								<Form.Fieldset>
									<figure className={theme.mode}>
										<img
											src="https://github.githubassets.com/images/modules/settings/color_modes/dark_colorblind_preview.svg"
											alt=""
										/>
										<figcaption>
											<div className={theme.switch}>
												<Form.Switch
													onChange={() => setDarkThemeEnabled(!isDarkThemeEnabled)}
													label="Enable custom dark theme"
													checked={isDarkThemeEnabled}
												/>
											</div>
											{isDarkThemeEnabled && (
												<Button.Secondary small onClick={() => setState(STATE.DARK)}>
													Edit dark theme
												</Button.Secondary>
											)}
										</figcaption>
									</figure>
								</Form.Fieldset>
							</Form>
						</li>
					</ul>
				</div>
			);
	}
};

export default ThemeManager;
