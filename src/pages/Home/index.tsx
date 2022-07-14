import { FormEvent, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { FieldForm } from "./components/FieldForm/FieldForm";
import { SelectRoom } from "./components/SelectRoom/SelectRoom";

import "./styles.scss";

export function Home() {

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event?.preventDefault();

		if(username.length > 1 && room.length > 0 && room !== "selecione a sala") {
			navigate("/chat" + `?username=${username}&room=${room}`);
		}
	}

	return (
		<main className="home">
			
			<div className="home__container">

				<form className="home__form" onSubmit={handleSubmit}>
				
					<h1 className="home__title">Chat</h1>
					<p className="home__description">converse sobre suas tecnologias preferidas com seus colegas, para trocar de experiência, dúvidas etc.</p>

					<SelectRoom setRoom={setRoom} />
					<FieldForm label="nome" nameInput="username" value={username} setValue={setUsername}  />

					<div className="home__container-submit">
						<button className="home__submit" type="submit">entrar na sala</button>
					</div>

				</form>

			</div>

		</main>
	)
}