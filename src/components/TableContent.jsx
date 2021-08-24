import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import { Button, Container } from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import ShowMoreText from "react-show-more-text";

import TableHeader from "./TableHeader";
import { useStyles } from "../styles";

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export default function TableContent({ launches }) {
	const classes = useStyles();

	const [valueToOrderBy, setValueToOrderBy] = useState("date_local");
	const [orderDirection, setOrderDirection] = useState("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [expand, setExpand] = useState(false);

	const handleRequestSort = (event, property) => {
		const isAsending = valueToOrderBy === property && orderDirection === "asc";
		setValueToOrderBy(property);
		setOrderDirection(isAsending ? "desc" : "asc");
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value), 10);
		setPage(0);
	};

	const getYear = (date) => {
		let d = new Date(date);
		return d.getFullYear();
	};

	return (
		<Container>
			<TableContainer>
				<Table>
					<TableHeader
						valueToOrderBy={valueToOrderBy}
						orderDirection={orderDirection}
						handleRequestSort={handleRequestSort}
					/>
					<TableBody>
						{stableSort(launches, getComparator(orderDirection, valueToOrderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((launch, index) => (
								<TableRow key={index}>
									<TableCell>{getYear(launch.date_local)}</TableCell>
									<TableCell>{launch.flight_number}</TableCell>
									<TableCell>{launch.name}</TableCell>
									<TableCell>
										<ShowMoreText
											lines={1}
											more={<ExpandMore />}
											less={<ExpandLess />}
											onClick={() => setExpand(!expand)}
											width={500}
										>
											{launch.details !== null ? launch.details : "N/A"}
										</ShowMoreText>
									</TableCell>
									<TableCell>
										{launch.links.presskit !== null ? (
											<Button
												className={classes.button}
												size="small"
												variant="contained"
												color="primary"
												href={launch.links.presskit}
											>
												Download
											</Button>
										) : (
											<Button
												className={classes.button}
												size="small"
												variant="contained"
												disabled
											>
												N/A
											</Button>
										)}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 50]}
				component="div"
				count={launches.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Container>
	);
}
