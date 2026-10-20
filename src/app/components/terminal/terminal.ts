// terminal-hero.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    this.history.update((h) => [...h, { sender: 'user', text: userText }]);
    this.currentInput = '';

    // Simulate smart AI response logic (or connect to a backend LLM API)
    setTimeout(() => {
      let reply =
        "I'm an AI replica running on this portfolio site. Feel free to explore the projects below or reach out directly via email!";

      const lower = userText.toLowerCase();
      if (lower.includes('stack')) {
        reply =
          'My core stack is TypeScript, Next.js / Angular, PostgreSQL, Node.js, and local LLMs.';
      } else if (lower.includes('hire') || lower.includes('available')) {
        reply =
          'Yes, I am currently open to select freelance roles and full-stack engineering opportunities.';
      } else if (lower.includes('project')) {
        reply =
          'Check out Thrust (Crypto Social Trading platform with sub-100ms WebSockets) and FudbalLive in the projects section below!';
      }

      this.history.update((h) => [...h, { sender: 'system', text: reply }]);
    }, 400);
  }
}
