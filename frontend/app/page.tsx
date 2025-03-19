"use client";
import { useState } from "react";
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
import { Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dotStream } from "ldrs";

export default function Home() {
  dotStream.register();
  const [subjectArea, setSubjectArea] = useState("");
  const [interestArea, setInterestArea] = useState("");

  const [capstonData, setCapstoneData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateCapstone = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setFeedbackGiven(false);
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject_area: subjectArea,
          interest_area: interestArea,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate idea");
      }

      const data = await res.json();
      setCapstoneData(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const handleFeedback = async (e) => {
    e.preventDefault();

    const feedback = e.target.value;
    try {
      const res = await fetch("http://localhost:8000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });

      if (!res.ok) throw new Error("Failed to submit feedback");
      const data = await res.json();
      setFeedbackGiven(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="p-2 h-screen w-full">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Capstone Generator</CardTitle>
            <CardDescription>
              Get instant help with your next capstone project idea - anytime,
              anywhere
            </CardDescription>
          </CardHeader>
          <CardContent className="flex h-full flex-1 overflow-hidden">
            <Card className="border w-1/4 h-full">
              <CardContent className="flex-1">
                <form onSubmit={generateCapstone}>
                  <div className="flex flex-col m-2">
                    <Label htmlFor="subject-area">Subject Area</Label>
                    <Input
                      id="subject-area"
                      className="mb-3"
                      value={subjectArea}
                      onChange={(e) => setSubjectArea(e.target.value)}
                      required
                    />
                    <Label htmlFor="interest-area">Area of Interest</Label>
                    <Input
                      id="interest-area"
                      className="mb-3"
                      value={interestArea}
                      onChange={(e) => setInterestArea(e.target.value)}
                      required
                    />
                    <Button disabled={isLoading} type="submit">
                      <Sparkles />
                      Generate
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="ml-3 border w-3/4 h-full">
              {isLoading || capstonData ? (
                isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <l-dot-stream
                      size="60"
                      speed="2.5"
                      color="black"
                    ></l-dot-stream>
                    <p>Generating Idea</p>
                  </div>
                ) : (
                  <>
                    <CardHeader>
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">
                          {capstonData.title}
                        </h1>
                        <p className="text-gray-600 text-lg"></p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden">
                      <ScrollArea className="h-full ">
                        <div className="p-8 mb-4">
                          <h2 className="text-2xl font-bold mb-2">
                            Description
                          </h2>
                          <p className="text-gray-600 text-lg">
                            {capstonData.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap justify-center mb-8">
                          <article className="w-full md:w-1/2 lg:w-1/3 p-4 mb-4 md:mb-0">
                            <h3 className="text-xl font-bold">Methodology</h3>
                            <ul className="list-disc ml-4 text-gray-600 text-lg">
                              {capstonData.methodology.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </article>

                          <article className="w-full md:w-1/2 lg:w-1/3 p-4 mb-4 md:mb-0">
                            <h3 className="text-xl font-bold">
                              Expected Outcomes
                            </h3>
                            <ul className="list-disc ml-4 text-gray-600 text-lg">
                              {capstonData.expected_outcome.map(
                                (item, index) => (
                                  <li key={index}>{item}</li>
                                )
                              )}
                            </ul>
                          </article>

                          <article className="w-full md:w-1/2 lg:w-1/3 p-4 mb-4 md:mb-0">
                            <h3 className="text-xl font-bold">
                              Potential Impact
                            </h3>
                            <ul className="list-disc ml-4 text-gray-600 text-lg">
                              {capstonData.potential_impact.map(
                                (item, index) => (
                                  <li key={index}>{item}</li>
                                )
                              )}
                            </ul>
                          </article>
                        </div>

                        <div className="text-center mb-8">
                          <h3 className="text-xl font-bold">Summary</h3>
                          <p className="text-gray-600 text-lg">
                            {capstonData.summary}
                          </p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter>
                      {!feedbackGiven ? (
                        <>
                          <p className="mr-2 text-gray-600">
                            Is this idea helpful?{" "}
                          </p>
                          <Button
                            variant="outline"
                            size="icon"
                            className="mr-2"
                            onClick={handleFeedback}
                            value="helpful"
                          >
                            <ThumbsUp />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleFeedback}
                            value="notHelpful"
                          >
                            <ThumbsDown />
                          </Button>
                        </>
                      ) : (
                        <p className="text-gray-600">
                          Thanks for the feedback!
                        </p>
                      )}
                    </CardFooter>
                  </>
                )
              ) : (
                <></>
              )}
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
