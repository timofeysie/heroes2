import { Component, Input, OnInit } from '@angular/core';
import { HostBinding, trigger, transition, animate,
         style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PageService } from './page.service';
import { PageListComponent } from './page-list.component';
import { Page } from './page';

@Component({
    selector: 'my-page-detail',
    styleUrls: ['./app/hero-styles.css', 'app/pages/page-detail.component.css'],
    templateUrl: './app/pages/page-detail.component.html',
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'}),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class PageDetailComponent implements OnInit {
    @Input()
    page: Page;

    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }
    @HostBinding('style.display') get display() {
        return 'block';
    }
    @HostBinding('style.position') get position() {
        return 'absolute';
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private pageService: PageService) {
            console.log('PageDetailComponent constructor called');
    }

    ngOnInit(): void {
        // this.route.params.forEach((params: Params) => {
        //     let id = +this.route.snapshot.params['id'];
        //     this.pageService.getPage(id)
        //         .then(page => 
        //             this.page = page);
        //             //console.log('page param', id);
        // });
        this.route.params.forEach((params: Params) => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.pageService.getPage(id).then(page => this.page = page);
        });
    }

    goBack(): void {
        window.history.back();
        console.log('goBack');
    }

    goForward(oldId: number): void {
        let newId = oldId+1;
        this.pageService.getPage(newId)
            .then(page => {
                this.page = page;
                history.pushState({}, this.page.name, '/page/'+newId);
            });
    }

    gotoPages() {
        let pageId = this.page ? this.page.id : null;
        // Pass along the page id if available
        // so that the PageList component can select that page.
        this.router.navigate(['/pages', { id: pageId, foo: 'foo' }]);
        //this.router.navigate(['/pages']); // from the tut
    }

    save(): void {
        this.pageService.update(this.page)
            .then(this.goBack);
    }

}

