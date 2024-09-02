import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listlocation',
  templateUrl: './listlocation.component.html',
  styleUrl: './listlocation.component.css',
})
export class ListlocationComponent implements OnInit {
  locations: LocationModel[] = [];

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe(
      (data) => {
        this.locations = data;
      },
      (error) => {
        console.error('Failed to load locations', error);
      }
    );
  }

  viewLocation(id: string): void {
    this.router.navigate([`/locations/view/${id}`]); // Use the correct route
  }

  editLocation(id: string): void {
    this.router.navigate([`/locations/edit/${id}`]); // Use the correct route
  }

  deleteLocation(id: string | undefined): void {
    if (id && confirm('Are you sure you want to delete this location?')) {
      this.locationService.deleteLocation(id!).subscribe(
        () => {
          this.locations = this.locations.filter(
            (location) => location.id !== id
          );
          alert('Location deleted successfully');
        },
        (error) => {
          console.error('Failed to delete location', error);
          alert('Failed to delete location. Please try again.');
        }
      );
    }
  }
}
