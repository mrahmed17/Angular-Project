import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PerformanceService } from '../../../services/performance.service';
import { PerformanceModel } from '../../../models/performance.model';

@Component({
  selector: 'app-viewperformance',
  templateUrl: './viewperformance.component.html',
  styleUrls: ['./viewperformance.component.css'],
})
export class ViewperformanceComponent implements OnInit {
  performance: PerformanceModel | null = null;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private performanceService: PerformanceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadPerformance();
  }

  loadPerformance(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.performanceService.getPerformance(id).subscribe({
        next: (data) => {
          this.performance = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load performance record.';
          console.error('Error loading performance record', error);
          this.loading = false;
        },
      });
    } else {
      this.errorMessage = 'Invalid performance ID.';
      this.loading = false;
    }
  }

  backToList(): void {
    this.router.navigate(['/performances/list']);
  }
}
