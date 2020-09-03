import React from 'react';
import PropTypes from 'prop-types';

import Logger from '../utils/logger';

class Section extends React.Component {
	constructor(props) {
		super(props);

		const { debug, id } = this.props;

		this.log = Logger(debug, 'Section');
		this._section = document.getElementById(id);
		this.state = {
			// windowHeight: 0,
		};
	}

	componentDidMount() {
		this.log('componentDidMount()');

		this.handleResize();
		window.addEventListener('resize', () => this.handleResize());
	}

	componentWillUnmount() {
		this.log('componentWillUnmount()');

		window.removeEventListener('resize', () => this.handleResize());
	}

	handleResize() {
		this.log('handleResize()');

		// this.setState({
		// 	windowHeight: window.innerHeight,
		// });
	}

	render() {
		const {
			state,
			props: { children, id, className },
			context: { sectionClassName },
		} = this;

		return (
			<div
				id={id}
				style={{
					height: '100%',
					width: '100%',
					paddingTop: this.context.sectionPaddingTop,
					paddingBottom: this.context.sectionPaddingBottom,
				}}
				className={
					sectionClassName +
					(className ? ` ${sectionClassName}--${className}` : '')
				}
			>
				{children}
			</div>
		);
	}
}

Section.propTypes = {
	id: PropTypes.string,
	debug: PropTypes.bool,
	children: PropTypes.node,
};

Section.contextTypes = {
	sectionClassName: PropTypes.string,
	sectionPaddingTop: PropTypes.string,
	sectionPaddingBottom: PropTypes.string,
};

export default Section;
