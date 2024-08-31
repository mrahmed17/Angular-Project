import { Component, OnInit } from '@angular/core';
import { Advance } from '../../models/advance.model';
import { EmployeeModel } from '../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { AdvanceService } from '../../services/advance.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css'],
})
export class AdvanceComponent implements OnInit {
  advance: Advance[] = [];
  employees: EmployeeModel[] = [];
  advanceForm!: FormGroup;
  advanceModel: Advance = new Advance();
  selectedAdvanceId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private advanceService: AdvanceService
  ) {}

  ngOnInit(): void {
    this.loadAdvance();
    this.initAdvanceForm();
    this.loadEmployees();
  }

  private loadEmployees() {
    this.employeeService.getAllEmployee().subscribe(
      (data) => (this.employees = data),
      (error) => console.error('Error fetching employees', error)
    );
  }

  private loadAdvance() {
    this.advanceService.getAllAdvance().subscribe(
      (data) => (this.advance = data),
      (error) => console.error('Error fetching advances', error)
    );
  }

  private initAdvanceForm() {
    this.advanceForm = this.formBuilder.group({
      employee: ['', Validators.required],
      amount: ['', Validators.required],
      reason: ['', Validators.required],
      // date: [new Date().toISOString(), Validators.required], // Auto-set to current date and time
    });
  }
  

  onSubmit() {
    if (this.advanceForm.valid) {
      this.advanceModel = {
        ...this.advanceForm.value,
        employee: this.employees.find(emp => emp.id === this.advanceForm.value.employee),
        date: this.advanceForm.value.date || new Date().toISOString(), // Ensure date is set to the current date/time
      };
  
      this.advanceService.advancePost(this.advanceModel).subscribe({
        next: (res) => {
          alert('Advance saved');
          console.log(res);
          this.loadAdvance();
          this.resetForm(); // Reset the form after saving
        },
        error: (err) => {
          alert('Data not saved');
          console.log(err);
        },
      });
    }
  }
  

  onEdit(row: Advance) {
    this.selectedAdvanceId = row.id;
  
    // Ensure the date is properly formatted and handle undefined
    const formattedDate = row.date ? new Date(row.date).toISOString().split('T')[0] : '';
  
    this.advanceForm.patchValue({
      employee: row.employee?.id,
      amount: row.amount,
      reason: row.reason,
      date: formattedDate, // Use the formatted date
    });
  }
  

  updateAdvance() {
    if (this.selectedAdvanceId !== null && this.advanceForm.valid) {
      const updatedAdvance: Advance = {
        id: this.selectedAdvanceId,
        ...this.advanceForm.value,
        employee: this.employees.find(emp => emp.id === this.advanceForm.value.employee),
      };

      this.advanceService.updateAdvance(this.selectedAdvanceId, updatedAdvance).subscribe(
        (response: Advance) => {  // Specify type for 'response'
          console.log('Advance updated successfully', response);
          this.loadAdvance();
          this.resetForm();
        },
        (error: any) => {  // Specify type for 'error'
          console.error('Error updating advance', error);
          alert('Error updating advance. Please try again.');
        }
      );
    } else {
      console.error('No advance selected for update or form is invalid');
    }
  }

  deleteAdvance(id: number) {
    if (confirm('Are you sure you want to delete this advance?')) {
      this.advanceService.deleteAdvance(id).subscribe(
        (response) => {
          console.log('Advance deleted successfully', response);
          this.loadAdvance();
        },
        (error: any) => {  // Specify type for 'error'
          console.error('Error deleting advance', error);
          alert('Error deleting advance. Please try again.');
        }
      );
    }
  }

  resetForm() {
    this.advanceForm.reset();
    this.selectedAdvanceId = null;
    this.advanceForm.markAsPristine(); // Reset form validation state
  }
}
