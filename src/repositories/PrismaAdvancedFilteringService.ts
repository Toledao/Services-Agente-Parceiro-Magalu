import moment from 'moment';
import { DtoSearchSegments } from './SearchDTO';

export class PrismaAdvancedFilteringService {

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() { }

	CreateFilter(dto: DtoSearchSegments) {
		const { skip, take } = dto;
		const where = { AND: [] };
		const orderBy = {};

		if (dto?.orderBy?.length > 0) {
			dto.orderBy.forEach((_sort) => {
				orderBy[_sort.column] = _sort.value;
			});
		}

		if (dto?.filter?.length > 0) {

			dto.filter.filter(x => x.value).forEach((_filter) => {
				const obj = this.buildColumnFilter(_filter);
				where.AND.push(obj);
			});
		}

		return { skip, take, where, orderBy };
	}

	buildColumnFilter(filter) {
		const { column, value } = filter;
		const values = value.split(',');

		const andArray = [],
			orArray = [];

		values.forEach((value) => {
			const nFilter = this.getFilterType(column, value);
			const obj = column
				.split('.')
				.reduceRight((o, x) => ({ [x]: o }), { ...nFilter });
			if (Object.keys(nFilter)[0] === 'not') {
				andArray.push(obj);
			} else {
				orArray.push(obj);
			}
		});

		if (andArray.length > 0 && orArray.length > 0) {
			return {
				AND: [...andArray, { OR: [...orArray] }],
			};
		} else if (andArray.length > 0) {
			return {
				AND: [...andArray],
			};
		} else {
			return {
				OR: [...orArray],
			};
		}
	}

	getFilterType(column: string, value: string) {
		if (column.toLowerCase().indexOf('datetime') > -1)
			return this.getDateTimeFilterType(column, value);
		value = value.trim();
		const _obj = {};
		let pointer;
		const mode = 'insensitive';
		let sanatizedvalue = value;
		let firstChar = value[0];
		const secondChar = value[1];
		const lastChar = value[value.length - 1];
		let isNot = false;

		if (firstChar === '!') {
			firstChar = secondChar;
			_obj['not'] = {};
			pointer = _obj['not'];
			isNot = true;
			if (lastChar === '*')
				sanatizedvalue = sanatizedvalue.substring(1, value.length - 1);
			else sanatizedvalue = sanatizedvalue.substring(1, value.length);
		} else {
			pointer = _obj;
		}

		if (firstChar === '*' && lastChar === '*') {
			sanatizedvalue = sanatizedvalue.substring(1, value.length - 1);
			pointer['contains'] = sanatizedvalue;
		} else if (firstChar === '*') {
			sanatizedvalue = sanatizedvalue.substring(1, value.length);
			pointer['endsWith'] = sanatizedvalue;
		} else if (lastChar === '*') {
			sanatizedvalue = sanatizedvalue.substring(0, value.length - 1);
			pointer['startsWith'] = sanatizedvalue;
		} else if (sanatizedvalue === "true"){
			pointer['equals'] = true;
		} else if (sanatizedvalue === "false"){
			pointer['equals'] = false;
		} else {
			pointer['equals'] = sanatizedvalue;
		}
		// _obj['mode'] = mode; --erro no mysql
		return _obj;
	}

	getDateTimeFilterType(column: string, value: string) {
		//TODO ADD Timezone logic. Add it as a user setting, inherits from teneant default, store in jwt token. pass to this function.

		value = value.trim();
		if (value.indexOf('Today') > -1) {
			const c1 = value.indexOf('Today');
			const b1 = value.indexOf('(', value.indexOf('Today'));
			const b2 = value.indexOf(')', value.indexOf('Today'));
			const v = value.substring(b1 + 1, b2) || 0;
			const d1 = moment().add(v, 'day').startOf('day').utc();
			value = value.replace(value.substring(c1, b2 + 1), d1.toString());
			if (value.indexOf('Today') > -1) {
				const c1 = value.indexOf('Today');
				const b1 = value.indexOf('(', value.indexOf('Today'));
				const b2 = value.indexOf(')', value.indexOf('Today'));
				const v = value.substring(b1 + 1, b2) || 0;
				const d1 = moment().add(v, 'day').startOf('day').utc();
				value = value.replace(value.substring(c1, b2 + 1), d1.toString());
			}
		}

		const _obj = {};
		if (value.startsWith('..')) {
			const d1: Date = new Date(value.replace('..', ''));
			_obj['lte'] = d1;
		} else if (value.endsWith('..')) {
			const d1: Date = new Date(value.replace('..', ''));
			_obj['gte'] = d1;
		} else if (value.indexOf('..') !== -1) {
			const d1: Date = new Date(value.substring(0, value.indexOf('..')));
			const d2: Date = new Date(
				value.substring(value.indexOf('..') + 2, value.length)
			);
			_obj['gte'] = d1;
			_obj['lte'] = d2;
		} else if (value.startsWith('>')) {
			const d1: Date = new Date(value.replace('>', ''));
			_obj['gte'] = d1;
		} else if (value.startsWith('<')) {
			const d1: Date = new Date(value.replace('<', ''));
			_obj['lte'] = d1;
		} else {
			const d1: Date = new Date(value);
			console.log('here');
			console.log(d1);
			_obj['gte'] = d1;
			_obj['lte'] = new Date(d1.getTime() + 60 * 60 * 24 * 1000);
		}

		return _obj;
	}
}