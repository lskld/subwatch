import Dashboard from "./components/Dashboard";

function App() {
	return (
		<>
			<div className="min-h-svh flex flex-col">
				<main className="w-full xl:w-[70%] mx-auto flex flex-col flex-1">
					<Dashboard />
				</main>
			</div>
		</>
	);
}

export default App;
