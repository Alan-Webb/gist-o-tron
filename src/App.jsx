import {useState, useEffect} from "react";

const App = () => {
	const [text, setText] = useState("");
	const [summary, setSummary] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [aiReady, setAiReady] = useState(false);

	useEffect(() => {
		const checkReady = setInterval(() => {
			if (
				window.puter &&
				window.puter.ai &&
				typeof window.puter.ai.chat === "function"
			) {
				setAiReady(true);
				clearInterval(checkReady);
			}
		}, 300);
		return () => clearInterval(checkReady);
	}, []);

	const summarizeText = async () => {
		setLoading(true);
		setSummary("");
		setError("");

		try {
			const response = await window.puter.ai.chat(
				`Please summarize this: ${text}`
			);
			setSummary(response.message?.content || "No summary returned.");
		} catch (err) {
			setError(err.message || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-pink-950 via-stone-950 to-purple-900 flex flex-col items-center justify-center p-3 gap-6">
			<div className="uppercase text-center bg-linear-to-r from-sky-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
				<h1 className="text-6xl sm:text-8xl">Gist-0-Tron</h1>
				<p className="text-2xl sm:text-3xl mb-3">AI Text Summarizer</p>

				<div
					className={`px-4 py-2 rounded-full text-sm ${
						aiReady
							? "bg-green-500/20 text-green-300 border border-green-500/30"
							: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
					}`}>
					{aiReady ? "AI Ready" : "Waiting for AI..."}
				</div>
			</div>
		</div>
	);
};

export default App;
