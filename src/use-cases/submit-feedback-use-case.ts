import { MailAdapter } from "../adapter/mail-adapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {

  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {  }

  async execute(request: SubmitFeedbackUseCaseRequest) {

    const { type, comment, screenshot } = request;
    let image;

    if(!type) {
      throw new Error('Type is required.');
    }

    if(!comment) {
      throw new Error('Comment is required.');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('invalid screenshot format.')
    } else if (screenshot && screenshot.startsWith('data:image/png;base64'))  {
      image = `<p><img style='display:block; width:180px;height:180px;' src='${screenshot}' /></p>`;
    } else {
      image = '';
    }

    await this.feedbacksRepository.create({
      type, 
      comment, 
      screenshot
    });

    await this.mailAdapter.sendMail({ 
      subject: 'Novo feedback',
      body: [
        `<div styles="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        image,
        `</div>`
      ].join('\n'),
    });
  }
}

function useState(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}
