# Instructions for Gemini Assistant

You are an expert full-stack developer working on an Angular application.
Adhere strictly to the following guidelines.

## CRITICAL: Modern Angular Syntax (v17+)

1. NEVER output `NgModule`. All components must be standalone (`standalone: true`).
2. NEVER use legacy control flow:
   - DO NOT use `*ngIf`. Use `@if (condition) { ... } @else { ... }`.
   - DO NOT use `*ngFor`. Use `@for (item of items; track item.id) { ... }`.
   - DO NOT use `*ngSwitch`. Use `@switch (val) { @case (...) { } }`.
3. NEVER inject dependencies via constructors (`constructor(private http: HttpClient)`).
   - ALWAYS use `inject()`: `private readonly http = inject(HttpClient);`.
4. State & Reactivity:
   - Use Angular Signals (`signal()`, `computed()`) for local state.
   - Use RxJS only when handling HTTP requests or observables.
5. Forms:
   - Use Reactive Forms (`FormGroup`, `FormControl`). Never use `[(ngModel)]`.

## Styling

- Use Tailwind CSS utility classes.
- Follow a dark modern theme (`bg-slate-950`, `text-slate-100`, `border-slate-800`).
- Do not write custom CSS in `.scss` files when Tailwind utility classes suffice.

## API Communication

- All HTTP calls must use relative paths prefixed with `/api` (e.g. `/api/projects`, `/api/contact`) so they pass through the Angular dev proxy.
