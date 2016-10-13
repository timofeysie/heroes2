import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Page } from './page';
import { PageService } from './page.service';
import { OnInit } from '@angular/core';
// import { QuestionService } from '../question.service';

/** This component uses moduleId to set Component-Relative Path. */
@Component({
    moduleId: module.id,
    selector: 'my-pages',
    styleUrls: ['../hero-styles.css'],
    templateUrl: 'page-list.component.html',
    // providers: [PageService,QuestionService]
})
export class PageListComponent implements OnInit {
    private selectedId: number;
    selectedPage: Page;
    pages: Page[];
    // questions: any[];

    ngOnInit(): void {
        // this.getPages();
        // this.pageService.getPage(1)
        //         .then(page => 
        //             this.selectedPage = page);
        this.route.params.forEach((params: Params) => {
        this.selectedId = +params['id'];
        this.pageService.getPages()
          .then(pages => this.pages = pages);
      });
    }

    onSelect(page: Page) {
        this.router.navigate(['/page', page.id]);
    }

    isSelected(page: Page) { 
        return page.id === this.selectedId; 
    }

    constructor(
        private pageService: PageService,
        private router: Router,
        private route: ActivatedRoute
        // private service: QuestionService
        ) {
            // this.questions = service.getQuestions();
            // console.log('yo page.component constructed with ',this.questions);
    }

    getPages(): void {
        this.pageService.getPages()
            .then(pages => 
                this.pages = pages);
    }

    gotoDetail(): void {
        this.router.navigate(['/page', this.selectedPage.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.pageService.create(name)
            .then(page => {
            this.pages.push(page);
            this.selectedPage = null;
            });
    }

    delete(page: Page): void {
        this.pageService
            .delete(page.id)
            .then(() => {
                this.pages = this.pages.filter(h => h !== page);
                if (this.selectedPage === page) { this.selectedPage = null; }
            });
    }


}
