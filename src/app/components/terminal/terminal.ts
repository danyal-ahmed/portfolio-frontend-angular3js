import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminalService } from './terminal.service';

interface ChatMessage {
  sender: 'user' | 'system';
  text: string;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal-card.html',
})
export class Terminal {
  private terminalService = inject(TerminalService);

  presets = [
    'what is your stack?',
    'are you available for hire?',
    'tell me about a recent project',
    'how do you self-host?',
  ];

  currentInput = '';
  history = signal<ChatMessage[]>([
    { sender: 'system', text: 'Welcome! Ask me anything about Danyal Ahmed :)' },
  ]);

  selectPrompt(prompt: string) {
    this.currentInput = prompt;
    this.handleSubmit(new Event('submit'));
  }

  clearChat() {
    this.history.set([]);
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.currentInput.trim()) return;

    const userText = this.currentInput;

    // 1. Add user message to UI immediately
    this.history.update((h) => [...h, { sender: 'user', text: userText }]);
    this.currentInput = '';

    // 2. Call the NestJS backend via TerminalService
    this.terminalService.sendCommand(userText).subscribe({
      next: (response) => {
        this.history.update((h) => [...h, { sender: 'system', text: response.reply }]);
      },
      error: (error) => {
        console.error('Terminal API Error:', error);
        this.history.update((h) => [
          ...h,
          { sender: 'system', text: 'Error: Cannot connect to the NestJS backend. Is it running?' },
        ]);
      },
    });
  }
}
