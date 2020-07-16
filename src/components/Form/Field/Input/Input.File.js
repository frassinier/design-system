import React from 'react';
import { shade, tint } from 'polished';
import styled from 'styled-components';
import { VisuallyHidden } from 'reakit';
import Button from '../../../Button';
import Link from '../../../Link';
import Icon from '../../../Icon';
import Input from './Input';
import tokens from '../../../../tokens';

const FileField = styled.div(
	({ theme }) => `
	
	.input-file {
		position: relative;
		border: 1px dashed ${theme.colors.inputBorderColor};
		border-radius: ${tokens.radii.inputBorderRadius};
		
		&:hover {
			border-color: ${theme.colors.inputBorderHoverColor};
			
			.text__icon {
                fill: ${theme.colors.inputBorderHoverColor};
            }
		}

		&--dragging {
			background: ${tint(0.95, theme.colors.activeColor)};
			border: 2px dashed ${theme.colors.activeColor};
			
            .text__icon {
                fill: ${theme.colors.activeColor};
            }
		}
		
		&__text,
		&__preview,
		&__input {
			min-height: 6.4rem;
		}

		&__input {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			opacity: 0;
		}
	}
	
	.text {
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${theme.colors.inputPlaceholderColor};
		
		&__icon {
			margin: 0 1rem;
			width: ${tokens.sizes.smaller};
			fill: ${theme.colors.inputPlaceholderColor};
		}
	}	
	
	.preview {
		position: relative;
		
		&__list {
			padding: 0 1rem;
			
			&-item {
				line-height: 3.2rem;
				color: ${theme.colors.inputColor}; 
			}
		}
		
		&__button {
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 3.2rem;
			border: none;
			
			&:focus {
			  	outline: none;
			}
			
			svg {
				position: static;
				margin:0;
				width: ${tokens.sizes.smaller};
				
				path {
					fill: ${theme.colors.activeColor};
				}
			}
			  
			&:hover {    
				svg path {
					fill: ${shade(0.25, theme.colors.activeColor)};
				}
			}
		}
	}
	
	.input {
		input[type=file], 
		input[type=file]::-webkit-file-upload-button {
			height: 100%;
			cursor: pointer; 
		}
		
		&--filled {				
			pointer-events: none;
		}
	}
`,
);

function getFileSize(size) {
	if (size < 1024) {
		return size + 'bytes';
	} else if (size > 1024 && size < 1048576) {
		return (size / 1024).toFixed(1) + 'KB';
	} else if (size > 1048576) {
		return (size / 1048576).toFixed(1) + 'MB';
	}
}

function InputFile(props) {
	const [drag, setDrag] = React.useState(false);
	const [files, setFiles] = React.useState(props.files);

	const inputRef = React.useRef();

	React.useEffect(() => {
		const input = inputRef.current;
		input?.addEventListener('dragenter', handleDragIn);
		input?.addEventListener('dragleave', handleDragOut);
		input?.addEventListener('drop', handleDrop);
		input?.addEventListener('change', handleChange);

		return () => {
			const input = inputRef.current;
			input?.removeEventListener('dragenter', handleDragIn);
			input?.removeEventListener('dragleave', handleDragOut);
			input?.removeEventListener('drop', handleDrop);
			input?.removeEventListener('change', handleChange);
		};
	}, []);

	function handleChange() {
		const input = inputRef.current;
		setFiles(() => [...input.files]);
	}

	function clear() {
		const input = inputRef.current;
		input.value = '';
		setFiles(() => null);
	}

	function handleDragIn(e) {
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setDrag(() => true);
		}
	}

	function handleDragOut(e) {
		setDrag(() => false);
	}

	function handleDrop(e) {
		setDrag(() => false);
	}

	const id = `info-${Math.round(Math.random() * 1e5)}`;

	return (
		<FileField aria-describedby={id}>
			<div id={id} className={`input-file ${drag ? 'input-file--dragging' : ''}`}>
				{!files ? (
					<div className="input-file__text text">
						<Icon className="text__icon" name="upload" />{' '}
						<span className="text__span">
							Drop your files or <Link className="text__link">browse</Link>
						</span>
					</div>
				) : (
					<div className="input-file__preview preview">
						<VisuallyHidden>You've selected:</VisuallyHidden>
						<ol className="preview__list">
							{files.map((file, index) => (
								<li className="preview__list-item" key={index}>
									{typeof file === 'string' ? file : `${file.name} (${getFileSize(file.size)})`}
								</li>
							))}
						</ol>
						<Button className="preview__button" onClick={clear}>
							<Icon className="preview__button-icon" name="cross" />
							<VisuallyHidden>Clear selection</VisuallyHidden>
						</Button>
					</div>
				)}
				<div className={`input-file__input input ${files ? 'input--filled' : ''}`}>
					<input type="file" {...props} ref={inputRef} />
				</div>
			</div>
		</FileField>
	);
}

function File(props) {
	return <Input as={InputFile} {...props} />;
}

export default File;
