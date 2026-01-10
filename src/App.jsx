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
		<div className="bg-cover bg-center bg-no-repeat bg-[url('../src/assets/blue-grid.webp')] min-h-screen flex flex-col items-center justify-center p-3 gap-6">
			<div className="uppercase text-center bg-linear-to-r from-sky-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
				<h1 className="text-6xl sm:text-8xl">Gist-0-Tron</h1>
				<p className="text-2xl sm:text-3xl">AI Text Summarizer</p>
			</div>
			{/* Ready Notification */}
			<div
				className={`px-4 py-2 rounded-full text-sm ${
					aiReady
						? "bg-indigo-500/20 text-indigo-300 uppercase tracking-wide border border-stone-500/30 shadow-md shadow-indigo-700"
						: "bg-yellow-500/20 text-yellow-300 uppercase tracking-wide border border-yellow-500/30  shadow-md shadow-yellow-700"
				}`}>
				{aiReady ? "AI Ready" : "Waiting for AI"}
			</div>
			{/* Text Entry */}
			<div className="flex flex-col w-full max-w-2xl bg-linear-to-r from-pink-500/90 via-pink-700/90 to bg-pink-900/90 backdrop-blur-md border border-pink-500 rounded-3xl p-6 shadow-2xl">
				<textarea
					className="w-full h-40 p-4 bg-gray-700/90 border border-gray-400/90 rounded-2xl resize-none text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 disabled:opacity-50 shadow-xl focus:shadow-indigo-700/70"
					placeholder="Paste your text here..."
					value={text}
					onChange={(e) => setText(e.target.value)}
					disabled={!aiReady}></textarea>
				{/* Btn */}
				<button
					onClick={summarizeText}
					className="flex justify-center mx-auto mt-4 px-6 py-3 bg-indigo-700/20 text-white font-bold uppercase tracking-wide border border-stone-500/30 shadow-md shadow-indigo-700 rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
					disabled={!aiReady || loading || !text.trim()}>
					{loading ? (
						<div>
							<div className="mx-auto animate-spin w-4 h-4 border-2 mb-3 border-white/30 border-t-white rounded-full"></div>
							Summarizing...
						</div>
					) : (
						"Summarize"
					)}
				</button>
				{/* Summarized Text */}
				<div className="pt-6 space-y-4 text-white">
					{summary && (
						<div className="p-4 bg-gray-700/60 border border-gray-500 rounded-xl whitespace-pre-wrap">
							{summary}
						</div>
					)}
					{error && (
						<div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-xl">
							{error}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
