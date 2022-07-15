import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FieldForm } from "../Home/components/FieldForm/FieldForm";
import { io } from "socket.io-client";

import "./styles.scss";
import { formatDate } from "../../utils/formatDate";

interface Message {
	username: string;
	room: string;
	message: string;
}

interface MessageRoom {
	username: string;
	room: string;
	message: string;
	createdAt: Date;
}

const socket = io("http://localhost:3001");
socket.on("connect", () => console.log("[IO] Connect"));

export function Chat() {

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	
	const paramsUsername = searchParams.get("username");
	const paramsRoom = searchParams.get("room");

	const [message, setMessage] = useState("");
	const [username, setUsername] = useState(paramsUsername);
	const [room, setRoom] = useState(paramsRoom);
	const [messagesRoom, setMessagesRoom] = useState<MessageRoom[]>([]);

	useEffect(() => {
		if(paramsRoom === null && paramsUsername === null) {
			navigate("/");
		}
	}, [navigate, paramsRoom, paramsUsername])
	
	useEffect(() => {
		socket.emit("room", { username, room }, (response: MessageRoom[]) => {
			setMessagesRoom(response);
		});
	}, [username, room]);
	
	useEffect(() => {
		const updateNewMessage = (newMessage: MessageRoom) => 
			setMessagesRoom(currentMessages => [...currentMessages, newMessage])
		socket.on("receive-message", updateNewMessage);
		return function () { socket.off("receive-message", updateNewMessage) }
	}, []);

	function updateMessage(newMessage: string) {
		setMessage(newMessage);
	}

	function handleBackPage() {
		navigate("/");
		socket.disconnect();
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
						{messagesRoom.length > 0 ? (
							messagesRoom.map((message, i) => (
								<li key={i} className={`chat__item-message ${message.username === username ? 'chat__item-message--my-message' : '' }`}>
									<div className="chat__message-info">
										<span className="chat__info-item chat__author">{message.username}</span>
										<span className="chat__info-item chat__created-at">{formatDate(message.createdAt)}</span>
									</div>
									<p className="chat__message">{message.message}</p>
								</li>
							))
						) : (
							<li className="chat__item-empty">
								<p className="chat__message">inicie uma conversa no chat</p>
							</li>
						)}
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