export enum PracticeCategory {
  CHAT = "chat",
  EMAIL = "email",
  SALES = "sales",
}

export const Companies = [
  {
    type: "success",
    name: "Swiggy",
  },
  {
    type: "secondary",
    name: "Zomato",
  },
  {
    type: "primary",
    name: "Zoho",
  },
];
export const practiceDetails = {
  "chat-specialist-and-pizza": {
    key: "1",
    title: "Chat Specialist and Pizza!",
    id: "chat-specialist-and-pizza",
    type: PracticeCategory.CHAT,
    difficulty: "Easy",
    description:
      "How can customer support effectively address a complaint regarding the spoiled pizza and provide a satisfactory resolution, including a refund, while maintaining a positive customer experience and restoring trust in the brand?",
    expectations: [
      "Active listening: The customer support agent should listen attentively to the concerns, allowing customers to express their frustration and ensuring they feel heard and understood.",
      "Empathy and understanding: The agent should demonstrate empathy towards the situation, acknowledging customer's disappointment and anger caused by receiving a spoiled pizza.",
      "Timely response and resolution: The agent should aim to resolve the issue promptly, providing timely updates to Joey and keeping him informed of the progress made towards finding a solution.",
      "Clear and concise: You must not exceed more than 10 messages.",
    ],
    context:
      "You are an angry customer who didn't get proper pizza delivered. You are in conversation with support agent of that particular company, you have to keep your messages short and concise not exceeding 70 words",
    initialMessage: "Where the hell is my food order?",
  },
  "support-person-and-tech-problems": {
    key: "1",
    title: "Support Person and Tech Problems",
    id: "support-person-and-tech-problems",
    type: PracticeCategory.EMAIL,
    difficulty: "Medium",
    description:
      "I am extremely frustrated and facing a major obstacle for my business! I signed up on your portal, received the activation email, and even set my password. But guess what? I still can't log in! This is causing significant disruption and hindering my progress. The login email I used is hello@login.com. I need urgent assistance to resolve this issue and regain access to my account.",
    expectations: [
      "As a customer support agent, reply to the customer in an email describing the issue and the solution.",
      "Keep the mail short and concise.",
      "Number of character should be within 250 - 500 characters, inclusively",
    ],
    context: "",
    initialMessage: "",
  },
};
export const practiceData = [
  practiceDetails["chat-specialist-and-pizza"],
  practiceDetails["support-person-and-tech-problems"],
];

export const practiceCategoryToLabel = {
  [PracticeCategory.CHAT]: "Chat",
  [PracticeCategory.EMAIL]: "Email",
  [PracticeCategory.SALES]: "Sales",
};
