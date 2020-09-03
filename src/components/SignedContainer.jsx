import React from 'react';
import PropTypes from 'prop-types';

import logger from '../utils/logger';

class SignedContainer extends React.Component {
	constructor(props) {
		super(props);

		const {
			options: { debug, initialSectionIndex },
		} = this.props;

		this._container = null;
		this._isVertical = null;
		this._sectionsCount = 0;
		this._setIsTransitionOffTimer = null;
		this.state = {
			translateDistance: 0,
			isTransitionOn: false,
			activeSectionIndex: initialSectionIndex,
		};
		this.log = logger(debug, 'Container');
	}

	getChildContext() {
		const {
			sectionPaddingTop,
			sectionPaddingBottom,
			options: { sectionClassName },
		} = this.props;

		return {
			sectionClassName,
			sectionPaddingTop,
			sectionPaddingBottom,
		};
	}

	componentDidMount() {
		this.log('componentDidMount()');

		const {
			props: {
				children,
				options: { scrollDirection, containerId, initialSectionIndex },
			},
		} = this;

		this._sectionsCount = children.length;
		this._isVertical = scrollDirection === 'vertical';
		this._container = document.getElementById(containerId);

		window.addEventListener('resize', this.onResize);
		window.addEventListener('mousewheel', this.onMouseWheel, false);
		window.addEventListener('hashchange', this.onHashChange, false);
		window.addEventListener('DOMMouseScroll', this.onMouseWheel, false);

		this.onResize();
		this.handleTransition(initialSectionIndex);
	}

	componentWillUnmount() {
		this.log('componentWillUnmount()');

		window.removeEventListener('resize', this.onResize);
		window.removeEventListener('mousewheel', this.onMouseWheel);
		window.removeEventListener('hashchange', this.onHashChange);
		window.removeEventListener('DOMMouseScroll', this.onMouseWheel);

		this.clearSetIsTransitonOnOffTimer();
	}

	// addActiveClass = () => {
	// 	this.removeActiveClass();

	// 	const hash = window.location.hash.substring(1);
	// 	const activeLinks = document.querySelectorAll(`a[href="#${hash}"]`);

	// 	for (let i = 0; i < activeLinks.length; i++) {
	// 		activeLinks[i].className = `${
	// 			activeLinks[i].className +
	// 			(activeLinks[i].className.length > 0 ? ' ' : '')
	// 		}${this.props.activeSectionClassName}`;
	// 	}
	// };

	// removeActiveClass = () => {
	// 	const activeLinks = document.querySelectorAll(
	// 		`a:not([href="#${
	// 			this.props.anchors[this.state.activeSectionIndex]
	// 		}"])`
	// 	);

	// 	for (let i = 0; i < activeLinks.length; i++) {
	// 		activeLinks[i].className = activeLinks[i].className.replace(
	// 			/\b ?active/g,
	// 			''
	// 		);
	// 	}
	// };

	onMouseWheel = (e) => {
		const {
			_sectionsCount,
			state: { isTransitionOn, activeSectionIndex },
		} = this;
		const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
		const sectionIndex = activeSectionIndex - delta;

		if (
			!isTransitionOn &&
			sectionIndex < _sectionsCount &&
			sectionIndex >= 0
		) {
			this.log('onMouseWheel()');

			this.setHash(sectionIndex);
			this.handleTransition(sectionIndex);
		}
	};

	onHashChange = (e) => {
		const {
			state: { activeSectionIndex },
			props: {
				options: { anchors },
			},
		} = this;
		const hash = window.location.hash.substring(1);
		const sectionIndex = anchors.indexOf(hash);

		if (sectionIndex !== activeSectionIndex) {
			this.log('onHashChange()');

			this.handleTransition(sectionIndex);
		}
	};

	setHash = (sectionIndex) => {
		const {
			props: {
				options: { anchors },
			},
		} = this;
		const hash = anchors[sectionIndex];

		if (hash) {
			this.log('setHash()');

			window.location.hash = `#${hash}`;
		}
	};

