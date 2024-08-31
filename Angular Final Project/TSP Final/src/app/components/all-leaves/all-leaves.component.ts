import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrls: ['./all-leaves.component.css'],
})
export class AllLeavesComponent implements OnInit {
  leaveData: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';
  fromDate: string = '';
  toDate: string = '';

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.leaveService.getAllLeaves().subscribe((res) => {
      this.leaveData = res;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let data = this.leaveData;

    // Filter by date range
    if (this.fromDate && this.toDate) {
      const fromDate = new Date(this.fromDate);
      const toDate = new Date(this.toDate);

      data = data.filter((record) => {
        if (record.leaveDate) {
          // Check if leaveDate is defined
          const leaveDate = new Date(record.leaveDate);
          return fromDate <= leaveDate && leaveDate <= toDate;
        }
        return false; // Exclude records with undefined leaveDate
      });
    }

    // Filter by search text
    if (this.searchText) {
      const lowerSearchText = this.searchText.toLowerCase();
      data = data.filter((record) =>
        Object.values(record).some((val) =>
          String(val).toLowerCase().includes(lowerSearchText)
        )
      );
    }

    this.filteredData = data;
  }

  onEdit(row: any): void {
    const leaveapproved = row;
    this.leaveService.editLeave(leaveapproved.id, leaveapproved).subscribe({
      next: (res) => {
        console.log(res);
        alert('Leave granted.');
        this.getAll(); // Refresh the data after editing
      },
      error: (err) => {
        console.log(err);
        alert('Not granted.');
      },
    });
  }
}
