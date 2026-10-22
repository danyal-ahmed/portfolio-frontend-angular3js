// src/app/admin/about/about-editor.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
      <div class="mb-8 border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
          <span class="text-green-400">#</span> Edit About Content
        </h2>
      </div>

      <form [formGroup]="aboutForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Intro Summary -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-300 flex items-center gap-2">
            <span class="text-slate-500">></span> Intro Summary
          </label>
          <textarea
            rows="3"
            formControlName="intro"
            class="w-full bg-black/40 border border-slate-800 focus:border-green-500/50 rounded-lg px-4 py-3 text-slate-200 outline-none transition-colors text-sm font-mono leading-relaxed resize-none"
          ></textarea>
        </div>

        <!-- The Longer Version -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-300 flex items-center gap-2">
            <span class="text-slate-500">></span> 01 The Longer Version (Markdown/HTML)
          </label>
          <textarea
            rows="8"
            formControlName="longerVersion"
            class="w-full bg-black/40 border border-slate-800 focus:border-green-500/50 rounded-lg px-4 py-3 text-slate-200 outline-none transition-colors text-sm font-mono leading-relaxed resize-y"
          ></textarea>
        </div>

        <!-- Currently Building -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-300 flex items-center gap-2">
            <span class="text-slate-500">></span> Currently Building
          </label>
          <input
            type="text"
            formControlName="currentlyBuilding"
            class="w-full bg-black/40 border border-slate-800 focus:border-green-500/50 rounded-lg px-4 py-2.5 text-slate-200 outline-none transition-colors text-sm"
          />
        </div>

        <div class="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            [disabled]="aboutForm.invalid || isSaving"
            class="bg-green-500/10 text-green-400 border border-green-500/30 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-green-500/20 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            @if (isSaving) {
              <span
                class="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"
              ></span>
              COMMITTING...
            } @else {
              ./commit_changes.sh
            }
          </button>
        </div>
      </form>
    </div>
  `,
})
export class AboutEditor implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  isSaving = false;

  aboutForm = this.fb.group({
    intro: [
      "Lead full-stack developer who can't rest until the backend architecture is perfectly optimized...",
      Validators.required,
    ],
    longerVersion: [
      "<p>I'm a lead full-stack and backend engineer. My path into software engineering...</p>",
      Validators.required,
    ],
    currentlyBuilding: ['SaaS Prototypes with n8n and Lovable', Validators.required],
  });

  ngOnInit() {
    // Fetch from AdminService
  }

  onSubmit() {
    if (this.aboutForm.valid) {
      this.isSaving = true;
      setTimeout(() => {
        console.log('Saved About Data:', this.aboutForm.getRawValue());
        this.isSaving = false;
      }, 1000);
    }
  }
}
