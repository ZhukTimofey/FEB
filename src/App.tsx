import "./index.css";
import { CardComponent } from "./components/card";
import { useConsStore, useProsStore } from "./hooks";
import { addThemes } from "./utils/addTeme.tsx";
import { useState } from "react";
import { generateVotes } from "./utils/voteEvent.ts";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  BarChart,
  Button,
  Card,
  Grid,
  Metric,
  TextInput,
  Title,
} from "@tremor/react";
import { useCountdown } from "./hooks/useTimer.ts";

function App() {
  const cons = useConsStore((state: any) => state.cons);
  const addCons = useConsStore((state: any) => state.addCons);
  const pros = useProsStore((state: any) => state.pros);
  const addPros = useProsStore((state: any) => state.addPros);

  const [theme, setTheme] = useState<string>("");
  const [formPros, setFormPros] = useState("");
  const [formCons, setFormCons] = useState("");
  const voteForPros = useProsStore((state: any) => state.voteForTheme);
  const voteForCons = useConsStore((state: any) => state.voteForTheme);

  const { minutes, seconds, startCountdown, countDownStatus } =
    useCountdown(300000);
  const onConsKeyPres = (value: string) => {
    addCons(value);
  };
  const handleStartCountDown = () => {
    startCountdown();
    addThemes(addPros, addCons);
    generateVotes(voteForPros, voteForCons);
  };
  const onProsKeyPres = (value: string) => {
    addPros(value);
  };
  return (
    <>
      <div className={"flex flex-col mx-auto max-w-4xl text-center"}>
        <Metric className={"my-10"}>Pros and Cons Brainstorming</Metric>
        {countDownStatus === "not started" ? (
          <div className={""}>
            <TextInput
              placeholder={"Enter theme for brainstorm"}
              value={theme}
              className={"mb-4 mx-auto w-2/4"}
              onChange={(e) => {
                setTheme(e.target.value);
              }}
            />
            <Button className={"mx-auto w-2/4"} onClick={handleStartCountDown}>
              Start brainstorm
            </Button>
          </div>
        ) : (
          <>
            {countDownStatus === "stopped" ? (
              <Grid className={"mb-4"}>
                <Title className={"mb-2"}>
                  Brainstorm is over, you can check results below
                </Title>
                <AccordionList>
                  <Accordion>
                    <AccordionHeader>Pros</AccordionHeader>
                    <AccordionBody>
                      <BarChart
                        className="mt-6"
                        data={pros}
                        index="theme"
                        categories={["minus", "plus"]}
                        colors={["rose", "emerald"]}
                        yAxisWidth={30}
                      />
                    </AccordionBody>
                  </Accordion>
                  <Accordion>
                    <AccordionHeader>Cons</AccordionHeader>
                    <AccordionBody>
                      <BarChart
                        className="mt-6"
                        data={cons}
                        index="theme"
                        categories={["minus", "plus"]}
                        colors={["rose", "emerald"]}
                        yAxisWidth={30}
                      />
                    </AccordionBody>
                  </Accordion>
                </AccordionList>
              </Grid>
            ) : (
              <>
                <Metric className={"mb-4"}>{theme}</Metric>
                <Title>Brainstorm will end in:</Title>
                <Metric className={"mb-10"}>
                  {minutes} : {seconds}
                </Metric>
              </>
            )}

            <Grid numItems={2} className="gap-6">
              <Card decoration="top" decorationColor="emerald">
                <Title>Pros</Title>
                <TextInput
                  value={formPros}
                  onChange={(e) => {
                    setFormPros(e.target.value);
                  }}
                  disabled={countDownStatus === "stopped"}
                  error={
                    pros.some(({ theme }: any) => formPros === theme) ||
                    formPros.length > 24
                  }
                  placeholder={"Enter your theme"}
                  errorMessage={
                    pros.some(({ theme }: any) => formPros === theme)
                      ? "This pros already exist"
                      : "Suggested pros is too long"
                  }
                  onKeyDown={(e: any) => {
                    const isAlredyExist = pros.some(
                      ({ theme }: any) => formPros === theme,
                    );
                    if (isAlredyExist) return;
                    if (pros.length > 14) return;
                    if (e.key === "Enter") {
                      onProsKeyPres(e.target.value);
                      setFormPros("");
                    }
                  }}
                />
                <Grid numItems={1} className="gap-6 mt-4">
                  {pros.map(
                    ({
                      theme,
                      plus,
                      minus,
                      votedStatus,
                    }: {
                      theme: string;
                      plus: number;
                      minus: number;
                      votedStatus: false | "plus" | "minus";
                    }) => (
                      <CardComponent
                        key={theme}
                        theme={theme}
                        plus={plus}
                        minus={minus}
                        votedStatus={votedStatus}
                        voteFor={voteForPros}
                      />
                    ),
                  )}
                </Grid>
              </Card>
              <Card decoration="top" decorationColor="rose">
                <Title>Cons</Title>
                <TextInput
                  value={formCons}
                  onChange={(e) => {
                    setFormCons(e.target.value);
                  }}
                  disabled={countDownStatus === "stopped"}
                  placeholder={"Enter your theme"}
                  error={
                    cons.some(({ theme }: any) => formCons === theme) ||
                    formCons.length > 24
                  }
                  errorMessage={
                    cons.some(({ theme }: any) => formCons === theme)
                      ? "This cons already exist"
                      : "Suggested cons is too long"
                  }
                  onKeyDown={(e: any) => {
                    const isAlredyExist = cons.some(
                      ({ theme }: any) => formCons === theme,
                    );
                    if (isAlredyExist) return;

                    if (formCons.length > 24) return;
                    if (e.key === "Enter") {
                      onConsKeyPres(e.target.value);
                      setFormCons("");
                    }
                  }}
                />
                <Grid numItems={1} className="gap-6 mt-4">
                  {cons.map(
                    ({
                      theme,
                      plus,
                      minus,
                      votedStatus,
                    }: {
                      theme: string;
                      plus: number;
                      minus: number;
                      votedStatus: false | "plus" | "minus";
                    }) => (
                      <CardComponent
                        key={theme}
                        theme={theme}
                        plus={plus}
                        minus={minus}
                        votedStatus={votedStatus}
                        voteFor={voteForCons}
                      />
                    ),
                  )}
                </Grid>
              </Card>
            </Grid>
          </>
        )}
      </div>
    </>
  );
}

export default App;
