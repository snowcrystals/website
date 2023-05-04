import type React from "react";

const Page: React.FC = () => {
	return (
		<>
			<main className="h-screen w-screen">
				<div className="flex items-center justify-center w-full h-full">
					<h1 className="text-12 font-bold w-1/2 text-center">
						Documentation for npm packages by <span className="bg-primary py-1 px-2 rounded-lg">ijsKoud</span>
					</h1>
				</div>
			</main>
		</>
	);
};

export default Page;
