import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#005288'
		},
		secondary: {
			main: '#A7A9AC'
		}
	}
});

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	logo: {
		height: '20px',
		marginRight: '20px'
	},
	loading: {
		marginTop: '50px'
	},
	button: {
		width: '94px'
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: '50px 0'
	}
}));

export { theme, useStyles };
