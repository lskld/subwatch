import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./lib/auth-context";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
