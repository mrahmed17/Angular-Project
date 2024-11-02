import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../services/location.service';
import { LocationModel } from '../../../models/location.model';

@Component({
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
  styleUrls: ['./editlocation.component.css'],
})
export class EditlocationComponent implements OnInit {
  location: LocationModel | undefined;
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getLocationDetails();

    this.breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'List Locations', url: '/locations/list' },
      { label: 'Edit Location', url: '#' },
    ];
  }

  getLocationDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.locationService.getLocationById(id).subscribe(
        (data) => {
          this.location = data;
        },
        (error) => {
          console.error('Failed to load location details', error);
          alert('Failed to load location details. Please try again.');
        }
      );
    } else {
      alert('Invalid location ID.');
      this.router.navigate(['/locations/list']);
    }
  }

  onSubmit(): void {
    if (this.location) {
      this.locationService
        .updateLocation(this.location.id, this.location)
        .subscribe(
          () => {
            alert('Location updated successfully.');
            this.router.navigate(['/locations/list']);
          },
          (error) => {
            console.error('Failed to update location', error);
            alert('Failed to update location. Please try again.');
          }
        );
    }
  }

  goBack(): void {
    this.router.navigate(['/locations/list']);
  }
}
