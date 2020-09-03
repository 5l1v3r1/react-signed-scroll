import React from 'react';

import { SignedContainer, SignedSection } from '../src';

const App = () => (
	<SignedContainer
		options={{
			debug: true,
			scrollDirection: 'horizontal',

			transitionDelay: 500,
			transitionFunction: 'linear',

			containerId: 'signed-container',
			containerClassName: 'signed-container',

			sectionClassName: 'signed-section',
			activeSectionClassName: 'signed-section--active',
			anchors: ['home', 'about-me', 'reach-out'],

			initialSectionIndex: 0,
		}}
	>
		<SignedSection className="section1" />
		<SignedSection className="section2" />
		<SignedSection className="section3" />
	</SignedContainer>
);

export default App;
