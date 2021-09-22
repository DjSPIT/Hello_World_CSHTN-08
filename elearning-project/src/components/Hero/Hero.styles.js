import styled from 'styled-components';

export const Wrapper = styled.div`
	animation: animateHero 1s;


	@keyframes animateHero{
		from{
			opacity:0;
		}
		to{
			opacity:1;
		}
	}

	img{
		width: 100%;
		background-position: center;
		height: 650px;
		position: relative;
	}

`;

export const Content = styled.div`
	max-width:1280px;
	margin:0 auto;
`;

export const Text = styled.div`
	z-index:100;
	max-width:700px;
	position:absolute;
	left:20px;
	bottom: 10px;
	min-height: 200px;
	color: #fff !important;

	h1{
		font-size:2.5rem;
	}

	p{
		font-size: 1.2rem;
	}

`;