	handleTransition = (sectionIndex) => {
		const {
			state: { isTransitionOn },
			_container,
			_isVertical,
			_sectionsCount,
		} = this;

		if (
			!isTransitionOn &&
			sectionIndex >= 0 &&
			sectionIndex < _sectionsCount
		) {
			this.log('handleTransition()');

			const position = _isVertical
				? 0 - sectionIndex * _container.offsetHeight
				: 0 - sectionIndex * _container.offsetWidth;

			this.setState({
				isTransitionOn: true,
				activeSectionIndex: sectionIndex,
				translateDistance: position,
			});

			this.setIsTransitonOnOff();
		}
	};

	setIsTransitonOnOff = () => {
		const {
			options: { transitionDelay },
		} = this.props;

		this.clearSetIsTransitonOnOffTimer();

		this._setIsTransitionOffTimer = setTimeout(() => {
			this.setState({
				isTransitionOn: false,
			});
		}, transitionDelay + 300);
	};

	clearSetIsTransitonOnOffTimer = () => {
		if (this._setIsTransitionOffTimer) {
			clearTimeout(this._setIsTransitionOffTimer);
		}
	};

	onResize = () => {
		this.log('onResize()');

		const {
			_container,
			_isVertical,
			state: { activeSectionIndex },
		} = this;
		const position = _isVertical
			? 0 - activeSectionIndex * _container.offsetHeight
			: 0 - activeSectionIndex * _container.offsetWidth;

		this.setState({
			isTransitionOn: true,
			translateDistance: position,
		});

		this.setIsTransitonOnOff();
	};

	addChildrenWithAnchorId = () => {
		const {
			debug,
			children,
			options: { anchors },
		} = this.props;

		return React.Children.map(children, (child, index) =>
			anchors[index]
				? React.cloneElement(child, { debug, id: anchors[index] })
				: child
		);
	};

	render() {
		const {
			_isVertical,
			_sectionsCount,
			state: { translateDistance },
			props: {
				children,
				options: {
					transitionDelay,
					transitionFunction,
					containerId,
					containerClassName,
				},
			},
		} = this;

		return (
			<div
				id={containerId}
				className={containerClassName}
				style={{
					height: '100%',
					overflowX: _isVertical ? 'hidden' : 'scroll',
					overflowY: _isVertical ? 'scroll' : 'hidden',
					scrollbarWidth: 'none',
					width: '100%',
				}}
			>
				<div
					className={`${containerClassName}__sections`}
					style={{
						display: 'flex',
						flexDirection: _isVertical ? 'column' : 'row',
						height: _isVertical
							? `calc(100% * ${_sectionsCount})`
							: '100%',
						transform: _isVertical
							? `translateY(${translateDistance}px)`
							: `translateX(${translateDistance}px)`,
						transition: `all ${transitionDelay}ms ${transitionFunction}`,
						width:
							_isVertical
								? '100%'
								: `calc(100% * ${_sectionsCount})`,
					}}
				>
					{children}
				</div>
			</div>
		);
	}
}

SignedContainer.defaultProps = {
	options: {
		debug: false,
		scrollDirection: 'vertical',
		containerId: 'signed-container',
		containerClassName: 'signed-container',
		// Section Related Options
		anchors: [],
		initialSectionIndex: 0,
		sectionClassName: 'signed-section',
		// Transition Related Options
		transitionDelay: 300,
		transitionFunction: 'ease',
	},

	sectionPaddingTop: '0',
	sectionPaddingBottom: '0',
};

SignedContainer.propTypes = {
	options: PropTypes.shape({
		debug: PropTypes.bool,
		scrollDirection: PropTypes.oneOf(['horizontal', 'vertical']),
		containerId: PropTypes.string,
		containerClassName: PropTypes.string,
		// Section Related Options
		sectionClassName: PropTypes.string,
		initialSectionIndex: PropTypes.number,
		anchors: PropTypes.arrayOf(PropTypes.string),
		// Transition Related Options
		transitionDelay: PropTypes.number,
		transitionFunction: PropTypes.string,
	}),
	children: PropTypes.node.isRequired,

	sectionPaddingTop: PropTypes.string,
	sectionPaddingBottom: PropTypes.string,
};

SignedContainer.childContextTypes = {
	debug: PropTypes.bool,
	sectionClassName: PropTypes.string,
	sectionPaddingTop: PropTypes.string,
	sectionPaddingBottom: PropTypes.string,
};

export default SignedContainer;
