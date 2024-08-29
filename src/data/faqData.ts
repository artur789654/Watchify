export interface Faq {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export const faqData:Faq[] = [
  {
    category: "Billing",
    questions: [
      {
        question: "How do I update my billing information?",
        answer:
          "To update your billing information, go to the billing section under your account settings and click on 'Update Billing Information'.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept Visa, MasterCard, PayPal, and Apple Pay.",
      },
    ],
  },
  {
    category: "Usage",
    questions: [
      {
        question: "How do I reset my password?",
        answer:
          "To reset your password, click on 'Forgot Password' on the login page and follow the instructions.",
      },
      {
        question: "How can I track my usage?",
        answer:
          "You can track your usage in the 'Usage' tab under your account settings.",
      },
    ],
  },
  {
    category: "Troubleshooting",
    questions: [
      {
        question: "What should I do if I encounter an error?",
        answer:
          "If you encounter an error, please restart the app. If the issue persists, contact support.",
      },
      {
        question: "How do I report a bug?",
        answer:
          "You can report a bug through our 'Support' section by providing details about the issue.",
      },
    ],
  },
];
