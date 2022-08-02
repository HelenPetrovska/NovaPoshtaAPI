import React, {
  useEffect,
  useState,
} from 'react';

import { getFromServer } from './api';
import { useLocalStorage } from './useLocalStorage';

import './App.scss';

type typeTT = {
  Number: number;
  Status: string;
  WarehouseRecipient: string;
  WarehouseSender: string;
};

export const App: React.FC = () => {
  const [valueInput, setValueInput] = useState<string | number>('');
  const [currentTT, setCurrentTT] = useState<typeTT | null>(null);
  const [descriptionIsVisible, setDescriptionIsVisible] = useState(false);

  const [listOfTT, setListOfTT] = useLocalStorage<typeTT[]>('listOfTT', []);

  // eslint-disable-next-line no-console
  console.log(localStorage.State);

  const addToTTList = (tt:typeTT) => {
    if (!listOfTT.some((item:typeTT) => item.Number === tt.Number)) {
      setListOfTT([...listOfTT, tt]);
    }

    setDescriptionIsVisible(true);
  };

  useEffect(() => {
    const getTTFromServer = async (val: number) => {
      const TT = await getFromServer(val);

      setCurrentTT(TT[0]);
    };

    getTTFromServer(+valueInput);
  }, [valueInput]);

  const handlerTTinList: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    const { textContent } = event.currentTarget;

    if (textContent) {
      setValueInput(+textContent);
    }

    setDescriptionIsVisible(true);
  };

  const eventInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
    setDescriptionIsVisible(false);
  };

  return (
    <div className="app">
      <div>
        <input
          type="number"
          value={valueInput}
          onChange={(event) => eventInput(event)}
        />
        <button type="button" onClick={() => currentTT && addToTTList(currentTT)}>
          Get info
        </button>
        {descriptionIsVisible && currentTT && (
          <div className="description">
            <div className="status">{`Статус доставки: ${currentTT.Status}`}</div>
            <div className="sender">{`Відправлено: ${currentTT.WarehouseSender}`}</div>
            <div className="recipient">{`Отримано: ${currentTT.WarehouseRecipient}`}</div>
          </div>
        )}
      </div>
      <div>
        History:
        {listOfTT.length > 0 && (
          <div>
            <ul className="TT-list">
              {listOfTT.map((TT:typeTT, i:number) => (
                <li
                  className="TT-item"
                  key={i}
                >
                  <a
                    href="/"
                    className="TT-link"
                    onClick={handlerTTinList}
                  >
                    {TT.Number}
                  </a>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => setListOfTT([])}>
              Clean
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
