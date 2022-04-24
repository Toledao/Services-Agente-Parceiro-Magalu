import { Entity } from '@entities/entity';

export class SortModel {
	column: string;

	value: string;
}

export class FilterModel {
	column: string;

	value: string;
}

export class DtoSearchSegments {
	skip?: number;

	take?: number;

	filter?: FilterModel[];

	orderBy?: SortModel[];

	constructor(data: Entity, _take = undefined, _skip = undefined, _orderBy = undefined) {
		this.filter = Object.keys(data).map((key) => <FilterModel>{ column: key, value: data[key] }) || undefined;
		this.take = _take;
		this.skip = _skip;
		this.orderBy = _orderBy;
	}

}