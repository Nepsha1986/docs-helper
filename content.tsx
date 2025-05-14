import { useEffect } from 'react';
import { render } from 'react-dom';

const MyReactApp = () => {
	return <div style={{ padding: '10px', backgroundColor: 'lightblue' }}>My Small React App</div>;
};

const PlasmoContent = () => {
	const renderAppNearBlock = () => {
		const blocks = document.querySelectorAll('[data-testid="payment_links_list"]');

		blocks.forEach((block) => {
			// Only render if the app is not already rendered near the block
			if (!block.nextElementSibling || !block.nextElementSibling.classList.contains('react-app-container')) {
				const appContainer = document.createElement('div');
				appContainer.classList.add('react-app-container'); // Add a class to avoid rendering multiple times
				appContainer.style.marginTop = '10px'; // Adjust the spacing as needed
				block.insertAdjacentElement('afterend', appContainer);

				render(<MyReactApp />, appContainer);
			}
		});
	};

	useEffect(() => {
		const onPageLoad = () => {
			renderAppNearBlock();

			const observer = new MutationObserver(() => {
				renderAppNearBlock();
			});

			observer.observe(document.body, { childList: true, subtree: true });

			return () => observer.disconnect();
		};

		if (document.readyState === 'loading') {
			window.addEventListener('DOMContentLoaded', onPageLoad);
			return () => window.removeEventListener('DOMContentLoaded', onPageLoad);
		} else {
			onPageLoad();
		}
	}, []);

	return null; // This component does not render anything itself
};

export default PlasmoContent;
