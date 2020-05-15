import Table from 'easy-table';

/**
 * Returns an ASCII table representation of an array
 * @memberof module:bcijs
 * @function
 * @name toTable
 * @param {Array} array
 * @returns {string} ASCII table
 */
export function toTable(array) {
	return Table.print(array);
}
