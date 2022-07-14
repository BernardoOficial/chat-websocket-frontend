import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FieldForm } from "../Home/components/FieldForm/FieldForm";
import { io } from "socket.io-client";

import "./styles.scss";

interface Message {
	username: string;
	room: string;
	message: string;
}

const socket = io("http://localhost:3001");

export function Chat() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	
	const paramsUsername = searchParams.get("username");
	const paramsRoom = searchParams.get("room");

	const [message, setMessage] = useState("");
	const [username, setUsername] = useState(paramsUsername);
	const [room, setRoom] = useState(paramsRoom);

	useEffect(() => {
		if(paramsRoom === null && paramsUsername === null) {
			navigate("/");
		}
	}, [navigate, paramsRoom, paramsUsername])
	
	useEffect(() => {
		console.log(username, room);
	}, [username, room])
	
	useEffect(() => {
		socket.on("receive-message", data => {
			console.log(data);
		});
	}, [])

	socket.on("receive-message", data => {
		console.log(data);
	});

	useEffect(() => {
	}, [message])

	function updateMessage(newMessage: string) {
		setMessage(newMessage);
	}

	function handleBackPage() {
		navigate("/");
	}

	function submitNewMessage() {
		if(message.length > 0 && room && username) {
			const newMessage: Message = {
				message,
				room,
				username,
			}
			socket.emit("send-message", newMessage);
			setMessage("");
		}
	}

	function handleInputSubmitMessage(event: KeyboardEvent<HTMLInputElement>) {
		event.preventDefault();
		if(event.code !== "Enter") { return }
		submitNewMessage();
	}
	
	function handleButtonSubmitMessage(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		submitNewMessage();
	}

	return (
		<main className="chat">

			<div className="chat__container">

				<header className="chat__header">
					<div className="chat__header-nav">
						<button className="chat-header-nav-back" onClick={handleBackPage}>voltar</button>
						<p className="chat-header-nav-room">sala {room}</p>
					</div>
					<div className="chat__header-welcome">
						<p className="chat__welcome-text">seja bem vindo {username}!</p>
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
					</ul>
				</div>

				<section className="chat__send-message">
					<FieldForm label="digite sua mensagem" nameInput="message" value={message} setValue={updateMessage} handleKeyUp={handleInputSubmitMessage} />
					<button type="button" className="chat__btn-send" onClick={handleButtonSubmitMessage}>enviar</button>
				</section>

			</div>

		</main>
	)
}