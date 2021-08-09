import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

declare const SwaggerUIBundle: any;
@Component({
    selector: 'app-page-api-doc',
    templateUrl: './page-api-doc.component.html',
    styleUrls: ['./page-api-doc.component.scss']

})

export class PageApiDocComponent implements OnInit {
    private url = new URL(environment.apiUrl);
    constructor() {

    }
    ngOnInit(): void {
        const ui = SwaggerUIBundle({
            dom_id: '#swagger-ui',
            layout: 'BaseLayout',
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset
            ],
            url: this.url.origin + '/doc/api/json',
            docExpansion: 'none',
            operationsSorter: 'alpha'
        });
    }
}
