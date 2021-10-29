import React from 'react';
import { isElement } from 'react-is';

import * as S from './Buttons.style';

type ButtonsProps = React.HTMLAttributes<HTMLDivElement> & {
	disabled?: boolean;
	readOnly?: boolean;
};

const Buttons = React.forwardRef(
	({ disabled, readOnly, children, ...rest }: ButtonsProps, ref: React.Ref<HTMLDivElement>) => {
		const childrenProps: { disabled?: boolean; readOnly?: boolean } = {};
		if (disabled) childrenProps.disabled = true;
		if (readOnly) childrenProps.readOnly = true;

		return (
			<S.Buttons {...rest} ref={ref}>
				{React.Children.toArray(children).map((child, key: number) =>
					isElement(child)
						? React.cloneElement(child, {
								...childrenProps,
								key: `buttons-${key}`,
						  })
						: child,
				)}
			</S.Buttons>
		);
	},
);

export default Buttons;
