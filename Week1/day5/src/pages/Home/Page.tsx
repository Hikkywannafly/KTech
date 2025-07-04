import { Switch } from "@/components/ui/switch"
import { FC, useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { ButtonSD } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const fruits = ["Apple", "Banana", "Orange"];
const Home: FC = () => {
  const [counter, setCounter] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [lastkey, setLastKey] = useState<string | null>(null);
  const [inputValue7, setInputValue7] = useState<string>("Double Click Me");
  const [fruit, setFruit] = useState<string>("");
  // exercise 

  const handleToggle = () => {
    setIsChecked(!isChecked);

  }
  const handleButtonClick = () => {
    setCounter(counter + 1);
  }
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    console.log(`You typed: ${value || "nothing"}`);
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    setLastKey(key);
  }
  const handleDoubleClick = () => {
    setInputValue7("Double-clicked! Dunging in 2 seconds...");
  }
  return (
    <>
      <section>
        <div className="flex min-h-[calc(100vh-64px)] bg-base-200 w-full justify-center ">
          <div className="flex flex-col w-[300px] gap-8 items-start justify-center p-4">

            <div className="flex flex-col gap-4">
              <h1 className="">
                Exercise 1: Button Click Counter
              </h1>
              <Button
                className="btn-primary"
                onClick={() => {
                  handleButtonClick();
                }}
              >
                Click Me
              </Button>
              <p>Clicked Time : {counter}</p>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="">
                Exercise 2: Input Field Tracker

              </h1>
              <Input
                placeholder="Type something..."
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <p className="text-xl">
                You typed: {inputValue || "nothing"}
              </p>
            </div>


            <div className="flex flex-col gap-4">
              <h1 className="">
                Exercise 3: Toggle Switch
              </h1>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" onClick={handleToggle} />
                <p className="text-black">{!isChecked ? "on" : "off"} </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="">
                Exercise 4: Hover Highlight
              </h1>
              <div className="w-full h-32 bg-white hover:bg-yellow-300 transition-colors flex items-center justify-center">
                <p className="text-black">Hover me!</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="">
                Exercise 5: Form Submission
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`You submitted: ${inputValue}`);
                  setInputValue("");
                }}
                className="flex flex-col gap-4"
              >
                <Input
                  placeholder="Enter text to submit..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Button type="submit" className="btn-primary">
                  Submit
                </Button>
              </form>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="">
                Exercise 6: Key Press Display

              </h1>
              <Input
                placeholder="Press any key..."
                onKeyDown={(e) => {
                  handleKeyPress(e);
                }}
              />
              <p className="text-black">Last key: {lastkey}</p>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="">
                Exercise 7: Double Click Message

              </h1>
              <Button
                className="btn-primary"
                onDoubleClick={
                  () => {
                    setInputValue7("Double Click Me 2 Seconds Later");
                    setTimeout(() => { setInputValue7("Double Click Me"); }, 2000);
                  }
                }
              >
                {inputValue7}
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="">
                Exercise 8: Dropdown Selection
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ButtonSD>
                    sadasd
                  </ButtonSD>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  {
                    fruits.map((fruit) => (
                      <DropdownMenuGroup key={fruit}>

                        <DropdownMenuItem className="cursor-pointer"
                          onSelect={() => {
                            console.log(`Selected fruit: ${fruit}`);
                            setFruit(fruit);
                          }}>
                          {fruit}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    ))
                  }
                </DropdownMenuContent>
              </DropdownMenu>

              <p>

                Selected fruit: {fruit ? fruit : "None"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
