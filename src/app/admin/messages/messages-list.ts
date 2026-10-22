// src/app/admin/messages/messages-list.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [DatePipe, NgClass],
  template: `
    <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="text-green-400">#</span> Inbox
          </h2>
          <p class="text-slate-400 text-sm mt-2 font-mono">
            > {{ messages().length }} transmissions received
          </p>
        </div>
        <button
          (click)="refresh()"
          class="bg-slate-800/50 text-slate-300 border border-slate-700 px-4 py-2 rounded text-sm hover:bg-slate-800 transition-colors flex items-center gap-2 font-mono"
        >
          <span class="text-green-400">❯</span> ./fetch_new.sh
        </button>
      </div>

      <!-- Messages List -->
      <div class="space-y-4 font-mono">
        @for (msg of messages(); track msg.id) {
          <div
            class="border rounded-lg transition-all duration-300 overflow-hidden"
            [ngClass]="
              expandedId() === msg.id
                ? 'border-green-500/50 bg-slate-800/40'
                : 'border-slate-800 bg-black/20 hover:border-slate-600'
            "
          >
            <!-- Message Header (Click to expand) -->
            <div
              class="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              (click)="toggleExpand(msg.id)"
            >
              <div class="flex items-center gap-4">
                <span
                  class="w-2 h-2 rounded-full"
                  [ngClass]="msg.isRead ? 'bg-slate-700' : 'bg-green-500 animate-pulse'"
                ></span>
                <div>
                  <h4 class="text-slate-200 font-bold text-sm">{{ msg.name }}</h4>
                  <p class="text-slate-500 text-xs">{{ msg.email }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4 text-xs text-slate-500">
                <span>{{ msg.date | date: 'MMM d, y, h:mm a' }}</span>
                <span class="text-slate-400">{{ expandedId() === msg.id ? '[-]' : '[+]' }}</span>
              </div>
            </div>

            <!-- Message Body (Expanded) -->
            @if (expandedId() === msg.id) {
              <div class="p-6 border-t border-slate-800/50 bg-black/40">
                <div class="text-slate-500 text-xs mb-4">
                  <span class="text-purple-400">const</span> payload
                  <span class="text-blue-400">= \`</span>
                </div>

                <p
                  class="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap pl-4 border-l-2 border-slate-700"
                >
                  {{ msg.message }}
                </p>

                <div class="text-slate-500 text-xs mt-4">
                  <span class="text-blue-400">\`;</span>
                </div>

                <!-- Actions -->
                <div class="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-4">
                  <a
                    [href]="'mailto:' + msg.email"
                    class="text-xs uppercase tracking-widest font-bold px-4 py-2 rounded text-blue-400 hover:bg-blue-500/10 transition-colors"
                  >
                    ./reply.sh
                  </a>
                  <button
                    (click)="deleteMessage(msg.id, $event)"
                    class="text-xs uppercase tracking-widest font-bold px-4 py-2 rounded text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                  >
                    <span class="text-red-500/50">❯</span> rm -rf msg
                  </button>
                </div>
              </div>
            }
          </div>
        } @empty {
          <div class="text-center py-12 border border-dashed border-slate-800 rounded-lg">
            <p class="text-slate-500 text-sm">No new transmissions detected.</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class MessagesList implements OnInit {
  private adminService = inject(AdminService);

  messages = signal<any[]>([]);
  expandedId = signal<string | null>(null);

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    // Mock data for immediate visual feedback until your backend is wired up
    const mockMessages = [
      {
        id: '1',
        name: 'Jane Doe',
        email: 'jane@techcorp.com',
        message:
          'Hi Danyal,\n\nWe are looking for a lead backend engineer to help us scale our NestJS microservices. Let me know if you are open to a chat!',
        date: new Date(),
        isRead: false,
      },
      {
        id: '2',
        name: 'Startup Founder',
        email: 'founder@nextbigthing.io',
        message:
          'Loved your portfolio! Need help building an LLM wrapper SaaS similar to DealSense. What is your freelance availability?',
        date: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true,
      },
    ];
    this.messages.set(mockMessages);

    // Uncomment when backend is ready:
    // this.adminService.getMessages().subscribe(data => this.messages.set(data));
  }

  refresh() {
    this.loadMessages();
  }

  toggleExpand(id: string) {
    this.expandedId.set(this.expandedId() === id ? null : id);

    // Mark as read when opened
    this.messages.update((msgs) =>
      msgs.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg)),
    );
  }

  deleteMessage(id: string, event: Event) {
    event.stopPropagation(); // Prevent accordion from toggling

    // Optimistic UI update
    this.messages.update((msgs) => msgs.filter((msg) => msg.id !== id));
    if (this.expandedId() === id) {
      this.expandedId.set(null);
    }

    // Uncomment when backend is ready:
    // this.adminService.deleteMessage(id).subscribe();
  }
}
