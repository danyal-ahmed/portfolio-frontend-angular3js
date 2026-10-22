// src/app/admin/home/home-editor.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
      <div class="mb-8 border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
          <span class="text-green-400">#</span> Edit Home Content
        </h2>
        <p class="text-slate-400 text-sm mt-2">
          Manage the hero section and bio displayed on the root page.
        </p>
      </div>

      <form [formGroup]="homeForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Status Label -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-300 flex items-center gap-2">
            <span class="text-slate-500">></span> Status Label
          </label>
          <input
            type="text"
            formControlName="status"
            class="w-full bg-black/40 border border-slate-800 focus:border-green-500/50 rounded-lg px-4 py-2.5 text-slate-200 outline-none transition-colors text-sm"
            placeholder="e.g., AVAILABLE · open to roles & freelance"
          />
        </div>

        <!-- Hero Subtitle -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-300 flex items-center gap-2">
            <span class="text-slate-500">></span> Role Subtitle
          </label>
          <input
            type="text"
            formControlName="subtitle"
            class="w-full bg-black/40 border border-slate-800 focus:border-green-500/50 rounded-lg px-4 py-2.5 text-slate-200 outline-none transition-colors text-sm"
            placeholder="e.g., Lead Full-Stack Developer | AI Engineer"
          />
        </div>

        <!-- Bio Paragraph -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-300 flex items-center gap-2">
            <span class="text-slate-500">></span> Main Bio Paragraph (HTML supported)
          </label>
          <textarea
            rows="5"
            formControlName="bio"
            class="w-full bg-black/40 border border-slate-800 focus:border-green-500/50 rounded-lg px-4 py-3 text-slate-200 outline-none transition-colors text-sm font-mono leading-relaxed resize-none"
            placeholder="I build and architect enterprise software..."
          ></textarea>
        </div>

        <div class="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            [disabled]="homeForm.invalid || isSaving"
            class="bg-green-500/10 text-green-400 border border-green-500/30 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-green-500/20 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            @if (isSaving) {
              <span
                class="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"
              ></span>
              SAVING...
            } @else {
              ./save_changes.sh
            }
          </button>
        </div>
      </form>
    </div>
  `,
})
export class HomeEditor implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  isSaving = false;

  homeForm = this.fb.group({
    status: ['AVAILABLE · open to roles & freelance', Validators.required],
    subtitle: ['Lead Full-Stack Developer | AI Engineer | Karachi ↔ Remote', Validators.required],
    bio: [
      'I build and architect <span class="text-green-400 font-medium">enterprise software end-to-end</span>...',
      Validators.required,
    ],
  });

  ngOnInit() {
    // Fetch initial data from AdminService here and patch the form
  }

  onSubmit() {
    if (this.homeForm.valid) {
      this.isSaving = true;
      // Simulate API call
      setTimeout(() => {
        console.log('Saved Home Data:', this.homeForm.getRawValue());
        this.isSaving = false;
      }, 1000);
    }
  }
}
