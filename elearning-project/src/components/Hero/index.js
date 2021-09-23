import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { Wrapper, Content, Text } from './Hero.styles';
import BackImage from '../../images/background.jpg';

// Components with a prop, which will change after re-rendering
const Hero = () => (
	<Wrapper>
		<img src={BackImage} alt="background" />
		<Content>
			<Text>
				<h1>Full Stack Development</h1>
				<p>Full stack development: It refers to the development of both front end(client side) 
				and back end(server side) portions of web application. ... They work on the frontend, backend, database and debugging of web application or websites</p>
			</Text>
		</Content>
	</Wrapper>
);

export default Hero;