"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_use_case_1 = require("./submit-feedback-use-case");
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedbackUseCase = new submit_feedback_use_case_1.SubmitFeedbackUseCase({ create: createFeedbackSpy }, { sendMail: sendMailSpy });
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64example screenshot'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('should not be able to submit a feedback without a type', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64example screenshot'
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback without a comment', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64example screenshot'
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback with a invalid screenshot', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'example screenshot'
        })).rejects.toThrow();
    });
});
