
export class EmailMessageService {
  message_type = '';
  header = '';
  body = '';

  constructor() { }

  success(body: any, header: any, timeout = 5000) {
    this.message_type = 'success';
    this.assignMessage(header, body, timeout);
  }

  error(body: any, header: any, timeout = 5000) {
    this.message_type = 'error';
    this.assignMessage(header, body, timeout);
  }

  assignMessage(header: string, body: string, timeout: number | undefined) {
    this.header = header;
    this.body = body;
    setTimeout(() => {
      this.removeMessage();
    }, timeout);
  }

  removeMessage() {
    this.header = '';
    this.body = '';
  }
}
