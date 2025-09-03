import { EmailService } from "../../presentation/email/email.service";
import { SendMailDto } from "../dtos/send-mail";
import autoBind from "auto-bind";

export class SendMailUseCase {
  constructor(private readonly emailService: EmailService) {
    autoBind(this);
  }

  async exec({
    from,
    to,
    subject,
    html = "",
    text = "",
    attachments = [],
  }: SendMailDto) {
    try {
      await this.emailService.auth();

      const sent = await this.emailService
        .setFrom(from)
        .setTo(to)
        .setSubject(subject)
        .setHtml(html)
        .setText(text)
        .setAttachments(attachments)
        .send();

      if (!sent) throw new Error("Email not send");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
