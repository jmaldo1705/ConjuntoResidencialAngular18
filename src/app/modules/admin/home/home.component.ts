import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';

@Component({
    selector: 'home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButtonModule,
        MatIconModule,
        TranslocoModule,
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatCardTitle,
        MatCardSubtitle,
    ],
})
export class HomeComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
