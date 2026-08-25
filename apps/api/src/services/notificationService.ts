import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export interface EmailPayload {
  to: string;
  subject: string;
  applicantName: string;
  inquiryNumber: string;
  program: string;
}

export async function sendAdmissionConfirmationEmail(payload: EmailPayload): Promise<boolean> {
  logger.info(`[NOTIFICATION SERVICE] Sending Admission Confirmation Email to ${payload.to}`, {
    inquiryNumber: payload.inquiryNumber,
    applicantName: payload.applicantName,
  });
  // Simulate email sending success
  return true;
}

export async function sendAdmissionSMS(phoneNumber: string, inquiryNumber: string): Promise<boolean> {
  logger.info(`[SMS GATEWAY] Sending SMS to ${phoneNumber}: "Dear Applicant, your Nobel College application ${inquiryNumber} has been received. Our team will contact you shortly."`);
  return true;
}
