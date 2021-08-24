import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Typography,
	AppBar,
	CssBaseline,
	Toolbar,
	Container,
	ThemeProvider
} from '@material-ui/core';
import { theme, useStyles } from './styles';
import logo from './images/logo.png';

import TableContent from './components/TableContent';

function App() {
	const classes = useStyles();

	const [launches, setLaunches] = useState([]);
	const [loading, setlLoading] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			setlLoading(true);
			const res = await axios.get('https://api.spacexdata.com/v4/launches');
			setLaunches(res.data);
			setlLoading(false);
		};
		fetchPosts();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<CssBaseline />
				<AppBar position='relative'>
					<Toolbar>
						<img src={logo} alt='Logo' className={classes.logo} />
					</Toolbar>
				</AppBar>
				{loading ? (
					<Typography variant='h2' align='center' className={classes.loading}>
						Loading...
					</Typography>
				) : (
					<main>
						<div className={classes.container}>
							<Container maxWidth='sm'>
								<Typography
									variant='h2'
									align='center'
									color='textPrimary'
									gutterBottom>
									SpaceX Launches
								</Typography>
								<Typography
									variant='h5'
									align='center'
									color='textSecondary'
									paragraph>
									SpaceX designs, manufactures and launches advanced rockets and
									spacecraft.
								</Typography>
							</Container>
						</div>
						<TableContent launches={launches} />
					</main>
				)}
				<footer className={classes.footer}>
					<Typography variant='h6' align='center' gutterBottom>
						SpaceX Launch Record App
					</Typography>
					<Typography variant='subtitle1' align='center' color='textSecondary'>
						Powered by Creat React App, Axios, Material Ui, & React Show More
						Text
					</Typography>
				</footer>
			</div>
		</ThemeProvider>
	);
}

export default App;
