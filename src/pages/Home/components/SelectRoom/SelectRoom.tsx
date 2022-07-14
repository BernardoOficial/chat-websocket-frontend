import "./styles.scss";

interface SelectRoomParams {
	setRoom: (room: string) => void;
}

export function SelectRoom({ setRoom }: SelectRoomParams) {
	return (
		<select 
			className="select-room" 
			name="room" 
			id="select-room" 
			onChange={(e) => setRoom(e.target.value)}
		>
			<option value="">selecione a sala</option>
			<option value="node">node</option>
			<option value="java">java</option>
			<option value="python">python</option>
			<option value="c#">c#</option>
		</select>
	);
}