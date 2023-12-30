import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { getServerSession } from "next-auth";

const getSummaryQuery = (article: string) => {
  return `
  SELECT article, highlights
FROM text_summarization_model
WHERE article = "${article}";
  `;
};
export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return new NextResponse("UNAUTHENTICATED", { status: 401 });
  }
  try {
    await connect();
    const requestBody = await req.json();
    console.log("requestBody", requestBody);
    if (!requestBody || !requestBody.content) {
      return NextResponse.json(
        {
          message: "Invalid value for content",
        },
        {
          status: 400,
          statusText: "Bad request",
        }
      );
    }
    // const summaryQueryResult = await MindsDB.SQL.runQuery(
    //   getSummaryQuery(requestBody.content)
    // );
    // console.log("summary query result", summaryQueryResult);
    //Mock response
    const summaryQueryResult = {
      columnNames: ["article", "highlights"],
      context: { db: "mindsdb" },
      type: "table",
      rows: [
        {
          article:
            "## Section 1.1: Understanding the Role\n" +
            "\n" +
            "Customer Support Engineering plays a pivotal role in modern business operations, acting as the bridge between customers and technical solutions. At its core, the role encompasses a multifaceted approach to addressing customer needs, ensuring satisfaction, and contributing significantly to the overall success of a business.\n" +
            "\n" +
            "### Definition and Scope of Customer Support Engineering\n" +
            "\n" +
            "Customer Support Engineering involves the application of technical expertise to assist customers in using a product or service effectively. It goes beyond traditional customer service by delving into the intricate technical aspects of the offerings. Support engineers are tasked with troubleshooting issues, resolving technical queries, and ensuring seamless interactions between users and products.\n" +
            "\n" +
            "The scope of customer support engineering is broad, covering a spectrum of responsibilities from resolving software bugs to guiding users through complex configurations. It requires a blend of technical proficiency, problem-solving skills, and effective communication.\n" +
            "\n" +
            "### The Significance of Customer Support in Business Success\n" +
            "\n" +
            "In the contemporary business landscape, customer support is not merely a reactive service; it is a strategic asset. The success of a business is intricately tied to customer satisfaction, and an efficient customer support team can turn challenges into opportunities. Positive customer interactions contribute to brand loyalty, customer retention, and positive word-of-mouth, all of which are essential for sustained growth.\n" +
            "\n" +
            "The role of customer support engineering is not limited to issue resolution; it extends to customer education, ensuring users harness the full potential of the product or service. This proactive engagement builds trust and positions the support team as a partner in the customer's journey.\n" +
            "\n" +
            "## Section 1.2: Key Responsibilities\n" +
            "\n" +
            "To effectively carry out the responsibilities of a customer support engineer, it is crucial to understand the diverse tasks and strike a balance between technical prowess and interpersonal skills.\n" +
            "\n" +
            "### Identifying Common Tasks and Responsibilities\n" +
            "\n" +
            "Customer support engineers encounter a variety of tasks on a daily basis. These can range from addressing straightforward technical issues to investigating and solving complex problems. The ability to quickly diagnose and resolve issues is paramount, as is the skill to document solutions for future reference.\n" +
            "\n" +
            "Moreover, customer support engineers often act as liaisons between customers and other departments, conveying valuable feedback to improve products or services. They play a critical role in ensuring a seamless flow of information within the organization.\n" +
            "\n" +
            "### Balancing Technical and Interpersonal Skills\n" +
            "\n" +
            "While technical proficiency is a cornerstone of the role, customer support engineers must also possess strong interpersonal skills. Clear and concise communication is key to conveying complex technical information to customers who may not have a similar level of expertise. Empathy and patience are equally vital, especially when dealing with frustrated or non-technical users.\n" +
            "\n" +
            "The delicate balance between technical acumen and interpersonal finesse distinguishes an exceptional customer support engineer. As the first line of defense in addressing customer concerns, these professionals serve as the face of the company and significantly impact the overall customer experience.\n" +
            "\n" +
            "In the subsequent chapters, we will delve into the technical foundations, communication skills, time management strategies, and continuous learning initiatives that collectively contribute to the development of a well-rounded and effective customer support engineer. Understanding the nuances of this role is the first step towards mastering it and, ultimately, becoming an invaluable asset to any organization.",
          highlights:
            "The text provides an informative summary of the role of Customer Support Engineering in modern business operations. Customer Support Engineering acts as a bridge between customers and technical solutions, addressing customer needs and ensuring satisfaction. It involves applying technical expertise to assist customers in effectively using a product or service, going beyond traditional customer service by delving into the technical aspects of the offerings.\n" +
            "\n" +
            "The scope of customer support engineering is broad, covering responsibilities such as troubleshooting issues, resolving technical queries, and guiding users through complex configurations. It requires a",
        },
      ],
      error_message: undefined,
    };
    if (summaryQueryResult.error_message) {
      throw summaryQueryResult.error_message;
    }
    const summary = summaryQueryResult.rows[0].highlights;
    return NextResponse.json({
      message: summary,
    });
  } catch (err) {
    console.log("error in summary route", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
