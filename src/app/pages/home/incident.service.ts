/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Incident } from './incident';
import { INCIDENTS } from './incidents';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';

interface SearchResult {
	incidents: Incident[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(incidents: Incident[], column: SortColumn, direction: string): Incident[] {
	if (direction === '' || column === '') {
		return incidents;
	} else {
		return [...incidents].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(country: Incident, term: string, pipe: PipeTransform) {
	return (
		country.name.toLowerCase().includes(term.toLowerCase()) ||
		pipe.transform(country.area).includes(term) ||
		pipe.transform(country.population).includes(term) 
		// pipe.transform(country.conductor).includes(term)||
		// pipe.transform(country.tipo).includes(term)||
		// pipe.transform(country.nombre).includes(term)
	);
}

@Injectable({ providedIn: 'root' })
export class IncidentService {
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _countries$ = new BehaviorSubject<Incident[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

	private _state: State = {
		page: 1,
		pageSize: 4,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(private pipe: DecimalPipe) {
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._countries$.next(result.incidents);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

	get incidents$() {
		return this._countries$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let incidents = sort(INCIDENTS, sortColumn, sortDirection);

		// 2. filter
		incidents = incidents.filter((country) => matches(country, searchTerm, this.pipe));
		const total = incidents.length;

		// 3. paginate
		incidents = incidents.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ incidents, total });
	}
}
