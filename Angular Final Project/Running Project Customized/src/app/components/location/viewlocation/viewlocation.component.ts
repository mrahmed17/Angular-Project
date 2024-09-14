import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../../../models/branch.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-viewlocation',
  templateUrl: './viewlocation.component.html',
  styleUrl: './viewlocation.component.css',
})
export class ViewlocationComponent implements OnInit {
  location: LocationModel | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.locationService.getLocationById(id).subscribe(
          (data) => {
            this.location = data;
          },
          (error) => {
            this.errorMessage = 'Failed to load location details';
            console.error('Failed to load location details', error);
          }
        );
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/locations/list']);
  }
}
