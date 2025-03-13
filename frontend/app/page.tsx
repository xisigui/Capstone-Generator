import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const description = `
The APTH platform aims to revolutionize the hiring process by leveraging AI-driven analytics and predictive modeling to identify top talent and reduce time-to-hire. This project combines cutting-edge machine learning techniques with HRM best practices to develop a comprehensive solution for organizations seeking to optimize their recruitment processes.
`;

  const methodology = [
    "Data Collection: Gather extensive data from various sources, including job postings, resumes, social media profiles, and performance reviews.",
    "Machine Learning Model Development: Utilize supervised and unsupervised machine learning algorithms (e.g., decision trees, clustering, and neural networks) to analyze the collected data and identify patterns, trends, and correlations.",
    "Predictive Modeling: Develop predictive models to forecast candidate potential, job fit, and performance based on historical data and real-time market insights.",
    "Human-Centric Evaluation: Integrate expert HRM knowledge and judgment to validate AI-driven predictions and ensure fairness, equity, and bias mitigation.",
  ];

  const outcomes = [
    "Accurate Talent Identification: Predictive models that identify top candidates with a high degree of accuracy (95% or higher).",
    "Reduced Time-to-Hire: Streamlined hiring process that reduces time-to-hire by at least 30%.",
    "Enhanced Diversity and Inclusion: AI-driven analytics that promote diversity, equity, and inclusion in the hiring process.",
    "Data-Driven Insights: Real-time dashboards providing actionable insights on talent trends, market conditions, and organizational performance.",
  ];

  const impact = [
    "Revolutionize Recruitment: Transform the hiring landscape by making data-driven decisions more accessible and efficient.",
    "Boost Organizational Performance: Enable organizations to identify top talent and make informed hiring decisions, leading to improved productivity and competitiveness.",
    "Promote Diversity and Inclusion: Encourage fair and equitable hiring practices, reducing biases and promoting a more diverse workforce.",
    "Foster Innovation and Growth: Empower HR professionals with data-driven insights, enabling them to drive strategic business initiatives and fuel organizational growth.",
  ];

  const summary = `
By integrating AI, machine learning, and HRM best practices, the APTH platform offers a cutting-edge solution for organizations seeking to optimize their recruitment processes and stay ahead in the talent acquisition game.
`;

  return (
    <>
      <div className="p-2 h-screen w-full">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Capstone Generator</CardTitle>
            <CardDescription>
              Get instant help with your next project idea - anytime, anywhere
            </CardDescription>
          </CardHeader>
          <CardContent className="flex border border-violet-400 h-full flex-1 overflow-hidden">
            <Card className="border w-1/4 h-full">
              <CardContent className="flex-1">
                <div className="flex flex-col m-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input id="topic" className="mb-3" />
                  <Label htmlFor="subTopic">Sub Topic</Label>
                  <Input id="subTopic" className="mb-3" />
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" className="mb-3" />
                  <Button>
                    <Sparkles />
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="ml-3 border w-3/4 h-full">
              <CardHeader>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">
                    AI-Powered Talent Analytics and Predictive Hiring (APTH)
                    Platform
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Revolutionizing the hiring process with AI-driven analytics
                    and predictive modeling.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full ">
                  <div className="p-8 mb-4">
                    <h2 className="text-2xl font-bold mb-2">Description</h2>
                    <p className="text-gray-600 text-lg">{description}</p>
                  </div>

                  <div className="flex flex-wrap justify-center mb-8">
                    <article className="w-full md:w-1/2 lg:w-1/3 p-4 mb-4 md:mb-0">
                      <h3 className="text-xl font-bold">Methodology</h3>
                      <ul className="list-disc ml-4 text-gray-600 text-lg">
                        {methodology.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </article>

                    <article className="w-full md:w-1/2 lg:w-1/3 p-4 mb-4 md:mb-0">
                      <h3 className="text-xl font-bold">Expected Outcomes</h3>
                      <ul className="list-disc ml-4 text-gray-600 text-lg">
                        {outcomes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </article>

                    <article className="w-full md:w-1/2 lg:w-1/3 p-4 mb-4 md:mb-0">
                      <h3 className="text-xl font-bold">Potential Impact</h3>
                      <ul className="list-disc ml-4 text-gray-600 text-lg">
                        {impact.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  </div>

                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold">Summary</h3>
                    <p className="text-gray-600 text-lg">{summary}</p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
