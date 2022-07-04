import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Home";

import { NotFound } from "./pages/NotFound";

import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="chat" element={<Chat />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
  );
}

export default App;
