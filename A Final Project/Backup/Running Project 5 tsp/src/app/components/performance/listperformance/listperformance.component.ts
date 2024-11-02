import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerformanceService } from '../../../services/performance.service';
import { PerformanceModel } from '../../../models/performance.model';

@Component({
  selector: 'app-listperformance',
  templateUrl: './listperformance.component.html',
  styleUrls: ['./listperformance.component.css'],
})
export class ListperformanceComponent implements OnInit {
  performances: PerformanceModel[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private performanceService: PerformanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPerformances();
  }

  loadPerformances(): void {
    this.performanceService.getAllPerformance().subscribe({
      next: (data) => {
        this.performances = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load performance records.';
        console.error('Error loading performance records', error);
        this.loading = false;
      },
    });
  }

  viewPerformance(id: string): void {
    this.router.navigate([`/performances/view/${id}`]);
  }

  editPerformance(id: string): void {
    this.router.navigate([`/performances/edit/${id}`]);
  }

  deletePerformance(id: string): void {
    if (confirm('Are you sure you want to delete this performance record?')) {
      this.performanceService.deletePerformance(id).subscribe({
        next: () => {
          this.performances = this.performances.filter(
            (performance) => performance.id !== id
          );
          alert('Performance record deleted successfully');
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete performance record.';
          console.error('Error deleting performance record', error);
        },
      });
    }
  }
}
