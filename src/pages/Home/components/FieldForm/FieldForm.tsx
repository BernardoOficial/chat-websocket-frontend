import { ChangeEvent, FocusEvent, useRef, useState } from "react";
import "./styles.scss";

interface FieldFormParams {
	label: string;
	nameInput: string;
	setValue: (value: string) => void;
}

export function FieldForm({ label, nameInput, setValue }: FieldFormParams) {

	const [isFieldActive, setIsFieldActive] = useState(false);
	const fieldLabel = useRef<HTMLLabelElement>(null);
	const fieldInput = useRef<HTMLInputElement>(null);

	function handleFieldActive(event: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) {
		if(!fieldInput.current) { return }
		const fieldInputValue = fieldInput.current.value;
		const eventType = event.type;
		if(eventType === "focus" && fieldInputValue.length === 0) { setIsFieldActive(true) }
		if(eventType === "blur" && fieldInputValue.length === 0) { setIsFieldActive(false) }
		else if(fieldInputValue.length > 0) { setIsFieldActive(true) }
	}

	return (
		<div className="field">
			<label
				ref={fieldLabel}
				className={`field__label ${isFieldActive ? "field__label--active" : "" }`}
				htmlFor={nameInput}
			>
				{label}
			</label>
			<input 
				ref={fieldInput}
				className="field__input" 
				type="text" 
				name={nameInput} 
				id={nameInput} 
				onFocus={handleFieldActive} 
				onBlur={handleFieldActive}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}