import { Component } from '@angular/core';

@Component({
    selector: 'welcome-component',
    templateUrl: 'app/welcome/welcome.component.html'
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome';
}
