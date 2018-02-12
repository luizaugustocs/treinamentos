import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
