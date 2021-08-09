import { Functions } from '@app/helpers/functions';
import { SettingButtonComponent } from './setting-button';
import { GridOptions } from 'ag-grid-community';
import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input, HostListener } from '@angular/core';

@Component({
    selector: 'custom-ag-grid',
    templateUrl: './custom-ag-grid.component.html',
    styleUrls: ['./custom-ag-grid.component.scss']
})
export class CustomAgGridComponent implements OnInit {
    agGridSizeControl = {
        selectedType: 'sizeToFit',
        // pageSize: 100
    };
    agColumnDefs: any[] = [];
    _details = [];
    frameworkComponents: any;
    gridOptions: GridOptions = <GridOptions>{
        defaultColDef: {
            sortable: true,
            resizable: true,
        },
        rowHeight: 38,
        rowSelection: 'multiple',
        suppressRowClickSelection: true,
        suppressCellSelection: true,
        suppressPaginationPanel: true
    };
    _columns: any[] = [];
    gridApi: any;
    @Input() set details(val) {
        // console.log({ details: val });
        this._details = Functions.cloneObject(val);
        // this._details.forEach(item => {
        //     Object.entries(item).forEach(([key, value]: [string, any]) => {
        //         if (typeof value === 'object') {
        //             item[key] = Functions.JSON_parse(value) || '';
        //             console.log(item);
        //         }
        //     });
        // });
        this.re_new();
    }
    get details() {
        return this._details;
    }
    @Input() set columns(val: string[]) {
        if (!val) {
            return;
        }
        const isDetailsReady = () => {
            if (this.details?.length) {
                const [firstItemOfDetails] = this.details;

                this._columns = Object.entries(firstItemOfDetails)
                    .filter(([key, value]: any) => typeof value !== 'object' || value instanceof Array)
                    .map(([key]: any) => ({ field: key, hide: !val.includes(key) }));

                this._columns.push({
                    field: '',
                    headerName: '',
                    headerComponent: 'settings',
                    hide: false,
                    pinned: 'left',
                    lockPinned: true,
                    resizable: false,
                    minWidth: 40,
                    maxWidth: 40
                });
                this.re_new();
            } else {
                setTimeout(() => {
                    isDetailsReady();
                });
            }
        };
        isDetailsReady();
    }
    get columns() {
        return this._columns;
    }
    @Output() rowClick: EventEmitter<any> = new EventEmitter();

    @HostListener('click')
    onClick() {
        setTimeout(() => {
            this.gridApi.sizeColumnsToFit();
        }, 300);
    }

    // @HostListener('window:resize')
    onResize() {
        if (!this.gridApi || this.agGridSizeControl.selectedType !== 'sizeToFit') {
            return;
        }

        setTimeout(() => {
            if (this.agGridSizeControl.selectedType === 'sizeToFit') {
                this.gridApi.sizeColumnsToFit();
            }
        }, 300);
    }
    onGridReady(params: any) {
        this.gridApi = params.api;
    }
    constructor(private cdr: ChangeDetectorRef) {
        this.frameworkComponents = {
            settings: SettingButtonComponent
        };
    }

    ngOnInit() {
        this.re_new();
    }
    private re_new() {
        this.sizeToFit();
        this.cdr.detectChanges();
    }
    private sizeToFit() {
        setTimeout(() => {
            this.gridOptions.api?.sizeColumnsToFit();
            this.cdr.detectChanges();
        }, 100);
    }

    public getRowStyle(params) {
        // console.log('getRowStyle(params)', params)
        const _style: any = {
            'border-bottom': '1px solid rgba(0,0,0,0.1)',
            'cursor': 'pointer'
        }
        if (params.node.rowIndex % 2 === 0) {
            _style.background = '#e4f0ec';
        }
        return _style;
    }
    sortChanged(event) {
        this.cdr.detectChanges();
    }
    cellClicked(event) {
        // console.log(event);
        this.rowClick.emit(event);
    }
    doOpenFilter() {

    }
}
