import styled from 'styled-components';

export const Wrapper = styled.div`
	background:var(--darkGrey);
	padding: 0 20px;
`;

export const Content = styled.div`
	display: flex;
	align-items:center;
	justify-content: space-between;
	max-width: var(--maxWidth);
	padding: 20px 0;
	margin: 0 auto; 
	color: var(--white);

	a{
		color:var(--white);
		text-decoration:none;
	}

	a:hover{
		color:var(--medGrey);
	}
`;

export const LogoImg = styled.img`
	width:200px;
	height:50px;
`;