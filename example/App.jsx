import React from 'react';

import { Container, Section } from '../build';

const App = () => (
	<Container
		debug
		options={{
			scrollType: 'horizontal',

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
		<Section className="section1" />
		<Section className="section2" />
		<Section className="section3" />
	</Container>
);

export default App;
