import React from 'react';
import { Button, Input, SizeTokens, XStack } from "tamagui";

function InputDemo(props: { size: SizeTokens }) {
  return (
    <XStack alignItems="center" space="$2">
      <Input flex={1} size={props.size} placeholder={`Size ${props.size}...`} />
      <Button size={props.size}>Go</Button>
    </XStack>
  );
}

export default InputDemo;
