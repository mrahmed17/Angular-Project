import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<string[]>([]);
  private pageTitleSubject = new BehaviorSubject<string>('');

  breadcrumbs: Observable<string[]> = this.breadcrumbsSubject.asObservable();
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs = this.createBreadcrumbs(
          this.router.routerState.root
        );
        const title = this.getPageTitle(this.router.routerState.root);
        this.breadcrumbsSubject.next(breadcrumbs);
        this.pageTitleSubject.next(title);
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    breadcrumbs: string[] = []
  ): string[] {
    if (route.snapshot.data['breadcrumbs']) {
      breadcrumbs.push(...route.snapshot.data['breadcrumbs']);
    }
    if (route.children.length > 0) {
      for (const child of route.children) {
        this.createBreadcrumbs(child, breadcrumbs);
      }
    }
    return breadcrumbs;
  }

  private getPageTitle(route: ActivatedRoute): string {
    let title = '';
    if (route.snapshot.data['pageTitle']) {
      title = route.snapshot.data['pageTitle'];
    } else if (route.children.length > 0) {
      title = this.getPageTitle(route.children[0]);
    }
    return title;
  }
}
