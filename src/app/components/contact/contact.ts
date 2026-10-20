import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  isSubmitting = signal(false);
  submitSuccess = signal(false);

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Simulate API call (replace with your actual email service like EmailJS or a backend endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    this.isSubmitting.set(false);
    this.submitSuccess.set(true);
    this.contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => this.submitSuccess.set(false), 5000);
  }
}
