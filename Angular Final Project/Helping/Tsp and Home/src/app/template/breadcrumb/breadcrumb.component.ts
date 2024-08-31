import { Component, Input } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  breadcrumbs: string[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  }

  getUrl(breadcrumb: string): string {
    // Assuming breadcrumbs are generated from a path like 'home', 'dashboard', etc.
    // This implementation will generate the URL from breadcrumbs
    const index = this.breadcrumbs.indexOf(breadcrumb);
    return '/' + this.breadcrumbs.slice(0, index + 1).join('/');
  }
}
