import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FieldForm } from "../Home/components/FieldForm/FieldForm";

import "./styles.scss";

export function Chat() {

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	
	const paramsUsername = searchParams.get("username");
	const paramsRoom = searchParams.get("room");

	const [message, setMessage] = useState("");
	const [username, setUsername] = useState(paramsUsername);
	const [room, setRoom] = useState(paramsRoom);

	console.log(username, room);

	function handleBackPage() {
		navigate("/");
	}

	return (
		<main className="chat">

			<div className="chat__container">

				<header className="chat__header">
					<div className="chat__header-nav">
						<button className="chat-header-nav-back" onClick={handleBackPage}>voltar</button>
						<p className="chat-header-nav-room">sala node</p>
					</div>
					<div className="chat__header-welcome">
						<p className="chat__welcome-text">seja bem vindo Bernardo!</p>
					</div>
				</header>

				<div className="chat__container-messages">
					<ul className="chat__list-messages">
						<li className="chat__item-message">
							<p className="chat__message">olá, meu nome é Bernardo Pereira Oliveira</p>
						</li>
						<li className="chat__item-message chat__item-message--my-message">
							<p className="chat__message">olá, meu nome é Bernardo</p>
						</li>
						<li className="chat__item-message chat__item-message--my-message">
							<p className="chat__message">olá, meu nome é Bernardo</p>
						</li>
						<li className="chat__item-message">
							<p className="chat__message">olá, meu nome é Bernardo Pereira Oliveira</p>
						</li>
						<li className="chat__item-message">
							<p className="chat__message">olá, meu nome é Bernardo Pereira Oliveira</p>
						</li>
						<li className="chat__item-message">
							<p className="chat__message">olá, meu nome é Bernardo Pereira Oliveira</p>
						</li>
						<li className="chat__item-message chat__item-message--my-message">
							<p className="chat__message">olá, meu nome é Bernardo</p>
						</li>
					</ul>
				</div>

				<form className="chat__form">
					<FieldForm label="digite sua mensagem" nameInput="message" setValue={setMessage} />
					<button className="chat__btn-send">enviar</button>
				</form>

			</div>

		</main>
	)
}