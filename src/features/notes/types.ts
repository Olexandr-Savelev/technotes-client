export interface Note {
  id?: string;
  _id: string;
  user: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  ticket: string;
  __v: number;
  prevTicketNum?: number;
}
