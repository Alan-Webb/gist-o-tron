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
	}

	return (
		<div className="min-h-screen bg-linear-to-br from-pink-950 via-stone-950 to-purple-900 flex flex-col items-center justify-center p-3 gap-6">
			<div className="uppercase text-center bg-linear-to-r from-sky-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
				<h1 className="text-6xl sm:text-8xl">Gist-0-Tron</h1>
				<p className="text-2xl sm:text-3xl">AI Text Summarizer</p>
			</div>
		</div>
	);
};

export default App;
