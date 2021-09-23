import styled from 'styled-components';

export const Wrapper = styled.div`
	.navbar {
		color:#bbb;
	}

	.navbar-brand, .navbar-nav, .nav-link{
		margin:0 4.5rem;
		justify-content: space-between;
		font-size:1.3rem;

		a{
			color: var(--white) !important;
			text-decoration:none;

		}

		&:hover{
			color:#eee !important;
		}

	}
`;


export const LogoImg = styled.img`
	width:200px;
	height:50px;
`;