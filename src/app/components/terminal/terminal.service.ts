// terminal.service.ts (Angular)
import { Injectable, inject, InternalServerErrorException } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ChatResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  private http = inject(HttpClient);
  private genAI = GoogleGenerativeAI;

  private apiUrl = 'http://localhost:3000/api'; // Update to match your NestJS port/prefix

  constructor(private configService: ConfigService) {}
  sendCommand(command: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl}/terminal/execute`, { command });
  }
}
