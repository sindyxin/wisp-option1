import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default function TableHeader({
	valueToOrderBy,
	orderDirection,
	handleRequestSort
}) {
	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell key='date_local'>
					<TableSortLabel
						active={valueToOrderBy === 'date_local'}
						direction={valueToOrderBy === 'date_local' ? orderDirection : 'asc'}
						onClick={createSortHandler('date_local')}>
						Launch Year
					</TableSortLabel>
				</TableCell>

				<TableCell key='flight_number'>
					<TableSortLabel
						active={valueToOrderBy === 'flight_number'}
						direction={
							valueToOrderBy === 'flight_number' ? orderDirection : 'asc'
						}
						onClick={createSortHandler('flight_number')}>
						Flight Number
					</TableSortLabel>
				</TableCell>

				<TableCell key='name'>
					<TableSortLabel
						active={valueToOrderBy === 'name'}
						direction={valueToOrderBy === 'name' ? orderDirection : 'asc'}
						onClick={createSortHandler('name')}>
						Name
					</TableSortLabel>
				</TableCell>

				<TableCell>Launch Details</TableCell>

				<TableCell>Press Kit</TableCell>
			</TableRow>
		</TableHead>
	);
}
