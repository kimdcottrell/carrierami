export async function handler(event) {
  return {
    body: JSON.stringify({
      hello: 'world',
    }),
    statusCode: 200,
  };
}
