export type ViewState = 'landing' | 'ticket';

export interface TicketData {
  name: string;
  date: string;
  time: string;
  location: string;
  obsession: string;
}

export type DoodleVariant = 'star' | 'underline' | 'arrow' | 'circle' | 'scribble';