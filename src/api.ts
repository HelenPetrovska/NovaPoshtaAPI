const API_URL = 'https://api.novaposhta.ua/v2.0/json/';

export const getFromServer = async (valueInput:number) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      apiKey: 'f8d845dad31ff4d74da31ed7628e7a54',
      modelName: 'TrackingDocument',
      calledMethod: 'getStatusDocuments',
      methodProperties: {
        Documents: [
          {
            DocumentNumber: `${valueInput}`,
          },
        ],
      },
    }),
  });
  const result = await response.json();

  return result.data;
};
