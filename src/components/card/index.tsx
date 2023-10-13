import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";

import { Card, Icon, Title, Flex, CategoryBar, Legend } from "@tremor/react";
export const CardComponent = ({
  theme,
  plus,
  minus,
  votedStatus,
  voteFor,
}: {
  theme: string;
  plus: number;
  minus: number;
  votedStatus: false | "plus" | "minus";
  voteFor: (number: number, theme: string, status: string) => void;
}) => {
  return (
    <Card key={theme}>
      <Flex>
        <Title className="w-full grow">{theme}</Title>
        <Flex justifyContent="end" className="-space-x-2 -mr-2 grow-0 w-3/12">
          <Icon
            onClick={() => voteFor(1, theme, "plus")}
            className={"mr-4 cursor-pointer"}
            icon={PlusCircleIcon}
            color={"emerald"}
            variant={votedStatus === "plus" ? "outlined" : "light"}
          />
          <Icon
            onClick={() => voteFor(-1, theme, "minus")}
            className={"cursor-pointer"}
            icon={MinusCircleIcon}
            color={"rose"}
            variant={votedStatus === "minus" ? "outlined" : "light"}
          />
        </Flex>
      </Flex>

      <CategoryBar
        className="mt-4"
        values={[plus, minus]}
        showLabels={false}
        colors={["emerald", "red"]}
      />
      <Legend
        className="mt-3"
        categories={[`Pluses ${plus}`, `Minuses ${minus}`]}
        colors={["emerald", "red"]}
      />
    </Card>
  );
};
