import { ChangeEvent, useMemo, useReducer, useRef } from "react";
import styled from "styled-components";
import Highlighter from "react-highlight-words";
import Input from "@Components/Input";
import Button from "@Components/Button";
import Card from "@Components/Card";
import { colors } from "@GlobalStyles/variables";

// maybe I didn't need to use useReducer here and I could implement fnctionality with useState.
// I also added new item to the begining of the list, we can added to end of the list
// I wanted to explain that if you add new item to end of the list you can use index and it doesn't make problem
// bust if you add to first of the list and if you use index , React will render all Cards again because
// after adding each item the key of the all itemas will be diffrent.

// action types start
const CHANGE_SEARCHED_VALUE = "CHANGE_SEARCHED_VALUE";
const ADD_NEW_ITEM = "ADD_NEW_ITEM";
// action types finish

// styled elements start
const Container = styled.div`
  max-width: 600px;
  margin: auto;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: ${colors.redGray};
  border: 1px solid ${colors.gray};
  .input-container {
    flex: 1;
    padding: 15px;
    border-right: 1px solid ${colors.gray};
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;
  padding: 0 15px;
  border: 1px solid ${colors.gray};
`;
// styled elements finish

// types start
interface Item {
  id: number;
  title: string;
}

interface State {
  searchValue: string;
  data: Item[];
}

interface ChangeSearchValue {
  type: typeof CHANGE_SEARCHED_VALUE;
  payload: string;
}

interface AddNewItem {
  type: typeof ADD_NEW_ITEM;
  payload: { id: number; title: string };
}

type Action = ChangeSearchValue | AddNewItem;
// types start

export const defaultItems = [
  { id: 1, title: "Milk" },
  { id: 2, title: "Coffee" },
  { id: 3, title: "Oranges" },
  { id: 4, title: "Banana" },
  { id: 5, title: "Apple" },
  { id: 6, title: "Fish" },
  { id: 7, title: "Chicken" },
  { id: 8, title: "Duck" },
  { id: 9, title: "Bee" },
  { id: 10, title: "Cow" },
  { id: 11, title: "Monkey" },
];

// reducer start
// I added extera data to default value for searching better
const initState: State = {
  searchValue: "",
  data: defaultItems,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case CHANGE_SEARCHED_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };
    case ADD_NEW_ITEM:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    default:
      return state;
  }
}
// reducer finish

//component start
function App() {
  const itemList = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(reducer, initState);

  const changeSearchedValue = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: CHANGE_SEARCHED_VALUE, payload: target.value });
  };

  const addNewRandomItem = (): void => {
    // go to the firt item of list because we are adding item to the first of list

    itemList?.current?.scrollTo?.({
      top: 0,
      behavior: "smooth",
    });
    // I don't reset searchValue when we add a new item to list
    // if we dont reset it we can not see the added data , we see the filtered data
    // to see new data after adding it we should reset search value
    dispatch({
      type: ADD_NEW_ITEM,
      payload: {
        id: state.data.length + 1,
        title: `Random ${state.data.length - initState.data.length + 1}`,
      },
    });
  };

  const filteredData = useMemo(() => {
    const { searchValue, data } = state;
    if (searchValue) {
      return data.filter(
        (item) =>
          item.title.toLowerCase().indexOf(state.searchValue.toLowerCase()) > -1
      );
    }
    return state.data;
  }, [state]);

  return (
    // container class is in global styles
    <div data-testid="app" className="container">
      <Container>
        <FlexBox>
          <div className="input-container">
            <Input value={state.searchValue} onChange={changeSearchedValue} />
          </div>
          <Button onClick={addNewRandomItem}>+</Button>
        </FlexBox>
        <ListContainer ref={itemList}>
          {filteredData.map((item) => (
            <Card key={item.id}>
              <Highlighter
                searchWords={[state.searchValue]}
                textToHighlight={item.title}
              />
            </Card>
          ))}
        </ListContainer>
      </Container>
    </div>
  );
}
//component finish

export default App;
